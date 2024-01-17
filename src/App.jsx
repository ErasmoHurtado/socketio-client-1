import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"

function App() {
  const socket = useMemo(()=>io("https://socket-io-server-nstc.onrender.com"),[]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }

  useEffect(()=>{
    socket.on("connect", ()=> {
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data)=>{
      console.log(data);
    })

    socket.on("welcome", (s)=>{
      console.log(s);
    });

    return ()=>{
      socket.disconnect();
    }
  },[]);

  return (
    <div className=''>
        <p>Esta es la pagina para los CLIENTES de Socket IO</p>        
        <form onSubmit={handleSubmit}>
          <label>Mensaje</label>
          <input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Aqui se escribe el mensaje"></input>
          <button type="submit">Enviar Mensaje</button>
        </form>
        
      </div>    
  )
}

export default App

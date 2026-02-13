'use client'
import { useState, useEffect } from "react";


export default function Main(){

  const [tplData,setTplData] = useState<null>(null);

  useEffect(()=>{
    const interval = globalThis.setInterval(async ()=>{
      const fetchData = await fetch("/api/getTplData",{
        method:"GET"
      });
    },2000);

    return () => {
      clearInterval(interval);
    }
  },[])

  return (<div>Main</div>)
}
'use client'
import { useState, useEffect } from "react";
import LiveMap from "@/components/LiveMap";

export default function Main(){

  const [tplData,setTplData] = useState<Array<{
    id:string,
    provider:string,
    online:boolean,
    lat:number,
    lon:number,
    line:string
  }>>([]);

  useEffect(()=>{
    const interval = globalThis.setInterval(async ()=>{
      const fetchData = await fetch("/api/getTplData",{
        method:"GET"
      });

      const {buses} = await fetchData.json();

      setTplData(buses);
    },5000);

    return () => {
      clearInterval(interval);
    }
  },[])

  console.log(tplData)

  return (
    <LiveMap buses={tplData}/>
  );
}
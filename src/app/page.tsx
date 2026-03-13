'use client'
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
});

export default function Main(){

  const [tplData,setTplData] = useState<Array<{
    id:string,
    provider:string,
    online:boolean,
    lat:number,
    lon:number,
    line:string
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchBuses = async () => {
      try {
        const fetchData = await fetch("/api/getTplData", {
          method: "GET",
        });

        const { buses } = await fetchData.json();
        setTplData(Array.isArray(buses) ? buses : []);
      } catch {
        setTplData([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchBuses();

    const interval = globalThis.setInterval(() => {
      void fetchBuses();
    },5000);

    return () => {
      clearInterval(interval);
    }
  },[])

  if (isLoading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b1020",
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ display: "grid", gap: "10px", placeItems: "center" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "3px solid rgba(255,255,255,0.35)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <p style={{ margin: 0 }}>Searching...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>  ygyiftytfjhiyhgcfyyghutfuik0iu
      </main>
    );
  }

  return (
    <LiveMap buses={tplData}/>
  );
}
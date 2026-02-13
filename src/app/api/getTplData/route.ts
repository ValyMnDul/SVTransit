import { NextResponse } from "next/server"; 

type ThorebBus = {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
};

type KarsanBus = {
    contact:string,
    journey:string,
    lat:string,
    lon:string
}

type ThorebData = Record<string, ThorebBus>;

type KarsanData = Record<string, KarsanBus>;

export const GET = async ()=>{
    const fetchTplData = await fetch("https://harta.tpl-sv.ro:8888/?ajax=get_bus_data&t=1770986888837",{
        method:"GET"
    })

    const tplData = await fetchTplData.json();

    const thoreb = JSON.parse(tplData.thoreb) as ThorebData;
    const karsan = JSON.parse(tplData.karsan) as KarsanData;

    const buses = [];

    for(const [id,data] of Object.entries(thoreb)){
        buses.push({
            id:id,
            provider:"Thoreb",
            online:data["1"] === "on",
            lat:Number(data["2"]),
            lon:Number(data["3"]),
            line:data["4"].trim() === "NO_" || data["4"].trim() === "NO_LINE" || data["4"].trim() === "" ? "Unknown" : data["4"].trim()
        })
    }

    for(const [id,data] of Object.entries(karsan)){
        buses.push({
            id:id.replaceAll("-",""),
            provider:"Karsan",
            online:data.contact === "on",
            lat:Number(data.lat),
            lon:Number(data.lon),
            line:data.journey
        })
    }

    return NextResponse.json({buses},{status:200});
}
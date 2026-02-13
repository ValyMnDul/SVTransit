import { NextResponse } from "next/server"; 

export const GET = async ()=>{
    const fetchTplData = await fetch("https://harta.tpl-sv.ro:8888/?ajax=get_bus_data&t=1770986888837",{
        method:"GET"
    })

    const tplData = await fetchTplData.json();

    const thoreb = JSON.parse(tplData.thoreb);
    const karsan = JSON.parse(tplData.karsan);


    return NextResponse.json({})
}
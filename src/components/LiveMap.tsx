'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

type Bus = {
  id: string;
  provider: string;
  online: boolean;
  lat: number;
  lon: number;
  line: string;
};

export default function LiveMap({buses}:{buses:Bus[]}) {
    const center:[number,number]=[47.651,26.255];
 
    const validBuses = Array.isArray(buses)
    ? buses.filter(
        (b) =>
          b &&
          typeof b.id === "string" &&
          Number.isFinite(Number(b.lat)) &&
          Number.isFinite(Number(b.lon))
      )
    : [];

    return(
        <MapContainer
        center={center}
        zoom={13}
        style={{height:"100%",width:"100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            {buses.map((bus)=>(
                <Marker
                key={bus.id}
                position={[bus.lat,bus.lon]}
                icon={icon}
                >
                    <Popup>
                        <div>
                            <div><b>#{bus.id}</b> {bus.line ? `— linia ${bus.line}` : ""}</div>
                        </div>
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    )
}
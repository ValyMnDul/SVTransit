'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

type Bus = {
  id: string;
  provider: string;
  online: boolean;
  lat: number;
  lon: number;
  line: string;
};

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function Map({ buses }: { buses: Bus[] }) {

  const center:[number,number] = [47.651, 26.255];

  const validBuses = Array.isArray(buses)
    ? buses.filter(
        (b) =>
          b &&
          typeof b.id === "string" &&
          Number.isFinite(Number(b.lat)) &&
          Number.isFinite(Number(b.lon))
      )
    : [];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={center} zoom={13} style={{height:"100%", width:"100%"}}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {validBuses.map((bus)=>(
          <Marker
            key={`${bus.provider}-${bus.id}`}
            position={[Number(bus.lat), Number(bus.lon)]}
            icon={icon}
          >
            <Popup>
              <div>
                <div>
                  <b>#{bus.id}</b> — {bus.provider}
                </div>

                <div>Line: {bus.line}</div>
                <div>Online: {bus.online ? "Yes" : "No"}</div>

                <div style={{ opacity: 0.7 }}>
                  {Number(bus.lat).toFixed(5)}, {Number(bus.lon).toFixed(5)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  )
}
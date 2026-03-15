# SVTransit

**SVTransit** is a simple web application that monitors **local public transport in Suceava** in real time.

The project displays buses on an interactive map using live data retrieved from an API.

## Features

- Real-time bus tracking
- Interactive map powered by Leaflet
- Automatic data refresh every 5 seconds
- Bus details (ID, provider, line, online status)

## Tech Stack

- Next.js
- React
- TypeScript
- React-Leaflet
- OpenStreetMap

## How it works

1. The frontend requests bus data from `/api/getTplData`.
2. The API returns the current list of buses with coordinates.
3. Buses are displayed as markers on a map of Suceava.
4. Data refreshes automatically every **5 seconds**.

### Made for HackClub the Game event

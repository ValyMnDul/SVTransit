# SVTransit

**SVTransit** is a simple web application that monitors **local public transport in Suceava** in real time.

The project displays buses on an interactive map using live data retrieved from an API.

## Features

- Real-time bus tracking
- Interactive map powered by Leaflet
- Automatic data refresh every 5 seconds
- Bus details (ID, provider, line, online status)


## How it works

1. The frontend requests bus data from `/api/getTplData`.
2. The API returns the current list of buses with coordinates.
3. Buses are displayed as markers on a map of Suceava.
4. Data refreshes automatically every **5 seconds**.

## Contribute

Feel free to open an issue or submit a pull request to contribute or suggest features

## License

This project is licensed under the [MIT LICENSE](LICENSE.md)

### Made for HackClub the Game event

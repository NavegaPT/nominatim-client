# nominatim-client

API client for the Nominatim address server

## Installation

```bash
npm install @navega/nominatim-client
```

## Usage

```js
import { NominatimClient } from "@navegapt/nominatim-client";

const client = new NominatimClient({
  userAgent: "MyApp",
  referrer: "https://myapp.com",
  language: "en",
});

// Query to place lookup
const results = await client.search("Berlin");
console.log(results);

// Reverse geocoding
const location = await client.reverse(52.52, 13.405);
console.log(location);
```

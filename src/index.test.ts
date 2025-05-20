import test from "node:test";
import assert from "node:assert";
import { NominatimClient } from "./index.js";

test("NominatimClient search method", async () => {
  const client = new NominatimClient();
  const query = "Berlin";
  const results = await client.search(query, false);
  assert(Array.isArray(results), "Results should be an array");
  assert(results.length > 0, "Results should not be empty");
  assert(
    typeof results[0].place_id === "number",
    "Place ID should be a number"
  );
  assert(
    results[0].display_name.includes(query),
    `First result should contain query: ${query}`
  );
});

test("NominatimClient reverse method", async () => {
  const client = new NominatimClient();
  const lat = 52.52; // Berlin latitude
  const lon = 13.405; // Berlin longitude
  const result = await client.reverse(lat, lon, false);
  assert(
    typeof result === "object" && !Array.isArray(result),
    "Results should be an object"
  );
  assert(typeof result.place_id === "number", "Place ID should be a number");
  assert(
    result.display_name.includes("Berlin"),
    "First result should contain Berlin"
  );
});

export interface NominatimClientOptions {
  userAgent?: string;
  referrer?: string;
  language?: string;
}

export interface SearchResultItem {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface SearchResultItemAddress extends SearchResultItem {
  address?: {
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
}

export enum ZoomLevel {
  Country = 3,
  State = 5,
  County = 8,
  City = 10,
  Town = 12,
  Village = 13,
  Neighborhood = 14,
  Settlement = 15,
  MajorStreets = 16,
  MajorAndMinorStreets = 17,
  Building = 18,
}

import type {
  NominatimClientOptions,
  SearchResultItem,
  SearchResultItemAddress,
} from "./types.js";

import { ZoomLevel } from "./types.js";

const BASE_URL = "https://nominatim.openstreetmap.org/";

export class NominatimClient {
  constructor(private options?: NominatimClientOptions) {}

  async search(
    query: string,
    addressDetails?: false
  ): Promise<SearchResultItem[]>;
  async search(
    query: string,
    addressDetails: true
  ): Promise<SearchResultItemAddress[]>;

  async search(
    query: string,
    addressDetails: boolean = false
  ): Promise<SearchResultItem[] | SearchResultItemAddress[]> {
    try {
      const fetchResult = await fetch(
        `${BASE_URL}search?q=${query}&format=json&addressdetails=${
          addressDetails ? 1 : 0
        }`,
        {
          headers: this.generateHeaders(),
        }
      );

      return (await fetchResult.json()) as (typeof addressDetails extends true
        ? SearchResultItemAddress
        : SearchResultItem)[];
    } catch (e: any) {
      throw new Error(
        "NominatimClientError: Fetch failed" + (e?.message || "Unknown error")
      );
    }
  }

  async reverse(
    lat: number,
    lon: number,
    addressDetails?: false,
    zoomLevel?: ZoomLevel
  ): Promise<SearchResultItem>;
  async reverse(
    lat: number,
    lon: number,
    addressDetails: true,
    zoomLevel?: ZoomLevel
  ): Promise<SearchResultItemAddress>;

  async reverse(
    lat: number,
    lon: number,
    addressDetails: boolean = false,
    zoomLevel?: ZoomLevel
  ): Promise<SearchResultItem | SearchResultItemAddress> {
    try {
      const fetchResult = await fetch(
        `${BASE_URL}reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=${
          addressDetails ? 1 : 0
        }${zoomLevel ? `&zoom=${zoomLevel}` : ""}`,
        {
          headers: this.generateHeaders(),
        }
      );

      return (await fetchResult.json()) as typeof addressDetails extends true
        ? SearchResultItemAddress
        : SearchResultItem;
    } catch (e: any) {
      throw new Error(
        "NominatimClientError: Fetch failed - " +
          (e?.message || "Unknown error")
      );
    }
  }

  private generateHeaders() {
    return {
      "User-Agent": this.options?.userAgent || "NavegaOrgNominatimClient",
      Referer:
        this.options?.referrer ||
        "https://github.com/NavegaPT/nominatim-client",
      ...(this.options?.language
        ? { "Accept-Language": this.options.language }
        : {}),
    };
  }
}

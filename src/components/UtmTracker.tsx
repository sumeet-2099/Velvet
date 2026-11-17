"use client";

import { useEffect } from "react";

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  timestamp: string;
}

export function getUtmAttribution(): UtmData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("velvet_utm_attribution");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function UtmTracker() {
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");
      const utmTerm = urlParams.get("utm_term");
      const utmContent = urlParams.get("utm_content");
      const ref = urlParams.get("ref");

      if (utmSource || utmMedium || utmCampaign || ref) {
        const utmData: UtmData = {
          ...(utmSource && { utm_source: utmSource }),
          ...(utmMedium && { utm_medium: utmMedium }),
          ...(utmCampaign && { utm_campaign: utmCampaign }),
          ...(utmTerm && { utm_term: utmTerm }),
          ...(utmContent && { utm_content: utmContent }),
          ...(ref && { ref }),
          timestamp: new Date().toISOString(),
        };
        sessionStorage.setItem("velvet_utm_attribution", JSON.stringify(utmData));
      }
    } catch {
      // Ignore sessionStorage exceptions (e.g. strict incognito)
    }
  }, []);

  return null;
}

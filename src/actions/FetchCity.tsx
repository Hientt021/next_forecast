"use client";

const LOCATION_TOKEN = "0c644d27eebc400c8358d5678702e555";

export default function FetchCity(position: any) {
  const latitude = position.coords.latitude.toString();
  const longitude = position.coords.longitude.toString();

  //   const res = await fetch(
  //     `https://api.geoapify.com/v1/ipinfo?apiKey=` + LOCATION_TOKEN
  //   );
  //   const data = await res.json();
  return {
    latitude,
    longitude,
  };
}

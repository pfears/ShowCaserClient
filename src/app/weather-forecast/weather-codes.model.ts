export function getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Fog",
      51: "Drizzle",
      53: "Drizzle",
      55: "Drizzle",
      56: "Drizzle",
      57: "Drizzle",
      61: "Light Rain",
      63: "Rain",
      65: "Heavy Rain",
      66: "Light Rain",
      67: "Heavy Rain",
      71: "Slight Snow",
      73: "Snow",
      75: "Heavy Snow",
      77: "Light Snow",
      80: "Light Showers",
      81: "Showers",
      82: "Heavy Showers",
      85: "Light Sleet",
      86: "Heavy Sleet",
      95: "Thunderstorm",
      96: "Thunderstorm",
      99: "Thunderstorm"
    };
  
    return descriptions[code] || "Unknown";
  }
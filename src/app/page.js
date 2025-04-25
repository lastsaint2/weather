"use client";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "515e6f7e83cf0ce8762ee44de2d72c02";

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-blue-500 flex flex-col items-center justify-center px-4">
      <div className="bg-black shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🌤️ Weather App</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-white-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-4 text-gray-500">Loading...</p>}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {weather && (
          <div className="mt-6 text-left">
            <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
            <p className="mt-2">🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🌥️ Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

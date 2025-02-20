"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://tinyclips.vercel.app/api/py/helloFastApi");
      const result = await response.json();
      setData(result.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Next.js with FastAPI</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <p>Response: {data}</p>}
    </div>
  );
}

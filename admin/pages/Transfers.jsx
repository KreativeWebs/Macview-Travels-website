import React from "react";
import { useState, useEffect } from "react";

export default function Transfers() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        id: "T-3001",
        client: "Sam",
        pickup: "LOS",
        drop: "MMI",
        status: "scheduled",
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Airport Transfers</h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <table className="w-full table-auto text-sm">
          <thead className="text-left text-xs text-gray-500">
            <tr>
              <th>Client</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t hover:bg-gray-50">
                <td className="py-3">{it.client}</td>
                <td>{it.pickup}</td>
                <td>{it.drop}</td>
                <td>{it.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

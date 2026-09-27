"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import { bikeService } from "@/features/bikes/services/bike.service";
import { FuelType } from "@/features/bikes/types/bike.types";

export default function CreateBikePage() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fuelType, setFuelType] = useState<FuelType>("Petrol");
  const [tankCapacity, setTankCapacity] = useState(0);
  const [currentOdometer, setCurrentOdometer] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await bikeService.createBike({
        brand,
        model,
        year,
        registration_number: registrationNumber,
        fuel_type: fuelType,
        tank_capacity: tankCapacity,
        current_odometer: currentOdometer,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create bike.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold mb-6">
            ➕ Add New Bike
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />

            <input
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              required
            />

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />

            <select
              className="w-full border rounded-lg p-3"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value as FuelType)}
            >
              <option value="Petrol">Petrol</option>
              <option value="Octane">Octane</option>
              <option value="Diesel">Diesel</option>
            </select>

            <input
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Tank Capacity"
              value={tankCapacity}
              onChange={(e) => setTankCapacity(Number(e.target.value))}
              required
            />

            <input
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Current Odometer"
              value={currentOdometer}
              onChange={(e) => setCurrentOdometer(Number(e.target.value))}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Bike"}
            </button>

            {message && (
              <p className="text-center text-red-500">{message}</p>
            )}

          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
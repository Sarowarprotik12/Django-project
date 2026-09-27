"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import { bikeService } from "@/features/bikes/services/bike.service";
import {
  Bike,
  FuelType,
} from "@/features/bikes/types/bike.types";

export default function EditBikePage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [bike, setBike] = useState<Bike | null>(null);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fuelType, setFuelType] = useState<FuelType>("Petrol");
  const [tankCapacity, setTankCapacity] = useState(0);
  const [currentOdometer, setCurrentOdometer] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBike = async () => {
      try {
        const data = await bikeService.getBike(id);

        setBike(data);

        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setRegistrationNumber(data.registration_number);
        setFuelType(data.fuel_type);
        setTankCapacity(Number(data.tank_capacity));
        setCurrentOdometer(data.current_odometer);
      } catch (err) {
        console.error(err);
        setError("Failed to load bike.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBike();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await bikeService.updateBike(id, {
        brand,
        model,
        year,
        registration_number: registrationNumber,
        fuel_type: fuelType,
        tank_capacity: tankCapacity,
        current_odometer: currentOdometer,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to update bike.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading bike...</p>
        </main>
      </ProtectedRoute>
    );
  }

  if (!bike) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">
            {error || "Bike not found."}
          </p>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-6">
            ✏️ Edit Bike
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
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
              onChange={(e) =>
                setYear(Number(e.target.value))
              }
              required
            />

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Registration Number"
              value={registrationNumber}
              onChange={(e) =>
                setRegistrationNumber(e.target.value)
              }
              required
            />

            <select
              className="w-full border rounded-lg p-3"
              value={fuelType}
              onChange={(e) =>
                setFuelType(e.target.value as FuelType)
              }
            >
              <option value="Petrol">Petrol</option>
              <option value="Octane">Octane</option>
              <option value="Diesel">Diesel</option>
            </select>

            <input
              type="number"
              step="0.01"
              className="w-full border rounded-lg p-3"
              placeholder="Tank Capacity"
              value={tankCapacity}
              onChange={(e) =>
                setTankCapacity(Number(e.target.value))
              }
              required
            />

            <input
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Current Odometer"
              value={currentOdometer}
              onChange={(e) =>
                setCurrentOdometer(Number(e.target.value))
              }
              required
            />

            {error && (
              <p className="text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg p-3"
            >
              {saving ? "Updating..." : "Update Bike"}
            </button>

          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
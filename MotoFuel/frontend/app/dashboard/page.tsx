"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useBikes } from "@/features/bikes/hooks/useBikes";
import { bikeService } from "@/features/bikes/services/bike.service";

export default function DashboardPage() {
  const router = useRouter();

  const {
    bikes,
    loading,
    error,
    refreshBikes,
  } = useBikes();

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bike?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await bikeService.deleteBike(id);

      await refreshBikes();
    } catch (error) {
      console.error(error);
      alert("Failed to delete bike.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              🚗 My Bikes
            </h1>

            <button
              onClick={() =>
                router.push("/dashboard/bikes/create")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              + Add Bike
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-gray-600">
              Loading bikes...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            bikes.length === 0 && (
              <p className="text-gray-600">
                No bikes found. Add your first bike.
              </p>
            )}

          {/* Bike List */}
          <div className="space-y-4">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-white rounded-lg shadow p-5"
              >
                <h2 className="text-xl font-semibold">
                  {bike.brand} {bike.model}
                </h2>

                <div className="mt-2 text-gray-700 space-y-1">
                  <p>
                    Year: {bike.year}
                  </p>

                  <p>
                    Fuel: {bike.fuel_type}
                  </p>

                  <p>
                    Registration:{" "}
                    {bike.registration_number}
                  </p>

                  <p>
                    Tank Capacity:{" "}
                    {bike.tank_capacity} L
                  </p>

                  <p>
                    Odometer:{" "}
                    {bike.current_odometer} km
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-5">

                  {/* Edit */}
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/bikes/${bike.id}/edit`
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(bike.id)
                    }
                    disabled={
                      deletingId === bike.id
                    }
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-lg"
                  >
                    {deletingId === bike.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </ProtectedRoute>
  );
}
export type FuelType = "Petrol" | "Octane" | "Diesel";

export interface Bike {
  id: number;
  user: number;

  brand: string;
  model: string;
  year: number;

  registration_number: string;
  fuel_type: FuelType;

  tank_capacity: string;
  current_odometer: number;

  created_at: string;
  updated_at: string;
}

export interface BikeCreateData {
  brand: string;
  model: string;
  year: number;

  registration_number: string;
  fuel_type: FuelType;

  tank_capacity: number;
  current_odometer: number;
}

export interface BikeUpdateData extends Partial<BikeCreateData> {}
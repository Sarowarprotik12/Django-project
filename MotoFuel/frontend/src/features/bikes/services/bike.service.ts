import api from "@/lib/api";
import {
  Bike,
  BikeCreateData,
  BikeUpdateData,
} from "../types/bike.types";

class BikeService {
  async getBikes(): Promise<Bike[]> {
    const response = await api.get("/bikes/");
    return response.data.data.results;
  }

  async getBike(id: number): Promise<Bike> {
    const response = await api.get(`/bikes/${id}/`);
    return response.data;
  }

  async createBike(data: BikeCreateData): Promise<Bike> {
    const response = await api.post("/bikes/", data);
    return response.data.data;
  }

  async updateBike(
    id: number,
    data: BikeUpdateData
  ): Promise<Bike> {
    const response = await api.put(`/bikes/${id}/`, data);
    return response.data.data;
  }

  async deleteBike(id: number): Promise<void> {
    await api.delete(`/bikes/${id}/`);
  }
}

export const bikeService = new BikeService();

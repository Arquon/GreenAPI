import axios from "axios";
import { config } from "@/shared/config";

export const httpService = axios.create({
   baseURL: config.apiUrl,
});

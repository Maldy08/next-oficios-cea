import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";


interface Options {
    baseUrl: string;
    params: Record<string, unknown>;
}

export class AxiosAdapter implements HttpAdapter {
    private axiosInstance: AxiosInstance;

    constructor(options: Options) {
        this.axiosInstance = axios.create({
            baseURL: options.baseUrl,
            params: options.params
        });
    }
    async put<T>(url: string, data: Record<string, unknown>, options?: Record<string, unknown>): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(url, data, options);
            return response.data;
        }
        catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
    }
    delete<T>(url: string, options?: Record<string, unknown>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async post<T>(url: string, data: any, options?: Record<string, unknown>): Promise<T> {

        try {
            const response = await this.axiosInstance.post<T>(url, data, options,);
            return response.data;
        }
        catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }

    }

    async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
        try {
            const { data } = await this.axiosInstance.get<T>(url, options);
            return data;
        }
        catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
    }

}
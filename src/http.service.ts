import axios, { AxiosResponse } from "axios";

export async function get(url: string): Promise<AxiosResponse<any>> {
  return await axios(url);
}

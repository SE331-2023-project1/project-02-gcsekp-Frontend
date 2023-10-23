import type { AdviserItem } from "@/type";
import type { AxiosResponse } from "axios";
import apiClient from "./AxiosClient";

export default {
  getAdvisers(
    perPage: number,
    page: number
  ): Promise<AxiosResponse<AdviserItem[]>> {
    return apiClient.get<AdviserItem[]>(
      "/advisors?_limit=" + perPage + "&_page=" + page
    );
  },
  getAdviserById(id: number): Promise<AxiosResponse<AdviserItem>> {
    return apiClient.get<AdviserItem>("advisors/" + id.toString());
  },
  saveAdviser(advisers: AdviserItem): Promise<AxiosResponse<AdviserItem>> {
    return apiClient.post<AdviserItem>("/advisors", advisers);
  },
  getAdviserBy(): Promise<AxiosResponse<AdviserItem[]>> {
    return apiClient.get<AdviserItem[]>("/advisors");
  },
  updateAdvisorById(
    id: any,
    adviser: any
  ): Promise<AxiosResponse<AdviserItem>> {
    return apiClient.put<AdviserItem>("/advisors/" + id.toString(), adviser);
  },
  getAdvisorByKeyword(keyword: string, perPage: number, page: number):Promise<AxiosResponse<AdviserItem[]>> {
    return apiClient.get<AdviserItem[]>('/advisors?title=' +keyword +'&_limit='+ perPage+'&_page=' +page)
  },
};

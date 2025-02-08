import axiosConfigChat from "../base";
import { IToken, IResponseModels, IResponseMessage } from "@/interfaces";
import { AxiosResponse } from "axios";

export const getToken = async (): Promise<IToken> => {
  try {
    const response: AxiosResponse<IToken> = await axiosConfigChat.post<IToken>("get_token", {});
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    throw error;
  }
};

export const getModels = async (_token: string): Promise<IResponseModels> => {
  try {
    const response: AxiosResponse<IResponseModels> = await axiosConfigChat.post("get_models", {
      access_token: _token,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    throw error;
  }
};

export const sendRequestToChat = async (_token: string, _requestText: string): Promise<IResponseMessage> => {
  try {
    const response: AxiosResponse<IResponseMessage> = await axiosConfigChat.post(
      "https://salesgear.ru/test/sbergpt/server_back",
      {
        access_token: _token,
        request: _requestText,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

import { isAxiosError } from "axios";
import { api } from "../config/axios";
import { ProfileForm, User } from "../types/";

export async function getUser() {

  try {
    const { data } = await api<User>("/user");
    return data;
  } catch (error) {
    // Read messages from backend
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function updateProfile( formData: ProfileForm) {

  try {
    const { data } = await api.patch<User>("/user", formData);
    return data;
  } catch (error) {
    // Read messages from backend
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function uploadImage(file: File) {
  try{
    console.log('Desde uploadImage');
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
import API from "./api";
import type {LoginPayLoad, RegisterPayLoad} from "../types/auth";


export const loginRequest = async (data:LoginPayLoad)=> {
  const response = await API.post("/auth/login",data)
  return response.data
}

export const registerRequest = async(data:RegisterPayLoad)=>{
  const response = await API.post("/auth/register", data)
  return response.data
} 
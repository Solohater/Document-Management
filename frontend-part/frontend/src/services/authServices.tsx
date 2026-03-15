import type { LoginPayLoad, RegisterPayLoad } from "../types/auth";
import { loginRequest, registerRequest } from "../api/authApi";

export const loginInput = async(data:LoginPayLoad) => {
  const res = await loginRequest(data)
  
  localStorage.setItem("token", res.token)
  localStorage.setItem("role", res.user.role)
  localStorage.setItem("userId", res.user.id)

  return res.user
} 

export const registerInput = async(data:RegisterPayLoad) => {
  const res = await registerRequest(data)

  return res
}
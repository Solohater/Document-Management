export type Role = "USER" | "REVIEWER"

export type LoginPayLoad = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  role: "USER" | "REVIEWER"
}

export type RegisterPayLoad = {
  name: string
  email: string
  password: string
  role:Role
}
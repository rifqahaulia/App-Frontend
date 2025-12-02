export interface User {
  id: string
  name: string
  email: string
  role?: string
}

export interface AuthCredentials {
  username: string
  password: string
}

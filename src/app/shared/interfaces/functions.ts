import { User } from "@angular/fire/auth";

export interface FunctionsResponse extends Error {
  ok: boolean,
  status: number,
  statusText: string,
  message: string
}

export interface UpdateProfileResponse extends FunctionsResponse {
  user: User | null,
  userComments: number | null
}

import { User } from '@angular/fire/auth';

export interface FunctionsResponse extends Error {
  ok: boolean,
  status: number,
  statusText: string,
  message: string
}

export interface UpdateProfileRequest {
  displayName?: string | null,
  photoURL?: string | null,
}
export interface UpdateProfileResponse extends FunctionsResponse {
  user: User | null,
  userComments: number | null
}

export interface AdminUpdateUserRequest {
  user?: string,
}
export interface AdminUpdateUserResponse extends FunctionsResponse {}

export interface AdminUpdateClaimsRequest {
  user?: string,
  admin: boolean,
}
export interface AdminUpdateClaimsResponse extends FunctionsResponse {}

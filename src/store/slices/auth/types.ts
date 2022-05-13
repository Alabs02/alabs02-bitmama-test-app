export interface AuthUser {
  id: number | string;
  email: string;
  session_id: string;
  is_active: boolean;
  is_logged_in: boolean;
}

export interface AuthState {
  users: Array<AuthUser>;
  current_user: AuthUser;
}

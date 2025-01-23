export type AdminType = {
  id: number;
  email: string;
};

export type AdminSignUpType = {
  username: string;
  email: string;
  password: string;
};
export type AdminLoginType = Omit<AdminSignUpType, 'username'>;
export type AdminStateType =
  | { status: 'pending' }
  | { status: 'guest' }
  | ({ status: 'logged' } & AdminType);

export type AdminState = { accessToken: string; user: AdminStateType };

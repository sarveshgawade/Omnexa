export type RegisterFormDataType = {
  countryIso: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export  type LoginFormDataType = {
    email: string,
    password: string
};

export  type UpdateProfileDataType = {
    fullName: string;
    email: string;
    phoneNumber: string;
};

export type userProfileType = {
  _id: string
  fullName: string
  email: string
  role: 'USER' | 'ADMIN'
  phoneNumber: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type ChangePasswordDataType = {
  oldPassword : string ;
  newPassword : string ;
}

export type ResetPasswordDataType = {
  password: string;
  token : string ;
}

  export type ForgotPasswordDataType = {
    email : string
  }
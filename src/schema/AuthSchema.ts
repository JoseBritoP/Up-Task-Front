import z from 'zod';

const name = z.string().min(3,{message:'The name is so short'}).max(10,{message:'The name is so long'});
const email= z.string().email({message:'Email invalid'});
const password = z.string().min(3,{message:'The password is so short'}).max(20,{message:'The password is so long'});
const repeatPassword = z.string().min(3,{message:'The repeat password is so short'}).max(20,{message:'The repeat password is so long'});

export const AuthSchema = z.object({
  name,
  email,
  password,
  repeatPassword
})

export const AuthenticateSchema = z.object({
  _id:z.string(),
  name,
  email
})

export const ProfileNewPassword = z.object({
  currentPassword:password,
  repeatPassword,
  newPassword:password
})

export type ProfileNewPasswordFormData = z.infer<typeof ProfileNewPassword>

export type Auth = z.infer<typeof AuthSchema>
export type LoginForm = Pick<Auth,'email'| 'password'>
export type ResetPassword = Pick<Auth,'password'| 'repeatPassword'>
export type AuthenticateType = z.infer<typeof AuthenticateSchema>
export type ProfileForm = Pick<AuthenticateType, 'name'| 'email'>
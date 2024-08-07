import {z} from 'zod'
export const usernameValidation=z.string()
.min(2,"Username must be at least 2 character")
.max(20,"Username must be less then 20 character")

export const signUpValidation=z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalide email"}),
    password:z.string().min(6,"Password must be at least 6 character").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
      )
})
export const verifySchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

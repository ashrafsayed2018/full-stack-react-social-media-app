import * as z from "zod"

export const signUpValidation = z.object({
    name: z.string().min(2, { 
        message: "Name must be at least 2 characters long"
        }),
    email: z.string().email({
        message: "Email must be a valid email"
        }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })


  export const signInValidation = z.object({

    email: z.string().email({
        message: "Email must be a valid email"
        }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
  
  })
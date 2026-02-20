import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email({ message: "Enter a valid email" })
})

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>
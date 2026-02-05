import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z.email({ message: "Enter a valid email" })
})

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>
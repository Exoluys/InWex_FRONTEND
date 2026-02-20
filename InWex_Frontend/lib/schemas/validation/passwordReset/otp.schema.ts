import z from "zod";

export const otpSchema = z.object({
    otp: z.string().length(6, "Please enter the full 6-digit code").regex(/^\d+$/, "OTP must contain only digits"),
})

export type OtpType = z.infer<typeof otpSchema>
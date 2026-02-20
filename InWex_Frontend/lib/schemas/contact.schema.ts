import z from "zod";

export const contactSchema = z.object({
    "name": z.string().min(2, "Name is required"),
    "email": z.email("Invalid email"),
    "message": z.string()
})

export type ContactValues = z.infer<typeof contactSchema>
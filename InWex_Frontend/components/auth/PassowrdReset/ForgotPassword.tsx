"use client"

import { ForgotPasswordFormType, forgotPasswordSchema } from "@/lib/schemas/validation/passwordReset/forgot-password.schema"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useRouter } from "next/navigation"

const ForgotPassword = () => {
    const router = useRouter()

    const form = useForm<ForgotPasswordFormType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            "email": ""
        }
    })

    const onSubmit = async (data: ForgotPasswordFormType) => {
        console.log(data)
        router.push("/auth/otp")
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <Card className="w-120 border-none bg-transparent">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl">Forgot your password?</CardTitle>
                        <p className="text-s text-muted-foreground">
                            No worries — enter your email and we&#39;ll send you a reset link.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5" noValidate>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" autoComplete="email" placeholder="your@gmail.com" {...field} className="py-5 pl-4 border-none" />
                                            </FormControl>
                                            <FormMessage className="transition-opacity duration-200" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                    className='w-40 mt-3 self-center cursor-pointer'
                                >
                                    {form.formState.isSubmitting ? "Sending" : "Send OTP"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ForgotPassword
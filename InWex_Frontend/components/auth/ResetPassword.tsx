"use client"

import { ResetPasswordFormType, resetPasswordSchema } from "@/lib/schemas/validation/reset-password.schema"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const ResetPassword = () => {
    const form = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            "email": ""
        }
    })

    const onSubmit = async (data: ResetPasswordFormType) => {
        console.log(data)
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
                                                <Input type="email" autoComplete="email" placeholder="your@gmail.com" {...field} className="pl-4 border-none" />
                                            </FormControl>
                                            <FormMessage className="transition-opacity duration-200" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                    className='w-40 mt-2 self-center cursor-pointer'
                                >
                                    {form.formState.isSubmitting ? "Sending" : "Send Reset Link"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ResetPassword
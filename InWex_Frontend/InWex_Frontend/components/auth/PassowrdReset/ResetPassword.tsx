"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordSchema, ResetPasswordType } from "@/lib/schemas/validation/passwordReset/reset-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const ResetPassword = () => {
    const router = useRouter()

    const form = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = async (data: ResetPasswordType) => {
        console.log(data)
        router.push("/auth")
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <Card className="w-120 border-none bg-transparent">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl">Set New Password</CardTitle>
                        <p className="text-s text-muted-foreground">
                            Please enter your new password below.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5" noValidate>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" autoComplete="new-password" placeholder="••••••••" {...field} className="py-5 pl-4 border-none" />
                                            </FormControl>
                                            <FormMessage className="transition-opacity duration-200" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" autoComplete="password" placeholder="••••••••" {...field} className="py-5 pl-4 border-none" />
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
                                    {form.formState.isSubmitting ? "Changing" : "Change"}
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
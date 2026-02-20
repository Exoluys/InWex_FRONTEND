"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { otpSchema, OtpType, } from "@/lib/schemas/validation/passwordReset/otp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const OtpForm = () => {
    const router = useRouter()

    const form = useForm<OtpType>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        }
    });

    const onSubmit = (data: OtpType) => {
        console.log(data)
        router.push("/auth/reset-password")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-120 border-none bg-transparent">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl">Verify your login</CardTitle>
                    <CardDescription className="text-s text-muted-foreground">
                        Enter the verification code we sent to your email address
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-4 w-full">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col items-center space-y-5"
                                noValidate
                            >
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center">
                                            <div className="flex items-center justify-between w-full">
                                                <FormLabel>Verification Code</FormLabel>
                                                <Button variant="ghost" type="button" className="h-6 p-4 text-xs gap-1">
                                                    <RefreshCwIcon className="w-3 h-3" />
                                                    Resend Code
                                                </Button>
                                            </div>
                                            <FormControl>
                                                <InputOTP maxLength={6} id="otp-verification" required {...field}>
                                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator className="mx-2" />
                                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage className="transition-opacity duration-200" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={form.formState.isSubmitting} className="w-40 cursor-pointer">
                                    {form.formState.isSubmitting ? "Verifying" : "Verify"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OtpForm;

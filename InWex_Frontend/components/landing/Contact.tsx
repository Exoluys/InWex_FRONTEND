import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { contactSchema, ContactValues } from "@/lib/schemas/validation/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Contact = () => {
    const form = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            "name": "",
            "email": "",
            "message": ""
        },
    })

    const formElements: {
        name: keyof ContactValues,
        type: string,
        placeholder: string,
        autocomplete: string
    }[] = [
            {
                name: "name",
                type: "text",
                placeholder: "ENTER YOUR NAME*",
                autocomplete: "name",
            },
            {
                name: "email",
                type: "email",
                placeholder: "ENTER YOUR EMAIL*",
                autocomplete: "email",
            },
        ]

    const onSubmit = async (data: ContactValues) => {
        try {
            await api.post("/accounts/support", data)
            toast.success("Request Sent")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data?.message)
                toast.error(
                    error.response?.data?.message ||
                    "Invalid Request"
                )
            }
            else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className="mx-auto max-w-4xl px-6 gap-20 w-full py-24">
            {/* Section Header */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Have questions about our warehouse management system? We&#39;d love to
                    hear from you.
                </p>
            </div>

            {/* Contact Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                    {formElements.map(({ name, type, placeholder, autocomplete }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={type}
                                            placeholder={placeholder}
                                            autoComplete={autocomplete}
                                            className="w-full py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-gray-400 placeholder:text-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <FormField
                        control={form.control}
                        name="message"
                        render={(({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        placeholder="YOUR MESSAGE*"
                                        className="w-full min-h-30 py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent! rounded-none resize-none focus:outline-none placeholder:text-gray-400 placeholder:text-xs"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ))}
                    />
                    <div className="flex items-center justify-center mt-4">
                        <Button
                            variant="ghost"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="px-8 py-2 text-sm font-semibold border-0 border-l-2 border-r-2 border-white/60 rounded-none hover:bg-transparent! tracking-wider transition-colors cursor-pointer"
                        >
                            {form.formState.isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Contact
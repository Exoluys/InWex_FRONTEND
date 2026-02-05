import ResetPassword from "@/components/auth/ResetPassword"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const page = () => {
    return (
        <>
            <Button className="fixed top-6 left-6 z-50" asChild>
                <Link
                    href="/auth"
                    className="flex items-center gap-2 text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
            </Button>

            <ResetPassword />

        </>
    )
}

export default page
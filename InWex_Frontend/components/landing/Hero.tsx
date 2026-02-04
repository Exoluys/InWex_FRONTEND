import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

const Hero = () => {
    return (
        <>
            <Image
                src="/landingPage.jpg"
                alt="Landing Page Background"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-20 flex h-full items-center">
                <div className="mx-auto max-w-6xl px-6 pb-6 text-white">
                    <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                        Smart Warehouse <br />
                        Management System
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-gray-200">
                        Track inventory in real-time, optimize storage, analyze product
                        movement, and manage roles securely — all from one powerful
                        dashboard.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <Button size="lg" className="px-8">
                            <Link href="/auth?signup=true">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
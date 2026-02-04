import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Navbar = () => {
    return (
        <header className="h-20 w-full bg-black/60 backdrop-blur-sm">
            <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => {
                        document.getElementById("home")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }}
                >
                    <Image src="/logo/InwexUpdatedTransparent.png" alt="InWex Logo" width={80} height={80} />
                </div>

                {/* Navigation Links */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    document.getElementById("features")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                Features
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    document.getElementById("about")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                About
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    document.getElementById("contact")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                Contact
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button variant="ghost" asChild>
                                <Link href="/auth" className="px-4 py-2">Log in</Link>
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80">Sign up</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-48 gap-1">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/auth/org/signup" className="p-3">As Business</Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="/auth?signup=true" className="p-3">As Employee</Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}

export default Navbar
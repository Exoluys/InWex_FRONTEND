"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const navItems = [
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
]

const Navbar = () => {
    const router = useRouter()
    const { user, logout } = useAuth()
    const isLoggedIn = !!user

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    const handleDashboard = () => {
        router.push("/dashboard")
    }

    return (
        <header className="h-20 w-full bg-black/60 backdrop-blur-sm">
            <div className="h-full w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => scrollTo("home")}
                >
                    <Image src="/logo/InwexUpdatedTransparent.png" alt="InWex Logo" width={80} height={80} />
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {navItems.map(({ label, id }) => (
                            <NavigationMenuItem key={id}>
                                <Button variant="ghost" onClick={() => scrollTo(id)}>
                                    {label}
                                </Button>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden md:flex w-50 justify-end">
                    <NavigationMenu>
                        {!isLoggedIn ? (
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Button variant="ghost" asChild>
                                        <Link href="/auth" className="px-4 py-2">Log in</Link>
                                    </Button>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                        Sign up
                                    </NavigationMenuTrigger>
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
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-10 w-10 cursor-pointer">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>
                                            {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="p-0 w-72">
                                    <Card className="border-none shadow-none">
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>
                                                        {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{user.fullname}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <Separator />
                                        <CardContent>
                                            <Button variant="ghost" onClick={handleDashboard} className="w-full justify-start">
                                                Dashboard
                                            </Button>
                                            <Button variant="ghost" onClick={logout} className="w-full justify-start">
                                                Log Out
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </NavigationMenu>
                </div>

                <div className="flex md:hidden items-center gap-3">
                    {isLoggedIn && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                                {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu size={22} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64 flex flex-col gap-6 pt-12">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            {!isLoggedIn ? (
                                <div className="flex flex-col gap-1">
                                    <Button variant="ghost" className="justify-start" asChild>
                                        <Link href="/auth">Log in</Link>
                                    </Button>
                                    <Button variant="ghost" className="justify-start" asChild>
                                        <Link href="/auth/org/signup">Sign up as Business</Link>
                                    </Button>
                                    <Button variant="ghost" className="justify-start" asChild>
                                        <Link href="/auth?signup=true">Sign up as Employee</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <div className="px-3 pb-2">
                                        <p className="text-sm font-medium truncate">{user.fullname}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-1">
                                        {navItems.map(({ label, id }) => (
                                            <Button
                                                key={id}
                                                variant="ghost"
                                                className="justify-start"
                                                onClick={() => scrollTo(id)}
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                    </div>
                                    <Separator />
                                    <Button variant="ghost" className="justify-start" onClick={handleDashboard}>
                                        Dashboard
                                    </Button>
                                    <Button variant="ghost" className="justify-start" onClick={logout}>
                                        Log Out
                                    </Button>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Navbar
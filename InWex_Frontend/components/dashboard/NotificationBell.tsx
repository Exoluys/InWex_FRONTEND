import { Bell, CheckCheck } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "../ui/card"
import { useEffect, useState } from "react"
import ws from "@/lib/socket"
import { api } from "@/lib/api"

const NotificationBell = () => {
    const [notifications, setNotifications] = useState<{ id: number, title: string, message: string, created_at: string, is_read: boolean }[]>([])
    const unreadCount = notifications.filter((n) => !n.is_read).length

    useEffect(() => {
        api.get(`/network/notifications`)
            .then((res) => setNotifications(res.data.reverse()))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setNotifications((prev) => [data, ...prev])
            new Audio("/sound/notification.mp3").play().catch(() => { })
        }
    }, [])

    const markAllRead = () => {
        api.get("/network/notifications?is_read=true")
            .then(() => setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true }))))
            .catch((err) => console.log(err))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="p-0">
                <Card className="w-100 border-none shadow-none pb-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <p className="font-semibold text-m">Notifications</p>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
                            >
                                <CheckCheck className="h-3 w-3" />
                                Mark all read
                            </button>
                        )}
                    </CardHeader>

                    <CardContent className="p-0 max-h-72 overflow-y-auto border-t">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-6">
                                No notifications
                            </p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`flex items-start gap-3 px-4 py-3 border-b last:border-0 ${!n.is_read ? "bg-muted/50" : ""}`}
                                >
                                    <div className="flex-1">
                                        <p className={`text-sm ${!n.is_read ? "font-medium" : "text-muted-foreground"}`}>
                                            {n.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{new Date(n.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                    </div>
                                    {!n.is_read && (
                                        <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                    )}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationBell
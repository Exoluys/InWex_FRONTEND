"use client"

import { useEffect } from "react"

export default function ScrollOnRefresh() {
    useEffect(() => {
        const lastSection = sessionStorage.getItem("lastScrollPosition")

        window.scrollTo(0, 0)

        if (!lastSection) return

        if (lastSection === "home") return

        const target = document.getElementById(lastSection)
        if (!target) return

        setTimeout(() => {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 300)
    }, [])

    return null
}
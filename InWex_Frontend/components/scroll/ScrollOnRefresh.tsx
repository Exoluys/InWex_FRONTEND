"use client"

import { useEffect } from "react"

export default function ScrollOnRefresh() {
    useEffect(() => {
        const lastSection = sessionStorage.getItem("lastScrollPosition")

        if (!lastSection || lastSection === "home") return

        const target = document.getElementById(lastSection)
        if (!target) return

        window.scrollTo(0, 0)

        setTimeout(() => {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 400)
    }, [])

    return null
}
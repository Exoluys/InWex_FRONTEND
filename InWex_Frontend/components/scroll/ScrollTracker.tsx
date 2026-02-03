"use client"

import { useEffect } from "react"

export default function ScrollTracker() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        sessionStorage.setItem("lastScrollPosition", entry.target.id)
                    }
                })
            },
            { threshold: 0.6 }
        )

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    return null
}
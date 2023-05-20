import { useState, useEffect, useRef } from 'react';

export default function useScrolledDown() {
    const [lastScrollY, setLastScrollY] = useState(0)
    const [scrolledDown, setScrolledDown] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", handleNavScroll)
        return () => window.removeEventListener("scroll", handleNavScroll)
    }, [lastScrollY])

    const handleNavScroll = () => {
        if (typeof window !== "undefined") {
            const currentScrollPos = window.pageYOffset
            if (currentScrollPos > lastScrollY && currentScrollPos > 120) {
                setScrolledDown(true)  // if scroll down hide the navbar
            } else {
                setScrolledDown(false)   // if scroll up show the navbar
            }
            setLastScrollY(currentScrollPos)
        }
    }

    return scrolledDown
}


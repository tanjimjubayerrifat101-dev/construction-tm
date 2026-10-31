"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FadeUpProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    duration?: number;
    delay?: number;
    y?: number | string;
    stagger?: number;
    threshold?: string; // e.g. "top 85%"
}

/**
 * FadeUp animates any container/children from bottom to top with smooth opacity & easing on scroll into view.
 */
export default function FadeUp({
    children,
    className = "",
    as: Component = "div",
    duration = 0.9,
    delay = 0,
    y = 50,
    stagger = 0,
    threshold = "top 85%",
}: FadeUpProps) {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0,
                    y: y,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: duration,
                    delay: delay,
                    stagger: stagger,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: threshold,
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        {
            scope: containerRef,
            dependencies: [duration, delay, y, stagger, threshold],
            revertOnUpdate: true,
        }
    );

    return (
        <Component ref={containerRef} className={className}>
            {children}
        </Component>
    );
}

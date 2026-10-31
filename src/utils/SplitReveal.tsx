"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitRevealProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    stagger?: number;
    duration?: number;
    delay?: number;
    y?: number | string;
}

/**
 * SplitReveal traverses child text nodes and spans, splitting words
 * into inline-block masked wrappers for a smooth staggered reveal on scroll.
 * Handles nested elements like `<br />` and `<span className="...">...</span>`.
 */
export default function SplitReveal({
    children,
    className = "",
    as: Component = "div",
    stagger = 0.05,
    duration = 0.9,
    delay = 0,
    y = "110%",
}: SplitRevealProps) {
    const containerRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const words = containerRef.current.querySelectorAll(".split-reveal-word");
            if (!words.length) return;

            gsap.fromTo(
                words,
                {
                    y: y,
                    opacity: 0,
                    rotateZ: 2,
                },
                {
                    y: "0%",
                    opacity: 1,
                    rotateZ: 0,
                    duration: duration,
                    delay: delay,
                    stagger: stagger,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef, dependencies: [children] }
    );

    // Recursively parse React children into word-by-word masked spans
    const renderSplitted = (nodes: React.ReactNode): React.ReactNode => {
        return React.Children.map(nodes, (child, idx) => {
            if (typeof child === "string" || typeof child === "number") {
                const words = String(child).split(/(\s+)/);
                return words.map((token, i) => {
                    if (token === "") return null;
                    if (/^\s+$/.test(token)) {
                        return " ";
                    }
                    return (
                        <span
                            key={`${idx}-${i}`}
                            className="inline-block overflow-hidden align-top"
                        >
                            <span className="split-reveal-word inline-block will-change-transform">
                                {token}
                            </span>
                        </span>
                    );
                });
            }

            if (React.isValidElement(child)) {
                // If it's a self-closing element like <br />
                if (child.type === "br") {
                    return child;
                }

                const element = child as React.ReactElement<{
                    children?: React.ReactNode;
                    className?: string;
                }>;

                return React.cloneElement(
                    element,
                    {
                        key: idx,
                        className: element.props.className || undefined,
                    },
                    renderSplitted(element.props.children)
                );
            }

            return child;
        });
    };

    return (
        <Component ref={containerRef} className={className}>
            {renderSplitted(children)}
        </Component>
    );
}

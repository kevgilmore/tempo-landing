import React, { useState, useRef, useEffect } from "react";
import DotGrid from "./DotGrid";
import { Button } from "@/components/ui/button";
import { ChevronDown, Monitor } from "lucide-react";
import SplitText from "./SplitText";

const Hero = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleScrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <section className="relative w-full bg-[#171717]">
            {/* Background DotGrid - confined to the top viewport area */}
            <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
                <DotGrid
                    dotSize={10}
                    gap={15}
                    baseColor="#2e2b87"
                    activeColor="#2e2b87"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            {/* Hero Content Section - Exactly one viewport height */}
            <div className="relative z-10 w-full min-h-screen md:h-screen flex flex-col items-center justify-center md:justify-start pt-20 md:pt-[15vh] lg:pt-[18vh] container mx-auto px-4 text-center pb-12 md:pb-0">
                <SplitText
                    text="Focus with Tempo"
                    tag="h1"
                    className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 md:mb-6 block"
                    delay={50}
                    duration={0.8}
                    threshold={0.1}
                    textAlign="center"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                />
                <p className="text-base md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed">
                    The calm, opinionated time tracker for makers. Pomodoro
                    simplicity with just enough structure to review your day,
                    week, and month.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                    {/* Split Download Button */}
                    <div
                        className="relative flex items-stretch h-14 z-50"
                        ref={dropdownRef}
                    >
                        <Button
                            size="lg"
                            className="bg-[#2e2b87] hover:bg-[#3a37a8] text-white px-8 h-full text-lg rounded-l-full rounded-r-none border-none transition-all shadow-lg shadow-black/20 flex items-center gap-2"
                        >
                            <Monitor className="w-5 h-5" />
                            Download for Windows
                        </Button>
                        <div className="w-[1px] bg-white/10 h-full"></div>
                        <Button
                            size="lg"
                            className="bg-[#2e2b87] hover:bg-[#3a37a8] text-white px-3 h-full rounded-r-full rounded-l-none border-none transition-all shadow-lg shadow-black/20"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </Button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full min-w-[220px] bg-[#242424] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl animate-in fade-in slide-in-from-top-2">
                                <button className="w-full px-6 py-4 text-left hover:bg-[#2e2b87] text-white text-sm border-b border-white/5 transition-colors flex flex-col gap-1">
                                    <span className="font-bold">
                                        Windows (x64)
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Standard 64-bit
                                    </span>
                                </button>
                                <button className="w-full px-6 py-4 text-left hover:bg-[#2e2b87] text-white text-sm transition-colors flex flex-col gap-1">
                                    <span className="font-bold">
                                        Windows (ARM64)
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        For Surface & ARM PCs
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="bg-[#242424] hover:bg-[#333333] px-10 h-14 text-lg rounded-full border-slate-700 text-white transition-all hover:text-white"
                    >
                        <a href="#features" onClick={handleScrollToFeatures}>
                            View Features
                        </a>
                    </Button>
                </div>

                {/* Dashboard Image - Positioned exactly on the fold line (bottom of screen) */}
                <div className="relative mt-6 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-5xl px-4 z-20 translate-y-0 md:translate-y-1/2">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(46,43,135,0.4)] bg-[#171717]">
                        <img
                            src="/hero-dashboard.png"
                            alt="Tempo Dashboard"
                            className="w-full h-auto block"
                        />
                    </div>
                </div>
            </div>

            {/* Spacer to allow the rest of the image to be scrolled into view */}
            <div className="h-0 md:h-[50vh] lg:h-[55vh] w-full pointer-events-none"></div>
        </section>
    );
};

export default Hero;

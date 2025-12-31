import { useState, useRef, useEffect } from "react";
import Hero from "./components/Hero";
import SpotlightCard from "./components/SpotlightCard";
import SplitText from "./components/SplitText";
import RamComparison from "./components/RamComparison";
import { useLatestRelease } from "./hooks/useLatestRelease";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Zap,
    BarChart3,
    Clock,
    Monitor,
    ChevronDown,
} from "lucide-react";

const features = [
    {
        title: "Pomodoro or Simple Timer",
        description:
            "The classic focus technique, refined. No clutter, just the timer and your task.",
        icon: <Clock className="w-6 h-6 text-[#2e2b87]" />,
    },
    {
        title: "Just enough organisation",
        description:
            "A small amount of structure to stay intentional, nothing more.",
        icon: <Zap className="w-6 h-6 text-[#2e2b87]" />,
    },
    {
        title: "Straight Forward Analytics",
        description:
            "Daily, weekly and monthly reviews designed to help you understand your focus patterns.",
        icon: <BarChart3 className="w-6 h-6 text-[#2e2b87]" />,
    },
];

const benefits = [
    "Intentional focus, every session",
    "Clear separation of work",
    "Simple, repeatable focus habits",
    "Understand where time goes",
    "Fits your existing systems",
    "Progress without complexity",
];

const DownloadButton = ({ className = "" }: { className?: string }) => {
    const { x64Url, arm64Url } = useLatestRelease();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <div
            className={`relative flex items-stretch h-14 ${className}`}
            ref={dropdownRef}
        >
            <Button
                size="lg"
                asChild
                className="bg-[#2e2b87] hover:bg-[#3a37a8] text-white px-8 h-full text-lg rounded-l-full rounded-r-none border-none transition-all shadow-lg shadow-black/20 flex items-center gap-2"
            >
                <a href={x64Url}>
                    <Monitor className="w-5 h-5" />
                    Download for Windows
                </a>
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

            {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-full min-w-[220px] bg-[#242424] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                    <a
                        href={x64Url}
                        className="w-full px-6 py-4 text-left hover:bg-[#2e2b87] text-white text-sm border-b border-white/5 transition-colors flex flex-col gap-1"
                    >
                        <span className="font-bold">Windows (x64)</span>
                        <span className="text-xs text-slate-400">
                            Standard 64-bit
                        </span>
                    </a>
                    <a
                        href={arm64Url}
                        className="w-full px-6 py-4 text-left hover:bg-[#2e2b87] text-white text-sm transition-colors flex flex-col gap-1"
                    >
                        <span className="font-bold">Windows (ARM64)</span>
                        <span className="text-xs text-slate-400">
                            For Surface & ARM PCs
                        </span>
                    </a>
                </div>
            )}
        </div>
    );
};

function App() {
    return (
        <main className="bg-[#171717] min-h-screen text-white">
            <Hero />

            {/* Features Section */}
            <section id="features" className="py-32 px-4 container mx-auto">
                <div className="text-center mb-20">
                    <SplitText
                        text="Designed for Focus."
                        tag="h2"
                        className="text-4xl md:text-5xl font-bold mb-6 block"
                        delay={40}
                        duration={0.8}
                        threshold={0.2}
                        textAlign="center"
                    />
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        Tempo sits in the sweet spot between basic timers and
                        complex automation.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, idx) => (
                        <SpotlightCard
                            key={idx}
                            spotlightColor="rgba(46, 43, 135, 0.2)"
                            className="bg-[#111] border-[#222]"
                        >
                            <div className="mb-6 bg-[#171717] w-12 h-12 flex items-center justify-center rounded-xl border border-white/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </SpotlightCard>
                    ))}
                </div>
            </section>

            <RamComparison />

            {/* Benefits / Why Tempo Section */}
            <section className="py-32 bg-[#1a1a1a] border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="mb-8 flex flex-col items-start">
                                <SplitText
                                    text="Less complexity,"
                                    tag="h2"
                                    className="text-4xl md:text-5xl font-bold block"
                                    delay={40}
                                    duration={0.8}
                                    textAlign="left"
                                />
                                <SplitText
                                    text="more intention."
                                    tag="h2"
                                    className="text-4xl md:text-5xl font-bold block text-[#2e2b87]"
                                    delay={40}
                                    duration={0.8}
                                    textAlign="left"
                                />
                            </div>
                            <p className="text-slate-400 text-xl mb-10 leading-relaxed">
                                Tempo is an opinionated time tracker for day
                                jobs, side projects, and everything in between.
                                It helps you stay intentional about your focus,
                                while fitting into the systems you already use.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-[#2e2b87]" />
                                        <span className="text-slate-300">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full aspect-video md:aspect-square relative rounded-3xl border border-white/10 overflow-hidden">
                            {/* Desktop background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('/desktop5.png')",
                                }}
                            />
                            {/* Dark overlay for readability */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <span className="text-6xl mb-4 block">
                                        🧘‍♂️
                                    </span>
                                    <h4 className="text-2xl font-bold text-white shadow-sm">
                                        Deliberately boring.
                                    </h4>
                                    <p className="text-slate-200 mt-2 font-medium">
                                        No notifications. No distractions. Just
                                        work.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA / Download Section */}
            <section className="py-32 container mx-auto px-4 text-center overflow-hidden">
                <SplitText
                    text="Ready to find your flow?"
                    tag="h2"
                    className="text-4xl md:text-6xl font-bold mb-8 block text-white"
                    delay={40}
                    duration={0.8}
                    ease="power4.out"
                    threshold={0.5}
                    rootMargin="-50px"
                    textAlign="center"
                    from={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                />
                <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
                    Download Tempo and start tracking your focus with intention.
                </p>
                <div className="flex justify-center">
                    <DownloadButton />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-4 border-t border-white/5">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img
                                    src="/logo.png"
                                    alt="Tempo Logo"
                                    className="w-8 h-8"
                                />
                                <span className="text-2xl font-bold tracking-tight">
                                    Tempo
                                </span>
                            </div>
                            <p className="text-slate-500 max-w-xs">
                                The calm, opinionated time tracker for makers
                                and hobbiests.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
                            <div>
                                <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">
                                    Product
                                </h5>
                                <ul className="space-y-2 text-slate-400">
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors"
                                        >
                                            Download
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors"
                                        >
                                            Releases
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">
                                    Legal
                                </h5>
                                <ul className="space-y-2 text-slate-400">
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors"
                                        >
                                            Privacy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors"
                                        >
                                            Terms
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">
                                    Connect
                                </h5>
                                <ul className="space-y-2 text-slate-400">
                                    <li>
                                        <a
                                            href="https://twitter.com/tempoappco"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:hello@tempoapp.co"
                                            className="hover:text-white transition-colors"
                                        >
                                            Email
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                        <p>
                            © {new Date().getFullYear()} tempoapp.co. All rights
                            reserved.
                        </p>
                        <p>Built for the focused.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}

export default App;

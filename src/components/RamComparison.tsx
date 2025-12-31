import SplitText from "./SplitText";
import SpotlightCard from "./SpotlightCard";
import { Zap } from "lucide-react";

const RamComparison = () => {
    const data = [
        { name: "Rize", ram: 300, display: "300MB+" },
        { name: "Toggl", ram: 200, display: "200MB+" },
        { name: "Clockify", ram: 100, display: "100MB+" },
        { name: "Tempo", ram: 6, display: "< 6MB", isTempo: true },
    ];

    const maxRam = 300;

    return (
        <section className="py-32 bg-[#171717] overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-left">
                        <SplitText
                            text="Blistering Fast."
                            tag="h2"
                            className="text-4xl md:text-5xl font-bold mb-2 block"
                            delay={40}
                            duration={0.8}
                            threshold={0.2}
                        />
                        <SplitText
                            text="Native Performance."
                            tag="h2"
                            className="text-4xl md:text-5xl font-bold mb-6 block text-[#2e2b87]"
                            delay={40}
                            duration={0.8}
                            threshold={0.2}
                        />
                        <p className="text-slate-400 text-xl max-w-xl leading-relaxed mt-8">
                            Most modern apps are built on Electron, consuming
                            hundreds of megabytes of memory just to idle.
                        </p>
                        <p className="text-slate-400 text-xl max-w-xl leading-relaxed mt-4">
                            Tempo is built with native performance in mind. It
                            uses less than{" "}
                            <span className="text-white font-bold">6MB</span> of
                            RAM, making it one of the lightest productivity
                            tools on your machine.
                        </p>
                    </div>

                    <div className="flex-1 w-full">
                        <SpotlightCard
                            spotlightColor="rgba(46, 43, 135, 0.2)"
                            className="bg-[#111] border-[#222] p-8 md:p-10 rounded-3xl"
                        >
                            <h3 className="text-xl font-bold mb-10 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-[#2e2b87]" />
                                RAM Usage Comparison
                            </h3>

                            <div className="space-y-10">
                                {data.map((item) => (
                                    <div key={item.name} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span
                                                className={`font-bold ${item.isTempo ? "text-white text-lg" : "text-slate-500"}`}
                                            >
                                                {item.name}
                                            </span>
                                            <span
                                                className={`font-mono text-sm ${item.isTempo ? "text-[#4d49d6]" : "text-slate-600"}`}
                                            >
                                                {item.display}
                                            </span>
                                        </div>
                                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                                    item.isTempo
                                                        ? "bg-[#2e2b87] shadow-[0_0_20px_rgba(46,43,135,0.4)]"
                                                        : "bg-slate-800"
                                                }`}
                                                style={{
                                                    width: `${(item.ram / maxRam) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                                    * Approximate idle memory usage
                                </p>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RamComparison;

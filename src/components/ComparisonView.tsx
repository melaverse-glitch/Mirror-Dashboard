"use client";

import React from "react";
import Image from "next/image";
import { Check, RotateCcw } from "lucide-react";

interface ComparisonViewProps {
    originalImage: string;
    processedImage: string | null;
    onReset: () => void;
}

export default function ComparisonView({ originalImage, processedImage, onReset }: ComparisonViewProps) {
    return (
        <div className="w-full flex flex-col h-full animate-in slide-in-from-bottom duration-700">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                {/* Original */}
                <div className="kiosk-card flex flex-col relative group">
                    <div className="absolute top-6 left-6 z-10 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                        <span className="text-white font-bold tracking-wide uppercase">Original</span>
                    </div>
                    <div className="relative w-full h-full min-h-[400px]">
                        <Image
                            src={originalImage}
                            alt="Original"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Processed / Result */}
                <div className="kiosk-card flex flex-col relative overflow-hidden border-brand-primary/50 shadow-[0_0_50px_-12px_rgba(165,180,252,0.3)]">
                    <div className="absolute top-6 left-6 z-10 bg-brand-primary/90 text-brand-dark px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        <span className="tracking-wide uppercase">Clean Canvas</span>
                    </div>

                    <div className="relative w-full h-full min-h-[400px] bg-black/20">
                        {processedImage ? (
                            <Image
                                src={processedImage}
                                alt="Natural Skin"
                                fill
                                className="object-cover animate-in fade-in duration-1000"
                                priority
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
                                <div className="relative w-24 h-24">
                                    <div className="absolute inset-0 rounded-full border-4 border-muted/30"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-t-brand-primary animate-spin"></div>
                                </div>
                                <p className="text-2xl text-brand-primary font-medium animate-pulse">Analyzing skin tones...</p>
                                <p className="text-muted-foreground text-center max-w-xs">
                                    Removing makeup while preserving natural features and texture...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {processedImage && (
                <div className="flex justify-center pb-8">
                    <button
                        onClick={onReset}
                        className="kiosk-btn bg-white text-black hover:bg-slate-200 flex items-center gap-3"
                    >
                        <RotateCcw className="w-6 h-6" />
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
}

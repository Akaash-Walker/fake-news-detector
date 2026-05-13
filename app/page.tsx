"use client"
import Speedometer from "@/app/components/speedometer";
import {useEffect, useState} from "react";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [predictionValue, setPredictionValue] = useState(0.5);
    const [isLoading, setIsLoading] = useState(false);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await fetch(`${backendUrl}/send_link`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({url: inputValue})
                });
                const data = await result.json();
                console.log("prediction: ", data.prediction);
                setPredictionValue(data.prediction);
            } catch (err) {
                console.error("Error occurred: ", err);
            } finally {
                setIsLoading(false);
            }
        }

        try {
            new URL(inputValue);
            fetchData();
        } catch (err) {
            console.log("Invalid URL");
        }
    }, [inputValue])

    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center gap-6 md:gap-24">
                <p
                    className="w-full text-center text-6xl font-bold leading-tight">
                    Fake News Detector
                </p>
                <div className={"flex flex-col items-center gap-4"}>
                    <input
                        type={"text"}
                        className="input"
                        placeholder="Paste link to article here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {inputValue === "" ? null :
                        <p className={"animate-fade-in text-2xl font-bold"}>This article is most likely:</p>
                    }
                    {!inputValue.trim() ? null : (
                        isLoading ? (
                            <span className="loading loading-spinner loading-lg"></span>
                        ) : predictionValue === undefined ? (
                            <span
                                className="animate-fade-in text-3xl font-bold text-[#FF471A]">Error reading article.</span>
                        ) : predictionValue < 0.2 ? (
                            <span className="animate-fade-in text-5xl font-bold text-[#FF471A]">Fake</span>
                        ) : predictionValue < 0.4 ? (
                            <span className="animate-fade-in text-5xl font-bold text-[#FF471A]">Probably Fake</span>
                        ) : predictionValue < 0.6 ? (
                            <span className="animate-fade-in text-5xl font-bold text-gray-400">Unsure</span>
                        ) : predictionValue < 0.8 ? (
                            <span className="animate-fade-in text-5xl font-bold text-[#6AD72D]">Probably Real</span>
                        ) : (
                            <span className="animate-fade-in text-5xl font-bold text-[#6AD72D]">Real</span>
                        )
                    )}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            className="btn btn-xl btn-error bg-[#FF471A] border-[#FF471A] pointer-events-none">Fake
                        </button>
                        <div className="flex items-center justify-center scale-70 md:scale-100">
                            <Speedometer prediction={predictionValue}/>
                        </div>
                        <button
                            className="btn btn-xl btn-success bg-[#6AD72D] border-[#6AD72D] pointer-events-none">Real
                        </button>
                    </div>
                    <div className="md:hidden flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <Speedometer prediction={predictionValue}/>
                        </div>
                        <div className="flex items-center justify-center -mt-32 gap-x-16">
                            <button
                                className="btn btn-xl btn-error bg-[#FF471A] border-[#FF471A] pointer-events-none">Fake
                            </button>
                            <button
                                className="btn btn-xl btn-success bg-[#6AD72D] border-[#6AD72D] pointer-events-none">Real
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <span
                className="absolute bottom-1 md:bottom-4 left-0 right-0 mx-auto w-fit max-w-[92vw] px-2 text-center text-xs md:text-sm text-gray-500">                DISCLAIMER: This machine learning detector is not 100% accurate and was trained on a small dataset.
            </span>
        </div>
    );
}

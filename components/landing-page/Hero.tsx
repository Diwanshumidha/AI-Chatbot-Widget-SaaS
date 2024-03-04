"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import Lottie from "lottie-react";
import heroAnimation from "./hero-ai.json";
import { useSession } from "next-auth/react";

export const Hero = () => {
 const { data: session } = useSession();
  return (
    <div>
      <div
        className="w-full h-full relative isolate"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="absolute inset-x-0 md:-top-40 bottom-40 sm:bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative -z-10 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffa256] to-[#e08700] opacity-50 sm:left-[calc(90%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div
          className="flex lg:flex-row gap-16 lg:gap-4 flex-col max-w-7xl mx-auto px-6"
          style={{ pointerEvents: "all" }}
        >
          <div className="basis-1/2 lg:px-4 mt-20 lg:mt-36 md:px-16">
            <h1 className="font-semibold mb-2">No Coding Experience Needed</h1>
            <h2 className="font-extrabold text-5xl tracking-wide">
              AI Custom <span className="text-[#ff8303]">Chatbots</span>{" "}
              Generated in Minutes
            </h2>
            <p className="mt-6 text-gray-700 leading-7">
              Create custom trained AI chatbots for your website or app in
              minutes. No coding experience needed. Get started for free.
            </p>
            {!session ? (
              <Link href="/auth/register">
                <Button size="lg" className="mt-6">
                  Get Started
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="mt-6">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
          <div className="basis-1/2 px-8 justify-center flex flex-row gap-8 align-center items-center">
            <Lottie className="mt-[-30px]" animationData={heroAnimation} loop={true} autoPlay={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

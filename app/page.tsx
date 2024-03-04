import { Hero } from "@/components/landing-page/Hero";
import LogoClouds from "@/components/landing-page/logo-clouds";

export default function Home() {
  return (
    <main className="relative">
       <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
    <Hero />
    <LogoClouds />
    </main>
  );
}

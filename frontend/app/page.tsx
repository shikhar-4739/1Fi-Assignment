import Features from "@/pages/landingPage/Features";
import Hero from "@/pages/landingPage/Hero";
import Solution from "@/pages/landingPage/Solution";
import Integration from "@/pages/landingPage/Integration";
import Trust from "@/pages/landingPage/Trust";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <Navbar />

      <Hero />
      <Features />
      <Solution />
      <Integration />
      <Trust />
      <Footer />
    </div>
  );
}

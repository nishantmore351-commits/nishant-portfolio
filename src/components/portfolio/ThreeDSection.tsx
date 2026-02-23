import { useEffect, useRef } from "react";

export default function ThreeDSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, 1 - rect.top / window.innerHeight)
      );

      const mockup = el.querySelector(".mockup") as HTMLElement;
      if (mockup) {
        mockup.style.transform = `
          rotateX(${10 - scrollProgress * 20}deg)
          rotateY(${scrollProgress * 15}deg)
          translateY(${scrollProgress * -40}px)
        `;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(208,255,113,0.08), transparent 50%), #0f0f0f",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "#D0FF71" }}
          >
            Advanced Experiences
          </p>

          <h2
            className="font-black uppercase leading-none mb-8"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            3D LANDING
            <br />
            PAGES
          </h2>

          <p className="text-white/60 leading-relaxed max-w-lg mb-10">
            Beyond static layouts — I build immersive 3D landing pages with
            scroll-triggered animations, parallax depth, interactive elements,
            and cinematic transitions powered by modern motion frameworks.
          </p>

          <ul className="space-y-4 text-white/70">
            <li>→ Scroll-driven animations</li>
            <li>→ Parallax depth layers</li>
            <li>→ 3D model integration</li>
            <li>→ Interactive UI transitions</li>
            <li>→ WebGL & motion frameworks</li>
          </ul>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="relative flex justify-center items-center">

          {/* Glow background */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(circle, #D0FF71 0%, transparent 70%)",
            }}
          />

          {/* 3D Card Mockup */}
          <div
            className="mockup relative rounded-3xl overflow-hidden transition-transform duration-300"
            style={{
              width: "380px",
              height: "500px",
              background: "linear-gradient(135deg,#141414,#1c1c1c)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
              transformStyle: "preserve-3d",
              transform: "rotateX(10deg)",
            }}
          >
            <img
              src="/3d-preview.png" 
              alt="3D Landing Page Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
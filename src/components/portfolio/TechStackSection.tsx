import { useEffect, useRef } from "react";

const techStack = [
  { name: "Lovable", logo: "public/lovable-color.png" },
  { name: "Replit", logo: "public/replit-color.png" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/vscode.png" },
  { name: "ChatGPT", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/chatgpt.png" },
  { name: "Gemini", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/google-gemini.png" },
  { name: "Google Whisk", logo: "/image copy.png" },
  { name: "Google Flow", logo: "/Google-flow-Logo-PNG-SVG-Vector-1.png" },
  { name: "Google Antigravity", logo: "/Google-Antigravity-Icon-Full-Color.png" },
  { name: "Framer", logo: "https://cdn.brandfetch.io/id0XLKodBf/w/180/h/180/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1769564471291" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/figma.png" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/supabase.png" },
];

export default function TechStackSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // 🔁 Infinite Smooth Marquee
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    let pos = 0;
    const speed = 0.4;

    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // 🎯 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -20;
    const rotateY = ((x / rect.width) - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      id="tech"
      className="py-32 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(208,255,113,0.08), transparent 50%), #0f0f0f",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-20">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#D0FF71" }}
        >
          Technology Stack
        </p>

        <h2
          className="font-black uppercase leading-none"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.03em",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          BUILT WITH
          <br />
          NEXT-GEN TOOLS
        </h2>
      </div>

      {/* GLASS CONTAINER */}
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-3xl p-16 relative overflow-hidden transition-transform duration-300"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(25px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 50px 120px rgba(0,0,0,0.7)",
            perspective: "1200px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
        >
          {/* Neon border glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: "0 0 120px rgba(208,255,113,0.08)",
            }}
          />

          {/* MARQUEE */}
          <div className="overflow-hidden relative">
            <div
              ref={marqueeRef}
              className="flex gap-24 items-center h-64"
              style={{ width: "max-content" }}
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col items-center justify-center transition-all duration-500"
                >
                  {/* Floating */}
                  <div className="animate-float">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      style={{
                        filter: "drop-shadow(0 0 20px rgba(208,255,113,0.25))",
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-white/40 text-xs mt-4 tracking-wide uppercase">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}
      </style>
    </section>
  );
}
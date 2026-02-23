import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Feature Selection & Scope Lock",
    content:
      "Client selects required features like authentication, database, APIs, payments, analytics and deployment. Scope is locked based on selected plan.",
  },
  {
    title: "System Architecture Planning",
    content:
      "We design the architecture using Supabase, APIs, secure authentication layers and AI-generated UI strategy.",
  },
  {
    title: "AI-Powered UI Development",
    content:
      "Responsive AI-generated landing pages built with Lovable, Framer & modern frameworks — optimized for performance and conversion.",
  },
  {
    title: "Backend & Integrations",
    content:
      "Authentication, database configuration, API integrations, payments, admin dashboards and analytics are implemented.",
  },
  {
    title: "Security, Testing & Deployment",
    content:
      "Security audit, validation checks, performance optimization and production deployment.",
  },
];

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  // Scroll-trigger reveal + counter
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".workflow-card");

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisibleSteps((prev) =>
            prev.includes(index) ? prev : [...prev, index]
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="workflow"
      className="py-32 relative"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(208,255,113,0.06), transparent 50%), #0f0f0f",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 relative" ref={containerRef}>

        {/* HEADER */}
        <div className="text-center mb-20">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#D0FF71" }}
          >
            Development Process
          </p>

          <h2
            className="font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            WORKFLOW
            <br />
            SYSTEM
          </h2>
        </div>

        {/* CONNECTING LINE */}
        <div
          className="absolute left-6 top-40 bottom-0 w-[2px]"
          style={{
            background:
              "linear-gradient(to bottom, #D0FF71 0%, rgba(208,255,113,0.1) 100%)",
          }}
        />

        {/* STEPS */}
        <div className="space-y-20 relative">

          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`workflow-card relative pl-20 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* COUNTER CIRCLE */}
                <div
                  className="absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: "#D0FF71",
                    color: "#0f0f0f",
                    boxShadow: "0 0 30px rgba(208,255,113,0.4)",
                  }}
                >
                  {isVisible ? `0${index + 1}` : "00"}
                </div>

                {/* CARD */}
                <div
                  className="group rounded-3xl p-10 cursor-pointer transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg,#141414,#1c1c1c)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                    transform: isVisible
                      ? "perspective(1000px) rotateX(0deg)"
                      : "perspective(1000px) rotateX(20deg)",
                  }}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-white/60 text-sm leading-relaxed mt-4">
                      {step.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import emailjs from "emailjs-com";

const PLAN_CONFIG = {
  BASIC: {
    title: "Basic – AI Landing Page",
    price: "₹14,999",
    delivery: "5–7 Days",
    features: [
      "Responsive Design",
      "Contact Form",
      "On-page SEO",
    ],
    locked: [
      "Authentication System",
      "Database Configuration",
      "Payment Integration",
      "Admin Dashboard",
      "Advanced API Integration",
    ],
  },

  STANDARD: {
    title: "Standard – AI Website",
    price: "₹29,999",
    delivery: "10–14 Days",
    features: [
      "Responsive Design",
      "Contact Form",
      "On-page SEO",
      "Authentication System",
      "Database Configuration",
      "Basic API Integration",
    ],
    locked: [
      "Payment Integration",
      "Admin Dashboard",
      "Security Audit",
    ],
  },

  PREMIUM: {
    title: "Premium – Custom AI System",
    price: "Custom Pricing",
    delivery: "2–4 Weeks",
    features: [
      "Responsive Design",
      "Authentication System",
      "Database Configuration",
      "API Integration",
      "Payment Integration",
      "Admin Dashboard",
      "Security Audit",
      "Analytics Setup",
      "Deployment",
    ],
    locked: [],
  },
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  
  const { width, height } = useWindowSize();

  const params = new URLSearchParams(window.location.search);
  const selectedPlan =
    params.get("plan")?.toUpperCase() || "BASIC";

  const planData =
    PLAN_CONFIG[selectedPlan] || PLAN_CONFIG.BASIC;

  const isCustom = selectedPlan === "PREMIUM";

  const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectName: "",
    industry: "",
    topic: "",
    description: "",
    timeline: "",
    budget: "",
    selectedFeatures: [] as string[],
  });

  const requiresUpgrade =
    form.selectedFeatures.some((feature) =>
      planData.locked.includes(feature)
    );

  const inputClass =
    "w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D0FF71] transition-colors";

  const toggleFeature = (feature: string) => {
    if (form.selectedFeatures.includes(feature)) {
      setForm({
        ...form,
        selectedFeatures: form.selectedFeatures.filter(
          (f) => f !== feature
        ),
      });
    } else {
      setForm({
        ...form,
        selectedFeatures: [...form.selectedFeatures, feature],
      });
    }
  };
const logo = new Image();
logo.src = "/potrait (2).png";


const generatePDF = async () => {
  const doc = new jsPDF();

  const accent = [208, 255, 113];
  const invoiceNumber = "INV-" + Date.now();

  // ===== HEADER =====
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Nishant More", 20, 20);
  doc.setFontSize(10);
  doc.text("AI Landing Systems & Web Architecture", 20, 28);

  doc.setFontSize(10);
  doc.text(`Invoice: ${invoiceNumber}`, 150, 20);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 28);

  doc.setTextColor(0);

  let y = 50;

  // ===== CLIENT INFO =====
  doc.setFontSize(14);
  doc.text("Client Details", 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(`Name: ${form.name}`, 20, y);
  y += 6;
  doc.text(`Email: ${form.email}`, 20, y);
  y += 6;
  doc.text(`Industry: ${form.industry}`, 20, y);
  y += 12;

  // ===== PROJECT OVERVIEW =====
  doc.setFontSize(14);
  doc.text("Project Overview", 20, y);
  y += 8;

  const descriptionLines = doc.splitTextToSize(
    form.description || "Not specified",
    170
  );

  doc.setFontSize(11);
  doc.text(descriptionLines, 20, y);
  y += descriptionLines.length * 6 + 10;

  // ===== FEATURE TABLE =====
  doc.setFontSize(14);
  doc.text("Selected Features", 20, y);
  y += 8;

  autoTable(doc, {
    startY: y,
    head: [["Feature", "Included"]],
    body: form.selectedFeatures.map((f) => [f, "Yes"]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: accent },
  });

  y = doc.lastAutoTable.finalY + 10;

  // ===== PAYMENT TERMS =====
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(14);
  doc.text("Payment Terms", 20, y);
  y += 8;

  doc.setFontSize(11);
  const terms = doc.splitTextToSize(
    "• 50% advance payment required to initiate project.\n" +
      "• Remaining 50% payable before final deployment.\n" +
      "• Timeline begins after advance payment.\n" +
      "• Any additional scope changes will be quoted separately.",
    170
  );

  doc.text(terms, 20, y);
  y += 30;

  // ===== CONTRACT SUMMARY =====
  doc.setFontSize(14);
  doc.text("Contract Summary", 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(
    "This proposal outlines the scope based on submitted requirements. " +
      "Final scope confirmation will be shared before development begins.",
    20,
    y,
    { maxWidth: 170 }
  );
  y += 25;

  // ===== SIGNATURE BLOCK =====
  doc.line(20, y, 80, y);
  doc.text("Client Signature", 20, y + 6);

  doc.line(120, y, 180, y);
  doc.text("Authorized Signature - Nishant More", 120, y + 6);

  // ===== FOOTER =====
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "© Nishant More | AI Landing Systems | All rights reserved.",
    20,
    285
  );

  const pdfBlob = doc.output("blob");

  // ===== AUTO EMAIL ATTACHMENT =====
  const reader = new FileReader();
  reader.readAsDataURL(pdfBlob);
  reader.onloadend = async () => {
    const base64data = reader.result;

    await emailjs.send(
      "service_vz804gd",
      "template_u29njkn",
      {
  name: form.name,
  email: form.email,
  industry: form.industry,
  projectName: form.projectName,
  plan: selectedPlan,
  topic: form.topic,
  goal: form.goal,
  description: form.description,
  selectedFeatures: form.selectedFeatures.join(", "),
  timeline: form.timeline,
  budget: form.budget,
}
,
      "WytLE-kBdsa_C9i6B"
    );
  };

  doc.save("Professional-Proposal.pdf");
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


  // 1️⃣ Send to YOU (admin)
  await emailjs.send(
    "service_vz804gd",
    "template_u29njkn",

    {
         name: form.name,
    email: form.email,
    projectName: form.projectName,
    industry: form.industry,
    topic: form.topic,
    description: form.description,
    plan: selectedPlan,
    timeline: form.timeline,
    budget: form.budget,
    },
    "WytLE-kBdsa_C9i6B"
  );

  // 2️⃣ Send Auto Reply to CLIENT
  await emailjs.send(
    "service_vz804gd",
    "template_u29njkn",
    {
          name: form.name,
    email: form.email,
    projectName: form.projectName,
    industry: form.industry,
    topic: form.topic,
    description: form.description,
    plan: selectedPlan,
    timeline: form.timeline,
    budget: form.budget,
    },
    "WytLE-kBdsa_C9i6B"
  );

  setSubmitted(true);

if (loading) return; // prevent double trigger

  setLoading(true);

  try {
    const response = await fetch(
      "https://formspree.io/f/mojnlwpb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan,
          ...form,
        }),
      }
    );

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting form.");
  } finally {
    setLoading(false);
  }
  };

  // 🎉 SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white relative overflow-hidden bg-black">
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
        />

        <div className="text-center z-10">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>

          <h1 className="text-4xl font-black mb-6">
            REQUEST SUBMITTED
          </h1>

          <p className="text-white/60 mb-8">
            I’ll review your project and respond within 24 hours.
            A proposal PDF has been downloaded.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 rounded-full font-bold"
            style={{
              backgroundColor: "#D0FF71",
              color: "#0f0f0f",
            }}
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white px-6 py-20"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(208,255,113,0.05), transparent 40%), #0f0f0f",
      }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* LEFT FORM */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#D0FF71" }}>
            Project Onboarding
          </p>

          <h1
            className="font-black uppercase leading-none mb-8"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            START YOUR PROJECT
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input className={inputClass} placeholder="Full Name" required
              onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <input className={inputClass} type="email"
              placeholder="Email Address" required
              onChange={(e) => setForm({ ...form, email: e.target.value })} />

            <input className={inputClass}
              placeholder="Project Name"
              onChange={(e) => setForm({ ...form, projectName: e.target.value })} />

            <input className={inputClass}
              placeholder="Industry / Field"
              onChange={(e) => setForm({ ...form, industry: e.target.value })} />

            <input className={inputClass}
              placeholder="Project Topic"
              onChange={(e) => setForm({ ...form, topic: e.target.value })} />

            <textarea className={inputClass}
              rows={4}
              placeholder="Describe your project in detail..."
              onChange={(e) => setForm({ ...form, description: e.target.value })} />

            {/* FEATURES */}
            <div>
              <p className="text-sm mb-3 text-white/60">
                Select Required Features
              </p>

              <div className="space-y-3">

                {planData.features.map((feature, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="accent-[#D0FF71]"
                    />
                    <span>{feature}</span>
                  </label>
                ))}

                {!isCustom &&
                  planData.locked.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 opacity-30">
                      <input type="checkbox" disabled />
                      <span>{feature} (Upgrade Required)</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Upgrade Suggestion */}
            {requiresUpgrade && (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-sm">
                Some selected features require upgrading your plan.
              </div>
            )}

            <button
  type="submit"
  disabled={loading}
  className="w-full py-4 rounded-xl font-bold uppercase text-sm transition-all"
  style={{
    backgroundColor: loading ? "#888" : "#D0FF71",
    color: "#0f0f0f",
  }}
>
  {loading ? "Submitting..." : "Submit Request →"}
</button>

          </form>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="rounded-3xl p-10 h-fit"
          style={{
            background: "linear-gradient(135deg, #141414 0%, #1c1c1c 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#D0FF71" }}>
            Selected Plan
          </p>

          <h2 className="font-black text-3xl mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {planData.title}
          </h2>

          <p className="text-2xl font-bold mb-2">
            {planData.price}
          </p>

          <p className="text-white/50 mb-6">
            Delivery: {planData.delivery}
          </p>

          <ul className="space-y-3">
            {planData.features.map((feature, i) => (
              <li key={i} className="flex gap-3 text-white/70 text-sm">
                <span style={{ color: "#D0FF71" }}>→</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 text-xs text-white/40">
            {isCustom
              ? "Pricing will be shared after scope review."
              : "50% advance required after approval."}
          </div>
        </div>
      </div>
    </div>
  );
}

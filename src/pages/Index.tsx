import CustomCursor from "@/components/portfolio/CustomCursor";
import Header from "@/components/portfolio/Header";
import HeroSection from "@/components/portfolio/HeroSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import FAQSection from "@/components/portfolio/FAQSection";
import BlogSection from "@/components/portfolio/BlogSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import FloatingCVCard from "@/components/portfolio/FloatingCVCard";
import PricingSection from "@/components/portfolio/PricingSection"; 
import TechStackSection from "@/components/portfolio/TechStackSection";
import ThreeDSection from "@/components/portfolio/ThreeDSection";
import WorkflowSection from "@/components/portfolio/WorkflowSection";
const Index = () => {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <TechStackSection />
        <div className="section-divider" />
        <ThreeDSection />
        <div className="section-divider" />
        <WorkflowSection />
        <div className="section-divider" />
        <PricingSection />
        <div className="section-divider" />
        <TestimonialsSection />
        <div className="section-divider" />
        <FAQSection />
        <div className="section-divider" />
        <BlogSection />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCVCard />
    </>
  );
};

export default Index;

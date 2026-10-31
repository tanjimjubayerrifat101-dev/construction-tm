import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/Service";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PartnersSection from "@/components/home/PartnersSection";
import BlogGrid from "@/components/home/BlogGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSection />
      <WhyChooseUs />
      <PartnersSection />
      <BlogGrid showSectionHeader={true} limit={3} />
    </>
  );
}


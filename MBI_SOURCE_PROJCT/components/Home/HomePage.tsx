"use client"

import HeroSection from "./Home_Components/HeroSection"
import FeaturesSection from "./Home_Components/FeaturesSection"
import CTASection from "./Home_Components/CTASection"
import ShortAbout from "./Home_Components/ShortAbout"
import Events from "../marketing/Events"
import AboutSection from "./Home_Components/AboutSection"
import ProjectsSection from "./ProjectsSection"
import SkillsSection from "./Home_Components/SkillsSection"
import LottieSection from "./Home_Components/LottieSection"

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
       {/* <Events /> */}
         <AboutSection />
      <ProjectsSection />
      <SkillsSection />
         {/* <LottieSection />  */}
      {/* <ShortAbout />
      <FeaturesSection />
      <CTASection /> */}
      
    </main>
  )
}

'use client'

import BottomSection from "@/features/landing/sections/BottomSection"
import FeaturesSection from "@/features/landing/sections/FeaturesSection"
import HeroSection from "@/features/landing/sections/HeroSection"
import WhySection from "@/features/landing/sections/WhySection"
import { useEffect } from "react"

const LandingPage = () => {
  useEffect(() => {
  }, [])

  return (
    <>
      <HeroSection/>
      <FeaturesSection/>
      <WhySection/>
      <BottomSection/>
    </>
  ) 
}

export default LandingPage

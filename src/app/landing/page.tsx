'use client'

import Navbar from "@/shared/components/Navbar"
import { useState } from "react"

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState<string>('HOME')
  
  return (
    <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection}/>
  )
}

export default LandingPage

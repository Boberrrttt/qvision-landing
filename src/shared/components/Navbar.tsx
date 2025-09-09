import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const Navbar = () => {
  const [currentSection, setCurrentSection] = useState('HOME')
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const menuRefs = useRef<HTMLLIElement[]>([])

  const menuItems = ['HOME', 'FEATURES', 'WHY QVISION?', 'ABOUT US']

  useEffect(() => {
    const index = menuItems.indexOf(currentSection)
    const el = menuRefs.current[index]
    if (el) {
      setUnderlineStyle({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [currentSection])

  return (
    <nav className="w-full py-4 px-16 h-[20%] shadow-sm flex flex-row justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/Logo.png" 
          alt="Logo"
          width={85}            
          height={85}          
        />

        <div className="w-px h-8 bg-gray-400"></div>

        <Image
          src="/assets/byteq-logo.png" 
          alt="Logo"
          width={70}            
          height={70}          
        />
      </div>

      <ul className="flex space-x-16 items-center text-[#787878] font-semibold relative">
        {menuItems.map((item, idx) => (
          <li
            key={item}
            ref={el => {
              if (el) menuRefs.current[idx] = el
            }}
            onClick={() => setCurrentSection(item)}
            className="relative hover:text-[#23488B] cursor-pointer text-sm"
          >
            {item}
          </li>
        ))}

        <div
          className="absolute mt-16 h-[3.5px] bg-[#23488B] transition-all duration-300"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </ul>
    </nav>
  )
}

export default Navbar


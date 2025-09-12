import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="home" className="flex w-full flex-col pt-16 pb-10 md:pt-24 md:pb-16 justify-center items-center bg-gradient-to-r from-[#ededed] from-0% via-[#ededed] via-30% to-white to-50%">
      {/* Main Hero Section */}
      <div className="flex flex-col md:flex-row items-center lg:items-start gap-10 md:gap-20 justify-center px-4 md:px-8 w-full max-w-7xl">
        {/* Left side */}
        <div className="flex flex-col max-w-xl pt-6 md:pt-20 space-y-5 p-4 md:p-8 rounded-lg text-center md:text-left items-center md:items-start">
          <Image
            src="/assets/Logo.png"
            alt="Logo"
            width={280}
            height={280}
            className="w-40 md:w-80 h-auto"
          />

          {/* Mobile tagline */}
          <p className="text-black text-sm sm:text-base md:hidden">
            Where sight ends, vision begins.
          </p>

          {/* Desktop full description */}
          <p className="text-black leading-relaxed text-sm sm:text-base hidden md:block">
            QVision is smart eyewear for the visually impaired. Using Artificial
            Intelligence, it gives real-time audio guidance to help you navigate
            safely and independently.
          </p>

          <button className="bg-[#192B4B] cursor-pointer py-3 px-8 md:py-4 md:px-10 w-36 md:w-40 rounded-lg text-white text-sm font-poppins font-semibold hover:bg-[#23488B] transition">
            BUY NOW
          </button>
        </div>

        {/* Right side image */}
        <Image
          src="/assets/q1.png"
          alt="Product preview"
          width={710}
          height={710}
          className="rounded-lg w-full max-w-xs sm:max-w-md md:max-w-2xl h-auto"
        />
      </div>

      {/* Features Section */}
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 mt-10 justify-center items-center w-full max-w-5xl px-4">
        <div className="flex flex-col gap-2 items-center text-center">
          <Image
            src="/assets/feather.png"
            alt="Lightweight Ergonomics"
            className="py-3 sm:py-5"
            width={60}
            height={60}
          />
          <span className="text-[#191919] font-semibold text-sm sm:text-base">
            Lightweight <br /> Ergonomics
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center text-center">
          <Image
            src="/assets/ai.png"
            alt="Powered by AI"
            width={60}
            height={60}
          />
          <span className="text-[#191919] font-semibold text-sm sm:text-base">
            Powered by Artificial Intelligence
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center text-center">
          <Image
            src="/assets/audio.png"
            alt="Bone Conduction Technology"
            width={60}
            height={60}
          />
          <span className="text-[#191919] font-semibold text-sm sm:text-base">
            Bone Conduction <br /> Technology
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


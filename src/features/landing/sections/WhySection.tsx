import Image from "next/image"

const WhySection = () => {
  return (
    <section id="why-qvision" className="flex flex-col px-6 sm:px-10 md:px-16 py-12 relative">
      {/* Background image */}
      <Image
        src="/assets/q3.png"
        alt="Q3"
        width={1200}
        height={100}
        className="-z-10 absolute right-0 top-28 hidden md:block max-w-full"
      />

      <h2 className="font-semibold text-3xl sm:text-3xl md:text-4xl mb-8 md:mb-12">
        Why QVision?
      </h2>

      <ul className="flex flex-col gap-8 md:gap-12">
        <li className="flex items-start sm:items-center gap-4 sm:gap-6">
          <span className="text-4xl w-12 flex flex-row justify-center sm:text-5xl md:text-7xl font-bold">1</span>
          <div className="flex text-base sm:text-lg flex-col">
            <h3 className="font-bold text-xl">Independence</h3>
            <p className="text-lg">
              QVision empowers users to move confidently without always relying
              on others for guidance.
            </p>
          </div>
        </li>

        <li className="flex items-start sm:items-center gap-4 sm:gap-6">
          <span className="text-4xl w-12 flex justify-center sm:text-5xl md:text-7xl font-bold">2</span>
          <div className="flex text-base sm:text-lg flex-col">
            <h3 className="font-bold">Accessibility</h3>
            <p className="text-lg text-xl">
              QVision makes reading signs and documents easier, opening more
              opportunities in daily life.
            </p>
          </div>
        </li>

        <li className="flex items-start sm:items-center gap-4 sm:gap-6">
          <span className="text-4xl w-12 flex justify-center sm:text-5xl md:text-7xl font-bold">3</span>
          <div className="flex text-base sm:text-lg flex-col">
            <h3 className="font-bold">Confidence & Freedom</h3>
            <p className="text-lg text-xl">
              Users can engage more freely in social, educational, and
              professional settings.
            </p>
          </div>
        </li>

        <li className="flex items-start sm:items-center gap-4 sm:gap-6">
          <span className="text-4xl w-12 flex justify-center sm:text-5xl md:text-7xl font-bold">4</span>
          <div className="flex text-base sm:text-lg flex-col">
            <h3 className="font-bold">Inclusivity and Innovation</h3>
            <p className="text-lg text-xl">
              A step toward a more inclusive society where technology bridges
              gaps for the visually impaired.
            </p>
          </div>
        </li>

        <li className="flex items-start sm:items-center gap-4 sm:gap-6">
          <span className="text-4xl w-12 flex justify-center sm:text-5xl md:text-7xl font-bold">5</span>
          <div className="flex text-base sm:text-lg flex-col">
            <h3 className="font-bold">Peace of Mind</h3>
            <p className="text-lg text-xl">
              Reassures families and loved ones, knowing support and guidance
              are always within reach.
            </p>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default WhySection


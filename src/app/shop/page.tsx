import Image from "next/image"

const ShopPage = () => {
  return (
    <section id="shop" className="relative flex flex-col md:flex-row h-auto min-h-[90vh] px-6 md:px-28 py-10 md:py-0 items-center bg-gradient-to-r from-[#ededed] from-0% via-[#ededed] via-30% to-white to-50% overflow-hidden">
      {/* Text Section */}
      <div className="flex flex-col w-full max-w-[800px] justify-start text-center md:text-left z-10">
        <h2 className="font-semibold text-2xl sm:text-3xl md:text-[40px]">
          You've arrived ahead of time!
        </h2>
        <p className="text-sm sm:text-base md:text-xl mt-3 max-w-full">
          QVision is still in the works. Send us your email below and we’ll let
          you know when it’s ready.
        </p>

        {/* Input + Button (kept stacked, but responsive widths) */}
        <input
          className="mt-6 w-full sm:w-[77%] bg-[#EFEFEF] border border-[#6D6D6D] rounded-lg p-3 sm:p-4 text-sm sm:text-base"
          placeholder="Enter email here..."
        />
        <button className="w-full sm:w-[40%] md:w-[20%] mt-3 bg-[#192B4B] text-sm md:text-base text-white py-3 md:py-4 rounded-lg">
          NOTIFY ME
        </button>

        <p className="italic mt-10 sm:mt-12 text-sm sm:text-base">
          Get an exclusive launch discount when you sign up early!
        </p>

        <div className="flex justify-center md:justify-start flex-row gap-3 mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#000" d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20 20 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#000" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
        </div>
      </div>

      {/* Background Image */}
      <Image
        src="/assets/q6.png"
        alt="Q6"
        width={830}
        height={400}
        className="absolute right-0 md:right-10 top-40 md:top-24 hidden md:block max-w-full h-auto"
      />
    </section>
  )
}

export default ShopPage


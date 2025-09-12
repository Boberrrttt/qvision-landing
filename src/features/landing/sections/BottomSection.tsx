import Image from "next/image";

const BottomSection = () => {
  return (
    <section className="flex w-full flex-col pt-16 pb-10 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 justify-center items-center bg-gradient-to-r from-[#ededed] from-0% via-[#ededed] via-5% to-white to-15%">
      <p className="text-lg md:text-xl text-center px-4 md:px-0 max-w-[800px]">
        Give your loved ones the gift of independence with QVision.
      </p>

      {/* QVision Iris */}
      <div className="flex flex-col justify-center items-center mt-10 w-full max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-12 items-center">
          <Image
            src="/assets/q4.png"
            alt="Q4"
            width={350}
            height={350}
            className="w-[180px] sm:w-[230px] md:w-[280px] lg:w-[350px] h-auto"
          />
          <Image
            src="/assets/q1.png"
            alt="Q1"
            width={500}
            height={500}
            className="pt-6 sm:pt-12 md:pt-16 lg:pt-24 w-[200px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        <div className="flex flex-col w-full sm:w-[85%] md:w-[75%] lg:w-[75%] md:-mt-24 text-center sm:text-left">
          <div className="flex flex-row justify-center sm:justify-start items-center gap-3 mb-2">
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
              QVision Iris
            </h2>
            <div className="bg-[#FEB989] rounded-lg py-1 px-3 font-bold text-[#94563F] text-xs md:text-sm lg:text-base">
              -30%
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg w-full md:w-[90%] lg:w-[80%] mt-2 ">
            A fast, offline version of QVision that delivers scene recognition,
            navigation, and text-to-speech anytime, anywhere.
          </p>
          <div className="flex flex-row justify-center sm:justify-start items-end mt-3 gap-2">
            <h2 className="text-[#E06752] font-bold text-md md:text-base lg:text-lg line-through">
              $999
            </h2>
            <h2 className="text-[#192B4B] font-bold text-lg md:text-xl lg:text-2xl">
              $699
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="bg-[#EDEDED] text-[#192B4B] font-semibold py-2.5 md:py-3 lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-base">
              ADD TO WISHLIST
            </button>
            <button className="bg-[#192B4B] text-white font-semibold py-2.5 md:py-3 lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-base">
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* QVision Retina */}
      <div className="flex flex-col justify-center items-center mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-12 items-center">
          <Image
            src="/assets/q5.png"
            alt="Q5"
            width={350}
            height={350}
            className="w-[180px] sm:w-[230px] md:w-[280px] lg:w-[350px] h-auto"
          />
          <Image
            src="/assets/q1.png"
            alt="Q1"
            width={500}
            height={500}
            className="pt-6 sm:pt-12 md:pt-16 lg:pt-24 w-[200px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        <div className="flex flex-col w-full sm:w-[85%] md:w-[75%] lg:w-[75%] md:-mt-24 text-center sm:text-left">
          <div className="flex flex-row justify-center sm:justify-start items-center gap-3 mb-2">
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
              QVision Retina
            </h2>
            <div className="bg-[#FEB989] rounded-lg py-1 px-3 font-bold text-[#94563F] text-xs md:text-sm lg:text-base">
              -20%
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg w-full md:w-[90%] lg:w-[80%] mt-2">
            An online version of QVision that requires an internet connection,
            offering ongoing updates and dedicated support through a simple
            monthly plan.
          </p>
          <div className="flex flex-row justify-center sm:justify-start mt-3 items-end gap-2">
            <h2 className="text-[#E06752] font-bold text-md md:text-base lg:text-lg line-through">
              $189
            </h2>
            <h2 className="text-[#192B4B] font-bold text-lg md:text-xl lg:text-2xl">
              $149
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="bg-[#EDEDED] text-[#192B4B] font-semibold py-2.5 md:py-3 lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-base">
              ADD TO WISHLIST
            </button>
            <button className="bg-[#192B4B] text-white font-semibold py-2.5 md:py-3 lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-base">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomSection;


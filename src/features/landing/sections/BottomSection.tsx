import { incrementPreOrders } from "@/server/firebase/services/buynow.service";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BottomSection = () => {
  const router = useRouter();
  const [irisLoading, setIrisLoading] = useState(false);
  const [retinaLoading, setRetinaLoading] = useState(false)
  const [isDetailOneLoading, setIsDetailOneLoading] = useState(false);
    const [isDetailTwoLoading, setIsDetailTwoLoading] = useState(false);

  const handleBuyNow = async (product: string) => {
    product === 'Iris' ? setIrisLoading(true) : setRetinaLoading(true)
    router.push("/shop");
    incrementPreOrders()
  };

  const handleViewDetails = async (index: number) => {
    index === 1 ? setIsDetailOneLoading(true) : setIsDetailTwoLoading(true);
    await axios.post("/api/viewdetails");
    router.push("/shop");
    index === 1 ? setIsDetailOneLoading(false) : setIsDetailTwoLoading(false);
  }


  return (
    <section id="bottom" className="flex w-full flex-col pt-16 pb-10 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 justify-center items-center bg-gradient-to-r from-[#ededed] from-0% via-[#ededed] via-5% to-white to-15%">
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
            className="pt-6 pb-3 sm:pt-12 md:pt-16 lg:py-16 w-[200px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        <div className="flex flex-col w-full sm:w-[85%] md:w-[75%] lg:w-[75%] md:-mt-24 text-center sm:text-left">
          <div className="flex flex-row justify-center sm:justify-start items-center gap-3 mb-2">
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
              QVision Iris
            </h2>
            <div className="bg-[#FEB989] rounded-lg py-1 px-3 font-bold text-[#94563F] text-xs md:text-sm lg:text-base shadow-sm shadow-[#94563F]/50 ">
              -30%
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg w-full md:w-[90%] lg:w-[80%] mt-2 ">
            A fast, offline version of QVision that delivers scene recognition,
            navigation, and text-to-speech anytime, anywhere.
          </p>
          <div className="flex flex-row justify-center sm:justify-start items-end mt-3 gap-2">
            <h2 className="text-[#E06752] font-bold text-sm md:text-base lg:text-md line-through decoration-[#94563F]">
              $999
            </h2>
            <h2 className="text-[#192B4B] font-bold text-md md:text-lg lg:text-xl">
              $699
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={() => handleViewDetails(1)} className="bg-[#EDEDED] text-[#192B4B] cursor-pointer font-semibold py-2.5 md:py-3 lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-md">
               {isDetailOneLoading ? "Loading..." : "VIEW DETAILS"}
            </button>
            <button
              onClick={() => handleBuyNow('Iris')}
              disabled={irisLoading}
              className={`${
                irisLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#192B4B]"
              } text-white font-semibold py-2.5 md:py-3 cursor-pointer hover:bg-[#23488B] lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-md flex items-center justify-center`}
            >
              {irisLoading ? "Loading..." : "BUY NOW"}
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
            className="pt-6 pb-3 sm:pt-12 md:pt-16 lg:py-16 w-[200px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        <div className="flex flex-col w-full sm:w-[85%] md:w-[75%] lg:w-[75%] md:-mt-24 text-center sm:text-left">
          <div className="flex flex-row justify-center sm:justify-start items-center gap-3 mb-2">
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
              QVision Retina
            </h2>
            <div className="bg-[#FEB989] rounded-lg py-1 px-3 font-bold text-[#94563F] text-xs md:text-sm lg:text-base shadow-sm shadow-[#94563F]/50">
              -20%
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg w-full md:w-[90%] lg:w-[80%] mt-2">
            An online version of QVision that requires an internet connection,
            offering ongoing updates and dedicated support through a simple
            monthly plan.
          </p>
          <div className="flex flex-row justify-center sm:justify-start mt-3 items-end gap-2">
            <h2 className="text-[#E06752] font-bold text-md md:text-base lg:text-md line-through decoration-[#94563F]">
              $189
            </h2>
            <h2 className="text-[#192B4B] font-bold text-md md:text-lg lg:text-xl">
              $149
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={() => handleViewDetails(2)} className="bg-[#EDEDED] cursor-pointer text-[#192B4B] font-semibold py-2.5 md:py-3 lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-md">
               {isDetailTwoLoading ? "Loading..." : "VIEW DETAILS"}
            </button>
            <button
              onClick={() => handleBuyNow('Retina')}
              disabled={retinaLoading}
              className={`${
                retinaLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#192B4B]"
              } text-white font-semibold py-2.5 md:py-3 cursor-pointer hover:bg-[#23488B] lg:py-4 px-5 md:px-6 rounded-md text-sm md:text-md flex items-center justify-center`}
            >
              {retinaLoading ? "Loading..." : "BUY NOW"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomSection;


interface AnalyticsCardProps {
  title: string;
  type: "Visits" | "View Details" | "Buy Now" | "Notify";
  data: number;
  isLoading?: boolean;
}

const AnalyticsCard = ({ title, data, isLoading }: AnalyticsCardProps) => {
  return (
    <div className="bg-white rounded-lg w-96 h-60 flex flex-col gap-6 py-7 px-5 shadow-[0_3px_2px_rgba(0,0,0,0.3)] z-20">
      <h3 className="text-xl text-[#5A5A60] font-semibold w-full">{title}</h3>
      
      {isLoading ? (
        <div className="h-[64px] w-48 bg-gray-300 animate-pulse rounded" />
      ) : (
        <p className="text-8xl font-bold text-[#33333F]">{data}</p>
      )}
    </div>
  );
};

export default AnalyticsCard;


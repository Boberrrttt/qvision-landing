'use client';

import { useEffect, useState } from "react";
import { getPreOrders } from "@/server/firebase/services/buynow.service";
import AnalyticsCard from "@/features/admin/components/AnalyticsCard";
import CurrentEmailsSentSection from "@/features/admin/sections/currentEmailsSentSection";

export default function AdminPage() {
  const [ordersTotal, setOrdersTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const result = await getPreOrders();
      if (result.success) setOrdersTotal(result.count);
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen w-[100%] justify-center mt-16 bg-gray-50">
      <div className="bg-[#192B4B] w-full flex flex-col h-[30%] px-6">
        <div className="flex flex-row justify-between items-center w-full pt-16">
          <h2 className="text-white text-2xl font-bold">QVision</h2>
          <h2 className="text-white text-2xl">Analytics</h2>
        </div>
        <div className="flex flex-row w-full mt-5 justify-between gap-6">
          <AnalyticsCard title="Total Site Visits" data={12} />
          <AnalyticsCard title={`Total "View Details" Clicks`} data={12} />
          <AnalyticsCard title={`Total "Buy Now" Clicks`} data={12} />
          <AnalyticsCard title={`Total "Notify Me" Clicks`} data={12} />
        </div>
        <CurrentEmailsSentSection/>


      </div>
    </div>
  );
}


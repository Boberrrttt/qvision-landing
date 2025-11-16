'use client';

import { useEffect, useState } from "react";
import AnalyticsCard from "@/features/admin/components/AnalyticsCard";
import CurrentEmailsSentSection from "@/features/admin/sections/currentEmailsSentSection";
import axios from "axios";

export default function AdminPage() {
  const [ordersTotal, setOrdersTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [siteVisits, setSiteVisits] = useState<number>(0);
  const [totalEmails, setTotalEmails] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const [visitsResults, preOrdersResults, emailsResults] = await Promise.all([
          axios.get('/api/visits'),
          axios.get('/api/buynow'),
          axios.get('/api/notify')
      ])
      setOrdersTotal(preOrdersResults.data.data.count);
      setSiteVisits(visitsResults.data.data.count);
      setTotalEmails(emailsResults.data.data.count);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="flex h-screen w-[100%] justify-center mt-16 bg-gray-50">
      <div className="bg-[#192B4B] w-full flex flex-col h-[30%] px-6">
        <div className="flex flex-row justify-between items-center w-full pt-16">
          <h2 className="text-white text-2xl font-bold">QVision</h2>
          <h2 className="text-white text-2xl">Analytics</h2>
        </div>

        <div className="flex flex-row w-full mt-5 justify-between gap-6">
          <AnalyticsCard title="Total Site Visits" data={siteVisits} type="Visits" isLoading={isLoading} />
          <AnalyticsCard title={`Total "View Details" Clicks`} data={1} type="View Details" isLoading={isLoading} />
          <AnalyticsCard title={`Total "Buy Now" Clicks`} data={ordersTotal} type="Buy Now" isLoading={isLoading} />
          <AnalyticsCard title={`Total "Notify Me" Clicks`} data={totalEmails} type="Notify" isLoading={isLoading} />
        </div>
        <CurrentEmailsSentSection/>


      </div>
    </div>
  );
}


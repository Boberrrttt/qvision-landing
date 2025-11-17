'use client';

import { useEffect, useState } from "react";
import AnalyticsCard from "@/features/admin/components/AnalyticsCard";
import axios from "axios";
import { Timestamp } from "firebase/firestore";

interface IEmail {
  id: string;
  email: string;
  createdAt: Timestamp;
}

export default function AdminPage() {
  const [ordersTotal, setOrdersTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [siteVisits, setSiteVisits] = useState<number>(0);
  const [totalEmails, setTotalEmails] = useState<number>(0);
  const [emails, setEmails] = useState<IEmail[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const [visitsResults, preOrdersResults, emailsResults] = await Promise.all([
        axios.get('/api/visits'),
        axios.get('/api/buynow'),
        axios.get('/api/notify')
      ]);

      setOrdersTotal(preOrdersResults.data.data.count);
      setSiteVisits(visitsResults.data.data.count);
      setTotalEmails(emailsResults.data.data.count);

      const rawEmails = emailsResults.data.data.emails;

      const converted = rawEmails.map((e: any) => ({
        ...e,
        createdAt: new Timestamp(e.createdAt.seconds, e.createdAt.nanoseconds)
      }));

      setEmails(converted);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-20">

      <div className="bg-[#192B4B] h-80 w-full flex flex-col px-6 py-10">
        <div className="flex flex-row justify-between items-center w-full pt-20">
          <h2 className="text-white text-2xl font-bold">QVision</h2>
          <h2 className="text-white text-2xl">Analytics</h2>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="flex flex-row w-full px-6 justify-between gap-6 -mt-32">
        <AnalyticsCard title="Total Site Visits" data={siteVisits} type="Visits" isLoading={isLoading} />
        <AnalyticsCard title={`Total "View Details" Clicks`} data={1} type="View Details" isLoading={isLoading} />
        <AnalyticsCard title={`Total "Buy Now" Clicks`} data={ordersTotal} type="Buy Now" isLoading={isLoading} />
        <AnalyticsCard title={`Total "Notify Me" Clicks`} data={totalEmails} type="Notify" isLoading={isLoading} />
      </div>

      {/* Emails Table */}
      <div className="flex flex-col mx-6 mt-20 rounded-lg bg-white shadow-[0_3px_2px_rgba(0,0,0,0.3)] pt-7 pb-2">
        <h2 className="text-[#202020] font-semibold text-xl ml-5">Current Emails Sent</h2>

        <div className="flex flex-col mt-4">
          {/* Header */}
          <div className="flex bg-[#F4F4F4] justify-between px-5 py-2">
            <p className="flex-[3] font-semibold text-[#5E5E5E]">EMAIL</p>
            <p className="flex-1 font-semibold text-[#5E5E5E]">DATE</p>
            <p className="flex-1 font-semibold text-[#5E5E5E]">TIME</p>
            <p className="flex-1 font-semibold text-[#5E5E5E]">STATUS</p>
          </div>

          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between px-5 py-4 border-b border-gray-200 animate-pulse"
              >
                <div className="flex-[3] bg-gray-300 h-4 rounded"></div>
                <div className="flex-1 bg-gray-300 h-4 rounded"></div>
                <div className="flex-1 bg-gray-300 h-4 rounded"></div>
                <div className="flex-1 bg-gray-300 h-4 rounded"></div>
              </div>
            ))
          ) : (
            emails?.map((email, index) => {
              const date = email.createdAt.toDate();
              const isLast = index === emails.length - 1;

              return (
                <div
                  key={email.id}
                  className={`flex justify-between px-5 py-2 ${
                    isLast ? "" : "border-b border-gray-200"
                  }`}
                >
                  <p className="flex-[3] text-[#3A3A3A]">{email.email}</p>
                  <p className="flex-1 text-[#3A3A3A]">{date.toLocaleDateString()}</p>
                  <p className="flex-1 text-[#3A3A3A]">
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="flex-1 text-[#3EC95C] font-semibold">Notified</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}


"use client";

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
  const [totalViewDetails, setTotalViewDetails] = useState<number>(0);

  const [emails, setEmails] = useState<IEmail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

  const pageSize = 5

  const fetchPaginatedEmails = async (page: number = 1) => {
    try {
      setIsLoadingPage(true);

      const res = await axios.get<{ data: any }>(
        `/api/notify/paginated?page=${page}&limit=${pageSize}`
      );

      const data = res.data.data.data;

      const convertedEmails = data?.emails?.map((e: any) => ({
        ...e,
        createdAt: new Timestamp(e.createdAt.seconds, e.createdAt.nanoseconds),
      }));

      setEmails(convertedEmails);
      setCurrentPage(data?.currentPage);
      setTotalPages(data?.totalPages);
    } catch (err) {
      console.error("Error fetching paginated emails:", err);
    } finally {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const [visitsResults, preOrdersResults, emailsResults, viewDetailsResults] = await Promise.all([
        axios.get("/api/visits"),
        axios.get("/api/buynow"),
        axios.get("/api/notify"),
        axios.get("/api/viewdetails")
      ]);

      setOrdersTotal(preOrdersResults.data.data.count);
      setSiteVisits(visitsResults.data.data.count);
      setTotalEmails(emailsResults.data.data.count);
      setTotalViewDetails(viewDetailsResults.data.data.count);

      await fetchPaginatedEmails(1);

      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-20">

      {/* HEADER */}
      <div className="bg-[#192B4B] h-80 w-full flex flex-col px-6 py-10">
        <div className="flex flex-row justify-between items-center w-full pt-20">
          <h2 className="text-white text-2xl font-bold">QVision</h2>
          <h2 className="text-white text-2xl">Analytics</h2>
        </div>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="flex flex-row w-full px-6 justify-between gap-6 -mt-32">
        <AnalyticsCard title="Total Site Visits" data={siteVisits} type="Visits" isLoading={isLoading} />
        <AnalyticsCard title={`Total "View Details" Clicks`} data={totalViewDetails} type="View Details" isLoading={isLoading} />
        <AnalyticsCard title={`Total "Buy Now" Clicks`} data={ordersTotal} type="Buy Now" isLoading={isLoading} />
        <AnalyticsCard title={`Total "Notify Me" Clicks`} data={totalEmails} type="Notify" isLoading={isLoading} />
      </div>

      {/* EMAILS TABLE */}
      <div className="flex flex-col mx-6 mt-20 rounded-lg bg-white shadow-[0_3px_2px_rgba(0,0,0,0.3)] pt-7 pb-2">
        <h2 className="text-[#202020] font-semibold text-xl ml-5">Current Emails Sent</h2>

        <div className="flex flex-col mt-4">
          {/* Table Header */}
          <div className="flex bg-[#F4F4F4] justify-between px-5 py-2">
            <p className="flex-[3] font-semibold text-[#5E5E5E]">EMAIL</p>
            <p className="flex-1 font-semibold text-[#5E5E5E]">DATE</p>
            <p className="flex-1 font-semibold text-[#5E5E5E]">TIME</p>
            <p className="flex-1 font-semibold text-[#5E5E5E]">STATUS</p>
          </div>

          {/* Loading skeleton */}
          {isLoading || isLoadingPage ? (
            Array.from({ length: pageSize }).map((_, i) => (
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
                  className={`flex justify-between px-5 py-2 ${isLast ? "" : "border-b border-gray-200"}`}
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

        <div className="flex justify-center mt-4 space-x-2">
          {/* Previous arrow */}
          {currentPage > 1 && (
            <button
              onClick={() => fetchPaginatedEmails(currentPage - 1)}
              className="px-3 py-1 rounded border bg-white text-[#192B4B] hover:bg-gray-100"
            >
              &lt;
            </button>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => fetchPaginatedEmails(pageNum)}
              className={`px-3 py-1 rounded border ${
                pageNum === currentPage
                  ? "bg-[#192B4B] text-white border-[#192B4B]"
                  : "bg-white text-[#192B4B] border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next arrow */}
          {currentPage < totalPages && (
            <button
              onClick={() => fetchPaginatedEmails(currentPage + 1)}
              className="px-3 py-1 rounded border bg-white text-[#192B4B] hover:bg-gray-100"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


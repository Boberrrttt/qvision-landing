'use client'

import { getPreOrders } from "@/server/firebase/services/buynow.service"
import { useEffect, useState } from "react"

const AdminPage = () => {
  const [ordersTotal, setOrdersTotal] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      const result = await getPreOrders()
      if (result.success) {
        setOrdersTotal(result.count)
      }
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-10 ">
          Total Pre-Orders
        </h1>
        {isLoading ? (
          <p className="text-2xl font-semibold text-gray-600">Loading...</p>
        ) : (
          <p className="text-6xl font-bold text-gray-900">{ordersTotal}</p>
        )}
      </div>
    </div>
  )
}

export default AdminPage


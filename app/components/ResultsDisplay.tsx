"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ResultsDisplay() {
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    // Simulate API call to get the transformed image
    const timer = setTimeout(() => {
      setImageUrl("/placeholder.svg?height=600&width=600")
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Your Deep Sea Fish Transformation</h2>
      <div className="relative aspect-square w-full max-w-2xl rounded-lg overflow-hidden shadow-lg mb-6">
        <Image
          // src={imageUrl || "/placeholder.svg"}
          src={"https://churaumi.okinawa/userfiles/fish_images/shinkaigyo/turugue-resize.jpg"}
          alt="Deep Sea Fish Transformation"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex space-x-4">
        <Button className="bg-black text-white hover:bg-gray-800">Share</Button>
        <Button variant="outline">Download</Button>
      </div>
    </div>
  )
}


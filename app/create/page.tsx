"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader, ArrowRight } from "lucide-react"
import { findMatchedFish, post } from "@/services/api"
import FishAnimation from "../components/FishAnimation"
import UnderwaterEffects from "../components/UnderwaterEffects"

export default function CreatePost() {
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState()
  const [preview, setPreview] = useState<string | null>(null)
  const [transformedImage, setTransformedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const fetchFish = async () => {
    setIsLoading(true)

    if (file) {
      try {
        const matchedFish = await findMatchedFish(file)
        setTransformedImage(matchedFish.matched_fish)
        setIsLoading(false)
        setShowComparison(true)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (transformedImage) {
      console.log("Creating post with transformed image")
      await post(transformedImage)
      setIsLoading(false)
      router.push("/")
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#001220"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white relative overflow-hidden">
      <UnderwaterEffects />
      <FishAnimation />
      <div className="container mx-auto px-4 py-8 relative z-30">
        <h1 className="text-5xl font-bold text-center mb-8 animate-pulse">Find Your Deep Fish</h1>
        {!preview && (
          <Card className="bg-blue-900 bg-opacity-50 border-blue-700 shadow-lg backdrop-blur-sm">
            <CardContent className="p-6">
              <label className="flex flex-col items-center justify-center w-full h-96 border-2 border-blue-500 border-dashed rounded-lg cursor-pointer hover:bg-blue-800 hover:bg-opacity-50 transition-all duration-300">
                <Upload className="w-16 h-16 mb-4 text-blue-300" />
                <span className="text-2xl text-blue-200">Click to upload or drag and drop</span>
                <span className="mt-2 text-blue-300">Dive into the deep with your photo</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </CardContent>
          </Card>
        )}
        {preview && !showComparison && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl aspect-square rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image src={preview || "/placeholder.svg"} alt="Preview" layout="fill" objectFit="cover" />
            </div>
            <Button
              onClick={fetchFish}
              className="bg-blue-500 text-white hover:bg-blue-600 text-2xl py-4 px-12 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-3 w-6 h-6" />
                  searching...
                </>
              ) : (
                "Find Shinkaigyo"
              )}
            </Button>
          </div>
        )}
        {showComparison && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row justify-center items-center w-full mb-8 space-y-4 md:space-y-0 md:space-x-8">
              <div className="relative w-full md:w-2/5 aspect-square rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:-rotate-3">
                <Image src={preview || "/placeholder.svg"} alt="Original" layout="fill" objectFit="cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 bg-opacity-70 text-white p-3 text-center text-lg">
                  Original
                </div>
              </div>
              <ArrowRight className="hidden md:block text-6xl text-blue-300 animate-pulse" />
              <div className="relative w-full md:w-2/5 aspect-square rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-3">
                <Image src={transformedImage || "/placeholder.svg"} alt="Transformed" layout="fill" objectFit="cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 bg-opacity-70 text-white p-3 text-center text-lg">
                  Deep Sea Face
                </div>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-green-500 text-white hover:bg-green-600 text-2xl py-4 px-12 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-3"
            >
              Post Comparison
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}


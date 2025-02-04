"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchForm() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      // In a real app, we would upload the file here
      // For now, we'll just simulate a search
      router.push("/results")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col items-center space-y-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-black text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Upload Your Photo
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
        {file && <p className="text-sm">{file.name}</p>}
        <button
          type="submit"
          disabled={!file}
          className="bg-black text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Transform to Deep Sea Fish
        </button>
      </div>
    </form>
  )
}


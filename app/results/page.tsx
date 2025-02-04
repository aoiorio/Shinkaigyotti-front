import Link from "next/link"
import ResultsDisplay from "../components/ResultsDisplay"
import { Button } from "@/components/ui/button"

export default function Results() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Deep Sea Transformation</h1>
        <ResultsDisplay />
        <div className="mt-8 text-center">
          <Link href="/">
            <Button className="bg-black text-white hover:bg-gray-800">Back to Feed</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}


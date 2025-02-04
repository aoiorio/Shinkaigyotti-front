"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlusCircle, Heart, MessageCircle, Share2 } from "lucide-react"
import FishAnimation from "./components/FishAnimation"
import UnderwaterEffects from "./components/UnderwaterEffects"
import { useEffect, useState } from "react";
import { getPosts } from "@/services/api";
import { Post } from "@/model/post";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  // Mock data for the feed
  const feedItems = [
    { id: 1, username: "user1", imageUrl: "/placeholder.svg?height=600&width=600", likes: 42, comments: 7 },
    { id: 2, username: "user2", imageUrl: "/placeholder.svg?height=600&width=600", likes: 28, comments: 3 },
    { id: 3, username: "user3", imageUrl: "/placeholder.svg?height=600&width=600", likes: 56, comments: 12 },
  ]

  const fetchPosts = async () => {
    setIsLoading(true)

      try {
        const posts = await getPosts()
        setPosts(posts)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white relative overflow-hidden">
      <UnderwaterEffects />
      <FishAnimation />
      <div className="container mx-auto px-4 py-8 relative z-30">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold animate-pulse">Deep Sea Face</h1>
          <Link href="/create">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 text-xl py-3 px-8 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-3">
              <PlusCircle className="mr-2 h-6 w-6" />
              Create Post
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {posts.map((item) => (
            <Card
              key={item.id}
              className="bg-blue-900 bg-opacity-50 border-blue-700 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-700 mr-3"></div>
                  <p className="font-semibold text-lg">{item.id}</p>
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={item.photo || "/placeholder.svg"}
                    alt={`${item.id}'s deep sea face`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
              {/* <CardFooter className="flex justify-between items-center p-4 border-t border-blue-700">
                <div className="flex space-x-4">
                  <Button variant="ghost" className="text-blue-300 hover:text-white text-lg">
                    <Heart className="mr-2 h-6 w-6" />
                    {item.likes}
                  </Button>
                  <Button variant="ghost" className="text-blue-300 hover:text-white text-lg">
                    <MessageCircle className="mr-2 h-6 w-6" />
                    {item.comments}
                  </Button>
                </div>
                <Button variant="ghost" className="text-blue-300 hover:text-white text-lg">
                  <Share2 className="h-6 w-6" />
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}


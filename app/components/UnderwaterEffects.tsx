"use client";

import type React from "react"
import { useEffect, useRef } from "react"

const UnderwaterEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Bubble {
      x: number
      y: number
      radius: number
      speed: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = canvas!.height + Math.random() * 100
        this.radius = Math.random() * 8 + 2
        this.speed = Math.random() * 3 + 1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()
      }

      update() {
        this.y -= this.speed
        if (this.y + this.radius < 0) {
          this.y = canvas!.height + this.radius
        }
      }
    }

    const bubbles: Bubble[] = []
    for (let i = 0; i < 50; i++) {
      bubbles.push(new Bubble())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

export default UnderwaterEffects


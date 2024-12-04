"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="text-lg font-medium text-muted-foreground">Processing data...</p>
    </motion.div>
  )
}


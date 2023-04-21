'use client'

import { motion } from 'framer-motion'

export default function FramerAnimation({ children }) {
  return (
    <motion.div
      className="mx-4 max-h-[680px] w-[500px] overflow-y-auto rounded-2xl bg-[#1d1d1d]/60 p-4 shadow-2xl backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}

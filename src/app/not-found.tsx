'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  }, [router])

  return (
    <html lang="en">
      <body />
    </html>
  )
}

export default NotFound

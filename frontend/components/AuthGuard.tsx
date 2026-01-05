"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/signIn")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) return null

  return <>{children}</>
}

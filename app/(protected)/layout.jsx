'use client'
import AppGuard from '@/app/AppGuard'
export default function Layout({ children }) {
  return <AppGuard>{children}</AppGuard>
}

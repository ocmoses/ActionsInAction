"use client"
import RouteGuard from "@/app/RouteGuard"
export default function Layout({ children }) {
  return <RouteGuard>{children}</RouteGuard>
}

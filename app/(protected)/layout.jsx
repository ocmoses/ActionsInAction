"use client"
import RouteGuard from "./RouteGuard"

export default function Layout({ children }) {
  return <RouteGuard>{children}</RouteGuard>
}

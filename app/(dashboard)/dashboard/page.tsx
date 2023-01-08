import Navbar from '@/app/components/Navbar'

export default function DashboardPage() {
  return (
    <main className="px-8 m-0 w-screen relative">
      <div className="relative z-50">
        <Navbar type="user-dashboard" />
      </div>
      <div className="flex justify-center items-center h-[75vh] overflow-hidden">
        <h1 className="text-white text-2xl">Partner Dashboard</h1>
      </div>
    </main>
  )
}

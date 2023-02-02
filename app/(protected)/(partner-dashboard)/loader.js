import { TailSpinPreloader } from "@/app/components/Icons"

export default function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <TailSpinPreloader width={75} height={75} fill="#efb703" />
    </div>
  )
}

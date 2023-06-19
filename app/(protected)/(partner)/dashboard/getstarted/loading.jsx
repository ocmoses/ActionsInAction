import { TailSpinPreloader } from "@/app/components/Icons";

export default function loading() {
  return (
    <div className="w-screen pt-20 flex justify-center items-center">
      <TailSpinPreloader width={100} height={100} fill="#efb703" />
    </div>
  );
}

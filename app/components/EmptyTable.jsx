import { useState, useEffect, useCallback } from "react";
import { TailSpinPreloader } from "@/app/components/Icons";
export default function EmptyTable({ list }) {
    const [delayedExecution, setDelayedExecution] = useState(false);
    useEffect(() => {
      // Set a 5-second delay before executing the condition
      const delayTimer = setTimeout(() => {
        setDelayedExecution(true);
      }, 3000);
      // Clear the timer when the component unmounts or when the condition is met
      return () => clearTimeout(delayTimer);
    }, []); // Empty dependency array ensures that this useEffect runs only once
  
  return (
    <>
      {delayedExecution ? (
        <>
          <div className="w-full p-4 flex justify-center">
            <p className="text-md text-white/80">
              <i>No {list} Found </i>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-[200px]">
            <TailSpinPreloader width={72} height={72} fill="#efb703" />
          </div>
        </>
      )}
    </>
  );
}

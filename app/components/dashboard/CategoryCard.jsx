import Image from "next/image";
import useErrors from "@/hooks/useErrors";
import {useState} from "react";
import QuestionnaireModal from "@/app/components/modals/QuestionnaireModal";

export default function CategoryCard({
  category,
  setIsOpen,
  setTmpCat,
  disabled,
  pendingQuestionare=true
}) {

  const [showQuestionare, setShowQuestionare] = useState(false);
  const [{ errors, setError, removeError, clearErrors }] = useErrors();
  
  const selectCategory = (category) => {
    clearErrors();
    setTmpCat(category);
    setIsOpen(true);
  };
  return (
    <>
      <div
        onClick={() => (!disabled ? (pendingQuestionare ? setShowQuestionare(true) : selectCategory(category)) : {})}
        className={`flex gap-6 justify-center md:justify-start w-full max-w-[406.5px] min-h-[140px] px-6 py-4 block ${
          disabled
            ? "cursor-not-allowed bg-white/10 text-white/70"
            : "cursor-pointer text-white bg-[#111111] hover:bg-white/10 hover:shadow-2xl "
        } rounded-lg`}
      >
        <div>
          <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
            {category.icon && (
              <Image src={category.icon} alt="" width={24} height={24} />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center md:justify-start gap-3 px-2 py-3">
          <p className="font-bold my-0">{category.category_name}</p>
          <p className="text-[#999999] my-0 text-sm">
            {category.short_description}
          </p>
        </div>
      </div>
 
      {      
        showQuestionare && 
        <QuestionnaireModal hide={() => setShowQuestionare(false)} action={() => selectCategory(category)} />
      }
    </>
    
  );
}

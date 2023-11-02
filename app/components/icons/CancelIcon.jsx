export default function CancelIcon({action}){
    return (
        <div onClick={() => action()} 
             className="p-2 rounded-full bg-black/20 absolute top-2 right-2 inline-block cursor-pointer hover:bg-black/80 ">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    );
}
import { useRouter } from "next/navigation";
import usePartner from "@/hooks/usePartners";
import { useEffect, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";


export default function IPCard(){

    const router = useRouter();

    const {getIPProgressStatus} = usePartner();

    const [percentage, setPercentage] = useState(100);

    const [{ errors, setError, clearErrors }] = useErrors(null);

    const {user} = useUsers();  


    useEffect(() => {
        getIPProgressStatus().then(response => {
            console.log("IP percentage response", response);
            console.log("response.status", response.status);
            console.log("response.error", response.error);
            if(response.progress){
              setPercentage(parseInt(response.progress)); 
            }

        }).catch(error => {console.log("IP error: ", error.response); setError({error: error.message})});

    }, []);

    return (
        <>{
            percentage < 100 && user?.role == "superAdmin" &&
            <div className="w-6xl rounded-xl border-1 border-white/20 mt-8 bg-white/10">
                <div className="flex justify-between p-6 border-b border-white/20">
                    <span className="text-white/80 text-md">Things to do</span>
                    <div className="flex space-y-4 flex-col">
                        <div className="w-[150px] h-2 rounded-full bg-gray-400 overflow-hidden">
                            {
                                Math.floor((percentage / 100) * 150) && 
                                <div className={`bg-green-300 w-[${Math.floor((percentage / 100) * 150)}px] h-full`}></div>
                            }
                           
                        </div>
                        <span className="text-white/60 text-sm">{percentage}% {percentage >= 50 ? 'Almost there!' : ""}</span>
                    </div>
                </div>
                <div className="p-6 justify-between flex ">
                    <div className="flex space-x-4">
                        <svg width="26" height="36" viewBox="0 0 26 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.8494 28.3187L21.912 31.875C21.663 32.1735 21.3275 32.3873 20.9518 32.487C20.5761 32.5867 20.1787 32.5673 19.8145 32.4315C19.4503 32.2957 19.1372 32.0501 18.9185 31.7288C18.6997 31.4075 18.5861 31.0261 18.5934 30.6375L18.6184 26.0188C18.6187 25.8034 18.6568 25.5897 18.7309 25.3875L25.6869 6.28125V1.125C25.6865 0.959389 25.6205 0.800699 25.5034 0.683594C25.3863 0.566488 25.2276 0.500485 25.0619 0.5H8.18734V7.375C8.18684 7.54061 8.12084 7.69929 8.00373 7.8164C7.88663 7.9335 7.72795 7.99951 7.56234 8H0.6875V34.875C0.687985 35.0406 0.753988 35.1993 0.871094 35.3164C0.988199 35.4335 1.14689 35.4995 1.3125 35.5H25.062C25.2276 35.4995 25.3863 35.4335 25.5034 35.3164C25.6205 35.1993 25.6865 35.0406 25.687 34.875V26.3813C25.5009 26.808 25.1933 27.9941 24.8494 28.3187ZM5.06241 11.125H19.4371C19.6012 11.1275 19.7577 11.1945 19.8728 11.3114C19.9879 11.4284 20.0525 11.5859 20.0525 11.75C20.0525 11.9141 19.9879 12.0716 19.8728 12.1886C19.7577 12.3055 19.6012 12.3725 19.4371 12.375H5.06241C4.89832 12.3725 4.74182 12.3055 4.62668 12.1886C4.51155 12.0716 4.44701 11.9141 4.44701 11.75C4.44701 11.5859 4.51155 11.4284 4.62668 11.3114C4.74182 11.1945 4.89832 11.1275 5.06241 11.125ZM5.06241 14.875H19.4371C19.6012 14.8775 19.7577 14.9445 19.8728 15.0614C19.9879 15.1784 20.0525 15.3359 20.0525 15.5C20.0525 15.6641 19.9879 15.8216 19.8728 15.9386C19.7577 16.0555 19.6012 16.1225 19.4371 16.125H5.06241C4.89832 16.1225 4.74182 16.0555 4.62668 15.9386C4.51155 15.8216 4.44701 15.6641 4.44701 15.5C4.44701 15.3359 4.51155 15.1784 4.62668 15.0614C4.74182 14.9445 4.89832 14.8775 5.06241 14.875ZM5.06241 18.625H14.4372C14.6013 18.6275 14.7578 18.6945 14.8729 18.8114C14.9881 18.9284 15.0526 19.0859 15.0526 19.25C15.0526 19.4141 14.9881 19.5716 14.8729 19.6886C14.7578 19.8055 14.6013 19.8725 14.4372 19.875H5.06241C4.89832 19.8725 4.74182 19.8055 4.62668 19.6886C4.51155 19.5716 4.44701 19.4141 4.44701 19.25C4.44701 19.0859 4.51155 18.9284 4.62668 18.8114C4.74182 18.6945 4.89832 18.6275 5.06241 18.625ZM16.0684 29.425L12.9747 31.5938C12.8807 31.6572 12.7713 31.694 12.658 31.7004C12.5448 31.7068 12.4319 31.6824 12.3314 31.6299C12.2309 31.5774 12.1464 31.4987 12.0869 31.4021C12.0274 31.3055 11.9952 31.1947 11.9935 31.0812V30.1375C9.55606 32.1625 7.66234 32.0625 6.43113 31.5375C5.85838 31.8486 5.26296 32.1161 4.64994 32.3375C4.49507 32.39 4.32581 32.3796 4.17848 32.3087C4.03114 32.2378 3.91748 32.1119 3.86186 31.9582C3.80624 31.8044 3.81311 31.635 3.88099 31.4862C3.94887 31.3375 4.07235 31.2213 4.22494 31.1625C4.7202 30.9858 5.20259 30.7749 5.66861 30.5312C5.38739 29.6437 5.56861 28.4938 6.20611 27.1C6.70419 26.0061 7.4906 25.0685 8.48103 24.3875C8.64978 24.2688 10.156 23.2625 11.2123 23.7625C13.7407 25.4476 9.43839 29.5273 7.9124 30.6062C9.46854 30.6375 11.0373 29.4312 12.1685 28.2687C12.2552 28.1801 12.3662 28.1191 12.4875 28.0935C12.6088 28.068 12.735 28.079 12.8501 28.1251C12.9652 28.1713 13.064 28.2506 13.134 28.3529C13.204 28.4552 13.2421 28.576 13.2435 28.7V29.8812L15.3559 28.4C15.4919 28.3091 15.6582 28.2752 15.8189 28.3056C15.9797 28.336 16.1221 28.4283 16.2155 28.5626C16.3088 28.697 16.3457 28.8626 16.3182 29.0239C16.2907 29.1852 16.201 29.3292 16.0684 29.425Z" fill="#E4B809"/>
                        </svg>

                        <div className="flex space-y-1 flex-col border-l border-white/20 pl-4">
                            <span className="text-white text-md">Finish setting up your account</span>
                            <span className="text-white/60 text-sm">Provide intellectual property information</span>
                        </div>
                    </div>

                    <span onClick={() => router.push("/dashboard/ip")} 
                            className="px-3 py-2 border-1 border-white/20 rounded-full
                        text-white/80 cursor-pointer hover:bg-white/5 text-sm mb-auto">
                        Continue
                    </span>

                </div>
            </div>
        }
           
        
        </>
    );
}
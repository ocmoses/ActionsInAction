import {useEffect, useState} from "react";
import useProcessing from "@/hooks/useProcessing";
import useLogout from "@/hooks/useLogout";
import useErrors from "@/hooks/useErrors";
import { useStoreState } from "easy-peasy";


export default function TablePager({list, action, perPage=5, pages=null}){

    if(!list){
        return;
    }

    const { setProcessing } = useProcessing();
    const userStates = useStoreState((action) => action.users);
    const adminStates = useStoreState((action) => action.admins);
    const {Logout, LogoutAdmin} = useLogout();    
    const [{ errors, setError, clearErrors }] = useErrors(null);

    const totalPages = pages ? pages.total : Math.ceil(list.length / perPage);

    const [currentPage, setCurrentPage] = useState(0);

    const [links, setLinks] = useState([]);

    
    let pageLinks = [];

    const getPageLinks = () => {
        if(pages != null){
            pageLinks = pages.links.slice(1, pages.links.length - 1);        
        }else{
            let total = list?.length;
            let label = 1;
            for (let i = 0; i < totalPages; i++) {
                let pageObj = {start: i*perPage, end: (i+1) * perPage <= total ? (i+1) * perPage : total, label};
                label++;
                pageLinks.push(pageObj);
            }
        }
    }

    getPageLinks();
    

    console.log("pageLinks", pageLinks);


    useEffect(() => {      
      setLinks(pageLinks);
      action(list.slice(pageLinks[0]?.start, pageLinks[0]?.end));
      if(currentPage > 0){
        setCurrentPage(0);
      }      
    }, [list]);

    useEffect(() => { 
        
      }, []);


    const getChunk = async (chunk) => {
        try {
          
          setProcessing(true);
          const response = await fetch(
            chunk,
            {
              cache: "no-store",
              next: { revalidate: 120 },
              headers: {
                token: userStates.token ? userStates.token : adminStates.token,
                "Content-Type": "application/json",
                Authorization: `Bearer ${userStates.token ? userStates.token : adminStates.token}`,
              },
            }
          );

          setProcessing(false);
    
          // console.log("response", response);
          // console.log("response.status", response.status);
          // console.log("response.status === 401", response.status === 401);
    
          if (response.status === 401 ) {
            Logout();
            LogoutAdmin();
            return;
          }
    
          if (!response){
            setError( {error:"This request has no response available"});
          }
          
          const result = await response.json();    
          console.log("Paginated response", result);
    
          if (result?.success) {    
            const data = result?.data[pages.key].data;
            action(data);
          }
         setError({error:
              result?.data?.message ??
              "Something went wrong. Please check your connection and try again",
          });
        } catch (error) {
          console.log({ error });
          setError({error:
              error?.message ??
              "Something went wrong. Please check your connection and try again",
          });
        }
        
    }

    const handlePreviousClick = () => {

        console.log("currentPage before previous", currentPage);
        console.log("links", links); 

        if(currentPage == 0){
            return;
        }
        let computedCurrentPage = Math.max(currentPage - 1, 0);
        setCurrentPage(computedCurrentPage);
        
        console.log("computedCurrentPage", computedCurrentPage);
        console.log("links", links);

        if(pages){
            getChunk(pageLinks[computedCurrentPage].url);
        }else{
            action(list.slice(pageLinks[computedCurrentPage].start, pageLinks[computedCurrentPage].end));
        }
    }

    const handleNextClick = () => {

        console.log("currentPage before next", currentPage);
        console.log("links", links);

        if(currentPage == pageLinks.length - 1){
            return;
        }
        let computedCurrentPage = Math.min(currentPage + 1, pageLinks.length-1);
        setCurrentPage(computedCurrentPage);

        console.log("computedCurrentPage", computedCurrentPage);
        console.log("links", links);

        if(pages){
            getChunk(pageLinks[computedCurrentPage].url);
        }else{
            action(list.slice(pageLinks[computedCurrentPage].start, pageLinks[computedCurrentPage].end));
        }
    }

    return (
        <div className="w-full p-2 flex justify-between">
            <span onClick={handlePreviousClick} 
                    className={`inline-block p-2 border-1 w-20 rounded-full text-center text-sm m-3
                                ${currentPage == 0 ? 
                                    'text-white/20 border-white/20 cursor-not-allowed' : 
                                    'text-white/80 border-white/40 cursor-pointer hover:bg-white/10'}`}>
                    Previous
            </span>

            <div className="flex space-x-4 justify-center items-center text-white/80 text-sm">
                {
                    `Page ${currentPage + 1} of ${pageLinks.length}`
                }
            </div>

            <span onClick={handleNextClick} 
                    className={`inline-block p-2 border-1 w-20 rounded-full text-center text-sm m-3
                                ${currentPage == pageLinks.length-1 ? 
                                    'text-white/20 border-white/20 cursor-not-allowed' : 
                                    'text-white/80 border-white/40 cursor-pointer hover:bg-white/10'}`}>
                    Next
            </span>
        </div>

        
    );

    

}


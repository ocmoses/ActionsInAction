import {useState, useEffect, useRef} from 'react';
import FilterTag from './FilterTag';
import useErrors from "@/hooks/useErrors";
import moment from 'moment';
import { capitalizeFirst } from '../modules/utilities';

/**
 * 
 * @param list array, The list to filter/search through.  
 * @param filterAction function, the function to call after the filtering
 * @param keysArray array, An array of the object keys to consider when searching for keywords
 * @returns void
 */

export default function Filter({list, filterAction, keysArray=null, statusArray=null}){

    
    const [{ errors, setError, clearErrors }] = useErrors(null);

    const [filterModal, setFilterModal] = useState(false);
    const [search, setSearch] = useState({date: true, keyword: false, status: false});

    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const [searchTags, setSearchTags] = useState({
                        date_range: {from:"", to:""},
                        keywords: [],
                        status: []                  
                        });
    const [filterTags, setFilterTags] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const filterRef = useRef(null);

    // console.log("List entered", list);

    const doSearch = () => {
         
        displayFilters(); 

        let filtered = list ?? [];
        
        if(searchTags.date_range.from != "" && searchTags.date_range.to != ""){
          filtered = filtered
                      .filter(listItem => moment(listItem['created_at'])
                                                  .isBetween(moment(searchTags.date_range.from), moment(searchTags.date_range.to).add(1, 'days'))
                              );
        }

        // console.log("searchTags", searchTags); 
        // console.log("list", list); 
        // console.log("filtered", filtered); 
        

        if(searchTags.keywords.length > 0){
            let finalList = [];
            for(const listItem of filtered){
                for(const akey of keysArray){
                    for(const keyword of searchTags.keywords){                        
                        if(listItem[akey] && keyword){
                          try{
                            // console.log("listItem[akey]", listItem[akey]);
                            if(listItem[akey]?.toLowerCase().includes(keyword?.toLowerCase())){
                                if(!finalList.includes(listItem)){
                                    finalList.push(listItem);                                                               
                                }
                                break; 
                                
                            }   
                          }catch(e){

                          }
                                                 
                        }                        
                    }
                    
                }
            }
            filtered = finalList;
        }
    
        if(searchTags.status.length > 0 && filtered.length > 0){
            let finalList = [];
            for(const aStatus of searchTags.status){
                for(const aFiltered of filtered){
                    if(aFiltered['status']?.toLowerCase() == aStatus?.toLowerCase()){
                        if(!finalList.includes(aFiltered)){
                            finalList.push(aFiltered);
                        }
                    }
                }
            }
            filtered = finalList;
              
        }

        // console.log("filtered", filtered);
    
        filterAction(filtered);
    };
    
    const displayFilters = () => {
        let filterTags = [];
        if(searchTags.date_range.from != "" && searchTags.date_range.to != ""){
            filterTags.push(<FilterTag message={`From ${searchTags.date_range.from} to ${searchTags.date_range.to}`} action={() => {removeFilter("date_range")}} />);
        }
        if(searchTags.keywords.length != 0){
            searchTags.keywords.forEach(keyword => {
            filterTags.push(<FilterTag message={`${keyword}`} action={() => {removeFilter(`keyword***${keyword}`)}} />);
            });      
        }

        if(searchTags.status.length != 0){
            searchTags.status.forEach(aStatus => {
            filterTags.push(<FilterTag message={`${aStatus}`} action={() => {removeFilter(`status***${aStatus}`)}} />);
            });      
        }

        if(!filterTags.length){
            setFilterTags(<span className="text-sm text-gray-500">No filters applied</span>);
        }else{
            setFilterTags(filterTags);
        }    
    };
    
    const removeFilter = (filter) => {
    
        if(filter =='date_range'){
            setSearchTags({...searchTags, date_range: {from:"", to:""}});       
        }else if(filter.includes('keyword***')){
            const key = filter.split("***")[1];
            setSearchTags({...searchTags, keywords: searchTags.keywords.filter(k => k != key)}); 
        }else if(filter.includes('status***')){
            const key = filter.split("***")[1];
            setSearchTags({...searchTags, status: searchTags.status.filter(k => k != key)}); 
        }
    
    };
    
    useEffect(() => {
        document.addEventListener('click', function(e){
            if(!filterRef.current?.contains(e.target)){
              setFilterModal(false);
            }
        }, true);
        clearErrors();
        displayFilters();
        doSearch();
    }, [searchTags, selectedDateRange]);

    return (
        <div className="my-4 w-full relative flex" >
            <div className="border-1 border-white/20 rounded-full py-2 inline-flex items-center justify-center cursor-pointer" 
                  onClick={() => setFilterModal(!filterModal)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 ml-6 mt-1">
                <path d="M6 12v-1h4v1H6zM4 7h8v1H4V7zm10-4v1H2V3h12z"/>
              </svg>  <span className="mr-6 text-white">Add Filter</span>
            </div>
            <div className="ml-4 border-l-2 border-white/20 flex-1 my-1 px-4 flex items-center">
              {
                filterTags
              }
            </div>
            {
              filterModal && 
              <div id="filter_modal" ref={filterRef} className={`border-1 border-white/20 w-[600px] absolute left-4 z-[9999] bg-[#121212] rounded-xl shadow-xl flex mt-10`}>
                <div className="w-[250px] p-4 border-r-1 border-white/20 flex flex-col  space-y-4">
                  
                  <div className={`${search.date ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                      onClick={() => {if(!search.date){setSearch({...search, date: true, keyword: false, status: false});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg> &nbsp; &nbsp; 
                    <span className="flex-1">Date</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                  <div className={`${search.keyword ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                        onClick={() => {if(!search.keyword){setSearch({...search, date: false, keyword: true, status: false});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    &nbsp; &nbsp; 
                    <span className="flex-1">Keyword</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                  {
                    statusArray && (
                        <div className={`${search.status ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                                onClick={() => {if(!search.status){setSearch({...search, date: false, keyword: false, status: true});}}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            
                            <path d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            </path> 
                            
                            </svg>
                            &nbsp; &nbsp; 
                            <span className="flex-1">Status</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    )
                  }
                  

                </div>
                <div className="flex-1 p-4 h-[300px]">
                  {
                    search.date && 
                    <div className="flex flex-col space-y-4">
                      <div className="p-2 rounded-xl border-1 border-white/20 flex text-white items-center justify-center">
                                               
                        <input id="search-from" 
                                value={`${searchTags.date_range.from}`}
                                onFocus={() => document.getElementById("search-from").type = "date"} 
                                onBlur={() => document.getElementById("search-from").type = "text"} 
                                onChange={(e) => {
                                            setSearchTags({...searchTags, date_range : {...searchTags.date_range, from: e.target.value}});                                 
                                            setSelectedDateRange('from_to');
                                            doSearch(); 
                                          }
                                        } 
                                className="border-0 bg-white/20 text-white rounded-xl color-white p-2 w-[150px]" 
                                placeholder="From" /> - 
                        <input id="search-from2" 
                                value={`${searchTags.date_range.to}`}
                                onFocus={() => document.getElementById("search-from2").type = "date"} 
                                onBlur={() => document.getElementById("search-from2").type = "text"} 
                                onChange={(e) => {
                                                setSearchTags({...searchTags, date_range: {...searchTags.date_range, to: e.target.value}});
                                                setSelectedDateRange('from_to')
                                                doSearch();
                                              }
                                          }
                                className="border-0 bg-white/20 text-white rounded-xl color-white p-2 w-[150px]" 
                                placeholder="To" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                      </div>
                      <div className={`${selectedDateRange == 'last_30_days' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().subtract(30, 'd').format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD')} });  
                                          setSelectedDateRange('last_30_days');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">Last 30 days</span>
                      </div>
                      <div className={`${selectedDateRange == 'this_month' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().format('YYYY-MM-01'), to: moment().format('YYYY-MM-DD')} });  
                                          setSelectedDateRange('this_month');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">This month</span>
                      </div>
                      <div className={`${selectedDateRange == 'last_month' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().subtract(1, 'months').format('YYYY-MM-01'), to: moment().subtract(1, 'months').format('YYYY-MM-') + moment().subtract(1, 'months').daysInMonth()} });  
                                          setSelectedDateRange('last_month');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">Last month</span>
                      </div>
                      <div className={`${selectedDateRange == 'this_year' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().format('YYYY-01-01'), to: moment().format('YYYY-MM-DD')} });  
                                          setSelectedDateRange('this_year');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">This year</span>
                      </div>
                    </div>
                  }
                  {
                    search.keyword && 
                    <div className="flex flex-col space-y-4 px-2">
                      <div className="border-1 border-white/20 rounded-xl p-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input onBlur={() => {/* Search here*/}} placeholder="Search for a partner"
                          onKeyUp={(e) => {
                            if(e.key == 'Enter'){
                              if(e.target.value.trim() != ""){
                                setSearchTags({...searchTags, keywords: [...searchTags.keywords, e.target.value]}); 
                                doSearch(); 
                              }                              
                              e.target.value = ""; 
                            }
                          }}
                          className="border-0 bg-transparent focus:border-0 focus:border-transparent active:border-0 active:border-transparent text-white p-2 w-full ml-2" />
                      </div>
                      <span className="text-gray-400 text-sm">Find a contract by searching for a partner by their name</span>
                    </div>
                  }
                  {
                    statusArray && statusArray.length > 0 && search.status && 
                    <div className="flex flex-col space-y-4">
                        {
                            statusArray.map(aStatus => (

                                <div className="flex ">
                                    <div className="w-10 flex mr-1">
                                        <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" 
                                        onChange={(e) => {
                                            if(e.target.checked){
                                            setSearchTags({...searchTags, status: [...searchTags.status, aStatus]});
                                            }else{
                                            setSearchTags({...searchTags, status: searchTags.status.filter(a => a != aStatus)});                                  
                                            }
                                            doSearch();
                                        }} checked={`${searchTags.status.includes(aStatus) ? 'checked' : ''}`}/>
                                    </div>
                                    <div>
                                        <p className="text-gray-300">{capitalizeFirst(aStatus.replace('_', ' '))}</p>
                                    </div>
                                </div>

                                )
                                
                            )
                        }                       
                        
                    </div>
                  }

                </div>
              </div>
            }
            
        </div>
    );
    


}
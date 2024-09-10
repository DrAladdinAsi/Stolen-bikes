import Card from "../../components/Card/Card"
import Navbar from "../../components/Navbar/Navbar";
import "./homePage.css"
import { Bike } from "../../types/bikeInterface";

import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";

type TsearchCounts = {
  non : number ;
  stolen : number ;
  proximity : number ;
}


const HomePage = () => {


  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [bikesPerPage] = useState<number>(10); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBikes , setFilteredBikes] = useState<Bike[]>([])
  const [bikes,setBikes] = useState<Bike[]>([]);
  const [staticsResults , setStaticsResults] = useState(1)
  const [loading,setLoading] = useState(false);
  const [loadingFilter,setLoadingFilter] = useState(false);
  const [error,setError] = useState<string | null>(null);
  const [searchcounts,setSearchCounts] = useState<TsearchCounts>(
    {
    non : 0 ,
    stolen : 0 , 
    proximity : 0
  }) 


  const [startDate, setStartDate] = useState<string>(""); 
  const [endDate, setEndDate] = useState<string>(""); 

   // Fetch data with Axios
   useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://bikeindex.org/api/v3/search", {
          params: {
            page: 1,
            per_page: 25,
            location: "Munich",
            distance: 100,
            stolenness: "proximity",
          },
        });
        setFilteredBikes(response.data.bikes);
        setBikes(response.data.bikes);
        setLoading(false);
      } catch (error) {
        setError("Error fetching bikes");
        setLoading(false);
      }
    };

    const fetchBikesCounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://bikeindex.org:443/api/v3/search/count?location=Munich&distance=100&stolenness=proximity", {
          // params: {
          //   page: 1,
          //   per_page: 25,
          //   location: "Munich",
          //   distance: 100,
          //   stolenness: "proximity",
          // },
        });
        setSearchCounts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching bikes");
        setLoading(false);
      }
    };

    fetchBikes();
    fetchBikesCounts();
  }, []);




  function formatNumber(value: number): string {
    if (value >= 1000000) {
        // For numbers in the millions
        return `${Math.floor(value / 1000000)}M+`;
    } else if (value >= 1000) {
        // For numbers in the thousands
        return `${Math.floor(value / 1000)}k+`;
    }
    // For numbers below 1000, return the number itself
    return value.toString();
}



  
  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);




    // Calculate the bikes for the current page
    let  indexOfLastBike = currentPage * bikesPerPage;
    let  indexOfFirstBike = indexOfLastBike - bikesPerPage;
    let  currentBikes = filteredBikes.slice(indexOfFirstBike, indexOfLastBike);
  
  // const handelSearchClicked = ()=>{
  //    setCurrentPage(1);
  //   let  filteredBikesres = filteredBikes.filter((bike) =>
  //     bike.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  
  //  setFilteredBikes(filteredBikesres);

  //   console.log("the filtered data",filteredBikesres);
  // }


  // Total number of pages for pagination
  
  
  const totalPages = Math.ceil(filteredBikes.length / bikesPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  console.log("the totoal pages depending on the filtered pikes:" , totalPages)



  // Handle search logic when the search button is clicked
  const handleSearch = () => {

    setLoadingFilter(true);

    // Convert date strings to timestamps
    const startTimestamp = startDate ? new Date(startDate).getTime() / 1000 : 0;
    const endTimestamp = endDate ? new Date(endDate).getTime() / 1000 : Infinity;

    console.log("the start date is :",startTimestamp);
    console.log("the end date is :",endTimestamp);

    // Filter based on title and date range
    const filtered = bikes.filter((bike) => {
             
      console.log("if the bike within the date :",bike.date_stolen)

      const bikeDate = bike.date_stolen;
      if(bikeDate){
      const withinDateRange =
        bikeDate >= startTimestamp && bikeDate <= endTimestamp;
       
        console.log("if the bike within the date :",withinDateRange)

      return (
        bike.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        withinDateRange
      );
    }
    else{
      if(bike.title.toLowerCase().includes(searchTerm.toLowerCase()))
        return true;   
    }
  }
  );
    
    setFilteredBikes(filtered);
    setCurrentPage(1); // Reset to the first page after search
    setLoadingFilter(false);
  };



  return (
    <div className="HomePage">
      <Navbar/>
        <div className="HomePage_container">

          {
            error ?
            (<span style={{textAlign:"center"}}>{error}</span>)
            :
            <>

          {
            loading ?
            <Loading type="loading_data"/>
            :
            <>
          <div className="HomePage_container_FilterPart">
            <div className="HomePage_container_FilterPart_CaseTitle">
              <input type="text" 
              className="HomePage_container_FilterPart_CaseTitle_inp"
               placeholder="search by the case title"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)} />

              <button className="HomePage_container_FilterPart_CaseTitle_btn" onClick={()=>{handleSearch()}}><IoIosSearch className="HomePage_container_FilterPart_CaseTitle_btn_icon" /></button>
            </div>

            <div className="HomePage_container_FilterPart_filterByDate">
              <div className="HomePage_container_FilterPart_filterByDate_item">
                <span className="HomePage_container_FilterPart_filterByDate_item_label">From:</span>
                <input type="date" 
                className="HomePage_container_FilterPart_filterByDate_item_inp"
                value={startDate}
                onChange={(e)=>{setStartDate(e.target.value)}}
                />
              </div>
              <div className="HomePage_container_FilterPart_filterByDate_item">
                <span className="HomePage_container_FilterPart_filterByDate_item_label">To:</span>
                <input type="date" 
                className="HomePage_container_FilterPart_filterByDate_item_inp"
                value={endDate}
                onChange={(e)=>{setEndDate(e.target.value)}}
                 />
              </div>
            </div>

          </div>

          <div className="HomePage_container_statistics_results">
            <span className={staticsResults === 1 ? "HomePage_container_statistics_results_item bigger_statistic_item activated_item" : "HomePage_container_statistics_results_item bigger_statistic_item" } onClick={()=>{setStaticsResults(1)}} >Stolen within 100 miles of Munich ({filteredBikes.length})</span>
            <span className={staticsResults === 2 ? "HomePage_container_statistics_results_item left_border activated_item" : "HomePage_container_statistics_results_item left_border" }  onClick={()=>{setStaticsResults(2)}}>Stolen anywhere ({formatNumber(searchcounts.stolen)})</span>
            <span className={staticsResults === 3 ? "HomePage_container_statistics_results_item left_border activated_item" : "HomePage_container_statistics_results_item left_border" }  onClick={()=>{setStaticsResults(3)}}>Not marked stolen ({formatNumber(searchcounts.non)})</span>
            <span className={staticsResults === 4 ? "HomePage_container_statistics_results_item left_border activated_item" : "HomePage_container_statistics_results_item left_border" } onClick={()=>{setStaticsResults(4)}} >All (100)</span>

          </div>

          
          {
            loadingFilter ? 
            <Loading />
            :
            <>

          {filteredBikes.length === 0 && <p>No bikes found matching your search term.</p>}


            <div className="HomePage_container_items">
            {currentBikes.map((bike) => (
            <Card key={bike.id} bike={bike} />
          ))}

            {/* Pagination */}
        <div className="pagination">
          
        <button className='buttonNum_pagination_arrow' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            <FaAngleLeft  className={currentPage ===  1 ? 'arrow_disabled_Icon' : ''}  />
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`pagination_button ${currentPage === number ? "active_pagination_button" : ""}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}

        <button className={currentPage === totalPages ? 'buttonNum_pagination_arrow arrow_disabled' : 'buttonNum_pagination_arrow'} onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaAngleRight  className={currentPage === totalPages ? 'arrow_disabled_Icon' : ''} />
        </button>



        </div>

            </div>

            </>
      }

            </>
          }

          </>
        }


        </div>
    </div>
  )
}

export default HomePage
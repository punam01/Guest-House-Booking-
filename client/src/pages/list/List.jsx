import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.guesthouseName);
  const { data, loading, error,reFetch } = useFetch(`guesthouses?name=${destination}`);
  console.log(destination,data);
  const handleClick=()=>{
    reFetch();
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {loading?"Loading please wait..":
            <>{data.length > 0 ? (data.map((item)=>(
                <SearchItem item={item} key={item._id}/>
            ))):<p>No data available</p>}</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

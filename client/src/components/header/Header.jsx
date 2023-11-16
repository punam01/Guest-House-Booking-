import React, { useEffect } from "react";
import {
  faBed,
  faCalendarDays,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [guesthouseName, setGuesthouseName] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [guesthouseOptions, setGuesthouseOptions] = useState([]);

  useEffect(() => {
    // Fetch guesthouse options from your backend when the component mounts
    const fetchGuesthouses = async () => {
      try {
        const response = await fetch('/guesthouses'); // Replace with your actual backend endpoint
        const data = await response.json();
        setGuesthouseOptions(data);
      } catch (error) {
        console.error('Error fetching guesthouses:', error);
      }
    };

    fetchGuesthouses();
  }, []);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (dates[0].startDate.toISOString() === dates[0].endDate.toISOString()) {
      alert("Please select different start and end dates for booking.");
      return;
    }
    console.log(guesthouseName)
    dispatch({
      type: "NEW_SEARCH",
      payload: { dates, guesthouseName },
    });
    navigate("/guesthouses", {
      state: { dates, guesthouseName },
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faHome} className="headerIcon" />
                <select
                  id="guesthouseName"
                  className="headerSearchInput"
                  value={guesthouseName}
                  onChange={(e) => setGuesthouseName(e.target.value)}
                >
                  <option value="">Select Guesthouse</option>
                  {guesthouseOptions.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  SEARCH
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Header);

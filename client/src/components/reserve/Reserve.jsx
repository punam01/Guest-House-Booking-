import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import "../reserve/reserve.css";
import axios from "axios";
const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/guesthouses/room/${hotelId}`);
  console.log(data);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);

  const handleSelect = (e, roomNumber) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setSelectedRooms([...selectedRooms, value]);
    } else {
      setSelectedRooms(selectedRooms.filter((item) => item !== value));
    }
  };

  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDateInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    if (roomNumber.unavailableDates) {
      for (const date of roomNumber.unavailableDates) {
        if (allDates.includes(new Date(date).getTime())) {
          return false; // Room is unavailable for at least one date
        }
      }
    }
    return true; // Room is available for all selected dates
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomID) => {
          const res = axios.put(`/rooms/availability/${roomID}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      //navigate("/");
    } catch (error) {}
  };
  console.log(selectedRooms);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Price: {item.price}</div>
            </div>
            {item.roomNumbers.map((roomNumber) => (
              <div className="room" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}
                />
              </div>
            ))}
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;

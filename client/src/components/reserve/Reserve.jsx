import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import "../reserve/reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailForm from "../email/EmailForm";
import emailjs from 'emailjs-com';

const Reserve = ({ setOpen, hotelId, ghname }) => {
  const { data, loading, error } = useFetch(`/guesthouses/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomNum, setSelectedRoomNum] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation popup
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  console.log(data);
  const storedUserInfo = localStorage.getItem('user');
   const userInfo = JSON.parse(storedUserInfo);
  const userEmail = userInfo.email;
  const userName = userInfo.username;

  const handleSelect = (e, roomNumber) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      console.log(roomNumber.number);
      setSelectedRooms([...selectedRooms, value]);
      setSelectedRoomNum([...selectedRoomNum, roomNumber.number]);
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
        console.log(ghname);
      // Send email here
      const templateParams = {
        from_name: ghname,
        from_email: "nitk.ghouse@gmail.com", // Sender's email
        reply_to: "nitk.ghouse@gmail.com", // Sender's email address for replies
        to_name: userName,
        to_email: userEmail, // Receiver's email address
        message: `User Name: ${userName}\nRoom Numbers: ${selectedRoomNum.join(', ')}\nCheck-In Date: ${dates[0].startDate}\nCheck-Out Date: ${dates[0].endDate}`,
      };

      await emailjs.send("service_31y1czr", "template_m8hbsxw", templateParams, "wdC4n2WXSceAFkSI-");

      console.log(selectedRooms);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setOpen(false);
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms</span>
        {data && data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item?.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Price: ₹{item.price}</div>
            </div>
            {item.roomNumbers.map((roomNumber) => (
              <div className="room" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={(e) => handleSelect(e, roomNumber)}
                  disabled={!isAvailable(roomNumber)}
                />
              </div>
            ))}
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="confirmationPopup">
            <p>Reservation Confirmed!</p>
            <p>Details have been mailed on your registered email-id</p>
            <button onClick={handleConfirm}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;

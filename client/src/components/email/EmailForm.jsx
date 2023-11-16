import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = ({ ghname, data, selectedRooms, startDate, endDate }) => {
  const [serviceId, setServiceId] = useState("service_31y1czr");
  const [templateId, setTemplateId] = useState("template_m8hbsxw");
  const [publicKey, setPublicKey] = useState("wdC4n2WXSceAFkSI-");
  const storedUserInfo = localStorage.getItem('user');
  const userInfo = JSON.parse(storedUserInfo);
  const userEmail = userInfo.email;
  const userName = userInfo.username;
  console.log(userEmail);
  const [userData, setUserData] = useState({
    guesthouseName: ghname,
    roomNumber: selectedRooms,
    startDate: startDate,
    endDate: endDate,
    price: data.price,
  });
  console.log(userData);
  const handleSend = () => {
    const templateParams = {
      from_name: userData.guesthouseName,
      from_email: "nitk.ghouse@gmail.com",  // Sender's email
      reply_to: userEmail, // Sender's email address for replies
      to_name: userName,
      to_email: userEmail, // Receiver's email address
      message: `User Name: ${userName}\nRoom Numbers: ${userData.roomNumber.join(', ')}\nCheck-In Date: ${userData.startDate}\nCheck-Out Date: ${userData.endDate}`,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent to:', response);
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  return (
    <>
        <button onClick={handleSend}>Send Email</button>
    </>
  );
};

export default EmailForm;

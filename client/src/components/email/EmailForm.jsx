import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = () => {
  
    const [serviceId,setServiceId]=useState("service_31y1czr");
    const [templateId,setTemplateId]=useState("template_wwfl1bu");
    const [publicKey,setPublicKey]=useState("wdC4n2WXSceAFkSI-");

  const [userData, setUserData] = useState({
    guesthouseName: '',
    roomNumber: '',
    price: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSend = () => {
    const templateParams = {
      from_name: userData.guesthouseName,
      from_email: 'nitk.ghouse@gmail.com', // Sender's email
      to_name: 'NITK',
      message: `Room Number: ${userData.roomNumber}\nPrice: ${userData.price}\nStart Date: ${userData.startDate}\nEnd Date: ${userData.endDate}`,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent:', response);
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  return (
    <div>
      <label>
        Guesthouse Name:
        <input
          type="text"
          name="guesthouseName"
          value={userData.guesthouseName}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Room Number:
        <input
          type="text"
          name="roomNumber"
          value={userData.roomNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Price:
        <input
          type="text"
          name="price"
          value={userData.price}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Start Date:
        <input
          type="text"
          name="startDate"
          value={userData.startDate}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        End Date:
        <input
          type="text"
          name="endDate"
          value={userData.endDate}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button onClick={handleSend}>Send Email</button>
    </div>
  );
};

export default EmailForm;


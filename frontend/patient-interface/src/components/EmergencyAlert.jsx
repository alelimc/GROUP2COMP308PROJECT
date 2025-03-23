import React, { useState } from 'react';

const EmergencyAlert = () => {
  const [alertMessage, setAlertMessage] = useState('');

  const sendAlert = async () => {
    // TODO: Implement emergency alert submission
  };

  return (
    <div className="emergency-alert">
      <h2>Emergency Alert</h2>
      <textarea
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
        placeholder="Describe your emergency..."
      />
      <button onClick={sendAlert} className="alert-btn">
        Send Emergency Alert
      </button>
    </div>
  );
};

export default EmergencyAlert;
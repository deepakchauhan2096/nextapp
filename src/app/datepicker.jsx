import React, { useState } from "react";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(""); // स्टार्ट डेट स्टेट
  const [endDate, setEndDate] = useState(""); // एंड डेट स्टेट

  const handleDateSelection = () => {
    const start = prompt("Enter Start Date (YYYY-MM-DD):");
    const end = prompt("Enter End Date (YYYY-MM-DD):");

    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Calendar Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h2a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h2V2zm1 1v1h6V3H7zM4 7h12v9H4V7z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Date Range Picker Input */}
      <input
        type="text"
        placeholder="Select Date Range"
        value={startDate && endDate ? `${startDate} - ${endDate}` : ""}
        onClick={handleDateSelection}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        readOnly
      />
    </div>
  );
};

export default DatePicker;

"use client";
import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  styleIem,
  styleInput,
  styleBtn,
  placeholder = "Select",
  option = [],
  onChange,
  value = [],
}) => {
  const [isdropdown, setIsdropdown] = useState(false);
  // const [inputs, setInputs] = useState([]);
  const dropdownRef = useRef(null);

  const handleInputs = (e) => {
    const { value, checked } = e.target;

    // Add or remove value based on checkbox state
    if (checked) {
      onChange((prev) => [...new Set([...prev, value])]);
    } else {
      onChange((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsdropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div
        style={{
          position: "relative",
          display: "flex",
          minHeight: "30px",
          width: "260px",
          border: "1px solid #000",
          padding: "0 8px",
          alignItems: "center",
          justifyContent: "space-between", // Adjusts spacing between input and arrow
          boxSizing: "border-box",
          cursor: "pointer",
          ...styleInput,
        }}
        type="text"
        onClick={() => setIsdropdown((prev) => !prev)}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "nowrap",
            overflow: "hidden",
            flexGrow: 1, // Allows content to shrink
          }}
        >
          {value.length > 0 ? (
            value.map((item) => (
              <span
                style={{
                  backgroundColor: "#e5e7eb",
                  padding: "0 8px",
                  borderRadius: "4px",
                  ...styleBtn,
                }}
                key={item}
              >
                {item}
              </span>
            ))
          ) : (
            <span>{placeholder}</span>
          )}
        </div>

        {/* Arrow Down Icon */}
        <div
          style={{
            marginLeft: "8px",
            fontSize: "14px",
            color: "#000",
          }}
        >
          ▼
        </div>
      </div>

      {/* Dropdown Options */}
      {isdropdown && option.length > 0 && (
        <div
          style={{
            position: "absolute",
            height: "auto",
            minWidth: "inherit",
            border: "1px solid #60a5fa",
            backgroundColor: "#fff",
            zIndex: 10,
            marginTop: 10,
            ...styleInput,
            ...styleIem,
          }}
        >
          <form style={{ padding: "0 0px" }}>
            {option.map((item, index) => (
              <div key={index} className="flex">
                <input
                  type="checkbox"
                  id={`item${index}`}
                  name={`item${index}`}
                  value={item}
                  onChange={handleInputs}
                  checked={value.includes(item)}
                  style={{
                    display: "none",
                  }}
                  className="hover:bg-slate-200"
                />
                <label
                  style={{
                    paddingLeft: "5px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  className="hover:bg-slate-200"
                  htmlFor={`item${index}`}
                >
                  {value.includes(item) ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      display:"inline",
                      width: "14pxpx",
                      height: "14px",
                      color: "", // Green color for the check icon
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg> : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      display:"inline",
                      width: "14pxpx",
                      height: "14px",
                      color: "", // Green color for the check icon
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>}
                  {item}
                </label>
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

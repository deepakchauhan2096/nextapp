"use client";
import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Page = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [formInputs, setFormInputs] = useState({});
  const [save, setSave] = useState(true);

  console.log(data, "datavv");

  const options = ["sku", "order", "purchase"];
  const fieldOptions = [
    "name",
    "age",
    "gender",
    "dob",
    "area",
    "block",
    "city",
  ];

  const handleItem = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    if (inputValue && !data.some((d) => d.item === inputValue)) {
      setData([...data, { item: inputValue, form: [] }]);
      setInputValue("");
    }
  };

  const handleAddField = () => {
    if (activeTab >= 0) {
      const field = formInputs[activeTab]?.newField;
      if (field && !data[activeTab].form.some((f) => f.item === field)) {
        const updatedData = [...data];
        updatedData[activeTab].form.push({ item: field, value: "" });
        setData(updatedData);
        setFormInputs({ ...formInputs, [activeTab]: { newField: "" } });
      }
    }
  };

  const handleFieldValueChange = (value, fieldIndex) => {
    const updatedData = [...data];
    updatedData[activeTab].form[fieldIndex].value = value;
    setData(updatedData);
  };

  const handleRemoveField = (fieldIndex) => {
    const updatedData = [...data];
    updatedData[activeTab].form.splice(fieldIndex, 1);
    setData(updatedData);
  };

  const handleRemoveTab = (tabIndex) => {
    setData(data.filter((_, index) => index !== tabIndex));
    setActiveTab(-1);
  };

  const renderForm = () => {
    const tabData = data[activeTab]?.form || [];
    return (
      <div className="border border-blue-300 p-5">
        <div className="flex gap-2 mb-3">
          <select
            className="w-[200px] h-[37px] border border-gray-500 rounded-md"
            value={formInputs[activeTab]?.newField || ""}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                [activeTab]: { newField: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Select Field
            </option>
            {fieldOptions.map((field, index) => (
              <option key={index} value={field}>
                {field}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddField}
            className="w-[37px] h-[37px] bg-blue-900 text-white border border-gray-500 rounded-md"
          >
            +
          </button>
        </div>

        {tabData.map((field, index) =>
          save ? (
            <div className="relative w-80 inline-grid">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleFieldValueChange(e.target.value, index)}
                className="w-full px-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
              />
              <button
                onClick={() => handleRemoveField(index)}
                className="absolute top-1/2 right-1 -translate-y-1/2 w-8 h-8 bg-orange-500 text-white text-lg font-bold rounded-md hover:bg-orange-600"
              >
                ×
              </button>
            </div>
          ) : (
            <Accordion key={`${field.item}-${index}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content-${index}`}
                id={`panel-header-${index}`}
              >
                <Typography>{field.item}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="relative w-80">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handleFieldValueChange(e.target.value, index)
                    }
                    className="w-full px-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter value"
                  />
                  <button
                    onClick={() => handleRemoveField(index)}
                    className="absolute top-1/2 right-1 -translate-y-1/2 w-8 h-8 bg-orange-500 text-white text-lg font-bold rounded-md hover:bg-orange-600"
                  >
                    ×
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          )
        )}

        {
          <div className="inline-grid">
            <button
              onClick={() => setSave()}
              className="mb-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 inline-grid"
            >
              Save
            </button>
          </div>
        }
      </div>
    );
  };

  return (
    <>
      <Box p={2}>
        <div className="flex gap-2 mb-2">
          <select
            className="w-[200px] h-[37px] border border-gray-500 rounded-md"
            value={inputValue}
            onChange={handleItem}
          >
            <option value="" disabled>
              Select Tab
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="w-[37px] h-[37px] bg-blue-900 text-white border border-gray-500 rounded-md"
          >
            +
          </button>
        </div>

        {data.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`rounded-t-md h-[40px] inline-flex items-center px-10 cursor-pointer ${
              activeTab === index ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
          >
            {tab.item}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTab(index);
              }}
              className="ml-2 text-white bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full flex justify-center items-center"
            >
              ×
            </button>
          </div>
        ))}

        {activeTab >= 0 && renderForm()}
      </Box>
    </>
  );
};

export default Page;

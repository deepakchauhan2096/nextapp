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
import DatePicker from "./datepicker";

const ReqForm = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [formInputs, setFormInputs] = useState({});

  console.log(data, "datavv");

  const options = ["Order", "User", "Sku"];
  const fieldOptions = [
    "name",
    "age",
    "gender",
    "dob",
    "area",
    "block",
    "city",
    "createdAt"
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

  const [save, setSave] = useState();

  const renderForm = () => {
    const tabData = data[activeTab]?.form || [];

    return (
      <>
        <div className="border border-blue-300 p-5">
          <div className="flex gap-2 mb-3">
            <select
              className="w-[258px] h-[40px] border border-gray-500 rounded-md"
              value={formInputs[activeTab]?.newField || "0"}
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
              className="w-[40px] h-[40px] bg-blue-900 text-white border border-gray-500 rounded-md"
            >
              +
            </button>
          </div>

          <div className={save ? `p-[5px] rounded-md bg-slate-300 w-fit` : ""}>
            {tabData.map((field, index) =>
              !save ? (
                <div className="inline-grid mr-2 mb-2">
                  {field.item == "createdAt" ? <DatePicker/> :  <div>
                    <label className="capitalize">{field.item}</label>
                    <div className="relative w-[290px] mt-2">
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
                  </div>}
                </div>
              ) : (
                <div className="p-3 rounded-md bg-slate-300 w-fit">
                  <Accordion
                    key={`${field.item}-${index}`}
                    className="w-[270px] shadow-none border-none p-0"

                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-content-${index}`}
                      id={`panel-header-${index}`}
                      sx={{
                        color: "indigo",
                        border:"none"
                      }}
                    >
                      <Typography>{field.item}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{bgcolor:"transparent" , boxShadow:"none" ,border:"none"}} className="mt-2 border-none shadow-none bg-slate-300 px-0">
                      <div className="relative w-full">
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
                </div>
              )
            )}
          </div>

          <button
            onClick={() => setSave((s) => !s)}
            type="button"
            className="bg-buttonBlue hover:to-buttonBlueHover block p-2 px-10 text-white rounded-md mt-4 bg-slate-700"
          >
            Save
          </button>
        </div>
      </>
    );
  };

  return (
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
          className={`w-fit inline-flex rounded-t-md h-[40px] items-center px-0 cursor-pointer ${
            activeTab === index
              ? "bg-buttonBlue text-white bg-sky-600"
              : "bg-buttonBlueHover bg-sky-600"
          }`}
        >
          <div className="w-[150px] flex justify-between items-center px-2">
            <button className="ml flex flex-row items-center">
              {/* <img
                src="/assets/svg/close-btn.svg"
                alt="close"
                className="w-4 h-4 text-white mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTab(index);
                }}
              /> */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTab(index);
                }}
                className="pr-2"
              >
                x
              </div>
              <span className="text-white flex flex-row items-center">
                {/* <img
                  src="/assets/svg/user.svg"
                  alt="close"
                  className="w-4 h-4 text-white mr-2"
                /> */}
                {tab.item}
              </span>
            </button>
          </div>
        </div>
      ))}

      {activeTab >= 0 && renderForm()}
    </Box>
  );
};

export default ReqForm;

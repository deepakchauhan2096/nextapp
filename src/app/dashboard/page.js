"use client"
import { useState } from "react";
import Dropdown from "../View/dropdown";
import Blog from "../View/Blogs";

export default function Home() {
  const [input, setInputs] = useState([]);

  // console.log(input, "inputbvh");

  return (
    <>
      <Dropdown
        styleInput={{
          border: "1px solid #696969",
          width: "400px",
          height: "30px",
          borderRadius: "5px",
          background: "white",
          color: "#696969",
        }}
        styleIem={{
          background: "white",
          height: "auto",
        }}
        option={["bike", "pink"]}
        value={input}
        onChange={setInputs}
      />
      <Blog />
    </>
  );
}

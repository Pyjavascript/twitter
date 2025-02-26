import React, { useEffect, useState } from "react";
import Arrowback from "../icons/Arrowback";
import { useNavigate } from "react-router-dom";

function Lists() {
  const [data, Setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/api/user`)
      .then((res) => res.json())
      .then((data) => {
        Setdata(data);
        // console.log(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);
  return (
    <div className="h-full w-full p-4">
      <div className=" flex justify-start gap-2">
        <div
          className="flex justify-center items-center"
          onClick={() => navigate("/")}
        >
          <Arrowback />
        </div>
        <h1 className="font-medium text-2xl">Public Space</h1>
      </div>
      <div className=" w-full h-auto p-3 px-0 flex flex-col gap-2">
        {data.map((item, ind) => (
          <>
            <div className="w-full bg-white p-[5px] flex items-center justify-between border rounded-xl" key={ind}>
              <div className="flex items-center gap-2">
                <div className="bg-black h-10 w-10 rounded-full"></div>
                <div>
                  <p className="text-sm">{item.displayName}</p>
                  <p className=" w-36 md:w-auto overflow-y-hidden overflow-scroll pscroll">{item.email}</p>
                </div>
              </div>
              <button className="bg-sky-500 text-white p-1 px-4 rounded-full">
                follow
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Lists;

{
  /* <div className="w-full bg-white p-[5px] flex items-center justify-between border rounded-xl">
<div className="flex items-center gap-2">
  <div className="bg-black h-10 w-10 rounded-full"></div>
 <div>
 <p className="text-sm">Manpreet Singh</p>
 <p>ms0014460@gmail.com</p>
 </div>
</div>
<button className="bg-sky-500 text-white p-1 px-4 rounded-full">
  follow
</button>
</div> */
}

import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(150);
  const [status, setStatus] = useState("online");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-amber-100 text-white gap-[20px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center gap-[20px]">
          <button
            onClick={() => {
              console.log("Decreasing...");
              setCount(220);
            }}
            className="w-[100px] bg-accent h-[40px] rounded-lg"
          >
            -
          </button>

          <span className="text-accent text-5xl">{count}</span>

          <button
            onClick={() => {
              console.log("Adding...");
              setCount(440);
            }}
            className="w-[100px] bg-accent h-[40px] rounded-lg"
          >
            +
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <span className="text-accent text-5xl">{status}</span>
          <div className="flex flex-row gap-[20px]">
            <button onClick={()=> setStatus("Online")}className="w-[100px] bg-accent h-[40px] rounded-lg">
              Online
            </button>
            <button onClick={()=> setStatus("Offline")}className="w-[100px] bg-accent h-[40px] rounded-lg">
              Offline
            </button>
            <button onClick={()=> setStatus("Deactivated")} className="w-[100px] bg-accent h-[40px] rounded-lg">
              Deactivated
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

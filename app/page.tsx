"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");
  const [guess, setGuess] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const passwordChecker = () => {
    if (isLocked) {
      alert("Too many attempts! Input locked.");
      return;
    }

    if (password === "1234") {
      alert("Password is correct!");
      setCount(0); // Reset attempt counter on success
    } else {
      alert("Incorrect password.");
      setCount(count + 1);

      if (count >= 4) {
        // 4 because we start counting from 0
        setIsLocked(true);
        alert("Too many attempts! Input locked.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
        <div className="bg-white p-6 rounded shadow-lg">
          <input
            className="p-1 bg-gray-300 text-black rounded mb-4"
            type="text"
            placeholder="Type here..."
            value={password}
            onChange={(e) => !isLocked && setPassword(e.target.value)}
            disabled={isLocked}
          />

          <button
            className={`text-white m-3 p-2 rounded ${
              isLocked ? "bg-red-500" : "bg-green-500"
              }`}
            onClick={passwordChecker}
            disabled={isLocked}
          >
            {isLocked ? "Locked" : `Log In`}
          </button>
              <h1 
              className="text-center p-5 text-black animate-pulse"
              >
                waiting for guess..
              </h1>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [attempt, setAttempt] = useState(0);
  const [password, setPassword] = useState("");
  const [guess, setGuess] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();

  const passwordChecker = () => {
    if (isLocked) {
      setGuess("Too many attempts! Input locked.");
      return;
    }

    if (password === "1234") {
      router.push("/success");
      setAttempt(0);
      setGuess("Correct password!");
    } else {
      const nextAttempt = attempt + 1;
      setAttempt(nextAttempt);

      if (nextAttempt >= 3) {
        setIsLocked(true);
        setGuess("Input is locked after 3 wrong attempts!");
      } else {
        setGuess(`Incorrect password. Attempt ${nextAttempt}/3`);
      }
    }
  };

  return (
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
          {isLocked ? "Locked" : "Log In"}
        </button>

        <h1 className="text-center p-5 text-black animate-pulse">
          {isLocked ? "Input is locked after 3 wrong attempts!" : guess || "Waiting for input..."}
        </h1>
      </div>
    </div>
  );
}

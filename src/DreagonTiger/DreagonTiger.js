import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./DreagonTiger.css";

const suits = ["hearts", "spades", "clubs", "diamonds"];
const values = [
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 11 },
  { name: "Q", value: 12 },
  { name: "K", value: 13 },
  { name: "A", value: 14 },
];

const fullDeck = [];
suits.forEach((suit) => {
  values.forEach((val) => {
    fullDeck.push({ ...val, suit });
  });
});

const DreagonTiger = () => {
  const [bet, setBet] = useState(null);
  const [betAmount, setBetAmount] = useState(null);
  const [dragonCard, setDragonCard] = useState(null);
  const [tigerCard, setTigerCard] = useState(null);
  const [result, setResult] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [coins, setCoins] = useState(1000);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [revealDragon, setRevealDragon] = useState(false);
  const [revealTiger, setRevealTiger] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    let timer;
    if (bet && betAmount !== null) {
      if (countdown === 30) setCoins((prev) => prev - betAmount);
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        revealCards();
      }
    }
    return () => clearTimeout(timer);
  }, [countdown, bet, betAmount]);

  const revealCards = () => {
    const shuffled = [...fullDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const d = shuffled.pop();
    let t = shuffled.pop();

    while (t.name === d.name && t.suit === d.suit) {
      t = shuffled.pop();
    }

    setDragonCard(d);
    setTigerCard(t);
    setTimeout(() => setRevealDragon(true), 500);
    setTimeout(() => setRevealTiger(true), 1500);

    setTimeout(() => {
      if (
        (d.value > t.value && bet === "Dragon") ||
        (t.value > d.value && bet === "Tiger") ||
        (d.value === t.value && bet === "Tie")
      ) {
        const winAmount = bet === "Tie" ? betAmount * 5 : betAmount * 2;
        setResult("🎉 You Win!");
        setCoins((prev) => prev + winAmount);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setResult("❌ You Lose!");
        setShake(true);
        setTimeout(() => setShake(false), 1000);
      }
      setTimeout(() => {
        setDragonCard(null);
        setTigerCard(null);
        setResult("");
        setCountdown(30);
        setRevealDragon(false);
        setRevealTiger(false);
        setBet(null);
        setBetAmount(null);
      }, 4000);
    }, 3000);
  };

  const getCardImagePath = (card) => {
    if (!card || !card.suit) return "./assets/cards/patti_back.png";
    const suitMap = { clubs: "CC", diamonds: "DD", hearts: "HH", spades: "SS" };
    return `./assets/cards/${card.name}${suitMap[card.suit]}.png`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-red-500 flex items-center justify-center p-2 sm:p-4">
      {showConfetti && <Confetti width={width} height={height} />}
      <div
        className={`${
          width <= 640
            ? ""
            : "bg-white/10 backdrop-blur-md border border-white/20"
        } rounded-2xl p-4 sm:p-8 w-full max-w-3xl text-center transition-all duration-500 ${
          shake ? "animate-shake" : ""
        } ${
          width <= 640 ? "shadow-none" : "shadow-lg" // Remove shadow on mobile view
        }`}
      >
        <div className="w-full flex justify-between items-center mb-4">
          <div className="inline-block text-white text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 px-3 py-1 rounded-lg shadow">
            💰 <span className="text-yellow-300">{coins}</span>
          </div>

          {result && (
            <div className="mb-4 text-base sm:text-lg font-bold justify-center text-white">
              {result}
            </div>
          )}

          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <svg className="w-full h-full rotate-[-90deg] scale-y-[-1]">
              <defs>
                <linearGradient
                  id="greenGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient
                  id="redGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              <circle
                cx="50%"
                cy="50%"
                r="15"
                stroke="#1f2937"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="15"
                stroke={`url(#${
                  countdown <= 5 ? "redGradient" : "greenGradient"
                })`}
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 15}
                strokeDashoffset={((30 - countdown) / 30) * 2 * Math.PI * 15}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-gray-200 text-sm sm:text-base">
              {countdown > 0 ? countdown : "⏱"}
            </div>
          </div>
        </div>

        {coins < 10 && (
          <div className="text-red-300 text-sm mb-2">
            ❗ Not enough coins to place a bet. Earn more to play.
          </div>
        )}

        <div className="flex justify-around flex-wrap sm:flex-nowrap gap-4 mb-6 text-white text-2xl sm:text-3xl">
          <div className="flex flex-col items-center">
            <img
              src="./assets/dragon.png"
              alt="Dragon"
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
            />
            <div className="mt-2 card-container">
              <div className={`card-inner ${revealDragon ? "flipped" : ""}`}>
                <img
                  src={getCardImagePath(dragonCard)}
                  alt="Dragon"
                  className="card-front object-contain"
                />
                <img
                  src="./assets/cards/patti_back.png"
                  alt="Back"
                  className="card-back object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="./assets/vs.png"
              alt="VS"
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
            />
          </div>

          <div className="flex flex-col items-center">
            <img
              src="./assets/tiger.png"
              alt="Tiger"
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
            />
            <div className="mt-2 card-container">
              <div className={`card-inner ${revealTiger ? "flipped" : ""}`}>
                <img
                  src={getCardImagePath(tigerCard)}
                  alt="Tiger"
                  className="card-front object-contain"
                />
                <img
                  src="./assets/cards/patti_back.png"
                  alt="Back"
                  className="card-back object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
          {["Dragon", "Tie", "Tiger"].map((b) => {
            const bgColor =
              b === "Dragon"
                ? "bg-gradient-to-b from-cyan-700 to-cyan-500"
                : b === "Tie"
                ? "bg-gradient-to-b from-green-700 to-green-500"
                : "bg-gradient-to-b from-red-700 to-red-500";
            const isSelected = bet === b;

            return (
              <div
                key={b}
                className={`relative w-24 h-36 sm:w-32 sm:h-48 rounded-md overflow-hidden flex flex-col items-center justify-between pt-2 ${bgColor} shadow-lg`}
              >
                {countdown <= 5 && (
                  <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                    <span className="text-4xl text-white">🔒</span>
                  </div>
                )}

                {/* Show coin amount on top */}
                <div className="text-white font-extrabold text-sm sm:text-lg z-0">
                  {isSelected && betAmount > 0 ? betAmount : 0}
                </div>

                {/* Image / Tie label */}
                <div className="flex-1 flex items-center justify-center z-0">
                  {b === "Tie" ? (
                    <div className="w-10 h-10 text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-inner">
                      Tie
                    </div>
                  ) : (
                    <img
                      src={
                        b === "Dragon"
                          ? "./assets/dragon.png"
                          : "./assets/tiger.png"
                      }
                      alt={b}
                      className={`opacity-40 object-contain transition-transform duration-300 ${
                        isSelected ? "scale-110" : "scale-100"
                      } w-14 h-14 sm:w-20 sm:h-20`}
                    />
                  )}
                </div>

                {/* BET Button only if no bet placed or already selected */}
                <button
                  onClick={() => {
                    if (coins >= 10 && countdown > 5) {
                      setBet(b);
                    }
                  }}
                  disabled={countdown <= 5 || coins < 10}
                  className="w-full z-10 py-1 bg-black/30 text-white text-xs sm:text-sm font-bold rounded-b-md hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSelected ? "Selected" : "BET"}
                </button>
              </div>
            );
          })}
        </div>
        <div className="overflow-x-auto">
          <div className="flex justify-center gap-2 sm:gap-3 flex-nowrap px-2 w-max mx-auto my-1">
            {[10, 20, 50, 100, 200, 500].map((amt) => (
              <div key={amt} className="relative">
                <button
                  onClick={() =>
                    countdown > 5 && coins >= 10 && setBetAmount(amt)
                  }
                  disabled={countdown <= 5 || coins < 10}
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-all duration-300 ${
                    betAmount === amt ? "ring-2 ring-yellow-300" : ""
                  } ${
                    countdown <= 5 || coins < 10
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <img
                    src={`./assets/coins/${amt}.png`}
                    alt={`${amt} Coin`}
                    className="absolute inset-0 w-full h-full object-contain z-0"
                  />
                  {(countdown <= 5 || coins < 10) && (
                    <span className="absolute inset-0 flex items-center justify-center z-10 text-base sm:text-xl text-white bg-black/60 rounded-full">
                      🔒
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreagonTiger;

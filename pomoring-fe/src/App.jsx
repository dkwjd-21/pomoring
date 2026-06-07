import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const TOTAL_SECONDS = 25 * 60; // 25분 (1500초)
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const timerRef = useRef(null);

  const MAX_CLOCK_SECONDS = 60 * 60;
  const angle = (timeLeft / MAX_CLOCK_SECONDS) * 360;

  useEffect(() => {
    if (isRunning) {
      const tickRate = isTestMode ? 1000 / 60 : 1000;

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            alert("🍅 25분 뽀모도로 완료! 수고했어링! 💖");
            return 0;
          }
          return prev - 1;
        });
      }, tickRate);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isTestMode]);

  const handleStartStop = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const ticks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
      <div
          className="flex flex-col items-center justify-center min-h-screen w-full p-6 select-none relative font-mono"
          style={{
            backgroundColor: '#fff0f3',
            backgroundImage: 'radial-gradient(#ffb7ce 2.5px, transparent 2.5px)',
            backgroundSize: '28px 28px'
          }}
      >

        <div className="mb-6 bg-[#08060d] text-white px-5 py-2.5 rounded-full flex items-center gap-3 border border-[#08060d] shadow-[2px_2px_0px_0px_rgba(255,183,206,1)] z-10">
          <span className="text-xs font-bold text-[#ffb7ce]">🛠️ POMO_LAB:</span>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
                type="checkbox"
                checked={isTestMode}
                onChange={(e) => setIsTestMode(e.target.checked)}
                className="w-4 h-4 accent-[#ff4d6d] cursor-pointer"
            />
            60X SPEED {isTestMode ? "🔴 ON" : "⚪ OFF"}
          </label>
        </div>

        <div className="relative w-[500px] h-[560px] bg-[#fefdf9] border-2 border-[#08060d] rounded-2xl p-6 shadow-[2px_2px_0px_0px_rgba(8,6,13,1)] flex flex-col justify-between items-center z-10">

          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#08060d] rounded-t-sm flex justify-between px-3">
            <div className="w-1 h-1 bg-[#ff4d6d] rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>

          <div className="w-full aspect-square bg-[#ffe5ec] border-2 border-[#08060d] rounded-xl p-3 flex items-center justify-center">

            <div className="relative w-full h-full bg-white border-2 border-[#08060d] rounded-full flex items-center justify-center p-1">

              <div className="absolute inset-0 rounded-full">
                {ticks.map((tick, i) => {
                  const angleRad = ((i * 30 - 90) * Math.PI) / 180;
                  const x = 50 + 43 * Math.cos(angleRad);
                  const y = 50 + 43 * Math.sin(angleRad);
                  return (
                      <span
                          key={tick}
                          className="absolute text-xs font-black text-[#08060d] -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${x}%`, top: `${y}%` }}
                      >
                    {tick}
                  </span>
                  );
                })}
              </div>

              <div
                  className="w-[84%] h-[84%] rounded-full border-2 border-[#08060d] flex items-center justify-center overflow-hidden transition-all duration-200 ease-linear"
                  style={{
                    background: `conic-gradient(#fefdfb ${angle}deg, #ffb7ce ${angle}deg 360deg)`
                  }}
              >
                <div
                    className="absolute inset-0 z-10 pointer-events-none transition-transform duration-200"
                    style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div className="w-0.5 h-1/2 bg-[#08060d] mx-auto origin-bottom" />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[135px] h-[135px] bg-white border-2 border-[#08060d] rounded-xl z-30 flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_rgba(8,6,13,0.1)]">
                <span className={`text-xl mb-1 ${isRunning ? 'animate-bounce' : ''}`}>🍅</span>
                <span className="text-2xl font-black text-[#08060d] tracking-tighter leading-none">
                {formatTime()}
              </span>
                <span className={`text-[9px] font-black tracking-widest uppercase mt-3 px-2.5 py-0.5 border-2 border-[#08060d] rounded-sm ${
                    isRunning ? 'bg-[#ffb7ce] text-[#08060d]' : 'bg-[#e5e4e7] text-[#6b6375]'
                }`}>
                {isRunning ? "FOCUS" : "HOLD"}
              </span>
              </div>

            </div>
          </div>

          <div className="flex gap-4 w-full px-1 mt-4 z-10 mb-2">
            <button
                onClick={handleStartStop}
                className={`flex-1 py-3.5 font-black text-xs tracking-widest rounded-xl border-2 border-[#08060d] shadow-[2px_2px_0px_0px_rgba(8,6,13,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_rgba(8,6,13,1)] ${
                    isRunning
                        ? 'bg-[#ffb7ce] text-[#08060d]'
                        : 'bg-[#ff8ba7] text-white'
                }`}
            >
              {isRunning ? '◼ PAUSE' : '▶ START'}
            </button>

            <button
                onClick={handleReset}
                className="py-3.5 px-6 font-black bg-[#f4f3ec] text-[#08060d] text-xs tracking-widest rounded-xl border-2 border-[#08060d] shadow-[2px_2px_0px_0px_rgba(8,6,13,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_rgba(8,6,13,1)] hover:bg-[#e5e4e7]"
            >
              🔄 RESET
            </button>
          </div>

        </div>
      </div>
  );
}
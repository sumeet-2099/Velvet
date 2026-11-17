"use client";

import React, { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const completedRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let currentProgress = 0;
    let targetProgress = 15;
    const startTime = performance.now();
    const minDuration = 2200; // 2.2s minimum for cinematic storyboard progression

    // 1. Calibrate to document readystate
    if (document.readyState === "complete") {
      targetProgress = Math.max(targetProgress, 60);
    } else if (document.readyState === "interactive") {
      targetProgress = Math.max(targetProgress, 35);
    }

    const handleReadyState = () => {
      if (document.readyState === "interactive") {
        targetProgress = Math.max(targetProgress, 45);
      } else if (document.readyState === "complete") {
        targetProgress = Math.max(targetProgress, 80);
      }
    };
    document.addEventListener("readystatechange", handleReadyState);

    // 2. Calibrate to web fonts readiness
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        targetProgress = Math.max(targetProgress, 70);
      });
    }

    // 3. Calibrate to full window load
    const handleWindowLoad = () => {
      targetProgress = 100;
    };

    if (document.readyState === "complete") {
      targetProgress = 100;
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    // Safety timeout: ensure progress reaches 100% even if third-party scripts stall
    const fallbackTimer = setTimeout(() => {
      targetProgress = 100;
    }, 4500);

    const updateLoop = (now: number) => {
      const elapsed = now - startTime;
      const timePacing = Math.min((elapsed / minDuration) * 100, 100);

      // Calibrated progress: pace gracefully with time, held back if real assets are still downloading
      let calculated = Math.min(timePacing, targetProgress);
      if (elapsed >= minDuration && targetProgress >= 100) {
        calculated = 100;
      }

      currentProgress += (calculated - currentProgress) * 0.12;

      // Map progress to storyboard stages (Phrase 1)
      if (currentProgress < 20) {
        setStage(1); // 1. Initial State
      } else if (currentProgress < 45) {
        setStage(2); // 2. The V Emblem Appears
      } else if (currentProgress < 68) {
        setStage(3); // 3. Emblem Illuminates
      } else if (currentProgress < 85) {
        setStage(4); // 4. Velvet Wordmark Fades In
      } else {
        setStage(5); // 5. Loading Text & Progress Bar
      }

      if (currentProgress >= 99.4 && (elapsed >= minDuration || targetProgress >= 100)) {
        currentProgress = 100;
        setProgress(100);
        setStage(5);

        // Small hold at 100% before fade out (Stage 6)
        setTimeout(() => {
          setStage(6);
          setIsFadingOut(true);

          if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }

          // Unmount after fade out duration (0.4s)
          setTimeout(() => {
            setIsRemoved(true);
          }, 450);
        }, 180);

        return;
      }

      setProgress(Math.round(currentProgress));
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      document.removeEventListener("readystatechange", handleReadyState);
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-canvas select-none transition-all duration-400 ease-out overflow-hidden ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-[1.02] filter blur-[4px]"
          : "opacity-100"
      }`}
    >
      {/* ================= AMBIENT BACKGROUND CONTOUR CURVES (Phrase 1.1) ================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#abd1c6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#789575" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#004643" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#004643" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#001e1d" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -100,200 C 400,100 800,500 1600,300"
          fill="none"
          stroke="url(#curveGrad1)"
          strokeWidth="1.2"
        />
        <path
          d="M 200,-50 C 700,300 900,700 1550,850"
          fill="none"
          stroke="url(#curveGrad2)"
          strokeWidth="1.5"
        />
        <path
          d="M -50,750 C 500,600 1000,850 1500,650"
          fill="none"
          stroke="url(#curveGrad1)"
          strokeWidth="0.8"
        />
      </svg>

      {/* Central Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-emerald-500/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* ================= CENTER EMBLEM & WORDMARK CONTAINER ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center -translate-y-4">
        {/* V EMBLEM (Stages 2 & 3) */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Luminous metallic fill gradients */}
              <linearGradient id="vLeftWing" x1="0%" y1="30%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#2d3e30" />
                <stop offset="45%" stopColor="#abd1c6" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              <linearGradient id="vRightWing" x1="0%" y1="30%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#abd1c6" />
                <stop offset="100%" stopColor="#2d3e30" />
              </linearGradient>

              {/* Glowing halo behind emblem */}
              <radialGradient id="vCenterGlow" cx="50%" cy="50%" r="48%">
                <stop offset="0%" stopColor="#c5e6dd" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#5f7e5c" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#001e1d" stopOpacity="0" />
              </radialGradient>

              <filter id="emblemBloom" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Stage 3: Glowing Radial Halo */}
            <ellipse
              cx="100"
              cy="108"
              rx="64"
              ry="50"
              fill="url(#vCenterGlow)"
              className={`transition-opacity duration-700 ease-out ${
                stage >= 3 ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Stage 2 & 3: Left Wing Path */}
            <path
              d="M 40,54 C 34,52 26,58 28,66 C 30,74 38,78 52,88 C 64,96 80,106 100,148 C 100,148 100,72 100,72 C 82,66 58,56 40,54 Z"
              fill={stage >= 3 ? "url(#vLeftWing)" : "none"}
              stroke="#abd1c6"
              strokeWidth={stage === 2 ? "1.4" : "0.5"}
              strokeDasharray="300"
              strokeDashoffset={stage >= 2 ? 0 : 300}
              className="transition-all duration-700 ease-out"
              filter={stage >= 3 ? "url(#emblemBloom)" : undefined}
            />

            {/* Stage 2 & 3: Right Wing Path */}
            <path
              d="M 160,54 C 166,52 174,58 172,66 C 170,74 162,78 148,88 C 136,96 120,106 100,148 C 100,148 100,72 100,72 C 118,66 142,56 160,54 Z"
              fill={stage >= 3 ? "url(#vRightWing)" : "none"}
              stroke="#abd1c6"
              strokeWidth={stage === 2 ? "1.4" : "0.5"}
              strokeDasharray="300"
              strokeDashoffset={stage >= 2 ? 0 : 300}
              className="transition-all duration-700 ease-out"
              filter={stage >= 3 ? "url(#emblemBloom)" : undefined}
            />

            {/* Stage 2 Flare Dot Tracing the wing tip */}
            {stage === 2 && (
              <circle
                cx="100"
                cy="72"
                r="3"
                fill="#ffffff"
                className="animate-pulse shadow-[0_0_10px_#ffffff]"
              />
            )}

            {/* Center Crease Highlight */}
            <line
              x1="100"
              y1="72"
              x2="100"
              y2="148"
              stroke="#ffffff"
              strokeWidth="0.8"
              className={`transition-opacity duration-700 ${
                stage >= 3 ? "opacity-70" : "opacity-0"
              }`}
            />

            {/* Top-centre joining spot */}
            <ellipse
              cx="100"
              cy="68"
              rx="18"
              ry="6"
              fill="#ffffff"
              className={`transition-opacity duration-700 ${
                stage >= 3 ? "opacity-90" : "opacity-0"
              }`}
            />
          </svg>
        </div>

        {/* VELVET WORDMARK (Stage 4) */}
        <div
          className={`mt-3 text-center transition-all duration-600 ease-out ${
            stage >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]">
            Velvet
          </span>
        </div>
      </div>

      {/* ================= LOADING TEXT & PROGRESS BAR (Stage 5) ================= */}
      <div
        className={`absolute bottom-16 sm:bottom-20 z-10 flex flex-col items-center gap-3 w-full max-w-xs px-6 transition-all duration-500 ease-out ${
          stage >= 4
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {/* Tracked Text matching Storyboard 1.5 */}
        <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.26em] text-[#abd1c6]/90 uppercase text-center animate-pulse">
          LOADING THE NEXT CHAPTER...
        </span>

        {/* Sleek Progress Capsule Bar */}
        <div className="relative w-full h-[3px] bg-white/[0.08] rounded-full overflow-hidden backdrop-blur-sm border border-white/[0.05]">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-200 to-white rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
          {/* Glowing head pulse */}
          {progress > 0 && progress < 100 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_15px_#abd1c6] -translate-x-1/2 transition-all duration-100 ease-out"
              style={{ left: `${progress}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

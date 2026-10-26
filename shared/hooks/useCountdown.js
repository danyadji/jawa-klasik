import { useState, useEffect } from 'react';

/**
 * Hook universal untuk hitung mundur tanggal acara
 * @param {string|Date} targetDate - Tanggal tujuan (misal '2026-10-26 10:00:00')
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isExpired: boolean }}
 */
export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  function calculateTimeLeft(target) {
    if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };
    const targetMs = new Date(target).getTime();
    if (isNaN(targetMs)) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };

    const diff = targetMs - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isExpired: false };
  }

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

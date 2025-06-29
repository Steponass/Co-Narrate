import { useState, useEffect, useRef } from "react";

export function useCooldownTimer(initialTime = 15) {
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(initialTime);
  const timerRef = useRef(null);

  useEffect(() => {
    if (cooldownActive && cooldownTime > 0) {
      timerRef.current = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setCooldownActive(false);
            return initialTime;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [cooldownTime, cooldownActive, initialTime]);

  const startCooldown = () => setCooldownActive(true);

  return { cooldownActive, cooldownTime, startCooldown };
}

// hooks/useIdleLogout.js
import { useEffect } from "react";
import { useStaffstore } from "../Store/staffStore";


export const useIdleLogout = (timeout = 5 * 60 * 1000) => { // 5 min
  const { logout } = useStaffstore;

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logout();
        window.location.href = "/"; // force redirect to login
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start timer

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logout, timeout]);
};

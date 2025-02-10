import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function InfoBottom (){
    const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

    const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000
    );

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDateTime(new Date());
  }

  const formatDate = (date) => {
    const userTimeZone = moment.tz.guess();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: userTimeZone};
    return date.toLocaleString('id-ID', options);
  };

    const [scrollDirection, setScrollDirection] = useState("down");
    const [showDateTime, setShowDateTime] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;

            if (currentPosition > 0 && currentPosition > lastScrollTop) {
                setScrollDirection("down");
                setShowDateTime(false);
            } else {
                setScrollDirection("up");
                setShowDateTime(true);
            }

            lastScrollTop = currentPosition <= 0 ? 0 : currentPosition;
        };

        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


  return(
    <div>
        <button onClick={toggleTheme}
                        className="text-white bg-slate-600 h-10 w-10 dark:bg-white dark:text-black fixed bottom-5 right-5 rounded-full"
                        >
        {dark ? <FiMoon size="32"/> : <FiSun size="32"/> }
        </button>
        <div className="relative">
            <div className={`fixed bottom-5 left-5 p-2  bg-blue-200 rounded-xl ${showDateTime ? "opacity-100 transition-opacity duration-500" : "opacity-0 transition-opacity duration-500"}`}>
                <p>{formatDate(dateTime)}</p>
            </div>
        </div>
    </div>
  )
}
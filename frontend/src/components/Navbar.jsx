import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [shownav, setShowNav] = useState(false);
  const [navAnimate, setNavAnimate] = useState(false);
  const [hover, setHover] = useState(null);
  const { scrollY } = useScroll();

  const navItem = [
    { name: "View", path: "/" },
    { name: "Add", path: "/add" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavAnimate(latest > 10);
  });

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <motion.nav
      animate={{
        width: navAnimate ? "90%" : "100%",
        borderRadius: navAnimate ? "30px" : "0px",
        boxShadow: `0 4px 8px var(--color-nav-shadow)`,
        transform: `translateX(${navAnimate ? "5%" : "0%"})`,
      }}
      className="fixed top-0 z-50 flex items-center justify-between px-4 py-4 bg-[var(--color-nav-bg)] text-[var(--color-nav-text)] transition-all duration-500"
    >
      <div className="text-lg sm:text-3xl font-extrabold">
        Itemx
      </div>

     
      <div className="hidden lg:flex ">
        {navItem.map((item, i) => (
          <Link
            to={item.path}
            key={item.name}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="uppercase text-md relative font-bold text-[var(--color-nav-text-secondary)] px-4 py-1"
          >
            {item.name}
            {hover === i && (
              <motion.div
                layoutId="hovered-span"
                className="absolute top-0 left-0 w-full h-full bg-blue-400  rounded z-[-1]"
              />
            )}
          </Link>
        ))}
      </div>

      {/* Dark Mode & Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleDarkMode}
          className="text-white dark:text-yellow-400 focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <g stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="black" viewBox="0 0 24 24">
              <path
                stroke="black"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                fill="black"
              />
            </svg>
          )}
        </button>

        
        <div
          className="flex flex-col items-center gap-1 z-100 cursor-pointer lg:hidden"
          onClick={() => setShowNav(!shownav)}
        >
          {[1, 0, -1].map((item, idx) => (
            <motion.div
              key={idx}
              transition={{ duration: 0.4 }}
              animate={{
                transform: `rotateZ(${(shownav ? 70 : 0) * item}deg) translateX(${(shownav ? 20*idx*-1: 0) * item}%)`,
                opacity: shownav ? 1 * Math.abs(item) : 1,
              }}
              className="w-6 h-[3px] bg-[var(--color-herosecondary)] origin-center"
            />
          ))}
        </div>
      </div>

    
      <motion.div
        animate={{ y: shownav ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 w-full h-screen bg-[var(--color-nav-bg)]  flex flex-col justify-center items-center gap-6 lg:hidden z-40"
      >
        {navItem.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            onClick={() => setShowNav(false)}
            className="uppercase text-lg font-bold text-[var(--color-nav-text-secondary)]"
          >
            {item.name}
          </Link>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

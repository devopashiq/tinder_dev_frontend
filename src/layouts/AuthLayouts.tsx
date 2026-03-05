import { useEffect, useRef, useState } from "react";
import Login from "../pages/Login";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

function AuthLayouts() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLHeadingElement | null>(null);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState(false);

  const location = useLocation();

  const demoCardData = [
    {
      step: "01",
      icon: "👤",
      title: "Create Your Profile",
      desc: "Showcase your skills, projects, and what you're looking for in a dev partner",
    },
    {
      step: "02",
      icon: "💫",
      title: "Swipe on Devs",
      desc: "Browse profiles, check out GitHub repos, and swipe right on developers you vibe with",
    },
    {
      step: "03",
      icon: "🤝",
      title: "Match & Build",
      desc: "When you both swipe right, it's a match! Start chatting and building together",
    },
  ];

  useEffect(() => {
    if (location.state?.openLogin) {
      setShowLogin(true);
    }
  }, [location.state]);

  useEffect(() => {
    const title = titleRef.current;
    const button = ctaRef.current;
    if (!title || !button) return;

    const fadeDistance = 300;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let opacity = 1 - scrollY / fadeDistance;

      if (opacity < 0) opacity = 0;
      if (opacity > 1) opacity = 1;

      title.style.opacity = opacity.toString();
      button.style.opacity = opacity.toString();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLogin]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200 && !isFixed) {
        setIsFixed(true);
      }

      if (window.scrollY <= 200 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFixed]);

  return (
    <main className="">
      <div
        ref={heroRef}
        className="relative  min-h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-linear-to-br from-purple-900 via-pink-900 to-indigo-900"
      >
        <div
          className={`
    top-4 left-1/2 -translate-x-1/2
    w-[95%] max-w-7xl
    rounded-full px-6 py-3 z-50

    transition-all duration-700 ease-out

    ${
      isFixed
        ? "fixed bg-black/70 backdrop-blur-xl shadow-lg animate-slide-down"
        : "absolute bg-white/10 backdrop-blur-md -translate-y-1 opacity-100"
    }
  `}
        >
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-white">
              DevTinder
            </a>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full transition"
            >
              Log In
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div
            ref={titleRef}
            className="text-center space-y-6 transition-all duration-300  mt-30"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 border border-white/20 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Now Live
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
              Build Bonds
              <br />
              <span className="bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text animate-gradient">
                That Scale
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
              Connect, collaborate, and create meaningful relationships that
              grow with your vision
            </p>
          </div>

          <div ref={ctaRef} className="mt-12 transition-all duration-300">
            <button
              onClick={() => setShowLogin(true)}
              className="group relative px-8 py-4 bg-white text-purple-900 rounded-full font-bold text-lg overflow-hidden shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-5 flex items-center gap-2">
                Create Account
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-linear-to-b from-gray-900 to-black text-white py-22 px-4 min-h-dvh">
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 backdrop-blur-lg rounded-full px-6 py-2 border border-pink-500/20 mb-6">
            <span className="text-pink-400 text-sm font-medium">
              💘 Tinder for Developers
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Swipe. Match. Code.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find your perfect dev partner, collaborator, or co-founder with a
            simple swipe
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mt-12  ">
            {demoCardData.map((card, index) => (
              <Card key={index} {...card}></Card>
            ))}
          </div>
        </div>
      </div>
      <footer className="relative  bg-black text-white pt-20 pb-10 px-6 border-t border-white/10">
        <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 via-purple-500/10 bg-indigo-500/10 blur-3xl opacity-40 -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              DevTinder
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find your perfect dev partner. Build meaningful connections. Ship
              faster together.
            </p>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4 text-white">Services</h6>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-pink-400 transition">Branding</li>
              <li className="hover:text-pink-400 transition">Design</li>
              <li className="hover:text-pink-400 transition">Marketing</li>
              <li className="hover:text-pink-400 transition">Advertisement</li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4 text-white">Company</h6>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-purple-400 transition">About us</li>
              <li className="hover:text-purple-400 transition">Contact</li>
              <li className="hover:text-purple-400 transition">Jobs</li>
              <li className="hover:text-purple-400 transition">Press kit</li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4 text-white">Legal</h6>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-indigo-400 transition">Terms of use</li>
              <li className="hover:text-indigo-400 transition">
                Privacy policy
              </li>
              <li className="hover:text-indigo-400 transition">
                Cookie policy
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </div>
      </footer>
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <Login handleClose={() => setShowLogin(false)} />
        </div>
      )}
    </main>
  );
}

export default AuthLayouts;

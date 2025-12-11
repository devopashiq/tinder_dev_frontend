import { useEffect, useRef, useState } from "react";
import Login from "../pages/Login";
import { useLocation } from "react-router-dom";

function AuthLayouts() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const location = useLocation();

  // 🔹 Open login when navigation sends state
  useEffect(() => {
    if (location.state?.openLogin) {
      setShowLogin(true);
    }
  }, [location.state]);

  // 🔹 PARALLAX EFFECT (guaranteed working)
useEffect(() => {
  const title = titleRef.current;

  const handleScroll = () => {
    const scroll = window.scrollY;
    // const speed = 0.35;
    const fadeDistance = 200;

    // // PARALLAX
    // if (parallaxRef.current ) {
    //   parallaxRef.current.style.transform = `translateY(${scroll * speed}px)`;
      
    // }



    // // FADE
    if (title) {
      console.log(1-(scroll*0.7)/fadeDistance);
      
      let opacity = 1 - (scroll*0.5) / fadeDistance;
      opacity = Math.max(0, Math.min(1, opacity)); // clamp 0 to 1
      title.style.opacity = opacity.toString(); // ✅ correct
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <main>
      {/* HERO SECTION WITH PARALLAX */}
 <div
  ref={heroRef}
  className="relative  h-screen flex flex-col items-center justify-center overflow-hidden  z-99 bg-black"
>
  {/* Background pinned only inside hero */}
 
    <img
      ref={parallaxRef}
      src="/background.png"
      className="absolute inset-0 w-full h-full object-cover "
    />


        {/* CONTENT ABOVE IMAGE */}
        <h1 className="relative text-white text-6xl md:text-8xl font-bold text-center mb-8 "   ref={titleRef}
  id="heroTitle">
          Build Bonds That Scale.
        </h1>

        <button
          className="relative bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          onClick={() => setShowLogin(true)}
        >
          Create Account
        </button>

        {/* LOGIN MODAL */}
        {showLogin && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/75">
            <Login handleClose={() => setShowLogin(false)} />
          </div>
        )}
      </div>

      {/* SECOND SECTION FOR SCROLLING */}
    {/* <div className="bg-red-400 relative z-10 w-full h-dvh flex items-center justify-center text-4xl text-white">
  bla bla
</div> */}

    </main>
  );
}

export default AuthLayouts;

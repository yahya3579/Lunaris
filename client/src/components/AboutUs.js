import React, { useEffect, useRef } from "react";
import aboutUsImg from "../assets/images/about.jpg";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Main section animation
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power2.out"
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image animation
    gsap.fromTo(imageRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div
            ref={contentRef}
            className="space-y-6"
          >
            <div className="flex items-center mb-6 sm:mb-8 w-full">
              {/* Left Arrow */}
              <svg
                width="24"
                height="10"
                viewBox="0 0 32 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 sm:w-8 sm:h-3"
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.2 }
                  );
                }}
              >
                <path d="M12 6H0" stroke="#CBE9FF" strokeWidth="2" />
                <path d="M6 1L0 6L6 11" stroke="#CBE9FF" strokeWidth="2" />
              </svg>
              {/* Heading */}
              <h2
                className="text-[#192937] font-bold text-xl sm:text-2xl md:text-3xl tracking-wide"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  letterSpacing: "0.05em",
                }}
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, delay: 0.3 }
                  );
                }}
              >
                ABOUT US
              </h2>
              {/* Right Line */}
              <div
                className="flex-1 ml-2 h-0.5 rounded-full"
                style={{ minWidth: "32px", background: "#CBE9FF" }}
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { width: 0, opacity: 0 },
                    { width: "100%", opacity: 1, duration: 0.7, delay: 0.4 }
                  );
                }}
              ></div>
            </div>
            <div
              className="space-y-4"
              ref={el => {
                if (el) gsap.fromTo(el,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: 0.2,
                    scrollTrigger: {
                      trigger: el,
                      start: "top 80%",
                      toggleActions: "play none none reverse"
                    }
                  }
                );
              }}
            >
              <p
                className="text-gray-600 text-sm sm:text-base leading-relaxed"
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { opacity: 0, x: -20 },
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.5,
                      delay: 0.2,
                      scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                      }
                    }
                  );
                }}
              >
                At Lunaris, we understand that your property is more than just
                an asset it's an investment that deserves expert care and
                proven results. We transform short-term rental management into a
                seamless, reliable, and scalable system, where owners gain
                confidence, guests enjoy exceptional experiences, and properties
                perform at their highest potential.
              </p>
              <p
                className="text-gray-600 text-sm sm:text-base leading-relaxed"
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { opacity: 0, x: -20 },
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.5,
                      delay: 0.3,
                      scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                      }
                    }
                  );
                }}
              >
                Our commitment is simple: We protect your property, elevate your
                returns, and build partnerships based on trust and transparency.
              </p>
              <p
                className="text-gray-600 text-sm sm:text-base leading-relaxed"
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { opacity: 0, x: -20 },
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.5,
                      delay: 0.4,
                      scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                      }
                    }
                  );
                }}
              >
                Lunaris provides comprehensive management solutions that take
                the pressure off owners and deliver measurable results. From
                precise pricing strategies and professional upkeep to
                world-class guest communication, our services are designed to be
                effortless for owners, exceptional for guests, and profitable
                for investors.
              </p>
              <div
                className="pt-0"
                ref={el => {
                  if (el) gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.5,
                      delay: 0.5,
                      scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                      }
                    }
                  );
                }}
              >
                <Link
                  to="/about"
                  className="inline-block px-6 py-1.5 rounded-lg border"
                  style={{
                    background: "#CBE9FF",
                    borderColor: "#1A2A49",
                    color: "#1A2A49",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    boxShadow: "0 1px 2px 0 rgba(26,42,73,0.04)",
                    textDecoration: "none",
                  }}
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
          {/* Right Content - Interior Image */}
          <div
            ref={imageRef}
            className="flex justify-center items-center mt-8 lg:mt-0"
          >
            <div
              className="rounded-xl overflow-hidden shadow-lg border border-gray-100 aspect-[4/3] w-full max-w-lg bg-white"
            >
              <img
                src={aboutUsImg}
                alt="About Us Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

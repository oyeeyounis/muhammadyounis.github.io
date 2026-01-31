import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline character animation
      const headlineChars = headlineRef.current?.querySelectorAll('.char');
      if (headlineChars) {
        gsap.fromTo(
          headlineChars,
          {
            opacity: 0,
            y: 80,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.4,
          }
        );
      }

      // Underline animation
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6, ease: 'expo.out', delay: 1.2 }
      );

      // Subheadline animation
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out', delay: 1 }
      );

      // CTA button animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          delay: 1.3,
        }
      );

      // Scroll animations
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
          onUpdate: (self) => {
            if (headlineRef.current) {
              gsap.set(headlineRef.current, {
                y: -80 * self.progress,
                opacity: 1 - 0.7 * self.progress,
              });
            }
          },
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
          onUpdate: (self) => {
            if (subheadlineRef.current) {
              gsap.set(subheadlineRef.current, {
                y: -120 * self.progress,
                opacity: 1 - self.progress,
              });
            }
          },
        })
      );

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
          onUpdate: (self) => {
            if (particlesRef.current) {
              gsap.set(particlesRef.current, {
                opacity: 1 - 0.8 * self.progress,
              });
            }
          },
        })
      );

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 6,
    color: i % 3 === 0 ? '#1e90ff' : i % 3 === 1 ? '#cbe9ff' : '#ffffff',
  }));

  const firstName = 'MUHAMMAD';
  const lastName = 'YOUNIS';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#00476b] via-[#0066a6] to-[#1e90ff]"
    >
      {/* Particle System */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Decorative Diamonds */}
      <div className="absolute right-10 top-1/4 hidden lg:block">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 border-2 border-white/20 rotate-45 animate-float-slow"
            style={{
              right: `${i * 30}px`,
              top: `${i * 40}px`,
              animationDelay: `${i * 0.5}s`,
              backgroundColor: i % 2 === 0 ? 'rgba(30, 144, 255, 0.2)' : 'transparent',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="perspective-1000 preserve-3d mb-6"
          style={{ animation: 'float-hero 6s ease-in-out infinite' }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight">
            <span className="block mb-2">
              {firstName.split('').map((char, i) => (
                <span
                  key={`first-${i}`}
                  className="char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block relative">
              {lastName.split('').map((char, i) => (
                <span
                  key={`last-${i}`}
                  className="char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char}
                </span>
              ))}
              {/* Animated Underline */}
              <div
                ref={underlineRef}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1.5 w-3/4 rounded-full animate-shimmer"
              />
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light"
        >
          BS Information Technology Graduate | Cisco Networking | Cloud Computing
        </p>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00476b] rounded-full font-bold text-lg transition-all duration-300 hover:scale-108 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(30,144,255,0.4)] hover:bg-[#00476b] hover:text-white"
          style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
        >
          View My Portfolio
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Title animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              titleRef.current,
              { x: -60, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
              { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'expo.out' }
            );
          },
        })
      );

      // Decorative shape animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: shapeRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              shapeRef.current,
              { scale: 0, rotate: -180 },
              { scale: 1, rotate: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.1 }
            );
          },
        })
      );

      // Image animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              imageRef.current,
              { rotateY: -90, opacity: 0 },
              { rotateY: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.2 }
            );
          },
        })
      );

      // Paragraphs animation
      const paragraphs = paragraphsRef.current?.querySelectorAll('p');
      if (paragraphs) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: paragraphsRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                paragraphs,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.4 }
              );
            },
          })
        );
      }

      // CTA animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              ctaRef.current,
              { scale: 0.5, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)', delay: 0.8 }
            );
          },
        })
      );

      // Parallax effects
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (imageRef.current) {
              gsap.set(imageRef.current, { y: -50 * self.progress });
            }
            if (shapeRef.current) {
              gsap.set(shapeRef.current, { rotate: 45 * self.progress });
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative SVG Shape */}
      <div
        ref={shapeRef}
        className="absolute left-0 top-1/4 w-64 h-64 -translate-x-1/2 opacity-10"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-slow-rotate">
          <path
            fill="none"
            stroke="#1e90ff"
            strokeWidth="2"
            d="M100,10 L190,100 L100,190 L10,100 Z"
          />
          <path
            fill="rgba(203, 233, 255, 0.3)"
            d="M100,30 L170,100 L100,170 L30,100 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative perspective-1000 preserve-3d group"
              style={{
                animation: 'breathe-subtle 8s ease-in-out infinite',
              }}
            >
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#cbe9ff] to-[#1e90ff] rounded-3xl opacity-30 transform rotate-3 transition-transform duration-500 group-hover:rotate-6" />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                <img
                  src="/about-portrait.jpg"
                  alt="Muhammad Younis"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00476b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1e90ff] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">3.4</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#afafaf]">CGPA</p>
                    <p className="font-bold text-[#00476b]">BS IT Graduate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl font-extrabold text-[#00476b] mb-8"
            >
              About Me
            </h2>

            <div ref={paragraphsRef} className="space-y-5 text-[#00476b]/80 leading-relaxed">
              <p className="text-lg">
                I am a motivated and tech-savvy BS Information Technology graduate with hands-on
                experience in customer service and technical tools.
              </p>

              <p>
                My expertise spans across Cisco Packet Tracer networking, Python programming, and
                cloud computing concepts. I have a strong foundation in both technical
                implementation and client communication.
              </p>

              <p>
                Currently based in Multan, Pakistan, I am eager to contribute my problem-solving
                abilities and continuous learning mindset to a dynamic organization.
              </p>
            </div>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              href="/Muhammad_Younis_CV.pdf"
              download
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 border-2 border-[#1e90ff] text-[#1e90ff] rounded-full font-bold transition-all duration-300 hover:bg-[#1e90ff] hover:text-white hover:-translate-y-1 hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Accent Lines */}
      <div className="absolute right-0 top-1/3 w-32 h-0.5 bg-gradient-to-r from-[#1e90ff] to-transparent" />
      <div className="absolute right-0 top-1/3 mt-4 w-24 h-0.5 bg-gradient-to-r from-[#cbe9ff] to-transparent" />
      <div className="absolute right-0 top-1/3 mt-8 w-16 h-0.5 bg-gradient-to-r from-[#1e90ff]/50 to-transparent" />
    </section>
  );
};

export default About;

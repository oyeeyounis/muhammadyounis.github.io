import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, ExternalLink, Building2, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Title typewriter effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              titleRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
          },
        })
      );

      // Background shapes animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: shapesRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const shapes = shapesRef.current?.querySelectorAll('.shape');
            if (shapes) {
              gsap.fromTo(
                shapes,
                { y: 100, opacity: 0, rotate: 0 },
                {
                  y: 0,
                  opacity: 0.3,
                  rotate: 360,
                  duration: 1,
                  stagger: 0.1,
                  ease: 'expo.out',
                  delay: 0.2,
                }
              );
            }
          },
        })
      );

      // Card animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cardRef.current,
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'expo.out',
                delay: 0.4,
              }
            );
          },
        })
      );

      // Badge animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: badgeRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              badgeRef.current,
              { scale: 0, rotate: -180 },
              {
                scale: 1,
                rotate: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.7,
              }
            );
          },
        })
      );

      // Parallax effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (cardRef.current) {
              gsap.set(cardRef.current, { y: 30 - 60 * self.progress });
            }
            const shapes = shapesRef.current?.querySelectorAll('.shape');
            if (shapes) {
              shapes.forEach((shape, i) => {
                gsap.set(shape, { y: -50 * self.progress * (i + 1) * 0.5 });
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

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Background Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="shape absolute top-20 left-10 w-32 h-32 border-2 border-[#cbe9ff] rounded-2xl rotate-12"
          style={{ opacity: 0 }}
        />
        <div
          className="shape absolute top-40 right-20 w-24 h-24 bg-[#cbe9ff]/30 rounded-full"
          style={{ opacity: 0 }}
        />
        <div
          className="shape absolute bottom-20 left-1/4 w-16 h-16 bg-[#1e90ff]/10 rounded-lg -rotate-12"
          style={{ opacity: 0 }}
        />
        <div
          className="shape absolute bottom-40 right-1/3 w-20 h-20 border-2 border-[#1e90ff]/20 rounded-full"
          style={{ opacity: 0 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-[#00476b] text-center mb-16"
        >
          Certifications
        </h2>

        {/* Certification Card */}
        <div
          ref={cardRef}
          className="relative glass rounded-3xl p-8 lg:p-12 shadow-xl overflow-hidden group"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000"
              style={{ transform: 'skewX(-20deg)' }}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Badge Icon */}
            <div
              ref={badgeRef}
              className="relative flex-shrink-0 animate-badge-float"
            >
              <div className="w-28 h-28 bg-gradient-to-br from-[#1e90ff] to-[#00476b] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#1e90ff]/30">
                <Trophy className="w-14 h-14" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#1e90ff] rounded-2xl blur-xl opacity-30 -z-10" />
            </div>

            {/* Content */}
            <div className="text-center lg:text-left flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#00476b] mb-4">
                Huawei Cloud Computing International Certification
              </h3>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e90ff]/10 text-[#1e90ff] rounded-full text-sm font-medium">
                  <User className="w-4 h-4" />
                  Ongoing
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#cbe9ff]/50 text-[#00476b] rounded-full text-sm font-medium">
                  <Building2 className="w-4 h-4" />
                  Sponsored by Huawei & Government of Punjab
                </span>
              </div>

              <p className="text-[#00476b]/70 leading-relaxed mb-6">
                Pursuing international certification in cloud computing technologies with focus on
                enterprise cloud solutions and infrastructure management. This certification
                demonstrates commitment to staying current with industry-leading cloud technologies.
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#afafaf]">Progress</span>
                  <span className="text-[#1e90ff] font-medium">In Progress</span>
                </div>
                <div className="h-2 bg-[#e0e0e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1e90ff] to-[#00476b] rounded-full animate-shimmer"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#1e90ff]/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#1e90ff]/30 rounded-bl-lg" />
        </div>

        {/* View Certificate Link */}
        <div className="text-center mt-8">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[#1e90ff] hover:text-[#00476b] font-medium transition-colors duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            Contact me for certification updates
          </a>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

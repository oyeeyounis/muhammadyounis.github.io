import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
}

const experienceData: ExperienceItem[] = [
  {
    title: 'Cashier',
    company: 'Laser Pain Clinic',
    location: 'Multan, Pakistan',
    period: '2022 - 2024',
    description: 'Handled daily transactions and billing operations in a clinical setting',
    responsibilities: [
      'Maintained accurate records of patient services and payments',
      'Provided polite and professional customer service',
      'Managed cash flow and financial documentation',
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
              { y: -50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }
            );
          },
        })
      );

      // Carousel animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: carouselRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              carouselRef.current,
              { opacity: 0, perspective: 500 },
              { opacity: 1, perspective: 1000, duration: 0.8, ease: 'power2.out', delay: 0.2 }
            );
          },
        })
      );

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % experienceData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + experienceData.length) % experienceData.length);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#cbe9ff]/30 to-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-[#00476b] text-center mb-16"
        >
          Experience
        </h2>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative perspective-1000"
          style={{ minHeight: '400px' }}
        >
          <div className="relative flex items-center justify-center preserve-3d">
            {experienceData.map((item, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + experienceData.length) % experienceData.length;
              const isNext = index === (activeIndex + 1) % experienceData.length;

              let transform = 'translateX(0) translateZ(-200px) rotateY(0deg) scale(0.85)';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1.1)';
                opacity = 1;
                zIndex = 10;
              } else if (isPrev) {
                transform = 'translateX(-120%) translateZ(-200px) rotateY(35deg) scale(0.85)';
                opacity = 0.6;
                zIndex = 5;
              } else if (isNext) {
                transform = 'translateX(120%) translateZ(-200px) rotateY(-35deg) scale(0.85)';
                opacity = 0.6;
                zIndex = 5;
              }

              return (
                <div
                  key={index}
                  className="absolute w-full max-w-2xl transition-all duration-600"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    className={`bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 ${
                      isActive ? 'hover:shadow-2xl hover:scale-105' : ''
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1e90ff] to-[#00476b] rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Briefcase className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#00476b]">{item.title}</h3>
                        <p className="text-[#1e90ff] font-medium">{item.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-[#afafaf]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#00476b]/80 mb-6">{item.description}</p>

                    {/* Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-[#00476b]">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {item.responsibilities.map((resp, respIndex) => (
                          <li
                            key={respIndex}
                            className="flex items-start gap-3 text-[#00476b]/70"
                          >
                            <CheckCircle className="w-5 h-5 text-[#1e90ff] flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {experienceData.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#00476b] hover:bg-[#1e90ff] hover:text-white hover:scale-120 transition-all duration-300"
                style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#00476b] hover:bg-[#1e90ff] hover:text-white hover:scale-120 transition-all duration-300"
                style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {experienceData.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {experienceData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[#1e90ff] w-8'
                      : 'bg-[#cbe9ff] hover:bg-[#1e90ff]/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#1e90ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#cbe9ff]/50 rounded-full blur-2xl" />
    </section>
  );
};

export default Experience;

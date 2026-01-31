import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  icon: React.ReactNode;
}

const educationData: EducationItem[] = [
  {
    degree: 'BS Information Technology',
    institution: 'NCBA&E, Sub Campus Multan',
    period: '2021 - 2025',
    grade: 'CGPA: 3.4',
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    degree: 'FCS (Pre-Medical)',
    institution: 'Emerson University, Multan',
    period: '2019 - 2021',
    grade: 'Grade: C',
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    degree: 'Matriculation (Science Group)',
    institution: 'Government Muslim High School, Multan',
    period: '2017 - 2018',
    grade: 'Grade: A',
    icon: <Award className="w-6 h-6" />,
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

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
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
        })
      );

      // Timeline line animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              timelineRef.current,
              { scaleY: 0 },
              { scaleY: 1, duration: 1, ease: 'expo.out', delay: 0.2, transformOrigin: 'top' }
            );
          },
        })
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const isLeft = index % 2 === 0;
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  card,
                  {
                    rotateY: isLeft ? -90 : 90,
                    x: isLeft ? -50 : 50,
                    opacity: 0,
                  },
                  {
                    rotateY: 0,
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'expo.out',
                    delay: 0.4 + index * 0.2,
                  }
                );
              },
            })
          );
        }
      });

      // Dots animation
      dotsRef.current.forEach((dot, index) => {
        if (dot) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: dot,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  dot,
                  { scale: 0 },
                  {
                    scale: 1,
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.5)',
                    delay: 0.5 + index * 0.2,
                  }
                );
              },
            })
          );
        }
      });

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-white to-[#cbe9ff]/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-[#00476b] text-center mb-16"
        >
          Education
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#1e90ff] via-[#cbe9ff] to-[#1e90ff] rounded-full hidden md:block"
            style={{ transformOrigin: 'top' }}
          />

          {/* Mobile Timeline Line */}
          <div className="absolute left-4 w-1 h-full bg-gradient-to-b from-[#1e90ff] via-[#cbe9ff] to-[#1e90ff] rounded-full md:hidden" />

          {/* Education Cards */}
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Card */}
                <div
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`w-full md:w-5/12 ml-12 md:ml-0 perspective-800 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}
                  style={{
                    transform: index % 2 === 0 ? 'rotateY(-5deg)' : 'rotateY(5deg)',
                  }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:rotate-0 group">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1e90ff] to-[#00476b] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#00476b] mb-2">{item.degree}</h3>
                    <p className="text-[#1e90ff] font-medium mb-1">{item.institution}</p>
                    <div className="flex items-center gap-4 text-sm text-[#afafaf]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {item.grade}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div
                  ref={(el) => { dotsRef.current[index] = el; }}
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-[#1e90ff] rounded-full border-4 border-white shadow-lg animate-dot-pulse"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#cbe9ff]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#1e90ff]/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Education;

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Code, Cloud, FileSpreadsheet, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const skillsData: Skill[] = [
  {
    title: 'Cisco Packet Tracer',
    icon: <Network className="w-10 h-10" />,
    description: 'Basic networking project completed with hands-on experience in network configuration and troubleshooting',
    color: '#1e90ff',
  },
  {
    title: 'Python',
    icon: <Code className="w-10 h-10" />,
    description: 'Basic level programming with understanding of core concepts and practical problem-solving applications',
    color: '#00476b',
  },
  {
    title: 'Cloud Computing',
    icon: <Cloud className="w-10 h-10" />,
    description: 'Comprehensive knowledge of cloud concepts and ongoing Huawei Cloud Computing International Certification',
    color: '#1e90ff',
  },
  {
    title: 'Microsoft Office',
    icon: <FileSpreadsheet className="w-10 h-10" />,
    description: 'Proficient in Excel & Word for data management, documentation, and professional reporting',
    color: '#00476b',
  },
  {
    title: 'Communication & Customer Service',
    icon: <Headphones className="w-10 h-10" />,
    description: 'Professional customer service experience with strong interpersonal and problem-solving skills',
    color: '#1e90ff',
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

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
              { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
            );
          },
        })
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  card,
                  {
                    scale: 0,
                    rotate: index % 2 === 0 ? -180 : 180,
                  },
                  {
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                    delay: 0.2 + index * 0.1,
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
      id="skills"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-[#00476b] text-center mb-16"
        >
          My Skills
        </h2>

        {/* Skills Grid - Honeycomb Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative h-64 perspective-1000 cursor-pointer ${
                index === 3 ? 'lg:col-start-1 lg:col-end-2' : ''
              } ${index === 4 ? 'lg:col-start-2 lg:col-end-3' : ''}`}
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
              style={{
                animation: `float-slow ${5 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`,
              }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-600 preserve-3d ${
                  flippedCard === index ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(135deg, ${skill.color}15 0%, ${skill.color}05 100%)`,
                    border: `2px solid ${skill.color}30`,
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 animate-icon-pulse"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color} 0%, ${skill.color}dd 100%)`,
                      color: 'white',
                    }}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#00476b]">{skill.title}</h3>
                  <p className="text-sm text-[#afafaf] mt-2">Hover to learn more</p>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(135deg, ${skill.color} 0%, ${skill.color}dd 100%)`,
                    color: 'white',
                  }}
                >
                  <div className="text-white/90 leading-relaxed">{skill.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Background Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#cbe9ff] rounded-lg rotate-45 opacity-50 animate-slow-rotate" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#cbe9ff]/30 rounded-full animate-float-slow" />
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-[#1e90ff]/20 rounded-lg rotate-12" />
      </div>
    </section>
  );
};

export default Skills;

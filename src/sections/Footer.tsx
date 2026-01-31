import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
  {
    icon: <Github className="w-5 h-5" />,
    href: 'https://github.com',
    label: 'GitHub',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:younisameen1@gmail.com',
    label: 'Email',
  },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Border animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              borderRef.current,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: 'expo.out', transformOrigin: 'center' }
            );
          },
        })
      );

      // Content animation
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: contentRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                elements,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
              );
            },
          })
        );
      }

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-white pt-16 pb-8 overflow-hidden"
    >
      {/* Top Border with Gradient Animation */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 right-0 h-1 animate-gradient-flow"
        style={{ transformOrigin: 'center' }}
      />

      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Name */}
          <h3 className="animate-item text-3xl sm:text-4xl font-extrabold text-[#00476b] mb-4">
            MUHAMMAD YOUNIS
          </h3>

          {/* Tagline */}
          <p className="animate-item text-[#afafaf] text-lg mb-8">
            IT Professional | Network Specialist | Cloud Enthusiast
          </p>

          {/* Social Links */}
          <div className="animate-item flex justify-center gap-4 mb-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-12 h-12 bg-[#cbe9ff]/50 rounded-full flex items-center justify-center text-[#00476b] hover:bg-[#1e90ff] hover:text-white hover:-translate-y-1 hover:scale-120 transition-all duration-300"
                style={{
                  animation: `social-pulse 3s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="animate-item border-t border-[#e0e0e0] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#afafaf] text-center sm:text-left">
              © {new Date().getFullYear()} Muhammad Younis. All rights reserved.
            </p>
            <p className="text-sm text-[#afafaf] flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in Multan, Pakistan
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#cbe9ff]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-10 right-0 w-48 h-48 bg-[#1e90ff]/5 rounded-full blur-3xl translate-x-1/2" />
    </footer>
  );
};

export default Footer;

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Languages, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'younisameen1@gmail.com',
    href: 'mailto:younisameen1@gmail.com',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '+92 307 8116816 / +92 318 6493019',
    href: 'tel:+923078116816',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Multan, Pakistan',
  },
];

const languages = [
  { name: 'Urdu', level: 'Fluent' },
  { name: 'English', level: 'Intermediate' },
  { name: 'Saraiki', level: 'Fluent' },
  { name: 'Punjabi', level: 'Basic' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
              { x: -50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }
            );
          },
        })
      );

      // Contact info animation
      const infoItems = infoRef.current?.querySelectorAll('.info-item');
      if (infoItems) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: infoRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                infoItems,
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
              );
            },
          })
        );
      }

      // Connecting line animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: lineRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              lineRef.current,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6, ease: 'expo.out', delay: 0.4, transformOrigin: 'left' }
            );
          },
        })
      );

      // Form animation
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: formRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                formRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.5 }
              );
              gsap.fromTo(
                formFields,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
              );
            },
          })
        );
      }

      // Parallax effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (infoRef.current) {
              gsap.set(infoRef.current, { y: -40 * self.progress });
            }
            if (formRef.current) {
              gsap.set(formRef.current, { y: -60 * self.progress });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-white to-[#cbe9ff]/30 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-[#00476b] text-center mb-16"
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info Column */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="info-item flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1e90ff] to-[#00476b] rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-[#afafaf] mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#00476b] font-medium hover:text-[#1e90ff] transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#00476b] font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="info-item pt-6 border-t border-[#e0e0e0]">
              <div className="flex items-center gap-2 mb-4">
                <Languages className="w-5 h-5 text-[#1e90ff]" />
                <h4 className="font-bold text-[#00476b]">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white rounded-full text-sm text-[#00476b] border border-[#e0e0e0] hover:border-[#1e90ff] hover:text-[#1e90ff] transition-colors duration-300"
                  >
                    {lang.name} <span className="text-[#afafaf]">({lang.level})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              ref={lineRef}
              className="w-0.5 h-full bg-gradient-to-b from-[#1e90ff] via-[#cbe9ff] to-[#1e90ff]"
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#00476b] mb-2">Message Sent!</h3>
                  <p className="text-[#afafaf]">Thank you for reaching out. I will get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="form-field mb-6">
                    <label className="block text-sm font-medium text-[#00476b] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-xl text-[#00476b] placeholder-[#afafaf] focus:border-[#1e90ff] focus:outline-none transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-field mb-6">
                    <label className="block text-sm font-medium text-[#00476b] mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-xl text-[#00476b] placeholder-[#afafaf] focus:border-[#1e90ff] focus:outline-none transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-field mb-6">
                    <label className="block text-sm font-medium text-[#00476b] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-xl text-[#00476b] placeholder-[#afafaf] focus:border-[#1e90ff] focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-field w-full py-4 bg-gradient-to-r from-[#1e90ff] to-[#00476b] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </span>
                    <div className="absolute inset-0 bg-[#00476b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#1e90ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#cbe9ff]/50 rounded-full blur-2xl" />
    </section>
  );
};

export default Contact;

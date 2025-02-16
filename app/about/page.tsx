'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-xl mb-6">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Prem Prakash
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-6 text-center">
            Full Stack Developer & Tech Enthusiast
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-6">
            <SocialLink href="https://github.com/PremPrakashCodes" icon={<FaGithub size={24} />} />
            <SocialLink href="https://linkedin.com/in/premprakashcodes" icon={<FaLinkedin size={24} />} />
            <SocialLink href="https://twitter.com/PremPrakashCode" icon={<FaTwitter size={24} />} />
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          // viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            About Me
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="leading-relaxed">
              I&#39;m a passionate Full Stack Developer with a strong foundation in web technologies and a keen interest in building scalable applications. My journey in tech started with curiosity and has evolved into a professional career where I combine creativity with technical expertise.
            </p>
            <p className="leading-relaxed">
              When I&#39;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          // viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCategory 
              title="Frontend" 
              skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']} 
              icon="🎨" />
            <SkillCategory 
              title="Backend" 
              skills={['Node.js', 'Python', 'MongoDB', 'PostgreSQL']} 
              icon="⚙️" />
            <SkillCategory 
              title="Tools" 
              skills={['Git', 'Docker', 'AWS', 'Linux']} 
              icon="🛠️" />
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          // viewport={{ once: true }}
          variants={fadeInUp}>
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Experience
          </h2>
          <div className="space-y-12">
            <ExperienceItem 
              title="Full Stack Developer"
              company="Tech Company"
              period="2023 - Present"
              description="Leading development of web applications using React, Node.js, and cloud technologies."
            />
            <ExperienceItem 
              title="Software Engineer Intern"
              company="Startup Inc."
              period="2022 - 2023"
              description="Developed and maintained features for a SaaS platform using modern web technologies."
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white hover:text-gray-200 transform hover:scale-110 transition-all duration-200">
      {icon}
    </a>
  );
}

function SkillCategory({ title, skills, icon }: { title: string; skills: string[]; icon: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill} className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            <span className="text-gray-700 dark:text-gray-300">{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ExperienceItem({ 
  title, 
  company, 
  period, 
  description 
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: string;
}) {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-purple-600 before:rounded-full">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-3">{company} | {period}</p>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

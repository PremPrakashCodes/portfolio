"use client";

import { motion } from "framer-motion";
import { educationData, certificates } from "@/lib/data";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import ScrollAnimation from "./scroll-animation";

export default function EducationCertifications() {
  return (
    <div className="space-y-20">
      {/* Education */}
      <div>
        <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
          <GraduationCap className="w-5 h-5 text-blue-400" />
          Education
        </h3>
        <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu) => (
            <div key={edu.id} className="glass-card p-6">
              <span className="text-xs text-blue-400 font-medium">
                {edu.duration}
              </span>
              <h4 className="text-lg font-semibold text-white/90 mt-1">
                {edu.title}
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">{edu.institution}</p>
              <p className="text-sm text-gray-400 leading-relaxed mt-3">
                {edu.description}
              </p>
            </div>
          ))}
        </ScrollAnimation>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="flex items-center gap-3 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
          <Award className="w-5 h-5 text-blue-400" />
          Certifications
        </h3>
        <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group glass-card-hover p-6 block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <cert.icon className="w-5 h-5 text-blue-400" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
              </div>
              <h4 className="text-base font-semibold text-white/90 mt-3 group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {cert.institution} · {cert.duration}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mt-2">
                {cert.description}
              </p>
            </motion.a>
          ))}
        </ScrollAnimation>
      </div>
    </div>
  );
}

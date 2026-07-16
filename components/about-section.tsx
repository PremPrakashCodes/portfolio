import Image from "next/image";
import ScrollAnimation from "./scroll-animation";

export default function AboutSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation animation="fade-up">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/30 to-violet-500/30 blur-2xl opacity-50" />
              <div className="relative h-48 w-48 md:h-56 md:w-56 rounded-full border-2 border-white/10 overflow-hidden">
                <Image
                  src="/images/profile-image.png"
                  alt="Prem Prakash Sharma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 224px"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                About Me
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                I&apos;m a Software Developer with 2+ years of experience
                building scalable web applications, AI-powered systems, and
                cloud-native backend services. I specialize in Python,
                TypeScript, and cloud-native architecture from type-safe APIs
                with tRPC to event-driven pipelines and LLM integrations with
                observability built in.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m an active open-source contributor, with merged
                contributions to projects totaling 80k+ GitHub stars. When
                I&apos;m not shipping features, I write about fullstack
                development, AI systems, and engineering best practices.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

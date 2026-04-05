import {
  FaCertificate,
  FaGithub,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const experienceData = [
  {
    title: "Software Developer",
    company: "BigCircle",
    location: "Gandhinagar, Gujrat",
    description: [
      "Working as a Software Engineer building production-grade web and AI systems for enterprise use cases.",
      "Developed type-safe APIs using tRPC, ensuring robust and reliable backend communication with strong TypeScript support.",
      "Built scalable backend services using Python (FastAPI) and Node.js, with secure REST APIs.",
      "Implemented LLM routing, logging, and observability using LiteLLM and Langfuse.",
      "Containerized applications with Docker and deployed services on AWS.",
    ],
    date: "Oct 2024 - Present",
  },
  {
    title: "Web Developer",
    company: "Freelance",
    location: "Remote",
    description: [
      "Developed responsive websites and web applications for clients using HTML, CSS, JavaScript, and React.",
      "Implemented RESTful APIs and integrated third-party services to enhance website functionality.",
      "Collaborated with clients to gather requirements, optimize workflows, and ensure timely project delivery.",
    ],
    date: "Aug 2023 - Oct 2024",
  },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/PremPrakashCodes",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/premprakashsharma/",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: "mailto:premprakashsharma.dev@gmail.com",
    icon: MdMail,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/premprakashdev",
    icon: FaTwitter,
  },
] as const;

export const projects = [
  {
    title: "Ubik",
    description:
      "Built a C-level executive AI desktop assistant to automate operational and decision-support workflows. Designed multi-agent AI architecture (Planner, Executor, Awareness) for task orchestration. Integrated Gmail using Google Workspace APIs with webhooks for automatic email labeling, summarization, and prioritization.",
    tags: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Electron",
      "LiteLLM",
      "Langfuse",
      "Docker",
      "AWS",
      "Google Workspace API",
    ],
    github: "",
    demo: "",
  },
  {
    title: "AI-Powered Document Classification",
    description:
      "Built an AI-driven internal system to automatically classify document types and extract structured information at scale. Implemented event-driven architecture with Outlook webhooks. Designed scalable background processing using Redis and Dramatiq. Developed OCR-based extraction pipelines with AI image-based analysis fallback.",
    tags: [
      "Python",
      "Next.js",
      "Redis",
      "Dramatiq",
      "PostgreSQL",
      "Docker",
      "OCR",
      "OpenAI",
      "AWS EC2",
    ],
    github: "",
    demo: "",
  },
  {
    title: "Brandiligence",
    description:
      "Implemented subscription-based payment system adapting to regional constraints. Initially integrated Stripe for recurring payments, then migrated entire payment flow to PayPal due to regional limitations. Owned end-to-end payment gateway integration with minimal disruption.",
    tags: [
      "Next.js",
      "tRPC",
      "Drizzle ORM",
      "Stripe API",
      "PayPal API",
      "TypeScript",
    ],
    github: "",
    demo: "https://brandiligence.ai",
  },
] as const;

export const certificates = [
  {
    id: 1,
    title: "GitHub Foundations",
    institution: "GitHub",
    duration: "Issued: March 2025",
    description:
      "Demonstrated proficiency in Git and GitHub by completing foundational training.",
    link: "https://www.credly.com/badges/799557dd-ffee-4fdc-b489-21c8af85dba1/public_url",
    icon: FaGithub,
  },
  {
    id: 2,
    title: "Node.js Essential Training",
    institution: "LinkedIn Learning",
    duration: "Issued: October 2024",
    description:
      "Completed comprehensive training on Node.js, covering core concepts and advanced topics.",
    link: "https://www.linkedin.com/learning/certificates/997f1d774775099388365bae6887f2684a2a4380e27dc89ecad8a237dae70be4",
    icon: FaLinkedinIn,
  },
  {
    id: 3,
    title: "Node.js: Microservices",
    institution: "LinkedIn Learning",
    duration: "Issued: October 2024",
    description:
      "Completed advanced training on building microservices with Node.js and Express.",
    link: "https://www.linkedin.com/learning/certificates/997f1d774775099388365bae6887f2684a2a4380e27dc89ecad8a237dae70be4",
    icon: FaLinkedinIn,
  },
  {
    id: 4,
    title: "React.js Essential Training",
    institution: "LinkedIn Learning",
    duration: "Issued: October 2024",
    description:
      "Completed comprehensive training on React.js, covering core concepts and advanced topics.",
    link: "https://www.linkedin.com/learning/certificates/9135ec5ae78db93e17ce883e0abaa53369da8f54d155828452334a61774bc8c6",
    icon: FaLinkedinIn,
  },
  {
    id: 5,
    title: "Node.js: Security",
    institution: "LinkedIn Learning",
    duration: "Issued: September 2024",
    description:
      "Completed advanced training on securing Node.js applications and APIs.",
    link: "https://www.linkedin.com/learning/certificates/139d20ceb826c3f4aff0e02236c969438e075961ca091bf4f99740262effbd62?trk=share_certificate",
    icon: FaLinkedinIn,
  },
  {
    id: 6,
    title: "DSA WITH JAVA",
    institution: "Apna College",
    duration: "Issued: November 2023",
    description:
      "Completed comprehensive training on Data Structures and Algorithms using Java.",
    link: "https://drive.google.com/file/d/1r50yTGzWOnhFn_M34douFWo38H2a-btg/view",
    icon: FaCertificate,
  },
];

type EducationItem = {
  id: number;
  title: string;
  institution: string;
  duration: string;
  description: string;
};

export const educationData: EducationItem[] = [
  {
    id: 1,
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Indira Gandhi National Open University (IGNOU)",
    duration: "Expected January 2028",
    description:
      "Relevant Coursework: Data Structures and Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering, Web Development.",
  },
  {
    id: 2,
    title: "Higher Secondary School",
    institution: "Municipal College Rourkela",
    duration: "2020 - 2022",
    description:
      "Completed Science stream education with strong foundation in Physics, Chemistry, and Mathematics.",
  },
];

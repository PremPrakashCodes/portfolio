import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const experienceData = [
  {
    title: "Software Developer",
    company: "BigCircle",
    location: "Gandhinagar, India",
    description: [
      "Designed, Developed, and Maintained robust software applications, ensuring high performance and scalability.",
    ],
    date: "Oct 2024 - Present",
  },
  {
    title: "Freelancer",
    company: "Self-Employed",
    location: "Remote",
    description: [
      "Designed and Developed web applications using modern technologies like Next.js, TypeScript, and Tailwind CSS.",
      "Configured AWS services, such as EC2, S3, and Amplify, to streamline development and deployment processes.",
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
    title: "Payment Gateway Integration",
    description: "Integration of multiple payment gateways using Next.js, TypeScript, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PayPal", "Razorpay"],
    github: "https://github.com/PremPrakashCodes/payment-gateways",
    demo: "https://payment-gateways-demo.vercel.app",
    icon: "💸",
  },
] as const;

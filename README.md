# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases professional experience, projects, education, certifications, and technical skills with smooth animations and an elegant design.

## 🚀 Live Demo

Visit the live portfolio: [https://premprakash.dev/](https://premprakash.dev/)

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations using Framer Motion
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark Theme**: Elegant dark theme with gradient accents
- **Interactive Sections**:
  - Hero section with professional introduction
  - Technology stack showcase
  - Professional experience timeline
  - Education background
  - Certifications and achievements
  - Featured projects with live demos
  - Contact form with validation
- **Performance Optimized**: Built with Next.js for optimal performance and SEO
- **Type Safety**: Full TypeScript implementation for better code quality
- **Accessible**: Built with accessibility best practices

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PremPrakashCodes/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio in action.

## 🚀 Usage

### Development

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`

### Customization

1. **Update personal information**: Edit `lib/data.ts` to update:
   - Experience data
   - Social links
   - Projects information
   - Certificates
   - Education details

2. **Modify content**: Update individual components in the `components/` directory
   - `hero.tsx` - Landing section
   - `experience.tsx` - Work experience
   - `projects.tsx` - Project showcase
   - `contact.tsx` - Contact form
   - And more...

3. **Styling**: Customize the theme by modifying:
   - `tailwind.config.ts` - Tailwind configuration
   - `styles/globals.css` - Global styles

## 🌍 Environment Setup

This project doesn't require environment variables for basic functionality. However, if you plan to extend it with features like contact form submissions or analytics, you may need to set up:

```bash
# .env.local (optional)
# Add any environment variables you need here
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── hero.tsx          # Hero section
│   ├── projects.tsx      # Projects showcase
│   └── ...
├── lib/                  # Utility functions and data
│   ├── data.ts          # Portfolio data
│   └── utils.ts         # Helper functions
├── public/              # Static assets
├── styles/              # Global styles
└── ...
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Prem Prakash Sharma**
- Website: [premprakash.dev](https://premprakash.dev/)
- Email: [premprakashsharma.dev@gmail.com](mailto:premprakashsharma.dev@gmail.com)
- LinkedIn: [linkedin.com/in/premprakashsharma](https://www.linkedin.com/in/premprakashsharma/)
- GitHub: [github.com/PremPrakashCodes](https://github.com/PremPrakashCodes)
- Twitter: [twitter.com/premprakashdev](https://twitter.com/premprakashdev)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)

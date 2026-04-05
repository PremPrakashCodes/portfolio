import Link from "next/link";
import { Coffee } from "lucide-react";

export default function BuyMeCoffee({ className }: { className?: string }) {
  return (
    <Link
      href="https://buymeacoffee.com/premprakash.dev"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-300 text-sm font-medium ${className ?? ""}`}
    >
      <Coffee className="w-4 h-4" />
      Buy Me a Coffee
    </Link>
  );
}

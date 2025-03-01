import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Youtube, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t p-8 sm:flex-row">
      <p className="text-sm text-muted-foreground">© 2025 Marketplace</p>
      <div className="flex items-center gap-4">
        {socialLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <Link
              key={i}
              href={link.href}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4">
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          All rights reserved
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}

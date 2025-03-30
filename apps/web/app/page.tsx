import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

import { ScreenShare } from 'lucide-react';


function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? "blur-[32px]" : "blur-[75px]"
      } ${conic ? "bg-glow-conic" : ""} ${className ?? ""}`}
    />
  );
}

const LINKS = [
  {
    title: "Docs",
    href: "https://turbo.build/repo/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turbo.build/repo/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turbo.build/repo/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-white">
      <Button variant="default" size="lg" className="mb-4">Button</Button>
      <Button variant="destructive" size="sm" className="mb-4">Button</Button>
      <Button variant="secondary" size="icon" className="mb-4"><ScreenShare /></Button>
      <Input type="email" placeholder="Email" />
    </main>
  );
}

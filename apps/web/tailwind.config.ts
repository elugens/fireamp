// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import animatePlugin from "tailwindcss-animate";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./app/**/*.tsx",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [sharedConfig],
  plugins: [animatePlugin],
};

export default config;

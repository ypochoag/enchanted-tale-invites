import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Medieval Theme Colors
        parchment: {
          DEFAULT: "hsl(var(--parchment))",
          dark: "hsl(var(--parchment-dark))",
          light: "hsl(var(--parchment-light))",
        },
        forest: {
          DEFAULT: "hsl(var(--forest))",
          light: "hsl(var(--forest-light))",
        },
        moss: {
          DEFAULT: "hsl(var(--moss))",
          light: "hsl(var(--moss-light))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          dark: "hsl(var(--gold-dark))",
          light: "hsl(var(--gold-light))",
        },
        vine: "hsl(var(--vine))",
        fairy: "hsl(var(--fairy-glow))",
        sparkle: "hsl(var(--magic-sparkle))",
      },
      fontFamily: {
        medieval: ['"Cinzel Decorative"', '"Times New Roman"', 'serif'],
        uncial: ['"UnifrakturMaguntia"', '"Cinzel Decorative"', 'serif'],
        body: ['"Crimson Text"', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-fairy": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -15px) rotate(5deg)" },
          "50%": { transform: "translate(-5px, -25px) rotate(-3deg)" },
          "75%": { transform: "translate(-15px, -10px) rotate(3deg)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(45 85% 50% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(45 85% 50% / 0.6), 0 0 60px hsl(85 60% 55% / 0.3)" },
        },
        "page-turn": {
          "0%": { opacity: "0", transform: "perspective(1000px) rotateY(-15deg) translateX(-50px)" },
          "100%": { opacity: "1", transform: "perspective(1000px) rotateY(0) translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-fairy": "float-fairy 8s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "page-turn": "page-turn 0.8s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

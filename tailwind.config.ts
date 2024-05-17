import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      padding: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "1rem",
        "4": "1.5rem",
        "5": "2rem",
        "6": "2.5rem",
        "7": "5rem",
      },
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "1rem",
        "4": "1.5rem",
        "5": "2rem",
        "6": "2.5rem",
        "7": "5rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-foreground": "var(--primary-foreground)",
        "secondary-foreground": "var(--secondary-foreground)",
        background: "var(--background)",
        "background-light": "var(--background-light)",
        light: "var(--light)",
        dark: "var(--dark)",
        alternate: "var(--alternate)",
        "alternate-dark": "var(--alternate-dark)",
        primary: "var(--primary)",
        border: "var(--border)",
        card: "var(--card)",
        secondary: "var(--secondary)",
        success: "var(--success)",
        danger: "var(--danger)",
        alert: "var(--alert)",
        "shadow-tab-active": "var(--shadow-tab-active)",
        "gradient-background": "var(--gradient-background)",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

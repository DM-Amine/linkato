import { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables dark mode using the 'class' strategy
  content: [
    "./src/**/*.{html,ts,tsx,js,jsx}", // Adjust paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        // light mode colors
        primary: "#0D9488",
        "primary-light": "#5EEAD4",
        info: "#2384DF",
        secondary: "#yet-another-color",

        // status colors (shared between light and dark)
        success: "#0C5908",
        "success-l": "#94EF8F",
        warning: "#F8A116",
        "warning-l": "#F0CB90",
        error: "#F82916",
        "error-l": "#F09090",

        // dark mode colors
        "d-primary": "#14B8A6",   
  "d-primary-light": "#134E4A",
        "d-info": "#2384DF",
        "d-secondary": "#yet-another-color",

        // dark mode status colors (only dark variants)
        "d-success-l": "#0A2909",
        "d-warning-l": "#69460E",
        "d-error-l": "#69160E",

        // neutral shades
        "neutral-50": "#F8F8F8",
        "neutral-100": "#F0F0F0",
        "neutral-200": "#E6E6E6",
        "neutral-300": "#DFDFDF",
        "neutral-400": "#B8B8B8",
        "neutral-500": "#8E8E8E",
        "neutral-600": "#5E5E5E",
        "neutral-700": "#2E2E2E",
        "neutral-800": "#252525",
        "neutral-900": "#1A1A1A",
        "neutral-950": "#0D0D0D",
      },
      backgroundImage: {
        "light-white-gradient":
          "linear-gradient(180deg, rgba(255,255,255,1) 61%, rgba(223,223,223,1) 100%);",
      },
    },
  },
};

export default config;

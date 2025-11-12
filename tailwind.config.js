/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: ["./pages/**/*.vue", "./components/**/*.vue"],
  theme: {
    extend: {
      colors: {
        primary: "#003b71",
        primary2: "#96d9e9",
        button: {
          primary: "#4d09ce",
          secundary: "rgba(250, 250, 250, 0.2)",
        },
        "575E6B": "#575E6B",
        DEFAULT: "#FFFFFF",

        red: {
          DEFAULT: "#D0332F",
        },
      },
      rotate: {
        120: "120deg",
      },
      borderWidth: {
        3: "3px",
      },
      screens: {
        xsm: "540px",
        xmd: "707px",
      },
      fontFamily: {
        "SourceSans3-Black": ["SourceSans3-Black"],
        "SourceSans3-Bold": ["SourceSans3-Bold"],
        "SourceSans3-Regular": ["SourceSans3-Regular"],
        "SourceSans3-BlackItalic": ["SourceSans3-BlackItalic"],
      },
      gridTemplateColumns: {
        repeat2: "repeat(2, 1fr)",
      },
      gridColumn: {
        span1_1: "1 - 1",
      },
      maxWidth: {
        350: "350px",
        150: "150px",
      },
    },
  },
  plugins: [],
};

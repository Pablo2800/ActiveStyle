/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#222831",
          2: "#31363F",
          3: "#76ABAE",
          4: "#EEEEEE",
          "ant-primary": "#1890ff",
          "ant-secondary": "#52c41a",
          "ant-success": "#52c41a",
          "ant-warning": "#faad14",
          "ant-error": "#f5222d",
          "ant-info": "#1890ff",
        },
      },
      fontFamily: {
        myfont: ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};

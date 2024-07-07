/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// tailwind.config.js
const tailwindcss = require('tailwindcss');
const typography = require('@tailwindcss/typography');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {},
    },
    plugins: [typography, tailwindcss],
}
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    300: "#2cb792",
                    400: "#24b790",
                    500: "#1fc095",
                    600: "#19c799",
                }
            }

        },
    },
    daisyui: {
        themes: ["light",],
    },
    plugins: [
        require('daisyui'),
    ],
}


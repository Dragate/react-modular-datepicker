import type { NextConfig } from "next";

const config: NextConfig = {
    typedRoutes: true,
    transpilePackages: ["react-modular-datepicker"],
    devIndicators: process.env.PLAYWRIGHT_TEST === "1" ? false : undefined,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/webpack"],
            },
        },
    },
}

export default config

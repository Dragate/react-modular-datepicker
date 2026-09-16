import type { NextConfig } from "next";

const config: NextConfig = {
    typedRoutes: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/webpack"],
            },
        },
    },
}

export default config
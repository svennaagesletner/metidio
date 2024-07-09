/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/'
            }
        ]
    },
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
      },
}
module.exports = nextConfig

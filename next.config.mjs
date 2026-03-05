/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    typescript: {
        // Ignora erros de tipagem no build, útil já que o backend TS 
        // está na mesma raiz e possui configurações diferentes.
        ignoreBuildErrors: true,
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
        return [
            {
				source: '/scl/:path*',
				destination: "http://localhost:6500/scl/:path*",
            }
        ]
    }
};

export default nextConfig;
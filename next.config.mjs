/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
      // for testing with dummy/placeholder images
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
     
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactCompiler: true,
  allowedDevOrigins: ['192.168.43.52', 'sampling-flatly-scraggly.ngrok-free.dev'],
};

export default nextConfig;

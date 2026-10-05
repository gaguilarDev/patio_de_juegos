import type { NextConfig } from "next";

// Servidor Node (standalone): las invitaciones necesitan API + disco, así que ya no es export estático.
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

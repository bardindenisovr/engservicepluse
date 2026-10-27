import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ["@prisma/client", ".prisma/client", "@prisma/adapter-pg", "pg"],
  async redirects() {
    return [
      // RU slugs from doc strategy → EN structure (301 permanent)
      { source: "/uslugi", destination: "/services", permanent: true },
      { source: "/uslugi/audit-servisa", destination: "/audit", permanent: true },
      { source: "/uslugi/ekspress-diagnostika", destination: "/ekspress-diagnostika", permanent: true },
      { source: "/uslugi/proektirovanie-servisa", destination: "/services/architecture", permanent: true },
      { source: "/uslugi/sla-kpi", destination: "/services/sla", permanent: true },
      { source: "/uslugi/garantiya-reklamacii", destination: "/services/warranty", permanent: true },
      { source: "/uslugi/upravlenie-zip", destination: "/services/zip", permanent: true },
      { source: "/uslugi/servisnaya-partnerskaya-set", destination: "/services/partners", permanent: true },
      { source: "/uslugi/ekonomika-servisa", destination: "/services/economics", permanent: true },
      { source: "/uslugi/organizaciya-toir", destination: "/services/toir", permanent: true },
      { source: "/uslugi/lean-maintenance", destination: "/services/lean", permanent: true },
      { source: "/uslugi/soprovozhdenie", destination: "/services/support", permanent: true },
      { source: "/dlya-kogo", destination: "/services", permanent: true },
      { source: "/kontakty", destination: "/contacts", permanent: true },
      { source: "/praktika", destination: "/cases", permanent: true },
      { source: "/publikacii", destination: "/articles", permanent: true },
      { source: "/about", destination: "/roman-bardin-denisov", permanent: true },
      // Legacy duplicates
      { source: "/services/audit", destination: "/audit", permanent: true },
      { source: "/services/ekspress-diagnostika", destination: "/ekspress-diagnostika", permanent: true },
      { source: "/metodika", destination: "/methodology", permanent: true },
    ];
  },
};

export default nextConfig;
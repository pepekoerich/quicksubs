/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|jsx|tsx)$/i] },
      type: "asset/resource",
    });
    return config;
  },
};
const configApi = {
  api: {
    responseLimit: "50mb",
  },
};

(module.exports = nextConfig, configApi);

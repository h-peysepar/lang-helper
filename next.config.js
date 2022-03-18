/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/quiz',
        permanent: true,
      },
    ]
  },
  // webpack: config => {
  //   // Important: return the modified config
  //   return {
  //     ...config, 

  //   }
  // },
}

module.exports = nextConfig

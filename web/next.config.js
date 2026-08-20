/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/images/testimonials/ramesh.jpg', destination: 'https://ui-avatars.com/api/?name=Ramesh&background=10b981&color=fff&size=80&bold=true', permanent: false },
      { source: '/images/testimonials/sneha.jpg', destination: 'https://ui-avatars.com/api/?name=Sneha&background=10b981&color=fff&size=80&bold=true', permanent: false },
      { source: '/images/testimonials/anita.jpg', destination: 'https://ui-avatars.com/api/?name=Anita&background=10b981&color=fff&size=80&bold=true', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' }
        ]
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          { key: 'Content-Type', value: 'application/json' }
        ]
      },
      {
        source: '/.well-known/security.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain' }
        ]
      }
    ]
  }
}

module.exports = nextConfig


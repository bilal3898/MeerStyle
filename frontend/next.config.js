module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://apis.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https://*.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.meerstyle.com;
            `.replace(/\s+/g, ' '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          }
        ],
      },
    ];
  }
};
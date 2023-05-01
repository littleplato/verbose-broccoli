export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Verbose Broccoli',
  description: 'An intelligent email lead generator',
  mainNav: [
    {
      title: 'Generate Email',
      href: '/',
    },
    {
      title: 'Saved Emails',
      href: '/saved-emails',
    },
  ],
};

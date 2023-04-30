export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Verbose Broccoli',
  description: 'Intelligent email lead generator',
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

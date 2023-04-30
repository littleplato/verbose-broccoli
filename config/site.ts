export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Automatic Parakeet',
  description: 'Experimental intelligent storybook creator.',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Saved Books',
      href: '/saved-books',
    },
  ],
  links: {
    twitter: 'https://twitter.com/',
    github: 'https://github.com/weejerrick/automatic-parakeet',
  },
};

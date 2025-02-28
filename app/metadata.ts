import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_DOMAIN || 'https://cms-testing-eefm2yiiy-goldjunge91s-projects.vercel.app'),
  title: 'Tsafi CMS',
  description: 'Ein AI-gesteuertes Content Management System',
};

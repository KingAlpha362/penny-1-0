import { Metadata } from 'next';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  noIndex = false,
}: GenerateMetadataOptions = {}): Metadata {
  const baseTitle = 'PennyWise';
  const baseDescription = 'A comprehensive personal finance management web application.';
  const baseKeywords = ['finance', 'money management', 'budgeting', 'personal finance'];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pennywise.com';

  return {
    title: title ? `${title} | ${baseTitle}` : baseTitle,
    description: description || baseDescription,
    keywords: [...baseKeywords, ...keywords],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: title || baseTitle,
      description: description || baseDescription,
      images: image ? [image] : ['/og-image.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || baseTitle,
      description: description || baseDescription,
      images: image ? [image] : ['/og-image.png'],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
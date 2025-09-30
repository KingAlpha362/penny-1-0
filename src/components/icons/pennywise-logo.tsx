
import type { SVGProps } from 'react';

export const PennywiseLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 12H8a2 2 0 1 0 0 4h4" />
    <path d="M12 8v8" />
    <path d="M16 8a4 4 0 0 0-4 4" />
  </svg>
);

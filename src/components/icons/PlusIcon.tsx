import { SVGProps } from 'react';

interface Props {
}

export function PlusIcon(props: Props & SVGProps<SVGSVGElement>) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M4 12h16m-8-8v16"
      ></path>
    </svg>
  );
}

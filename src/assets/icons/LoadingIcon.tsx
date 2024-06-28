import clsx from 'clsx';

interface LoadingIconProps {
  size?: 'small' | 'medium' | 'large'
}

export default function LoadingIcon(props: LoadingIconProps) {
  const { size = 'medium' } = props;
  const sizes = {
    small: clsx('h-5', 'w-5'),
    medium: clsx('h-10', 'w-10'),
    large: clsx('h-12', 'w-12'),
  };
  const svgClass = clsx('mx-2 animate-spin', sizes[size]);
  const circleClass = clsx('opacity-25');
  const pathClass = clsx('opacity-75');
  return (
    <svg
      className={svgClass}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className={circleClass}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={pathClass}
        fill="#6979F8"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
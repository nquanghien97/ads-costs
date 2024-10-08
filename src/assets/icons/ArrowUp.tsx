interface ArrowUpProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const ArrowUp = (props: ArrowUpProps) => {
  const {
    color,
    ...rest
  } = props;
  return (
    <svg {...rest} color={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
    </svg>
  );
}

export default ArrowUp;
interface ArrowDownProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const ArrowDown = (props: ArrowDownProps) => {
  const {
    color,
    ...rest
  } = props;
  return (
    <svg {...rest} color={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}

export default ArrowDown;
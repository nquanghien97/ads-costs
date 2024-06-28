interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

function UserIcon(props: UserIconProps) {
  const {
    color,
    width = 16,
    height = 16,
    ...rest
  } = props;
  return (
    <svg {...rest} fill={color} width={width} height={height} focusable="false" aria-hidden="true" viewBox="0 0 25.16 27.17">
      <g id="Layer_1-2" data-name="Layer 1">
        <path d="m17.1,14.33c1.85.75,3.46,1.82,4.78,3.3,2.3,2.56,3.34,5.57,3.27,8.99-.01.64-.39.54-.76.54-5.34,0-10.68,0-16.02,0-2.57,0-5.14-.01-7.7.01-.54,0-.69-.16-.68-.69.07-5.6,2.6-9.6,7.68-11.99.1-.05.2-.1.3-.15.01,0,.02-.03.05-.1-2.16-1.68-3.35-3.87-3.28-6.67.06-2.12.88-3.92,2.4-5.4,2.99-2.91,7.82-2.87,10.87-.02,2.71,2.54,3.92,8.34-.91,12.18Zm-4.56,10.68c2.95,0,5.91,0,8.86,0q1.68,0,1.25-1.63c-1.23-4.62-5.61-7.89-10.33-7.71-4.94.18-9.02,3.61-9.96,8.36q-.19.98.78.98c3.13,0,6.27,0,9.4,0Zm-.05-11.51c3.13.06,5.71-2.45,5.76-5.59.05-3.1-2.44-5.7-5.53-5.76-3.17-.07-5.75,2.41-5.83,5.6-.08,3.09,2.46,5.7,5.6,5.76Z"/>
      </g>
    </svg>

  );
}

export default UserIcon;
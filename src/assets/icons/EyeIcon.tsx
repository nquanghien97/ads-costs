interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

function EyeIcon(props: EyeIconProps) {
  const {
    color,
    ...rest
  } = props;
  return (
    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.84 9.07" fill={color} {...rest} >
      <g id="Layer_1-2" data-name="Layer 1">
        <g>
          <path fill="none" stroke="#000" strokeMiterlimit={10} d="M17.17,4.54s-3.69,4.04-8.24,4.04S.68,4.54,.68,4.54C.68,4.54,4.37,.5,8.92,.5s8.24,4.04,8.24,4.04Z"/>
          <circle fill="none" stroke="#000" strokeMiterlimit={10} cx="8.92" cy="4.54" r="3.49"/>
          <circle cx="8.92" cy="4.54" r="1.29"/>
        </g>
      </g>
    </svg>

  );
}

export default EyeIcon;
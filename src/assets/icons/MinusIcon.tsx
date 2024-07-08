interface MinusIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

function MinusIcon(props: MinusIconProps) {
  const {
    color,
    ...rest
  } = props;
  return (
    <svg color={color} {...rest} viewBox="64 64 896 896" focusable="false" data-icon="minus" fill="currentColor" aria-hidden="true">
      <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
    </svg>

  );
}

export default MinusIcon;
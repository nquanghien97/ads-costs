import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import LoadingIcon from '../../assets/icons/LoadingIcon';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}
const baseStyles = 'flex justify-center items-center text-center px-6 py-2 rounded-full bg-[#0071BA]';

function BaseButton(props: PropsWithChildren<BaseButtonProps>) {
  const {
    children,
    fullWidth = false,
    loading,
    className,
    disabled,
    ...rest
  } = props;

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  const disabledStyle = clsx(baseStyles, 'bg-[#ccc] text-black cursor-default');

  const buttonClass = clsx(baseStyles, fullWidthStyle, className, 'hover:bg-[#326de4] duration-300 uppercase');

  const containerClass = disabled ? disabledStyle : buttonClass;
  return (
    <button
      className={containerClass}
      type="button"
      {...rest}
    >
      { loading && <LoadingIcon size="small" />}
      {children}
    </button>
  );
}

export default BaseButton;
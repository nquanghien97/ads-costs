import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import LoadingIcon from '../../assets/icons/LoadingIcon';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  color?: ButtonColor;
}
type ButtonColor = 'normal' | 'danger' | 'warn' | 'success' | 'info';

const variantStyles: Record<ButtonColor, string> = {
    normal: clsx('bg-[white]', 'text-white hover:bg-[#ccc] !text-black'),
    danger: clsx('bg-[red]', 'text-white hover:bg-[#dd473a]'),
    info: clsx('bg-[#0071BA]', 'text-white hover:bg-[#326de4]'),
    success: clsx('bg-[green]', 'text-white'),
    warn: clsx('bg-[orange]', 'text-white'),
};

const baseStyles = 'flex justify-center items-center text-center px-6 py-2 rounded-full';

function BaseButton(props: PropsWithChildren<BaseButtonProps>) {
  const {
    children,
    fullWidth = false,
    loading,
    className,
    disabled,
    color = 'normal',
    ...rest
  } = props;

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  const disabledStyle = clsx(baseStyles, 'bg-[#ccc] text-black cursor-default');

  const buttonClass = clsx(baseStyles, fullWidthStyle, className, 'duration-300 uppercase');

  const containerClass = disabled ? disabledStyle : clsx(buttonClass, variantStyles[color]);
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
import { twMerge } from 'tailwind-merge';
import type { MouseEventHandler, ReactNode } from 'react';

export default function Button(props: IProps) {
  function checkRounded() {
    switch (props.rounded) {
      case 'full':
        return 'rounded-full';
      case 'small':
        return 'rounded-sm';
      case 'large':
        return 'rounded-lg';
      case 'medium':
        return 'rounded-md';
      default:
        return 'rounded-lg';
    }
  }

  function checkVariant() {
    if (props.variant === 'outlined') {
      return 'border-primary-main text-primary-main bg-transparent hover:bg-primary-main/5 active:bg-primary-main/10 active:translate-y-[-2px]';
    }
    return 'bg-primary-main text-white border-primary-main hover:bg-primary-dark active:bg-primary-light active:translate-y-[-2px]';
  }

  function checkSize() {
    switch (props.size) {
      case 'sm':
        return 'h-[32px] text-sm px-3';
      default:
        return 'h-[40px] px-3';
    }
  }

  return (
    <button
      onClick={(e) => !props.disable && !props.loading && props.onClick && props.onClick(e)}
      type={props.type}
      disabled={props.disable}
      className={twMerge(
        'border-2 w-full duration-200 cursor-pointer font-semibold',
        checkVariant(),
        checkRounded(),
        checkSize(),
        props.disable ? 'opacity-10 cursor-not-allowed' : '',
        props.className,
      )}
    >
      <div>{props.loading ? 'loading...' : props.children}</div>
    </button>
  );
}

interface IProps {
  children: ReactNode;
  rounded?: 'full' | 'small' | 'medium' | 'large';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'outlined' | 'solid';
  size?: 'sm' | 'default';
  disable?: boolean;
}

import css from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'light';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;  
}

const Button = ({
  children,
  variant = 'filled',
  type = 'button',
  onClick,
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`${css.btn} ${css[variant]} className `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button >
  )
}

export default Button;
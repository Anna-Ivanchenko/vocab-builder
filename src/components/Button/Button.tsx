import css from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;  
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${css.btn} ${css[variant]} ${css[size]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button >
  )
}

export default Button;
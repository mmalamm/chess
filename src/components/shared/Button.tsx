import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick, disabled, className }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded bg-blue-600 px-3 py-1 transition disabled:opacity-30",
        !disabled && "cursor-pointer",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

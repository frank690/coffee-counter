import { clsx } from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "plus" | "minus";
};

export function Button({ variant = "plus", className, ...props }: ButtonProps) {
  const variants = {
    plus: "button button-plus",
    minus: "button button-minus",
  };

  return (
    <button
      {...props}
      className={clsx(variants[variant], className)} 
    />
  );
}

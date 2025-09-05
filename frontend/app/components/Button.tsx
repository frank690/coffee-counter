import { clsx } from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "plus" | "minus" | "disabled";
};

export function Button({ variant = "disabled", className, ...props }: ButtonProps) {
  const variants = {
    plus: "button button-plus",
    minus: "button button-minus",
    disabled: "button button-disabled",
  };

  return (
    <button
      {...props}
      className={clsx(variants[variant], className)}
    />
  );
}

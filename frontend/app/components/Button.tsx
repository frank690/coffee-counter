import { clsx } from "clsx";

export function Button({className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(className, "button")} 
    />
  );
}

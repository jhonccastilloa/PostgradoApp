import type { InputHTMLAttributes } from "react";
interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}
export const InputText = ({ label, className, ...otherProps }: inputProps) => {
  return (
    <div className={`${className}`}>
      {label && <label className="w-full">{label}</label>}
      <input className="w-full" {...otherProps} />
    </div>
  );
};

export default InputText;

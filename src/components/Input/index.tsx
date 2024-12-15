import { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

interface Props {
  type: string;
  placeholder?: string;
  disabled?: boolean;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label?: string;
}

export default function Input({
  onChange,
  type,
  value,
  disabled,
  placeholder,
  label,
}: Props) {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

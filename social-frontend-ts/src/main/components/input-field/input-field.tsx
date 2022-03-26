import "./input-field.scss";

interface IInputFieldProps {
  value?: string | number;
  title?: string;
  onChange: (value: string) => void;
  withoutMarginTop?: boolean;
  customType?: "number" | "password";
  numberProps?: {
    max?: number;
    min?: number;
  };
  disabled?: boolean;
}

export function InputField(props: IInputFieldProps) {
  const { value, title, withoutMarginTop, customType, numberProps, disabled } =
    props;

  return (
    <div
      className={`input-field-container ${
        withoutMarginTop && "without-margin-top"
      }`}
    >
      {title && <span>{title}</span>}
      <input
        placeholder="Digite um valor..."
        value={value || typeof value === "number" ? value : ""}
        type={customType ? customType : "text"}
        onChange={(event) => props.onChange(event.target.value)}
        max={numberProps && numberProps.max ? numberProps.max : undefined}
        min={numberProps && numberProps.min ? numberProps.min : undefined}
        disabled={disabled}
      />
    </div>
  );
}

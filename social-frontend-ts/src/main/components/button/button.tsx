import "./button.scss";

interface IButtonProps {
  text: string;
  type?: "submit";
  onClick?: () => void;
  classType: "primary" | "secondary" | "delete";
  withoutMarginTop?: boolean;
  customClassName?: string;
}

export function Button(props: IButtonProps) {
  const { text, classType, type = "button", withoutMarginTop } = props;
  const buttonClassName = `button-container ${classType}-button ${
    withoutMarginTop && "without-margin-top"
  } ${props.customClassName}`;

  if (type === "submit") {
    return (
      <button type={type} className={buttonClassName}>
        {text}
      </button>
    );
  }

  return (
    <button type={type} onClick={props.onClick} className={buttonClassName}>
      {text}
    </button>
  );
}

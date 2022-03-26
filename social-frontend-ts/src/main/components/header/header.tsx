import "./header.scss";
import Logo from "../../images/logo.png";
import Person from "../../images/person.png";
import { useNavigate } from "react-router-dom";

interface IHeaderProps {
  showPerson?: boolean;
}

export function Header(props: IHeaderProps) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(props.showPerson ? "/main/feed" : "/");
  };

  return (
    <header className="header-container">
      <div className="icons-container">
        <div className="img-logo-container">
          <img onClick={navigateToHome} alt={"Logo"} src={Logo} />
        </div>
        {props.showPerson && (
          <div className="img-logo-container">
            <img
              onClick={() => navigate("/account")}
              alt={"Person"}
              src={Person}
            />
          </div>
        )}
      </div>
    </header>
  );
}

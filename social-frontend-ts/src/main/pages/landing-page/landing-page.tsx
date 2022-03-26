import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button/button";
import { InputField } from "../../components/input-field/input-field";
import { Loader } from "../../components/loader/loader";
import "./landing-page.scss";

interface ILandingPageProps {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

interface ILandingPageState {
  isLoading?: boolean;

  email: string;
  password: string;
}

export function LandingPage(props: ILandingPageProps) {
  const navigate = useNavigate();

  const [landingPageState, setLandingPageState] = useState<ILandingPageState>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (props.isLogged) {
      navigate("/main/feed");
      return;
    }
  }, [props, navigate]);

  const loginAndPushToFeed = (e: any) => {
    e.preventDefault();

    login();
  };

  const login = async () => {
    setLandingPageState({ ...landingPageState, isLoading: true });

    // try {
    //   await axios.post("/web/login", {
    //     email: landingPageState.email,
    //     password: landingPageState.password,
    //   });
    // } catch (error) {
    //   toast.error("Erro, tente novamente!");
    //   setLandingPageState({ ...landingPageState, isLoading: false });
    //   return;
    // }

    toast.success("Sucesso!");
    navigate("/main/feed");
    props.setIsLogged(true);
  };

  return (
    <div className="landing-page-container">
      {landingPageState.isLoading && <Loader />}
      {!landingPageState.isLoading && (
        <>
          <span className="landing-page-title">Login</span>
          <form onSubmit={loginAndPushToFeed}>
            <InputField
              title="Email"
              withoutMarginTop
              onChange={(value) =>
                setLandingPageState({ ...landingPageState, email: value })
              }
              value={landingPageState.email}
            />
            <InputField
              title="Senha"
              customType="password"
              onChange={(value) =>
                setLandingPageState({ ...landingPageState, password: value })
              }
              value={landingPageState.password}
            />
            <Button type="submit" classType="primary" text="Login" />
          </form>
          <Button
            classType="primary"
            text="Registrar"
            onClick={() => navigate("/register")}
            withoutMarginTop
          />
        </>
      )}
    </div>
  );
}

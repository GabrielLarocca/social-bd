import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button/button";
import { InputField } from "../../components/input-field/input-field";
import { Loader } from "../../components/loader/loader";
import axios from "../../../axios/http-common";
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
    if (props.isLogged) return navigate("/main/feed");
  }, [props, navigate]);

  const loginAndPushToFeed = (e: any) => {
    e.preventDefault();

    login();
  };

  const login = async () => {
    setLandingPageState({ ...landingPageState, isLoading: true });

    try {
      const { data } = await axios.post("/login", {
        email: landingPageState.email,
        password: landingPageState.password,
      });

      console.log(data);

      localStorage.setItem("token", data?.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data?.token}`;
    } catch (error) {
      setLandingPageState({ ...landingPageState, isLoading: false });

      toast.error("Erro, tente novamente!");
      return;
    }

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

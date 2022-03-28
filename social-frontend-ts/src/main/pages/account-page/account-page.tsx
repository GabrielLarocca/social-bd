import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { InputField } from "../../components/input-field/input-field";
import "./account-page.scss";

interface IAccountProps {}

interface IAccountState {
  userDTO: {
    email: string;
    password: string;
    usr_name: string;
    usr_telefone: string;
    usr_sexo: string;
  };
  isLoading?: boolean;
}

export function AccountPage(props: IAccountProps) {
  const navigate = useNavigate();

  const [registerState, setRegisterState] = useState<IAccountState>({
    userDTO: {
      email: "",
      password: "",
      usr_name: "",
      usr_telefone: "",
      usr_sexo: "",
    },
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //   setLoading(true);
  //     try {
  //       const { data: response } = await axios.get("/stuff/to/fetch");
  //       // setData(response);
  //     } catch (error) {
  //       console.error("ddd");
  //     }
  //     //   setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  const { email, password, usr_name, usr_telefone, usr_sexo } =
    registerState.userDTO;

  const setUserDto = (value: string, key: string) => {
    setRegisterState({
      ...registerState,
      userDTO: { ...registerState.userDTO, [key]: value },
    });
  };

  const loginAndPushToFeed = (e: any) => {
    e.preventDefault();

    const login = async () => {
      setRegisterState({ ...registerState, isLoading: true });
      try {
        const { data: response } = await axios.get("/stuff/to/fetch");
        // setData(response);
      } catch (error) {}
      setRegisterState({ ...registerState, isLoading: false });
    };

    login();
  };

  return (
    <div className="account-page-container">
      <span className="account-page-title">Minha conta</span>
      <form onSubmit={loginAndPushToFeed}>
        <InputField
          title="Email"
          withoutMarginTop
          value={email}
          onChange={(value) => setUserDto(value, "email")}
        />
        <InputField
          title="Senha"
          value={password}
          onChange={(value) => setUserDto(value, "password")}
        />
        <InputField
          title="Nome"
          value={usr_name}
          onChange={(value) => setUserDto(value, "usr_name")}
        />
        <InputField
          customType="number"
          title="Telefone"
          value={usr_telefone}
          onChange={(value) => setUserDto(value, "usr_telefone")}
        />
        <InputField
          title="Sexo"
          value={usr_sexo}
          onChange={(value) => setUserDto(value, "usr_sexo")}
        />
        <Button type="submit" classType="primary" text="Salvar" />
      </form>
      <Button
        classType="delete"
        text="Deletar conta"
        onClick={() => navigate("/")}
        withoutMarginTop
      />
      <Button
        classType="secondary"
        text="Voltar"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

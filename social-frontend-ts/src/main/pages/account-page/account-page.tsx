import axios from "../../../axios/http-common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { InputField } from "../../components/input-field/input-field";
import "./account-page.scss";
import { Loader } from "../../components/loader/loader";
import { IUser } from "../../../models/user/user.model";
import { toast } from "react-toastify";

interface IAccountProps {}

interface IAccountState {
  userDTO: IUser;
  isLoading?: boolean;
}

export function AccountPage(props: IAccountProps) {
  const navigate = useNavigate();

  const [accountState, setAccountState] = useState<IAccountState>({
    userDTO: {
      id: undefined,
      email: "",
      usr_name: "",
      usr_telefone: "",
      usr_sexo: "",
    },
    isLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: response } = await axios.get("user/me");

    setAccountState({
      userDTO: response,
      isLoading: false,
    });
  };

  const { email, usr_name, usr_telefone, usr_sexo } = accountState.userDTO;

  const setUserDto = (value: string, key: string) => {
    setAccountState({
      ...accountState,
      userDTO: { ...accountState.userDTO, [key]: value },
    });
  };

  const postAccountAndFetchData = (e: any) => {
    e.preventDefault();

    postAccount();
  };

  const postAccount = async () => {
    setAccountState({ ...accountState, isLoading: true });

    try {
      await axios.post(`user/me/${accountState.userDTO.id}`, {
        ...accountState.userDTO,
      });
    } catch (error) {
      toast.error("Algo deu errado!");
      setAccountState({ ...accountState, isLoading: false });
      return;
    }

    toast.success("Sucesso! Usuário alterado!");
    setAccountState({ ...accountState, isLoading: false });
  };

  return (
    <div className="account-page-container">
      {accountState.isLoading && (
        <div className="account-loader-container">
          <Loader />
        </div>
      )}
      {!accountState.isLoading && (
        <>
          <span className="account-page-title">Minha conta</span>
          <form onSubmit={postAccountAndFetchData}>
            <InputField
              title="Email"
              withoutMarginTop
              value={email}
              onChange={(value) => setUserDto(value, "email")}
              disabled
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
            classType="secondary"
            text="Voltar"
            onClick={() => navigate(-1)}
            withoutMarginTop
          />
        </>
      )}
    </div>
  );
}

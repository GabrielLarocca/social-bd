import axios from "../../../axios/http-common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IBlockedUser } from "../../../models/blocked-user/blocked-user.model";
import { IUser } from "../../../models/user/user.model";
import { Loader } from "../../components/loader/loader";
import "./users-page.scss";

interface IUsersPageState {
  isLoading?: boolean;
  users: IUser[];
  blockedUsers: IUser[];
}

export function UsersPage() {
  const [usersPageState, setUsersPageState] = useState<IUsersPageState>({
    users: [],
    blockedUsers: [],
    isLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersData = await axios.get("user/list");
    const blockedUsersData = await axios.get("user/bloqueados");

    const users: IUser[] = usersData.data;
    const blockedUsersResponse: IBlockedUser[] = blockedUsersData.data;

    const blockedUsers = users.filter((user) =>
      blockedUsersResponse.some(
        (blockedUser) => user.id === blockedUser.usb_id_bloqueado
      )
    );
    const filteredUsers = users.filter(
      (user) => !blockedUsers.some((blockedUser) => user.id === blockedUser.id)
    );

    setUsersPageState({ blockedUsers, users: filteredUsers, isLoading: false });
  };

  const renderUsers = () => {
    const { users } = usersPageState;

    return (
      <ul>
        <ul className="with-bottom-border">
          <li className="bold">{"Id"}</li>
          <li className="bold">{"Email"}</li>
          <li className="bold">{"Nome"}</li>
          <li className="bold">{"Sexo"}</li>
          <li className="bold">{"Telefone"}</li>
        </ul>
        {users.map((user, index) => {
          const { id, email, usr_name, usr_sexo, usr_telefone } = user;

          return (
            <ul
              key={`users-${user.id}`}
              style={{ position: "relative" }}
              className={index === users.length - 1 ? "with-bottom-border" : ""}
            >
              <li>{id ? id : "Indefinido"}</li>
              <li>{email ? email : "Indefinido"}</li>
              <li>{usr_name ? usr_name : "Indefinido"}</li>
              <li>{usr_sexo ? usr_sexo : "Indefinido"}</li>
              <li>{usr_telefone ? usr_telefone : "Indefinido"}</li>
              <div
                onClick={() => blockUser(user!!.id!!, index)}
                className="block-user-container"
              >
                X
              </div>
            </ul>
          );
        })}
      </ul>
    );
  };

  const blockUser = async (userId: number, index: number) => {
    try {
      await axios.post("user/bloquear", { usb_id_bloqueado: userId });
    } catch (error) {
      toast.error("Erro, tente novamente!");
      return;
    }

    const { users, blockedUsers } = usersPageState;

    const blockedUsersClone = blockedUsers;
    blockedUsersClone.push(users[index]);

    const usersClone = users;
    usersClone.splice(index, 1);

    blockedUsers.push();

    setUsersPageState({
      ...usersPageState,
      users: usersClone,
      blockedUsers: blockedUsersClone,
    });
    toast.success("Usuário bloqueado com sucesso!");
  };

  const renderBlockedUsers = () => {
    const { blockedUsers } = usersPageState;

    return (
      <ul>
        <ul className="with-bottom-border">
          <li className="bold">{"Id"}</li>
          <li className="bold">{"Nome"}</li>
        </ul>
        {blockedUsers.map((blockedUser, index) => {
          const { id, usr_name } = blockedUser;

          return (
            <ul
              key={`blocked-user-${blockedUser.id}`}
              className={
                index === blockedUsers.length - 1 ? "with-bottom-border" : ""
              }
            >
              <li>{id}</li>
              <li>{usr_name}</li>
            </ul>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="users-page-container">
      {usersPageState.isLoading && (
        <div className="usr-loader-container">
          <Loader />
        </div>
      )}
      {!usersPageState.isLoading && (
        <>
          <div className="left-pannel">
            <span className="left-pannel-title">Usuários Não Bloqueados</span>
            {renderUsers()}
          </div>
          <div className="right-pannel">
            <span className="right-pannel-title">Usuários Bloqueados</span>
            {renderBlockedUsers()}
          </div>
        </>
      )}
    </div>
  );
}

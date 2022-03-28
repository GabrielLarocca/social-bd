import axios from "../../../../axios/http-common";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IGroup } from "../../../../models/group/group.model";
import { Button } from "../../../components/button/button";
import { InputField } from "../../../components/input-field/input-field";
import "./manage-group-page.scss";

interface IManageGroupState {
  group: IGroup;
  isLoading?: boolean;
  hasId: boolean;
}

export function ManageGroupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as { group?: IGroup };

  const [manageGroupPageState, setRegisterState] = useState<IManageGroupState>({
    hasId:
      (routeState &&
        routeState.group &&
        typeof routeState.group.id === "number") ||
      false,
    group:
      routeState && routeState.group && typeof routeState.group.id === "number"
        ? routeState.group
        : {
            gru_nome: "",
            gru_descricao: "",
          },
  });

  const { gru_nome, gru_descricao } = manageGroupPageState.group;

  const setGroup = (value: string, key: string) => {
    setRegisterState({
      ...manageGroupPageState,
      group: { ...manageGroupPageState.group, [key]: value },
    });
  };

  const createGroupAndNavigateToGroups = (e: any) => {
    e.preventDefault();

    createGroup();
  };

  const createGroup = async () => {
    setRegisterState({ ...manageGroupPageState, isLoading: true });
    try {
      if (manageGroupPageState.group && manageGroupPageState.group.id) {
        await axios.post(`grupo/${manageGroupPageState.group.id}`, {
          ...manageGroupPageState.group,
        });
      } else {
        await axios.post(`grupo`, { ...manageGroupPageState.group });
      }
    } catch (error) {
      setRegisterState({ ...manageGroupPageState, isLoading: false });
      return;
    }

    navigate("/main/groups");
  };

  return (
    <div className="manage-group-page-container">
      <span className="manage-group-page-title">
        {manageGroupPageState.hasId ? "Editar Grupo" : "Novo Grupo"}
      </span>
      <form onSubmit={createGroupAndNavigateToGroups}>
        <InputField
          title="Nome"
          withoutMarginTop
          value={gru_nome}
          onChange={(value) => setGroup(value, "gru_nome")}
        />
        <InputField
          title="Descricao"
          value={gru_descricao}
          onChange={(value) => setGroup(value, "gru_descricao")}
        />
        <Button type="submit" classType="primary" text="Confirmar" />
      </form>
      <Button
        classType="secondary"
        text="Voltar"
        onClick={() => navigate(-1)}
        withoutMarginTop
      />
    </div>
  );
}

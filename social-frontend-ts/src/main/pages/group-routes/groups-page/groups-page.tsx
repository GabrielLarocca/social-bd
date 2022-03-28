import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IGroup } from "../../../../models/group/group.model";
import { Button } from "../../../components/button/button";
import { Loader } from "../../../components/loader/loader";
import "./groups-page.scss";

interface IGroupsPageProps {
  isLogged?: boolean;
}

interface IGroupsPageState {
  isLoading?: boolean;
  groups: IGroup[];
}

export function GroupsPage(props: IGroupsPageProps) {
  const navigate = useNavigate();

  const [groupsPageState, setGroupsPageState] = useState<IGroupsPageState>({
    groups: [],
    isLoading: true,
  });

  useEffect(() => {
    // fetchData();
    const groups: IGroup[] = [
      {
        id: 1,
        gru_nome: "One Piece",
        gru_descricao: "Grupo para falar de one piece",
      },
      {
        id: 2,
        gru_nome: "Naruto",
        gru_descricao: "Grupo para falar de one piece",
      },
      {
        id: 3,
        gru_nome: "Sasuke",
        gru_descricao: "Grupo para falar de one piece",
      },
    ];

    setGroupsPageState({
      ...groupsPageState,
      groups,
      isLoading: false,
    });
  }, []);

  const fetchData = async () => {
    const { data: response } = await axios.get("/web/grupo/2");

    setGroupsPageState({
      ...groupsPageState,
      groups: response,
      isLoading: false,
    });
  };

  const renderGroups = () => {
    const { groups } = groupsPageState;

    return (
      <ul>
        <ul className="with-bottom-border without-hover">
          <li className="bold smaller">{"Id"}</li>
          <li className="bold medium">{"Nome"}</li>
          <li className="bold bigger">{"Descrição"}</li>
        </ul>
        {groups.map((group, index) => {
          const { id, gru_nome, gru_descricao } = group;

          return (
            <ul
              key={`groups-${group.id}`}
              style={{ position: "relative" }}
              className={
                index === groups.length - 1 ? "with-bottom-border" : ""
              }
            >
              <li
                onClick={() => navigateToGroup(group)}
                className="smaller with-hover"
              >
                {id}
              </li>
              <li
                onClick={() => navigateToGroup(group)}
                className="medium with-hover"
              >
                {gru_nome}
              </li>
              <li
                onClick={() => navigateToGroup(group)}
                className="bigger with-hover"
              >
                {gru_descricao}
              </li>

              <div
                onClick={() => navigateToEditGroup(group)}
                className="edit-container"
              >
                E
              </div>
              <div
                onClick={() => excludeGroup(group!!.id!!, index)}
                className="exclude-container"
              >
                X
              </div>
            </ul>
          );
        })}
      </ul>
    );
  };

  const navigateToGroup = (group: IGroup) => {
    navigate(`feed/${group.id}`);
  };

  const navigateToEditGroup = (group: IGroup) => {
    navigate(`manage`, { state: { group } });
  };

  const excludeGroup = async (groupId: number, index: number) => {
    // try {
    //   await axios.delete("/web/grupo/2", { groupId });
    // } catch (error) {
    //   toast.error("Erro, tente novamente!");
    //   return;
    // }

    const { groups } = groupsPageState;

    const groupsClone = groups;
    groupsClone.splice(index, 1);

    setGroupsPageState({
      ...groupsPageState,
      groups: groupsClone,
    });
    toast.success("Grupo removido com sucesso!");
  };

  return (
    <div className="groups-page-container">
      {groupsPageState.isLoading && (
        <div className="usr-loader-container">
          <Loader />
        </div>
      )}
      {!groupsPageState.isLoading && (
        <>
          <div className="pannel-container">
            <span className="left-pannel-title">Grupos</span>
            {renderGroups()}
            <Button
              onClick={() => navigate("manage")}
              text="Adicionar novo"
              classType="primary"
            />
          </div>
        </>
      )}
    </div>
  );
}

import axios from "../../../../axios/http-common";
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

  const fetchData = async () => {
    try {
      const { data: response } = await axios.post("grupo/list");

      setGroupsPageState({
        ...groupsPageState,
        groups: response,
        isLoading: false,
      });
    } catch {
      setGroupsPageState({
        ...groupsPageState,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderGroups = () => {
    const { groups } = groupsPageState;

    return (
      <ul>
        <ul className="with-bottom-border">
          <li className="bold smaller">{"Id"}</li>
          <li className="bold medium">{"Nome"}</li>
          <li className="bold bigger">{"Descrição"}</li>
        </ul>
        {groups
          .sort((a, b) => a.id!! - b.id!!)
          .map((group, index) => {
            const { id, gru_nome, gru_descricao } = group;

            return (
              <ul
                key={`groups-${group.id}`}
                style={{ position: "relative" }}
                className={
                  index === groups.length - 1
                    ? "with-bottom-border with-hover"
                    : "with-hover"
                }
              >
                <li onClick={() => navigateToGroup(group)} className="smaller">
                  {id}
                </li>
                <li onClick={() => navigateToGroup(group)} className="medium">
                  {gru_nome}
                </li>
                <li onClick={() => navigateToGroup(group)} className="bigger">
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
    navigate(`info/${group.id}`);
  };

  const navigateToEditGroup = (group: IGroup) => {
    navigate(`manage`, { state: { group } });
  };

  const excludeGroup = async (groupId: number, index: number) => {
    try {
      await axios.delete(`grupo/${groupId}`);
    } catch (error) {
      toast.error("Erro, tente novamente!");
      return;
    }

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

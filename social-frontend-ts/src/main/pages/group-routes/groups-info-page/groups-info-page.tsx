import axios from "../../../../axios/http-common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components/button/button";
import { Loader } from "../../../components/loader/loader";
import "./groups-info-page.scss";
import { IPost } from "../../../../models/post/post.model";
import { IUser } from "../../../../models/user/user.model";
import { InputField } from "../../../components/input-field/input-field";

interface IGroupsInfoPageState {
  isLoading?: boolean;
  posts: IPost[];
  postToManage?: IPost;

  groupUsers: IUser[];
  renderController: "posts" | "managePost";
}

export function GroupsInfoPage() {
  const params = useParams();

  const [groupsInfoPageState, setGroupsInfoPageState] =
    useState<IGroupsInfoPageState>({
      posts: [],
      isLoading: true,
      postToManage: {},
      renderController: "posts",
      groupUsers: [],
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const groupsListData = await axios.post("post/list");
    const groupUsersData = await axios.get(`grupo/participantes/${params.key}`);

    const posts = groupsListData.data.filter(
      (item: IPost) => item.pos_id_grupo === Number(params.key)
    );

    const groupsUsers = groupUsersData.data.filter(
      (item: { grs_id_grupo: number; user: IUser }) =>
        item.grs_id_grupo === Number(params.key)
    );

    setGroupsInfoPageState({
      ...groupsInfoPageState,
      posts,
      renderController: "posts",
      groupUsers: groupsUsers.map((item: { user: IUser }) => item.user),
      isLoading: false,
    });
  };

  const renderPosts = () => {
    const { posts } = groupsInfoPageState;

    return (
      <ul>
        <ul className="with-bottom-border">
          <li className="bold smaller">{"Id"}</li>
          <li className="bold medium">{"Id do Grupo"}</li>
          <li className="bold bigger">{"Post"}</li>
        </ul>
        {posts
          .sort((a, b) => a.id!! - b.id!!)
          .map((post, index) => {
            const { id, pos_id_grupo, pos_texto } = post;

            return (
              <ul
                key={`group-posts-info-${post.id}`}
                style={{ position: "relative" }}
                className={
                  index === posts.length - 1
                    ? "with-bottom-border with-hover"
                    : "with-hover"
                }
              >
                <li className="smaller">{id}</li>
                <li className="medium">{pos_id_grupo}</li>
                <li className="bigger">{pos_texto}</li>

                <div
                  onClick={() => setPostAndRenderController(post)}
                  className="edit-container"
                >
                  E
                </div>
                <div
                  onClick={() => excludePost(post!!.id!!, index)}
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

  const setPostAndRenderController = (post: IPost) => {
    setGroupsInfoPageState({
      ...groupsInfoPageState,
      renderController: "managePost",
      postToManage: post,
    });
  };

  const excludePost = async (postId: number, index: number) => {
    try {
      await axios.delete(`post/${postId}`);
    } catch (error) {
      toast.error("Erro, tente novamente!");
      return;
    }

    const { posts } = groupsInfoPageState;

    const postsClone = posts;
    postsClone.splice(index, 1);

    setGroupsInfoPageState({
      ...groupsInfoPageState,
      posts: postsClone,
    });
    toast.success("Post removido com sucesso!");
  };

  const renderGroupUsers = () => {
    const { groupUsers } = groupsInfoPageState;

    return (
      <ul>
        <ul className="with-bottom-border">
          <li className="bold">{"Id"}</li>
          <li className="bold">{"Nome"}</li>
        </ul>
        {groupUsers.map((groupUser, index) => {
          const { id, usr_name } = groupUser;

          return (
            <ul
              key={`group-user-participantz-${groupUser.id}`}
              className={
                index === groupUsers.length - 1 ? "with-bottom-border" : ""
              }
            >
              <li>{id}</li>
              <li>{usr_name}</li>
              <div
                onClick={() => deleteGroupUser(groupUser!!.id!!)}
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

  const deleteGroupUser = async (userId: number) => {
    try {
      await axios.delete(
        `grupo/participantes/removerDoGrupo/${params.key}/${userId}`
      );
    } catch (error) {
      toast.error("Erro, tente novamente!");
      return;
    }

    toast.success("Usuário participante removido com sucesso!");
    setGroupsInfoPageState({
      ...groupsInfoPageState,
      isLoading: true,
    });

    fetchData();
  };

  const renderManagePost = () => {
    return (
      <div className="manage-post-container">
        <span className="manage-post-title">
          {groupsInfoPageState.postToManage?.id ? "Editar Post" : "Novo Post"}
        </span>
        <form onSubmit={createOrEditPost}>
          <InputField
            title="Post"
            withoutMarginTop
            value={groupsInfoPageState.postToManage?.pos_texto}
            onChange={(value) =>
              setGroupsInfoPageState({
                ...groupsInfoPageState,
                postToManage: {
                  ...groupsInfoPageState.postToManage,
                  pos_texto: value,
                },
              })
            }
          />
          <Button type="submit" classType="primary" text="Confirmar" />
        </form>
        <Button
          classType="secondary"
          text="Voltar"
          onClick={() =>
            setGroupsInfoPageState({
              ...groupsInfoPageState,
              renderController: "posts",
              postToManage: {},
            })
          }
          withoutMarginTop
        />
      </div>
    );
  };

  const createOrEditPost = async () => {
    setGroupsInfoPageState({ ...groupsInfoPageState, isLoading: true });

    if (groupsInfoPageState.postToManage?.id) {
      try {
        await axios.post(`post/${groupsInfoPageState.postToManage.id}`, {
          pos_texto: groupsInfoPageState?.postToManage?.pos_texto,
          pos_id_grupo: params.key,
        });
      } catch {
        setGroupsInfoPageState({
          ...groupsInfoPageState,
          isLoading: false,
          postToManage: {},
        });
        toast.error("Erro, tente novamente!");
        return;
      }
    } else {
      try {
        await axios.post(`post`, {
          pos_texto: groupsInfoPageState?.postToManage?.pos_texto,
          pos_id_grupo: params.key,
        });
      } catch {
        setGroupsInfoPageState({
          ...groupsInfoPageState,
          isLoading: false,
          postToManage: {},
        });
        toast.error("Erro, tente novamente!");
        return;
      }
    }

    fetchData();
  };

  const joinGroup = async () => {
    try {
      await axios.post(`grupo/participantes/participarGrupo`, {
        grs_id_grupo: params.key,
      });
    } catch (error) {
      toast.error("Erro, tente novamente!");
      return;
    }

    toast.error("Sucesso!");
    setGroupsInfoPageState({
      ...groupsInfoPageState,
      isLoading: true,
    });

    fetchData();
  };

  return (
    <div className="groups-feed-page-container">
      {groupsInfoPageState.isLoading && (
        <div className="usr-loader-container">
          <Loader />
        </div>
      )}
      {!groupsInfoPageState.isLoading && (
        <>
          {groupsInfoPageState.renderController === "posts" && (
            <>
              <div className="groups-info-left-pannel-container">
                <div className="pannel-header-container">
                  <span className="left-pannel-title">
                    Grupo ID: {params.key}
                  </span>
                  <Button
                    classType="primary"
                    text="Participar do grupo"
                    onClick={joinGroup}
                  />
                </div>
                {renderPosts()}
                <Button
                  onClick={() =>
                    setGroupsInfoPageState({
                      ...groupsInfoPageState,
                      renderController: "managePost",
                      postToManage: {},
                    })
                  }
                  text="Novo post"
                  classType="primary"
                />
              </div>
              <div className="right-pannel">
                <span className="right-pannel-title">
                  Participantes do Grupo
                </span>
                {renderGroupUsers()}
              </div>
            </>
          )}
          {groupsInfoPageState.renderController === "managePost" &&
            renderManagePost()}
        </>
      )}
    </div>
  );
}

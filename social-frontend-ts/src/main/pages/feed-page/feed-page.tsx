import axios from "../../../axios/http-common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button/button";
import { Loader } from "../../components/loader/loader";
import "./feed-page.scss";
import { IPost } from "../../../models/post/post.model";
import { InputField } from "../../components/input-field/input-field";

interface IFeedPageState {
  isLoading?: boolean;
  posts: IPost[];
  postToManage?: IPost;

  renderController: "posts" | "managePost";
}

export function FeedPage() {
  const params = useParams();

  const [feedPageState, setFeedPageState] = useState<IFeedPageState>({
    posts: [],
    isLoading: true,
    postToManage: {},
    renderController: "posts",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: response } = await axios.post("post/list");

    setFeedPageState({
      ...feedPageState,
      posts: response,
      renderController: "posts",
      isLoading: false,
    });
  };

  const renderPosts = () => {
    const { posts } = feedPageState;

    return (
      <ul>
        <ul className="with-bottom-border">
          <li className="bold smaller">{"Id do Post"}</li>
          <li className="bold medium">{"Id do Grupo"}</li>
          <li className="bold bigger">{"Post"}</li>
        </ul>
        {posts
          .sort((a, b) => a.id!! - b.id!!)
          .map((post, index) => {
            const { id, pos_id_grupo, pos_texto } = post;

            return (
              <ul
                key={`posts-info-${post.id}`}
                style={{ position: "relative" }}
                className={
                  index === posts.length - 1
                    ? "with-bottom-border with-hover"
                    : "with-hover"
                }
              >
                <li className="smaller">{id}</li>
                <li className="medium">
                  {typeof pos_id_grupo === "number"
                    ? pos_id_grupo
                    : "Indefinido"}
                </li>
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
    setFeedPageState({
      ...feedPageState,
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

    const { posts } = feedPageState;

    const postsClone = posts;
    postsClone.splice(index, 1);

    setFeedPageState({
      ...feedPageState,
      posts: postsClone,
    });
    toast.success("Post removido com sucesso!");
  };

  const renderManagePost = () => {
    return (
      <div className="manage-post-container">
        <span className="manage-post-title">
          {feedPageState.postToManage?.id ? "Editar Post" : "Novo Post"}
        </span>
        <form onSubmit={createOrEditPost}>
          <InputField
            title="Post"
            withoutMarginTop
            value={feedPageState.postToManage?.pos_texto}
            onChange={(value: string) =>
              setFeedPageState({
                ...feedPageState,
                postToManage: {
                  ...feedPageState.postToManage,
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
            setFeedPageState({
              ...feedPageState,
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
    setFeedPageState({ ...feedPageState, isLoading: true });

    if (feedPageState.postToManage?.id) {
      try {
        await axios.post(`post/${feedPageState.postToManage.id}`, {
          pos_texto: feedPageState?.postToManage?.pos_texto,
          pos_id_grupo: params.key,
        });
      } catch {
        setFeedPageState({
          ...feedPageState,
          isLoading: false,
          postToManage: {},
        });
        toast.error("Erro, tente novamente!");
        return;
      }
    } else {
      try {
        await axios.post(`post`, {
          pos_texto: feedPageState?.postToManage?.pos_texto,
          pos_id_grupo: params.key,
        });
      } catch {
        setFeedPageState({
          ...feedPageState,
          isLoading: false,
          postToManage: {},
        });
        toast.error("Erro, tente novamente!");
        return;
      }
    }

    fetchData();
  };

  return (
    <div className="feed-page-container">
      {feedPageState.isLoading && (
        <div className="usr-loader-container">
          <Loader />
        </div>
      )}
      {!feedPageState.isLoading && (
        <>
          {feedPageState.renderController === "posts" && (
            <div className="feed-pannel-container">
              <span className="left-pannel-title">Grupo ID: {params.key}</span>

              {renderPosts()}
              <Button
                onClick={() =>
                  setFeedPageState({
                    ...feedPageState,
                    renderController: "managePost",
                    postToManage: {},
                  })
                }
                text="Novo post"
                classType="primary"
              />
            </div>
          )}
          {feedPageState.renderController === "managePost" &&
            renderManagePost()}
        </>
      )}
    </div>
  );
}

import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../../models/post/post.model";
import { Button } from "../../components/button/button";
import { Loader } from "../../components/loader/loader";
import { AccountPage } from "../account-page/account-page";
import "./feed-page.scss";

interface IGroupRoutesProps {
  isLogged?: boolean;
}

interface IMainRoutePageState {
  isLoading?: boolean;
  posts: IPost[];

  renderController: "feed" | "editPost";
}

export function FeedPage(props: IGroupRoutesProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [feedPageState, setFeedPageState] = useState<IMainRoutePageState>({
    isLoading: true,
    posts: [
      {
        id: 1,
        post_text: "abracadabra",
      },
      {
        id: 2,
        post_text: "tetete",
      },
    ],
    renderController: "feed",
  });

  useEffect(() => {
    // fetchPosts();

    setFeedPageState({ ...feedPageState, isLoading: false });
  }, []);

  const fetchPosts = async () => {
    const { data: response } = await axios.get("/web/post/4");

    setFeedPageState({ ...feedPageState, posts: response, isLoading: false });
  };

  return (
    <div className="feed-page-container">
      {feedPageState.isLoading && (
        <div className="fp-loader-container">
          <Loader />
        </div>
      )}
      {!feedPageState.isLoading && (
        <>
          {feedPageState.renderController === "feed" && (
            <div className="feed-container">
              <span className="feed-title">Feed</span>
            </div>
          )}
          {feedPageState.renderController === "editPost" && (
            <div>
              <span className="">Editar Post</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

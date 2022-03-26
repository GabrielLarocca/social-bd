import axios from "axios";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { FeedPage } from "../feed-page/feed-page";
import { GroupRoutes } from "../group-routes/group-routes";
import { UsersPage } from "../users-page/users-page";
import "./main-route-page.scss";

interface IMainRoutePageProps {}

interface IMainRoutePageState {
  isLoading?: boolean;
}

export function MainRoutePage(props: IMainRoutePageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mainRoutePageState, setMainRoutePageState] =
    useState<IMainRoutePageState>({});

  return (
    <div className="main-route-page-container">
      <div className="mrp-left-navigation-pannel">
        <Button
          classType="primary"
          text="Feed"
          onClick={() => navigate("feed")}
          withoutMarginTop
          customClassName={
            location.pathname.includes("feed") ? "active-classname" : ""
          }
        />
        <Button
          classType="primary"
          text="Grupos"
          onClick={() => navigate("groups")}
          customClassName={
            location.pathname.includes("groups") ? "active-classname" : ""
          }
          withoutMarginTop
        />
        <Button
          classType="primary"
          text="Usuários"
          onClick={() => navigate("users")}
          customClassName={
            location.pathname.includes("users") ? "active-classname" : ""
          }
          withoutMarginTop
        />
      </div>
      <div className="mrp-right-pannel">
        <Routes>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/groups" element={<GroupRoutes />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import { AccountPage } from "../account-page/account-page";
import "./group-routes.scss";

interface IGroupRoutesProps {
  isLogged?: boolean;
}

interface IGroupRoutesState {
  isLoading?: boolean;
}

export function GroupRoutes(props: IGroupRoutesProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [groupRoutesState, setGroupRoutesState] = useState<IGroupRoutesState>(
    {}
  );

  return (
    <div className="group-routes-container">
      <div className="left-pannel">
        <Routes>
          <Route path="/feed" element={<AccountPage />} />
        </Routes>
      </div>
      <div className="right-pannel">
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
      </div>
    </div>
  );
}

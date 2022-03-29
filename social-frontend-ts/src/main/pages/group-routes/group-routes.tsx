import { Route, Routes } from "react-router-dom";
import "./group-routes.scss";
import { GroupsInfoPage } from "./groups-info-page/groups-info-page";
import { GroupsPage } from "./groups-page/groups-page";
import { ManageGroupPage } from "./manage-group-page/manage-group-page";

export function GroupRoutes() {
  return (
    <div className="group-routes-container">
      <Routes>
        <Route path="/manage" element={<ManageGroupPage />} />
        <Route path="/info/:key" element={<GroupsInfoPage />} />
        <Route path="/" element={<GroupsPage />} />
      </Routes>
    </div>
  );
}

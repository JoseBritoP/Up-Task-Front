import { BrowserRouter,Routes,Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardView from "./views/DashboardView";
import { AuthView, ConfirmAccount, NewPassword, ResetPassword,RequestNewCode } from "./views/auth";
import { CreateProjectView, EditProjectView, ProjectDetailView, ProjectTeamView } from "./views/projects";
import { ChangePasswordView, ProfileView } from "./views/profile";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/NotFound";

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/projects" element={<DashboardView/>} index/>
          <Route path="/projects/create" element={<CreateProjectView/>}/>
          <Route path="/projects/:projectId" element={<ProjectDetailView/>}/>
          <Route path="/projects/:projectId/edit" element={<EditProjectView/>}/>
          <Route path="/projects/:projectId/team" element={<ProjectTeamView/>}/>
          <Route element={<ProfileLayout/>}>
            <Route path="/profile" element={<ProfileView/>}/>
            <Route path="/profile/password" element={<ChangePasswordView/>}/>
          </Route>
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="/auth" element={<AuthView/>}/>
          <Route path="/auth/confirm-account" element={<ConfirmAccount/>}/>
          <Route path="/auth/request-code" element={<RequestNewCode/>}/>
          <Route path="/auth/forget-password" element={<ResetPassword/>}/>
          <Route path="/auth/new-password" element={<NewPassword/>}/>
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="/*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
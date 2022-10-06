import Register from "../pages/Register";
import Login from "../pages/Login";
import StudentList from "../pages/dashboard/StudentList";
import CreateStudent from "../pages/forms/CreateStudent";
import EditStudent from "../pages/forms/EditStudent";
import Rolelist from "../pages/role/Rolelist";
import CreateRole from "../pages/role/CreateRole";
import EditRole from "../pages/role/EditRole";
import Permissionlist from "../pages/permission/Permissionlist";
import CreatePermission from "../pages/permission/CreatePermission";
import EditPermission from "../pages/permission/EditPermission";
import Userlist from "../pages/user/Userlist";
import CreateUser from "../pages/user/CreateUser";
import EditUser from "../pages/user/EditUser";

const routes = [
  {
    path: "/",
    auth: true,
    component: Login,
  },
  {
    path: "/register",
    auth: true,
    component: Register,
  },
  {
    path: "/dashboard",
    component: StudentList,
  },
  {
    path: "/create",
    component: CreateStudent,
  },
  {
    path: "/edit",
    component: EditStudent,
  },
  {
    path: "/role",
    component: Rolelist,
  },
  {
    path: "/role/create",
    component: CreateRole,
  },
  {
    path: "/role/edit",
    component: EditRole,
  },
  {
    path: "/permission",
    component: Permissionlist,
  },
  {
    path: "/permission/create",
    component: CreatePermission,
  },
  {
    path: "/permission/edit",
    component: EditPermission,
  },
  {
    path: "/user",
    component: Userlist,
  },
  {
    path: "/user/create",
    component: CreateUser,
  },
  {
    path: "/user/edit",
    component: EditUser,
  },
];

export default routes;

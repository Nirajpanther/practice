import Home from "../pages/Home";
import Create from "../pages/post/Create";
import Edit from "../pages/post/Edit";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/create",
    component: Create,
  },
  {
    path: "/edit",
    component: Edit,
  },
];

export default routes;

import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import Home from "@/pages/home";
import NotFound from "@/pages/notFound";
import CreateField from "@/pages/create/createField";
import EditField from "@/pages/edit/editField";
import CreateText from "@/pages/create/createText";
import CreateAudio from "@/pages/create/createAudio";
import CreateVideo from "@/pages/create/createVideo";
import Field from "@/pages/field";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":id",
        element: <Field />,
      },
      {
        path: "create/field",
        element: <CreateField />,
      },
      {
        path: "edit/field/:id",
        element: <EditField />,
      },
      {
        path: "create/text/:id",
        element: <CreateText />,
      },
      {
        path: "create/audio/:id",
        element: <CreateAudio />,
      },
      {
        path: "create/video/:id",
        element: <CreateVideo />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;

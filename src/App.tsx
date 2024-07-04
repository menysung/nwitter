import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./App.css";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase";
import CreateAccount from "./routes/CreateAccount";
import CreateUser from "./routes/CreateUser";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createUser",
    element: <CreateUser />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className="wrapper">
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </div>
    </>
  );
}

export default App;

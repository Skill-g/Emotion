import { HOME_ROUTE } from "@/app/consts";
import { AuthRoutes, PubRoutes, UserRoutes } from "@/routes";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthChecker = ({
  setIsAuth,
  setIsUser,
}: {
  setIsAuth: (value: boolean) => void;
  setIsUser: (value: boolean) => void;
}) => {
  useEffect(() => {
    const checkAuth = async () => {
      const storedIsAuth = Cookies.get("isAuthAdmin");
      const storedIsUser = Cookies.get("isUser");
      if (storedIsAuth === "true") {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

      if (storedIsUser === "true") {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    };

    checkAuth();
  }, [setIsAuth, setIsUser]);

  return null;
};

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AuthChecker setIsAuth={setIsAuth} setIsUser={setIsUser} />
      {!isLoading && (
        <Routes>
          {isAuth &&
            AuthRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          {isUser &&
            UserRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          {PubRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
      )}
    </>
  );
};

export default Router;

import { HOME_ROUTE } from "@/app/consts";
import { AuthRoutes, PubRoutes } from "@/routes";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthChecker = ({
  setIsAuth,
}: {
  setIsAuth: (value: boolean) => void;
}) => {
  useEffect(() => {
    const checkAuth = async () => {
      const storedIsAuth = localStorage.getItem("isAuth");
      const authExpiration = localStorage.getItem("authExpiration");

      if (storedIsAuth === "true" && authExpiration) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(authExpiration)) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          localStorage.removeItem("isAuth");
          localStorage.removeItem("authExpiration");
        }
      } else {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [setIsAuth]);

  return null;
};

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [isAuth, isLoading]);

  return (
    <>
  <AuthChecker setIsAuth={setIsAuth} />
  {!isLoading && (
    <Routes>
      {isAuth &&
        AuthRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {PubRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {(
        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      )}
    </Routes>
      )}
    </>
  );
};

export default Router;

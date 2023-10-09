import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '.';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const AppRouter = () => {
  const { authStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore.checkAuth();
    }
  }, []);
  if (authStore.isLoading) {
    return <h1>Loading...</h1>;
  }
  return authStore.isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} Component={route.component} key={route.path} />
      ))}
      {/* <Route path="*" element={<Navigate to={RouterNames.BLOG} />} /> */}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} Component={route.component} key={route.path} />
      ))}
      {/* <Route path="*" element={<Navigate to={RouterNames.LOGIN} />} /> */}
    </Routes>
  );
};
export default observer(AppRouter);

import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import LoginAdminPage from './components/pages/LoginAdminPage/LoginAdminPage';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { checkUserThunk } from './redux/auth/authAsyncThunk';
import ProtectedRouter from './HOCs/ProtectedRouter';
import MainPage from './components/pages/MainPage/MainPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import ChooseApartmentPage from './components/pages/ChooseApartmentPage/ChooseApartmentPage';
import ContactsPage from './components/pages/ContactsPage/ContactsPage';
import OneApartmentPage from './components/pages/OneApartmentPage/OneApartmentPage';
import './components/style.css'
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import CommercyPage from './components/pages/CommercyPage/CommercyPage';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement:<ErrorPage/>,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/apartments', element: <ChooseApartmentPage /> },
        { path: '/commercy', element: < CommercyPage /> },
        { path: '/contacts', element: <ContactsPage /> },
        {
          element: <ProtectedRouter isAllowed={user.status === 'logged'} redirectTo="/" />,
          children: [
            { path: '/adminPage', element: <AdminPage /> },
          ]
        },
        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} redirectTo='/adminPage' />,
          children: [
            { path: '/admin', element: <LoginAdminPage /> },
          ]
        },
        { path: '/apartments/:id', element: <OneApartmentPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

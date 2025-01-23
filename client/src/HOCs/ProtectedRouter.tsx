import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouterTypes = {
  children?: React.ReactElement;
  isAllowed: boolean;
  redirectTo: string;
};
export default function ProtectedRouter({
  children,
  isAllowed,
  redirectTo,
}: ProtectedRouterTypes): JSX.Element {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children || <Outlet />;
}

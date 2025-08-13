import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RootRedirector() {
  const isLoggedInHint = localStorage.getItem('isLoggedIn');

  if (isLoggedInHint) {
    return <Navigate to="/main" replace />;
  }
  
  return <Navigate to="/login" replace />;
}
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './utils/AuthProvider';

// Pages
import {
  DefaultPageLayout,
  SantaFormPage,
  LoginPage,
  ProfilePage,
  RegisterUserPage,
  NotFoundPage,
  ErrorPage,
  SuccessPage
} from './pages';

function App() {
  // helper navigation function for Auth Provider
  const navigateTo = (path: string) => {
    router.navigate(path);
  };

  const router = createBrowserRouter([
    {
      element: <DefaultPageLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <SantaFormPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/santaForm',
          element: (
            <ProtectedRoute>
              <SantaFormPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/login',
          element: (
          <LoginPage />
          ),
        },
        {
          path: '/signUp',
          element: <RegisterUserPage />,
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/SuccessPage',
          element: <SuccessPage />,
        },
        {
          path: '/ErrorPage/:responseCode',
          element: <ErrorPage />,
        },
      ]
    }
  ]);

  return (
    <AuthProvider navigateTo={navigateTo}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

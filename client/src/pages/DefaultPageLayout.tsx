import React from 'react'
import { Outlet } from 'react-router';
import { PageControls } from '../components/PageControls';

export const DefaultPageLayout = () => {
  return (
    <>
      <PageControls />
      <Outlet />
    </>
  );
}

import { BrowserRouter, Routes } from 'react-router-dom';


// ROUTES
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AuthRoutes()} {/*  AUTH ROUTES  */}
        {MainRoutes()} {/*  MAIN ROUTES */}
      </Routes>
    </BrowserRouter>
  );
};

export { Router as default };

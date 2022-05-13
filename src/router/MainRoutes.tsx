import { Route } from 'react-router-dom';

// MIDDLEWARES
import { RequireAuth } from 'src/middlewares';

// LAYOUT
// import { AuthLayout } from 'src/layouts';

// PAGES
import { Home } from 'src/pages/main';

const MainRoutes = () => {
  return (
    <Route path="/">
      <RequireAuth>
        <Route index element={<Home />}></Route>
      </RequireAuth>
    </Route>
  );
};

export { MainRoutes as default };

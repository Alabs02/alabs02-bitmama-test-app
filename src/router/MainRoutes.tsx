import { Route } from 'react-router-dom';

// MIDDLEWARES
import { RequireAuth } from 'src/middlewares';

// PAGES
import { Home } from 'src/pages/main';

const MainRoutes = () => {
  return (
    <Route path="/">
      <Route  index element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      }></Route>
    </Route>
  );
};

export { MainRoutes as default };

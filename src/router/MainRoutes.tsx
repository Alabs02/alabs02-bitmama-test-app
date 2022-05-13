import { Route } from 'react-router-dom';

// LAYOUT
// import { AuthLayout } from 'src/layouts';

// PAGES
import { Home } from 'src/pages/main';

const MainRoutes = () => {
  return (
    <Route path="/">
      <Route index element={<Home />}></Route>
    </Route>
  );
};

export { MainRoutes as default };

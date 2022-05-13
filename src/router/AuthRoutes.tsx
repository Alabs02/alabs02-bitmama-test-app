import { Route } from 'react-router-dom';

// LAYOUT
import { AuthLayout } from 'src/layouts';

// PAGES
import { Signin, Signup } from 'src/pages/auth';

const AuthRoutes = () => {
  return (
    <Route element={<AuthLayout />}>
      <Route path="signin" element={<Signin />}></Route>
      <Route path="signup" element={<Signup />}></Route>
    </Route>
  );
};

export { AuthRoutes as default };

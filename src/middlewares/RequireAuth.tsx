// import Cookies from 'js-cookie';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

// STORE
import { useAppDispatch, useAppSelector } from 'src/store';

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const { current_user } = useAppSelector(state => state.auth);
  const isLoggedIn = current_user?.is_logged_in;

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/signin"
      replace={true}
      state={{ path: '/signin' }}
    />
  );
};

export { RequireAuth as default };

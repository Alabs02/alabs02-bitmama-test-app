// import Cookies from 'js-cookie';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

// STORE
import { useAppDispatch, useAppSelector } from 'src/store';

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const { current_user } = useAppSelector(state => state.auth);
  const isEmpty = Object.keys(current_user).length === 0;

  return !isEmpty ? (
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

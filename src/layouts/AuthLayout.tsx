import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

// IMAGES
import StaticImg from 'src/assets/images';

// COMPONENTS
import { AppBar } from 'src/components/navigation';

const AuthLayout = () => {
  return (
    <Fragment>
      <div className="auth-layout">
        <div className="auth-layout__wrapper grid grid-col-15">
          <div className="col-span-15 col-span-md-9 auth-layout__body pd-20 pdy-md-60 pdx-md-80 pdx-lg-100">
            <AppBar />

            <div className="auth-layout__content pdy-50">
              <Outlet />
            </div>
          </div>
          <div className="col-span-15 col-span-md-6 auth-layout__media">
            <div className="auth-layout__media-wrapper">
              <img src={StaticImg.AUTH_MEDIA} alt="Auth media" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { AuthLayout as default };

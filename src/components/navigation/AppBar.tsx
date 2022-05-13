import React, { Fragment } from 'react';

// IMAGES
import StaticImg from 'src/assets/images';

const AppBar = () => {
  return (
    <Fragment>
      <div className="app-bar">
        <div className="app-bar__media mgr-20">
          <img src={StaticImg.BRAND_LOGO} alt="Bitmama Mail Logo" />
        </div>

        <div className="app-bar__title font-open fw-bold fs-20 fs-35">
          Bitmama <span>Mail</span>
        </div>
      </div>
    </Fragment>
  );
};

export { AppBar as default };

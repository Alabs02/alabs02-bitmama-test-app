import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'material-react-toastify';
import { $storage } from 'src/services';
import Cookies from 'js-cookie';

// STORE
import { useAppDispatch, useAppSelector } from 'src/store';
import { updateCurrentUser, updateUsers, updateUserActivity } from 'src/store/slices/auth';

// COMPONENTS
import { ToolBar } from 'src/components/navigation';
import { StatusBadge } from 'src/components/core';
import { MailPanel } from 'src/components/page-comps';

// ICONS
import { IoReloadCircle } from 'react-icons/io5';
import { MdOutlinePostAdd } from 'react-icons/md';

const Home = () => {
  const dispatch = useAppDispatch();
  const search = useLocation().search;
  const session_id = new URLSearchParams(search).get('session_id');

  const refreshApp = () => window.location.reload();
  const array = Array.from({ length: 10 }, (_, index) => index + 1);
  const { current_user, users } = useAppSelector((state) => state.auth);
  const devMode = process.env.NODE_ENV === 'development';

  const cookieConfig = {
    expires: 30,
    path: '/',
    secure: true,
    domain: devMode ? 'localhost' : document.domain,
  };

  const renderMails = () => {
    return array.map((mail, index) => <MailPanel key={index} />);
  };

  const onBlur = () => {
    let _users  = Object.keys(users).map((key: any) => users[key]);
    const index = _users.findIndex((user) => user?.session_id === session_id);

    if (index > -1) _users[index].is_active = false;
    // console.log({ users, _users, index })

    dispatch(updateUsers(_users));
    dispatch(updateUserActivity(false));
    $storage.pushToStore('userPayload', current_user);
    Cookies.set(
      'userPayload',
      JSON.stringify(current_user),
      cookieConfig
    );

    toast.warning('App is in background!', {
      autoClose: 8000,
    });
  };

  const onFocus = () => {
    let _users  = Object.keys(users).map((key: any) => users[key]);
    const index = _users.findIndex((user) => user?.session_id === session_id);

    if (index > -1) _users[index].is_active = true;
    // console.log({ users, _users, index })

    dispatch(updateUsers(_users));
    dispatch(updateUserActivity(true));
    $storage.pushToStore('userPayload', current_user);
    Cookies.set(
      'userPayload',
      JSON.stringify(current_user),
      cookieConfig
    );

    toast.success('Welcome are back!', {
      autoClose: 8000,
    });
  };

  window.onblur = onBlur;

  window.onfocus = onFocus;

  const onVisiblityChange = () => {
    if (document.visibilityState === "hidden")
      onBlur();
    else 
      onFocus();
  };

  document.addEventListener("visibilitychange", onVisiblityChange, false);

  return (
    <Fragment>
      <div className="grid home-page">
        <ToolBar />
        <main className="grid grid-col-15 main">
          <div className="col-span-15 col-span-md-4 col-span-lg-3 wf-100 hf-100 main__drawer">
            <div className="wf-100 grid place-items-center pdy-10 pdx-20 pdy-lg-20 pdx-lg-40">
              <button className="btn btn-flex btn-white justify-content-center wf-100 fw-medium">
                <MdOutlinePostAdd fontSize={20} className="btn-icon mgr-20 " />
                <span>Compose</span>
              </button>
            </div>
          </div>
          <div className="col-span-15 col-span-md-11 col-span-lg-12 wf-100 hf-100 main__body">
            <nav className="nav-bar pdy-10 pdx-20">
              <button
                onClick={refreshApp}
                type={'button'}
                className="btn btn-sm btn-flat-teal-light btn-flex"
              >
                <IoReloadCircle fontSize={20} className="mgr-20" />
                <span className="">Reload</span>
              </button>

              <StatusBadge copy={
                current_user?.is_active
                  ? 'active'
                  : 'idle'
              } />
            </nav>

            <div className="main__content">{renderMails()}</div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export { Home as default };

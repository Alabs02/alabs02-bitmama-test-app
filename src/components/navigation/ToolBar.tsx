import React, { Fragment, useState, useRef } from 'react';
import { useClickAway } from 'simple-react-clickaway';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import { DropdownCard } from 'src/components/core';

// STORE
import { useAppDispatch, useAppSelector } from 'src/store';
import { updateCurrentUser, updateUsers, AuthUser } from 'src/store/slices/auth';

// ICONS
import { BiSearch } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';

// IMAGES
import StaticImg from 'src/assets/images';

const ToolBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);
  const { current_user, users } = useAppSelector((state) => state.auth);
  const { enable, disable } = useClickAway(dropdownRef, () => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);

  const dropdownClassnames = {
    'hide': isOpen === false,
    'visible': isOpen === true,
  };

  const toggleDropdown = () => {
    if (isOpen) {
      disable();
    } else {
      enable();
    }
    setIsOpen(!isOpen);
  };

  const signout = () => {
    const _users = Object.keys(users).map((key: any) => users[key]);
    const index = _users.findIndex((user) => user?.email === current_user?.email);

    if (index > -1) {
      delete  _users[index];
    }

    dispatch(updateUsers(_users));
    dispatch(updateCurrentUser({} as AuthUser));

    navigate('/signin', { replace: true });
  }

  const renderUsers = () => {
    return Array.isArray(users) && users.length > 0
      ? (
    users.map((user) => (
      <DropdownCard user={user} key={user?.id} />
    )))
    : (
      <div>No sessions!</div>
    )
  };

  return (
    <Fragment>
      <div className="tool-bar">
        <div className="tool-bar__body">
          <div className="tool-bar__content">
            <div className="tool-bar__media mgr-20">
              <img src={StaticImg.BRAND_LOGO} alt="Bitmama Mail Logo" />
            </div>

            <div className="app-bar__title tool-bar__title font-open fw-bold fs-18 fs-25">
              Bitmama <span>Mail</span>
            </div>
          </div>

          <div className="tool-bar__searchbar">
            <input
              type="text"
              name="query"
              className="tool-bar__searchbar-input"
              placeholder="Search mail"
            />
            <BiSearch fontSize={20} className="tool-bar__searchbar-icon" />
          </div>
        </div>

        <div className="tool-bar__actions">
          <div className="fs-13 fs-md-14 mgr-10 hide visible-md">{current_user.email}</div>
          <div>
            <div onClick={toggleDropdown} className="tool-bar__avatar">
              <img src={StaticImg.MALE_AVATAR} alt="User avatar" />
              {
                current_user.is_active
                  ? (<div className="badge badge-lime-green tool-bar__avatar-badge" />)
                  : (<div className="badge badge-amber tool-bar__avatar-badge" />)
              }
            </div>

            <div ref={dropdownRef} className={classnames("dropdown animate__animated animate__zoomIn", dropdownClassnames)}>
              <div className="dropdown__content">
                {renderUsers()}
              </div>
              <div className="dropdown__divider" />
              <div className="wf-100 pd-10">
                <button onClick={signout} className="dropdown__btn btn-flex">
                  <HiOutlineLogout fontSize={22} className="dropdown__btn-icon mgr-20" />
                  <span>SignOut</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { ToolBar as default };

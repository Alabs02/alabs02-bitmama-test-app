import React, { Fragment } from 'react';

// STORE
import { AuthUser } from 'src/store/slices/auth';

// COMPONENTS
import { StatusBadge } from 'src/components/core';

// INTERFACES
interface Iprops {
  user: AuthUser;
};

const DropdownCard = ({ user }: Iprops) => {
  return (
    <Fragment>
      <div className="dropdown-card">
        <div className="dropdown-card__title mgb-5">{user?.email}</div>
        <div className="dropdown-card__row">
          <StatusBadge copy={
            user?.is_active
              ? 'active'
              : 'idle'
          } />
        </div>
      </div>
    </Fragment>
  );
}

export { DropdownCard as default };
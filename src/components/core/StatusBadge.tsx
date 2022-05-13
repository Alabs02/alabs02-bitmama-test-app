import React, { Fragment } from 'react';
import classnames from 'classnames';

// ICONS
import { RiRadioButtonLine } from 'react-icons/ri';

// INTERFACES
interface IProps {
  copy: 'active' | 'idle';
}

const StatusBadge = ({ copy }: IProps) => {
  const statusBadgeClassnames = {
    'status-badge-active': copy === 'active',
    'status-badge-idle': copy === 'idle',
  };

  return (
    <Fragment>
      <div className={classnames('status-badge', statusBadgeClassnames)}>
        <RiRadioButtonLine className="mgr-10 status-badge__icon" />
        <span className="status-badge__copy text-capitalize">{copy}</span>
      </div>
    </Fragment>
  );
};

export { StatusBadge as default };

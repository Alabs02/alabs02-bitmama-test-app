import React, { Fragment } from 'react';

// ICONS
import { BsCheck2Circle } from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';

const MailPanel = () => {
  return (
    <Fragment>
      <button type={'button'} className="mail-panel">
        <div className="mail-panel__content">
          <BsCheck2Circle
            fontSize={20}
            className="mail-panel__content-icon mgr-20 hide visible-md"
          />
          <div className="mail-panel__content-title fs-13 fs-md-15">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            molestiae saepe, accusamus ad qui atque!
          </div>
        </div>
        <div className="mail-panel__actions">
          <MdAccessTime
            fontSize={18}
            className="mail-panel__actions-icon mail-panel__content-icon hide visible-md mgr-10"
          />
          <div className="mail-panel__actions-time fs-12 fs-md-14">
            2 days ago
          </div>
        </div>
      </button>
    </Fragment>
  );
};

export { MailPanel as default };

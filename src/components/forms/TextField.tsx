import React, { Fragment } from 'react';

const TextField = (props: any | unknown) => {
  return (
    <Fragment>
      <input className="form-control" {...props} />
    </Fragment>
  );
};

export { TextField as default };

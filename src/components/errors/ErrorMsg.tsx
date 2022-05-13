import { ErrorMessage } from 'formik';
import { Fragment } from 'react';

const ErrorMsg = ({ name }: { name: string }) => {
  return (
    <Fragment>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="animate__animated animate__shakeX text-tonic fs-15 lh-20 fw-medium mgt-4">
            {msg}
          </div>
        )}
      </ErrorMessage>
    </Fragment>
  );
};

export { ErrorMsg as default };

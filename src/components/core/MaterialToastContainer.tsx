import { Slide, ToastContainer } from 'material-react-toastify';
import { Fragment } from 'react';

const MaterialToastContainer = () => (
  <Fragment>
    <ToastContainer
      limit={3}
      position={'top-right'}
      autoClose={3000}
      newestOnTop={true}
      hideProgressBar={true}
      transition={Slide}
      draggable
      closeOnClick
      pauseOnHover
    />
  </Fragment>
);

export { MaterialToastContainer as default };

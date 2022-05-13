import React, { Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import { $storage } from 'src/services';
import Cookies from 'js-cookie';
import { toast } from 'material-react-toastify';
import uniqueString from 'unique-string';
import { useNavigate } from 'react-router-dom';
import { object as yupObject, string as yupString } from 'yup';

// STORE
import { useAppDispatch, useAppSelector } from 'src/store';
import { updateCurrentUser, updateUsers } from 'src/store/slices/auth';

// COMPONENTS
import { TextField } from 'src/components/forms';
import { ErrorMsg } from 'src/components/errors';
import { SuccessContent } from 'src/components/core';

const initialFormState = () => ({
  email: '',
});

const formSchema = yupObject().shape({
  email: yupString()
    .email('Invalid email address!')
    .required('Email address is required!'),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, current_user } = useAppSelector((state) => state.auth);
  const devMode = process.env.NODE_ENV === 'development';

  const signin = (values: { email: string }) => {
    const payload = {
      ...values,
      id: users?.length + 1,
      is_active: true,
      is_logged_in: true,
      session_id: uniqueString(),
    };

    const cookieConfig = {
      expires: 30,
      path: '/',
      secure: true,
      domain: devMode ? 'localhost' : document.domain,
    };

    const hasUser = users.some(
      (user) => user?.email?.toLowerCase() === values?.email?.toLowerCase()
    );

    if (hasUser) {
      dispatch(
        updateCurrentUser({
          ...current_user,
          ...{ is_logged_in: true, is_active: true },
        })
      );
      $storage.pushToStore('userPayload', {
        ...current_user,
        ...{ is_logged_in: true, is_active: true },
      });
      Cookies.set(
        'userPayload',
        JSON.stringify({
          ...current_user,
          ...{ is_logged_in: true, is_active: true },
        }),
        cookieConfig
      );
    } else {
      dispatch(updateUsers([...users, payload]));
      dispatch(updateCurrentUser(payload));
      $storage.pushToStore('userPayload', payload);
      Cookies.set('userPayload', JSON.stringify(payload), cookieConfig);
    }

    navigate(`/?session_id=${payload.session_id}`, { replace: true });
    toast(<SuccessContent message={'Signin successfully'} />);
  };

  return (
    <Fragment>
      <h3 className="fs-20 fs-md-30 fw-bold font-open auth-layout__heading">
        Sign in to Bitmama Mail
      </h3>
      <h5 className="fs-15 fs-md-18 fw-normal auth-layout__subheading mgt-20">
        Bitmama Mail makes it easy to enjoy what matters most in your world.
      </h5>

      <Formik
        initialValues={initialFormState()}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          signin(values);
        }}
      >
        <Form className="wf-100">
          <div className="grid grid-col-12 mgt-40">
            <div className="col-span-12">
              <label htmlFor="" className="form-label">
                Email address
              </label>
              <div className="wf-100">
                <Field
                  as={TextField}
                  name={'email'}
                  type={'text'}
                  placeholder={'snow@mail.com'}
                />
              </div>
              <ErrorMsg name={'email'} />
            </div>

            <div className="col-span-12 mgt-40">
              <button type={'submit'} className="btn btn-block btn-primary">
                Sign in
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </Fragment>
  );
};

export { Signin as default };

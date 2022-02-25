import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkAuth } from '../redux/auth/action';
import { authSelector } from '../redux/auth/reducer';
import Loading from './Loading';
interface Props {
  authenticated: any;
  children: any;
  checkAuth: Function;
  hasError: boolean;
  loading: boolean
}
function Protect(props: Props) {
  console.log(props.authenticated?.success);
  useEffect(() => {
    props.checkAuth();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authenticated?.success) navigate('/quiz');
  }, [props.authenticated]);
  useEffect(() => {
    if (props.hasError) navigate('/auth');
  }, [props]);
  if(props.loading) return <Loading/>
  if (props.authenticated?.success || props.hasError) return <>{props.children}</>;
  // return <h1>ghjg</h1>;
  // return <>{`${JSON.stringify(props)}`}</>;
  return <Loading/>;
}
const mapStateToProps = (state: any) => ({
  loading: authSelector(state).loading,
  authenticated: authSelector(state).data,
  hasError: authSelector(state).hasError,
});
export default connect(mapStateToProps, {
  checkAuth,
})(Protect);

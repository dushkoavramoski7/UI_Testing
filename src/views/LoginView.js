import * as yup from "yup";
import {FormikProvider, useFormik} from "formik";
import TextField from "@mui/material/TextField";
import {useStyles} from "../factory/StyleFactory";
import {loginViewStyle} from "./style/LoginViewStyle";
import {useDispatch, useSelector} from "react-redux";
import {loginActions} from "../redux/action/loginActions";
import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SnackbarAlert from "./components/SnackbarAlert";


const validationSchema = yup.object({
    username: yup.string("Username is required.").required("Username is required."),
    password: yup.string("Password is required.").required("Password is required."),
});
function LoginView() {
    const classes = useStyles(loginViewStyle);
    const dispatch = useDispatch();
    const history = useHistory();
    const id = useParams();
    const user = useSelector(state => state.login?.username);
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const initialValues = {
        username: '',
        password: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            dispatch(loginActions.userLogin(values.username));
            history.push("/brands")
        }
    });

    const disableLoginButton = (formik) => {
        if(formik.values.password === "" || formik.values.username === ""){
            return true;
        }
        else return !!((formik.touched.username && Boolean(formik.errors.username)) || (formik.touched.password && Boolean(formik.errors.password)));
    }

    return (
        <>
            <div className="loginColumns animated fadeInDown bg-light mt-5" style={{padding: '15px 30px 30px 30px', borderRadius: '15px'}}>
                {user !== '' ? <div className={'text-center font-weight-bold p-2'} style={{color: 'rgba(26,179,148)', backgroundColor:'rgba(26,179,148, .2)'}}><i
                    className="fa fa-check" aria-hidden="true"></i> User created! <br/> Use same credentials to login. </div> : ''}
                {window.location.pathname === '/logout' ? <div className={'text-center font-weight-bold p-2'} style={{color: 'rgba(26,179,148)', backgroundColor:'rgba(26,179,148, .2)'}}><i
                    className="fa fa-check" aria-hidden="true"></i> You have been successfully logged out. </div> : ''}

                <div className="row p-2" style={{paddingTop: '0px'}}>

                    <div className="col-md-6 text-justify">
                        <h2 className="font-bold">Welcome to 'Sample app'</h2>

                        <p>
                            Pellentesque cursus quam sit amet massa blandit tristique. Ut eget diam egestas, ultrices lectus non, tincidunt felis.
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s.
                        </p>

                        <p>
                            Maecenas sapien orci, efficitur in lectus at, varius aliquam risus. Aenean id eros a sem facilisis sollicitudin quis sed est. Mauris a lectus varius, porttitor mi vel, posuere mauris.
                        </p>
                        <br/>

                        <p>
                            <small>Curabitur tristique magna ut nisl suscipit varius. Morbi eu elementum nulla, eu dapibus ex. Phasellus mattis faucibus turpis quis pharetra.</small>
                        </p>

                    </div>
                    <div className="col-md-6 p-2">
                        <div className="ibox-content">
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <TextField id="username"
                                                       name="username"
                                                       className={classes.inputField}
                                                       label="Username"
                                                       onBlur={formik.handleBlur}
                                                       value={formik.values.username}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.username && Boolean(formik.errors.username)}
                                                       fullWidth={true}
                                                       size={'small'}
                                                       margin="none"
                                                       placeholder="Please enter username"/>
                                            <div>
                                                {formik.touched.username && Boolean(formik.errors.username) ? (
                                                    <span data-testid='usernameError' className={`${classes.errorText}`}>{formik.errors.username}</span>): null }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <TextField id="password"
                                                       name="password"
                                                       className={classes.inputField}
                                                       label="Password"
                                                       value={formik.values.password}
                                                       onBlur={formik.handleBlur}
                                                       onChange={formik.handleChange}
                                                       error={formik.touched.password && Boolean(formik.errors.password)}
                                                       fullWidth={true}
                                                       size={'small'}
                                                       margin="none"
                                                       type={"password"}
                                                       placeholder="Please enter password"/>
                                            <div>
                                                {formik.touched.password && Boolean(formik.errors.password) ? (
                                                    <span className={`${classes.errorText}`}>{formik.errors.password}</span>): null }
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary block full-width m-b" disabled={disableLoginButton(formik)}>Login</button>

                                        <a href="#">
                                            <small>Forgot password?</small>
                                        </a>

                                        <p className="text-muted text-center">
                                            <small>Do not have an account?</small>
                                        </p>
                                        <Link to={'/register'} className="btn btn-sm btn-white btn-block">Create an account</Link>
                                </form>
                            </FormikProvider>
                            <p className="m-t">
                                <small>Sample web app for UI testing © Company - 2022</small>
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        Copyright Example Company
                    </div>
                    <div className="col-md-6 text-right">
                        <small>© 2021 - 2022</small>
                    </div>
                </div>
            </div>
            <SnackbarAlert snackbarStatus={snackbarStatus}
                           closeSnackbar={() => setSnackbarStatus(false)}
                           snackbarMessage={snackbarMessage}/>
        </>
    )
}
export default LoginView;
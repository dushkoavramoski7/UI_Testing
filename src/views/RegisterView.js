import {Link, useHistory} from "react-router-dom";
import {useEffect} from "react";
import {FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import {useStyles} from "../factory/StyleFactory";
import {loginViewStyle} from "./style/LoginViewStyle";
import {loginActions} from "../redux/action/loginActions";
import {useDispatch} from "react-redux";


const validationSchema = yup.object({
    username: yup.string("Username is required.").required("Username is required."),
    email: yup.string("Email is required.").required("Email is required.").email("Email not valid."),
    password: yup.string("Password is required.").required("Password is required."),
});
function RegisterView() {
    const classes = useStyles(loginViewStyle);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        window.scroll(0, 0);
        dispatch(loginActions.userLogin(''));
    }, [])
    const initialValues = {
        username: '',
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            dispatch(loginActions.userLogin(values.username));
            history.push("/login")
        }
    });

    return (
        <>
            <div className="middle-box text-center loginscreen mt-5  animated fadeInDown bg-light" style={{width: '600px', padding: '30px 30px 30px 30px', borderRadius: '15px'}}>
                <div style={{marginTop: '-40px'}}>
                    <div>
                        <h1 className="logo-name">IN+</h1>
                    </div>
                    <h3>Register to Sample web-app</h3>
                    <p>Create account to see it in action.</p>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField id="username"
                                       name="username"
                                       className={classes.inputField}
                                       label="Username"
                                       value={formik.values.username}
                                       onChange={formik.handleChange}
                                       error={formik.touched.username && Boolean(formik.errors.username)}
                                       fullWidth={true}
                                       size={'small'}
                                       margin="none"
                                       placeholder="Please enter username"/>
                            <div className={'d-flex justify-content-start'}>
                                {formik.touched.username && Boolean(formik.errors.username) ? (
                                    <span className={`${classes.errorText}`}>{formik.errors.username}</span>): null }
                            </div>
                        </div>
                        <div className="form-group">
                            <TextField id="email"
                                       name="email"
                                       className={classes.inputField}
                                       label="Email"
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       fullWidth={true}
                                       size={'small'}
                                       margin="none"
                                       type={"text"}
                                       placeholder="Please enter email"/>
                            <div className={'d-flex justify-content-start'}>
                                {formik.touched.email && Boolean(formik.errors.email) ? (
                                    <span className={`${classes.errorText}`}>{formik.errors.email}</span>): null }
                            </div>
                        </div>
                        <div className="form-group">
                            <TextField id="password"
                                       name="password"
                                       className={classes.inputField}
                                       label="Password"
                                       value={formik.values.password}
                                       onChange={formik.handleChange}
                                       error={formik.touched.password && Boolean(formik.errors.password)}
                                       fullWidth={true}
                                       size={'small'}
                                       margin="none"
                                       type={"password"}
                                       placeholder="Please enter password"/>
                            <div className={'d-flex justify-content-start'}>
                                {formik.touched.password && Boolean(formik.errors.password) ? (
                                    <span className={`${classes.errorText}`}>{formik.errors.password}</span>): null }
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="checkbox i-checks"><label> <input type="checkbox"/><i></i> Agree the terms
                                and policy </label></div>
                        </div>
                        <button type="submit" className="btn btn-primary block full-width m-b">Register</button>

                        <p className="text-muted text-center"><small>Already have an account?</small></p>
                        <Link to={'/login'} className="btn btn-sm btn-white btn-block">Login</Link>
                    </form>
                    </FormikProvider>
                    <p className="m-t"><small>Sample web app &copy; 2022</small></p>
                </div>
            </div>
        </>
    )
}
export default RegisterView;
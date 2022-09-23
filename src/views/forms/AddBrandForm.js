import {useStyles} from "../../factory/StyleFactory";
import {addBrandFormStyle} from './style/AddBrandFormStyle'
import {useEffect, useRef, useState} from "react";
import SideBar from "../page_elements/SideBar";
import TopBar from "../page_elements/TopBar";
import BreadCrumbs from "../components/BreadCrumbs";
import TextField from '@mui/material/TextField';
import {Link, useHistory, useParams} from "react-router-dom";
import {FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import {brandActions} from "../../redux/action/brandActions";
import {useDispatch, useSelector} from "react-redux";
import SnackbarAlert from "../components/SnackbarAlert";
import LoadingButton from "@mui/lab/LoadingButton";
import {Button} from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

let lengthInput = 400;
const validationSchema = yup.object({
    brandName: yup.string("Brand name is required.").required("Brand name is required."),
    brandManufacturer: yup.string("Brand manufacturer is required.").required("Brand manufacturer is required."),
    brandDescription: yup.string("").max(lengthInput, "Brand description must be at most " + lengthInput + " characters."),
});

function AddBrandForm() {
    const classes = useStyles(addBrandFormStyle);
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    let brand = useSelector(state => state.brand.fetchedBrand)

    const breadCrumbsItems = [{name: 'Home', href: '/home'}, {name: 'Tables', href: '/tables'}];
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const elementRef = useRef(null);
    const elementRef1 = useRef(null);
    const elementRef2 = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scroll(0,0)
        if(Boolean(id)) {
            dispatch(brandActions.fetchBrand(id));
        }
    }, [])

    useEffect(() => {
        if(Boolean(id)) {
            setInitialValues(brand, formik.values, formik.setValues)
        }
    }, [brand])

    const setInitialValues = (brand, values, setValues) => {
        setValues({
            ...values,
            brandName: brand.brandName,
            brandManufacturer: brand.brandManufacturer,
            brandDescription: brand.brandDescription
        })
    }

    const initialValues = {
        brandName: '' ,
        brandManufacturer: '',
        brandDescription: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            setLoading(true)
            if(id === undefined) {
                addBrand(values)
            }
            else {
                editBrand(values)
            }
        }
    });

    const addBrand = (values) => {
        dispatch(brandActions.addBrand(values,id => {
            if(id === null) {
                createSnackBar('Failed!', 'Brand with this name already exists.', 'error')
            }
            setLoading(false)
            if( id !== null ) {
                createSnackBar('Success!', 'Brand added successfully.', 'success')
                formik.setValues({
                    ...formik.values,
                    brandName: '',
                    brandManufacturer: '',
                    brandDescription: ''
                })
                formik.setFieldTouched('brandName', false)
                formik.setFieldTouched('brandManufacturer', false)
                formik.setFieldTouched('brandDescription', false)
                history.push("/addBrand")
            }
        }));
    }

    const editBrand = (values) => {
        dispatch(brandActions.editBrand(id, values,brandId => {
            if(brandId === null) {
                createSnackBar('Failed!', 'Brand with this name already exists.', 'error')
            }
            setLoading(false)
            if( brandId !== null ) {
                createSnackBar('Success!', 'Brand edited successfully.', 'success')
                history.push("/addBrand/edit/" + brandId)
            }
        }));
    }

    const createSnackBar = (message, subMessage, status) => {
        setSnackbarMessage({
            message: message,
            subMessage: subMessage,
            status: status
        })
        setSnackbarStatus(true)
    }

    const disableSubmitButton = (formik) => {
        return (formik.touched.brandName && Boolean(formik.errors.brandName)) ||
            (formik.touched.brandManufacturer && Boolean(formik.errors.brandManufacturer)) ||
            (formik.touched.brandDescription && Boolean(formik.errors.brandDescription));
    }

    return (
        <div className="fixed-sidebar no-skin-config full-height-layout">
            <div id="wrapper">
                <SideBar/>
                <div id="page-wrapper" className="gray-bg">
                    <div ref={elementRef1}>
                        <TopBar/>
                    </div>
                    <BreadCrumbs breadCrumbsItems={breadCrumbsItems} breadCrumbsActive={id === undefined ? 'Add Brand' : 'Edit Brand'}/>
                    <br/>
                    <div className={'row d-flex justify-content-end'} >
                        <div className={'col-1 d-flex justify-content-end'}>
                            <Button color={"success"} sx={{color: 'rgb(26,179,148)', borderColor: 'rgb(26,179,148)', "& :hover": {borderColor: 'rgb(26,179,148)'}}} variant="outlined" size={'small'} onClick={() => window.scroll(0,window.innerHeight)}><KeyboardArrowDownRoundedIcon fontSize={'small'} sx={{color: 'rgb(26,179,148)'}} /></Button>
                        </div>
                    </div>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <div ref={elementRef} className={"mt-1"}>
                                    <div>
                                        <div className={'row'}>
                                            <div className={'col-6'}>
                                                <TextField id="brandName"
                                                           name="brandName"
                                                           className={classes.inputField}
                                                           label="Name *"
                                                           value={formik.values.brandName}
                                                           onBlur={formik.handleBlur}
                                                           onChange={formik.handleChange}
                                                           error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                                                           fullWidth={true}
                                                           margin="normal"
                                                           placeholder="Please enter brand name..."/>
                                                <div>
                                                    {formik.touched.brandName && Boolean(formik.errors.brandName) ? (
                                                        <span className={`${classes.errorText}`}>{formik.errors.brandName}</span>): null }
                                                </div>

                                            </div>
                                            <div className={'col-6'}>
                                                <TextField id="brandManufacturer"
                                                           name="brandManufacturer"
                                                           className={classes.inputField}
                                                           label="Manufacturer *"
                                                           value={formik.values.brandManufacturer}
                                                           onBlur={formik.handleBlur}
                                                           onChange={formik.handleChange}
                                                           error={formik.touched.brandManufacturer && Boolean(formik.errors.brandManufacturer)}
                                                           fullWidth={true}
                                                           margin="normal"
                                                           placeholder="Please enter brand manufacturer..."/>
                                                <div>
                                                    {formik.touched.brandManufacturer && Boolean(formik.errors.brandManufacturer) ? (
                                                        <span className={`${classes.errorText}`}>{formik.errors.brandManufacturer}</span>): null }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'row'}>
                                            <div className="col">
                                                <TextField id="brandDescription"
                                                           name="brandDescription"
                                                           className={classes.inputField}
                                                           label="Description"
                                                           value={formik.values.brandDescription}
                                                           onBlur={formik.handleBlur}
                                                           onChange={formik.handleChange}
                                                           error={formik.touched.brandDescription && Boolean(formik.errors.brandDescription)}
                                                           fullWidth={true}
                                                           margin="normal"
                                                           placeholder="Please enter brand description..."
                                                           multiline
                                                           rows={6}/>
                                                <div>
                                                    {formik.touched.brandDescription && Boolean(formik.errors.brandDescription) ? (
                                                        <span className={`${classes.errorText}`} style={{float: 'left'}}>{formik.errors.brandDescription}</span>): null }
                                                    <span data-testid='countingLetters' style={{float: 'right'}}>{formik.values.brandDescription?.length}/{lengthInput}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="footer navy-bg" ref={elementRef2}>
                                <div className="col d-flex justify-content-end">
                                    <Link to={'/brands'}>
                                        <button type="submit" className="btn btn-primary"><h3 className={'m-0 p-1'}>Cancel</h3></button>
                                    </Link>
                                    <button disabled={disableSubmitButton(formik)} className={'btn btn-primary'} hidden={loading}><h3 className={'m-0 p-1'}>{id === undefined ? 'SAVE' : 'EDIT'}</h3></button>
                                    <div className="d-flex justify-content-center mt-1" >
                                        <LoadingButton style={{border: 'none'}} loading={loading} variant="outlined" hidden={!loading}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </FormikProvider>
                </div>
                <SnackbarAlert snackbarStatus={snackbarStatus}
                               closeSnackbar={() => setSnackbarStatus(false)}
                               snackbarMessage={snackbarMessage}/>
            </div>
        </div>
    )
}

export default AddBrandForm;


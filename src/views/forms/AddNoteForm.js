import {FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import {brandActions} from "../../redux/action/brandActions";
import {useDispatch} from "react-redux";
import Radio from '@mui/material/Radio';
import {FormLabel, RadioGroup} from "@mui/material";
import {FormControlLabel} from "@material-ui/core";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {useStyles} from "../../factory/StyleFactory";
import {addNoteFormStyle} from "./style/AddNoteFormStyle";
import TextField from "@mui/material/TextField";

let lengthTextNoteInput = 150;
const validationSchema = yup.object({
    noteText: yup.string("Enter note text.")
        .required("Enter note text.")
        .max(lengthTextNoteInput, "Note text must be at most " + lengthTextNoteInput + " characters."),
    notePriority: '',
    brand: '',
    category: '',
    shippingCalculations: '',
});

function AddNoteForm({showNoteForm, brand}) {
    const classes = useStyles(addNoteFormStyle);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        noteText: '',
        notePriority: 'LOW',
        brand: brand,
        category: null,
        shippingCalculations: null
    }

    const disableSubmitButton = (formik) => {
        if(formik.values.noteText === ""){
            return true;
        }
        else return !!((formik.touched.noteText && Boolean(formik.errors.noteText)));
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            setLoading(true)
            dispatch(brandActions.addNoteInBrand(values, brand.brandId, success => {
                setLoading(false)
                formik.setValues({
                    ...values,
                    noteText: '',
                    notePriority: 'LOW'
                })
            }));
        }
    });
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={"mb-3"} hidden={!showNoteForm}>
                    <div className="form-group">
                            <TextField id="noteText"
                                       name="noteText"
                                       className={classes.inputField}
                                       label={'Note Text'}
                                       value={formik.values.noteText}
                                       onBlur={formik.handleBlur}
                                       onChange={formik.handleChange}
                                       error={formik.touched.noteText && Boolean(formik.errors?.noteText)}
                                       fullWidth={true}
                                       spellCheck={false}
                                       multiline
                                       rows={4}/>
                        <div>
                        {formik.touched.noteText && Boolean(formik.errors?.noteText) ? (
                            <span className={`${classes.errorText}`} style={{float: 'left'}}>{formik.errors?.noteText}</span>
                        ) : null}
                            <span style={{float: 'right'}}>{formik.values.noteText.length}/{lengthTextNoteInput}</span>
                        </div>
                    </div>
                    <div className="form-group  mt-4" style={{marginBottom: '-6px'}}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Note Priority</FormLabel>
                        <RadioGroup id="notePriority" name="notePriority" onChange={formik.handleChange} defaultValue={"LOW"} >
                            <div className={'row ml-1 d-flex justify-content-around'}>
                                <FormControlLabel
                                    control={<Radio sx={{
                                    color: 'grey',
                                    '&.Mui-checked': {
                                        color: 'rgb(26,179,148)',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgb(26,179,148, 0.05)'
                                    },
                                }} size={'small'}
                                   checked={formik.values.notePriority === 'LOW'}/>}
                                   value={"LOW"} label={"Low"} data-test={"LOW"}/>

                                <FormControlLabel control={
                                    <Radio sx={{
                                    color: 'grey',
                                    '&.Mui-checked': {
                                        color: '#1c84c6',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(28, 132, 198, 0.05)'
                                    },
                                    }} size={'small'}
                                    checked={formik.values.notePriority === 'MEDIUM'}/>}
                                    value={"MEDIUM"} label={"Medium"} data-test={"MEDIUM"}/>

                                <FormControlLabel control={<Radio sx={{
                                    color: 'grey',
                                    '&.Mui-checked': {
                                        color: 'rgb(248, 172, 89)',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgb(248, 172, 89, 0.05)'
                                    },
                                }} size={'small'}
                                checked={formik.values.notePriority === 'HIGH'}/>}
                                value={"HIGH"} label={"High"} data-test={"HIGH"}/>
                            </div>
                        </RadioGroup>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block"
                            hidden={loading}
                            disabled={disableSubmitButton(formik)}
                            data-test={"submit-note"}
                    >
                        Submit
                    </button>
                    <div className="d-flex justify-content-center mt-1" >
                        <LoadingButton style={{border: 'none'}} loading={loading} variant="outlined" hidden={!loading}/>
                    </div>

                </div>
            </form>
        </FormikProvider>
    )
}

export default AddNoteForm;
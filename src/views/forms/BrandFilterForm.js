import {FormikProvider, useFormik} from "formik";
import {brandActions} from "../../redux/action/brandActions";
import {useDispatch, useSelector} from "react-redux";
import SelectSearch, { fuzzySearch } from "react-select-search";
import {useEffect} from "react";
import './style/BrandFilterFormStyle.css'
import {FormControlLabel} from "@material-ui/core";
import Radio from "@mui/material/Radio";
import {createMuiTheme, RadioGroup} from "@mui/material";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import {ThemeProvider} from "@material-ui/core/styles";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#13ab8c',
        },
    },
});

function BrandFilterForm({setPage, itemsPerPage, setEndOffset, setItemOffset, setOpenPopoverFilterBrand}) {
    const filterBy = useSelector(state => state.brand.filterBy);
    const brandManufacturers = useSelector(state => state.brand.brandManufacturers);
    const brandNames = useSelector(state => state.brand.brandNames);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(brandActions.getItemsForSelect());
    }, []);

    const initialValues = {
        brandName: filterBy.brandName,
        brandManufacturer: filterBy.brandManufacturer,
        brandActiveFlag: filterBy.brandActiveFlag,
        brandCreatedAfter: filterBy.brandCreatedAfter,
        brandCreatedBefore: filterBy.brandCreatedBefore
    }
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: values => {
            dispatch(brandActions.filterBrands(values, false))
            setItemOffset(0)
            setEndOffset(itemsPerPage)
            setPage(0)
        }
    });

    const clearFilter = () => {
        dispatch(brandActions.filterBrands({brandName: '', brandManufacturer: '', brandActiveFlag: '', brandCreatedAfter: null, brandCreatedBefore: null}, true))
    }

    const handleChangeManufacturer = (e, values, setValues) => {
        setValues({
            ...values,
            brandManufacturer: e
        })
    }

    const handleChangeName = (e, values, setValues) => {
        setValues({
            ...values,
            brandName: e
        })
    }

    const handleChangeCreatedAfter = (e, values, setValues) => {
        setValues({
            ...values,
            brandCreatedAfter: e
        })
    }

    const handleChangeCreatedBefore = (e, values, setValues) => {
        setValues({
            ...values,
            brandCreatedBefore: e
        })
    }

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className={"mt-1"}>
                    <div className={"row"}>
                        <div className="form-group col-6">
                            <label htmlFor="brandName">Brand Name:</label>
                            <SelectSearch
                                data-test={"brandNamesFilter"}
                                options={brandNames}
                                value={formik.values.brandName}
                                onChange={(e) => handleChangeName(e, formik.values, formik.setValues)}
                                search
                                multiple={true}
                                printOptions={"on-focus"}
                                closeOnSelect={false}
                                filterOptions={fuzzySearch}
                                placeholder="Select name/s"
                            />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="brandManufacturer">Brand Manufacturer:</label>
                            <SelectSearch
                                options={brandManufacturers}
                                value={formik.values.brandManufacturer}
                                onChange={(e) => handleChangeManufacturer(e, formik.values, formik.setValues)}
                                search
                                multiple={true}
                                printOptions={"on-focus"}
                                closeOnSelect={false}
                                filterOptions={fuzzySearch}
                                placeholder="Select manufacturer/s"
                            />
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"} style={{marginBottom: '-15px'}}>
                        <div className="form-group col-5">
                            <label htmlFor="brandDateCreatedAfter">Brand Date Created:</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    id={"brandDateCreatedAfter"}
                                    renderinput={(props) => <TextField {...props} />}
                                    disableFuture
                                    fullWidth
                                    openTo="year"
                                    margin="normal"
                                    format="dd/MM/yyyy"
                                    views={["year", "month", "date"]}
                                    helperText="(dd/mm/yyyy)"
                                    placeholder="After"
                                    value={formik.values.brandCreatedAfter}
                                    onChange={(e) => handleChangeCreatedAfter(e, formik.values, formik.setValues)}
                                    style={{marginTop: '-6px'}}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="form-group col-2 align-self-lg-center d-flex justify-content-sm-center">
                            <DateRangeOutlinedIcon fontSize={'small'}/>
                        </div>
                        <div className="form-group col-5" style={{marginTop: '30px'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    data-test={"beforeDate"}
                                    id={"brandDateCreatedAfter"}
                                    renderinput={(props) => <TextField {...props} />}
                                    disableFuture
                                    fullWidth
                                    openTo="year"
                                    margin="normal"
                                    format="dd/MM/yyyy"
                                    views={["year", "month", "date"]}
                                    helperText="(dd/mm/yyyy)"
                                    placeholder="Before"
                                    value={formik.values.brandCreatedBefore}
                                    onChange={(e) => handleChangeCreatedBefore(e, formik.values, formik.setValues)}
                                    style={{marginTop: '-6px'}}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className="form-group col-12" style={{marginBottom: '-8px'}}>
                            <label htmlFor="brandActiveFlag">Brand Active:</label>
                            <RadioGroup id="brandActiveFlag" name="brandActiveFlag" onChange={formik.handleChange}
                                        style={{marginTop: '-4px'}}>
                                <div className={'row ml-1 d-flex justify-content-start'} style={{marginTop: '-4px'}}>
                                    <FormControlLabel control={
                                        <Radio
                                            sx={{
                                                color: 'grey',
                                                '&.Mui-checked': {
                                                    color: 'rgb(26,179,148)',
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgb(26,179,148, 0.05)'
                                                },
                                            }}
                                            size={'small'}
                                            checked={formik.values.brandActiveFlag === '0'}/>}
                                                      value={'0'} label={<span style={{ fontSize: '14px' }}> Not Active <b>(false)</b> </span>}/>
                                    <FormControlLabel control={
                                        <Radio
                                            sx={{
                                                color: 'grey',
                                                '&.Mui-checked': {
                                                    color: 'rgb(26,179,148)',
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgb(26,179,148, 0.05)'
                                                },
                                                fontSize: '30px'
                                            }}
                                            size={'small'}
                                            checked={formik.values.brandActiveFlag === '1'}/>}
                                                      value={'1'} label={<span style={{ fontSize: '14px' }}> Active <b>(true)</b> </span>}/>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col d-flex justify-content-end"}>
                            <a type={"button"} className="btn btn-sm btn-default mr-sm-1 m-1" onClick={clearFilter}>
                                Clear Filter
                            </a>
                            <button type="submit" className="btn btn-sm btn-primary w-25 mr-sm-1 m-1"
                                    onClick={() => setOpenPopoverFilterBrand(false)}>
                                Filter
                            </button>
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </ThemeProvider>
    )
}
export default BrandFilterForm;
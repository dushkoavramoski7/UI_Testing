import TopBar from "./page_elements/TopBar";
import SideBar from "./page_elements/SideBar";
import BreadCrumbs from "./components/BreadCrumbs";
import Footer from "./page_elements/Footer";
import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from "react";
import {brandActions} from '../redux/action/brandActions.js'
import PaginationFooter from "./components/PaginationFooter";
import DetailsBrandSideBar from "./components/DetailsBrandSideBar";
import Checkbox from '@mui/material/Checkbox';
import {exportToExcel, exportToCSV} from "../utils/utils";

import PaginationHeader from "./components/PaginationHeader";
import {useStyles} from "../factory/StyleFactory";
import {brandViewStyle} from "./style/BrandViewStyle";
import DeleteModal from "./modal/DeleteModal";
import SnackbarAlert from "./components/SnackbarAlert";
import BrandFilterForm from "./forms/BrandFilterForm";
import FilterChipBrandIndicators from "./components/FilterChipBrandIndicators";
import ImportDataModal from "./modal/ImportDataModal";
import ExportDataModal from "./modal/ExportDataModal";
import SearchInputTable from "./components/SearchInputTable";
import MainButtons from "./components/MainButtons";
import {Box, Button, LinearProgress} from "@mui/material";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Link} from "react-router-dom";
import {loginActions} from "../redux/action/loginActions";

function BrandView() {
    const classes = useStyles(brandViewStyle);
    const breadCrumbsItems = [{name: 'Home', href: '/home'}, {name: 'Tables', href: '/tables'}];
    const brands = useSelector(state => state.brand.brands);
    const allBrands = useSelector(state => state.brand.allBrands);
    const filterBy = useSelector(state => state.brand.filterBy);
    const user = useSelector(state => state.login.username);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [openDeleteBrand, setOpenDeleteBrad] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemsPerPage);
    const [openImportBrand, setOpenImportBrand] = useState(false);
    const [openExportBrand, setOpenExportBrand] = useState(false);
    const [searchedVal, setSearchedVal] = useState('');
    const [brandToBeDeleted, setBrandToBeDeleted] = useState('');
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortByColumn, setSortByColumn] = useState('brandName');
    const [sortIndicatorHover, setSortIndicatorHover] = useState('');
    const [openPopoverFilterBrand, setOpenPopoverFilterBrand] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchBrands = () => {
        dispatch(brandActions.fetchAllBrands());
    }

    const loginSuccess = () => {
        if(user !== '') {
            setSnackbarMessage({
                message: 'Welcome!',
                subMessage: 'Login Successful.',
                status: 'success'
            })
            setSnackbarStatus(true)
        }
    }
    useEffect(() => {
        window.scroll(0,0);
        fetchBrands();
        loginSuccess();
        dispatch(loginActions.userLogin(''));
    }, []);

    const selectBrand = (brand) => {
        dispatch(brandActions.selectBrand(brand));
    }

    const changeActiveFlagHandler = (brand) => {
        dispatch(brandActions.changeActiveStatusBrand(brand))
    };

    // <-- START Control Delete Brand Modal -->
    function deleteBrand(_callback) {
        dispatch(brandActions.deleteBrand(brandToBeDeleted.brandId, success => {
            closeDeleteBrandDialog(success)
            _callback();
        }));
    }

    const openDeleteBrandDialog = (brand) => {
        setOpenDeleteBrad(true);
        setBrandToBeDeleted(brand);
    }

    const closeDeleteBrandDialog = (success) => {
        setOpenDeleteBrad(false);
        if (success === true || success === false) {
            success ? setSnackbarMessage({
                    message: 'Success!',
                    subMessage: 'Brand deleted successfully.',
                    status: 'success'
                }) :
                setSnackbarMessage({
                    message: 'Failed to delete brand!',
                    subMessage: 'Products exist with this brand.',
                    status: 'error'
                })
            setSnackbarStatus(true)
        }
    }
    // <-- END Control Delete Brand Modal -->

    // <-- START Control Import Brand (Excel) Modal -->
    const openImportBrandModal = () => {
        setOpenImportBrand(true);
    }

    const closeImportBrandModal = () => {
        setOpenImportBrand(false);
    }

    function uploadBrandExcelFile(file) {
        setLoading(true);
        dispatch(brandActions.importBrandExcel(file, success => {
            success.status ? setSnackbarMessage({
                    message: 'Success!',
                    subMessage: 'File uploaded successfully',
                    status: 'success',
                    importFile: true,
                    newData: (success.data.map((brand) => (brand.brandName)))
                }) :
                setSnackbarMessage({
                    message: 'Failed to upload!',
                    subMessage: 'Follow instructions for uploading a file.',
                    status: 'error'
                })
            setSnackbarStatus(true)
            setLoading(false);
            cancelSearch();
        }))
    }

    // <-- END Control Import Brand (Excel) Modal -->

    // <-- START Control Export Brand Modal -->
    function exportBrands(values, _callback) {
        const headers = [[
            'Name',
            'Manufacturer',
            'Description',
            'Active',
            'Date Created',
            'Date Modified'
        ]];
        const brandsToBeExported = (values.filteredItems === 'true' ? brands.map((brand) => ([brand.brandName, brand.brandManufacturer, brand.brandDescription, brand.brandActiveFlag, brand.formattedBrandDateCreated, brand.formattedBrandDateModified])) :
            allBrands.map((brand) => ([brand.brandName, brand.brandManufacturer, brand.brandDescription, brand.brandActiveFlag, brand.formattedBrandDateCreated, brand.formattedBrandDateModified ])));
        const fileName = 'Brands Export (' + (new Date(Date.now())).toDateString() + ')' + (values.filteredItems === 'true' ? 'Filtered:' + (filterBy.brandName.length!==0 ? 'BrandName:' + filterBy.brandName.map((item) => item.toString()) : '')
            + (filterBy.brandManufacturer.length!==0 ? 'BrandManufacturer:' + filterBy.brandManufacturer.map((item) => item.toString()) + '/' : '')
            + (filterBy.brandActiveFlag!=='' ? 'BrandActive:' + (filterBy.brandActiveFlag === '1' ? 'true' : 'false') + '/' : '')
            + (filterBy.brandCreatedAfter!==null ? 'brandCreatedAfter:' + filterBy.brandCreatedAfter.toDateString() + '/' : '')
            + (filterBy.brandCreatedBefore!==null ? 'brandCreatedBefore:' + filterBy.brandCreatedBefore.toDateString() + '/' : '')
            : 'All') + (values.fileFormat === 'xlsx' ? '.xlsx' : '');

        values.fileFormat === 'xlsx' ? exportToExcel(fileName, brandsToBeExported, headers, 'Brands') : exportToCSV(fileName, brandsToBeExported, headers)
        setSnackbarMessage({
            message: 'Success!',
            subMessage: 'Document ready.',
            status: 'success',
        })
        setSnackbarStatus(true)
        _callback();
    }

    const openExportBrandModal = () => {
        setOpenExportBrand(true);
    }

    const closeExportBrandModal = () => {
        setOpenExportBrand(false);
    }
    // <-- END Control Export Brand Modal -->

    // <-- START Search Brand -->
    const searchBrand = (searchVal) => {
        if (searchVal.target.value === "") {
            setSearchedVal('')
            dispatch(brandActions.replaceBrandWithAllBrands())
        } else {
            setSearchedVal(searchVal.target.value)
            setItemOffset(0)
            setEndOffset(itemsPerPage)
            setPage(0)
            dispatch(brandActions.searchBrand(searchVal.target.value))
        }
    }

    const cancelSearch = () => {
        setSearchedVal('')
        dispatch(brandActions.replaceBrandWithAllBrands())
    }
    // <-- END Search Brand -->

    // <-- START Sorting Brands-->
    const sortBrand = (sortBy) => {
        let sortDirection_temp;
        if (sortByColumn !== sortBy) {
            setSortDirection('asc')
            sortDirection_temp = 'asc'
        } else {
            if (sortDirection === 'asc') {
                setSortDirection('desc')
                sortDirection_temp = 'desc'
            } else if (sortDirection === 'desc') {
                setSortDirection('asc')
                sortDirection_temp = 'asc'
            }
        }
        setSortByColumn(sortBy)
        dispatch(brandActions.sortBrands(sortBy, sortDirection_temp))
    }

    const showSortIndicator = (sortBy) => {
        if (sortDirection === '') {
            return null;
        } else {
            if (sortDirection === 'asc' && sortByColumn === sortBy) {
                return (<span className={'ml-1'}> <i className={'fa fa-arrow-down'}/> </span>)
            } else if (sortDirection === 'desc' && sortByColumn === sortBy) {
                return (<span className={'ml-1'}> <i className={'fa fa-arrow-up'}/> </span>)
            }
        }
    }

    const showSortIndicatorHover = (sortBy) => {
        if(sortBy === sortIndicatorHover && sortBy !== sortByColumn)
        {
            return (<span className={'ml-1'}> <i className={'fa fa-arrow-down'}/> </span>)
        }
    }

    const displayColumnNamesSortable = (columnNameTitle, columnNameSort) => {
        return (
            <th onClick={() => sortBrand(columnNameSort)}
                className={sortByColumn === columnNameSort ? `${classes.mainColorHover} ${classes.cursorPointerHover} ${classes.mainColorText}` : `${classes.cursorPointerHover}`}
                style={columnNameSort !== 'brandActiveFlag' ? {width: '30%'} : {width: '13%'}}
                onMouseLeave={() => {setSortIndicatorHover('')}}
                onMouseEnter={() => {setSortIndicatorHover(columnNameSort)}}
            >
                 <span>
                     {columnNameTitle}
                 </span>
                {showSortIndicator(columnNameSort)}
                {showSortIndicatorHover(columnNameSort)}
            </th>
        )
    }
    // <-- END Sorting Brands-->

    return (
        <div id="wrapper">
            <SideBar/>
            <div id="page-wrapper" className="gray-bg">
                <TopBar/>
                <BreadCrumbs breadCrumbsItems={breadCrumbsItems} breadCrumbsActive={'Brand'}/>

                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <div className='justify-content-between'>
                                        <div className='row'>
                                                    <SearchInputTable searchedVal={searchedVal} cancelSearch={cancelSearch} searchFunc={searchBrand}
                                                                      openPopoverFilterBrand={openPopoverFilterBrand}
                                                                      setOpenPopoverFilterBrand={setOpenPopoverFilterBrand}
                                                                      popoverBodyComponent={
                                                                          <BrandFilterForm setPage={setPage}
                                                                                           setItemOffset={setItemOffset}
                                                                                           setEndOffset={setEndOffset}
                                                                                           itemsPerPage={itemsPerPage}
                                                                                           setOpenPopoverFilterBrand={setOpenPopoverFilterBrand}/>}/>
                                                    <MainButtons openExportModal={openExportBrandModal}
                                                                 openImportModal={openImportBrandModal}
                                                                 addItemLink={'/addBrand'}/>
                                        </div>
                                    </div>

                                    <PaginationHeader itemsPerPage={itemsPerPage}
                                                      setItemsPerPage={setItemsPerPage}
                                                      setItemOffset={setItemOffset}
                                                      setEndOffset={setEndOffset}
                                                      setPage={setPage}/>

                                    <div className="clients-list">
                                        <div className="table-responsive">
                                            <FilterChipBrandIndicators/>
                                            {!loading ?
                                                <>
                                                    <table className="footable table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width: '20px'}}>#</th>
                                                            {displayColumnNamesSortable("Brand Name", "brandName")}
                                                            {displayColumnNamesSortable("Brand Manufacturer", "brandManufacturer")}
                                                            {displayColumnNamesSortable("Active", "brandActiveFlag")}
                                                            <th style={{textAlign: "center"}} id="actions">Actions</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                                        {brands && brands.slice(itemOffset, endOffset).map((brand, i) => {
                                                                return (
                                                                    <tr style={{padding: "40px", cursor: "pointer"}}
                                                                        onClick={() => selectBrand(brand)}
                                                                        className={`gradeX gradeA gradeC client-link ${classes.greyHover}`}>
                                                                        <td>{(page * itemsPerPage) + i + 1}</td>
                                                                        <td>{brand.brandName}</td>
                                                                        <td>{brand.brandManufacturer}</td>
                                                                        <td>
                                                                            <Checkbox size="small"
                                                                                      onClick={() => changeActiveFlagHandler(brand)}
                                                                                      checked={brand.brandActiveFlag === 1}
                                                                                      className={'text-center align-self-center'}
                                                                                      sx={{
                                                                                          color: '#939393',
                                                                                          '&.Mui-checked': {
                                                                                              color: 'rgba(26,179,148)',
                                                                                          },
                                                                                      }}/>
                                                                        </td>
                                                                        <td>
                                                                            <div className='d-flex justify-content-center'>
                                                                                <div className="text-center align-self-center">
                                                                                    <Link to={'/addBrand/edit/' + brand.brandId}>
                                                                                        <Button variant="text" color={'success'} >
                                                                                            <ModeEditOutlineRoundedIcon  className={'align-self-center'} fontSize={'small'} sx={{color: 'rgb(26,179,155)'}}/>
                                                                                        </Button>
                                                                                    </Link>
                                                                                </div>
                                                                                <div className="text-center align-self-center">
                                                                                    <Button variant="text" color={'error'} data-backdrop="static" data-keyboard="false"
                                                                                            onClick={() => openDeleteBrandDialog(brand)}>
                                                                                        <CloseRoundedIcon fontSize={'small'} stroke={'#ed5565'} strokeWidth={'2'}/>
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                        </tbody>
                                                    </table>
                                                    <PaginationFooter itemsPerPage={itemsPerPage}
                                                                      setItemsPerPage={setItemsPerPage}
                                                                      itemOffset={itemOffset}
                                                                      setItemOffset={setItemOffset}
                                                                      endOffset={endOffset}
                                                                      setEndOffset={setEndOffset}
                                                                      setPage={setPage}
                                                                      page={page}
                                                                      arrObjects={brands}/>
                                                </> :
                                                <Box className={"mt-2"} sx={{width: '100%'}}>
                                                    <span>Importing data...</span>
                                                    <LinearProgress className={`${classes.progressBarStyle} mt-2`} sx={{backgroundColor: 'rgba(26,179,148, .4)'}} variant="indeterminate"/>
                                                </Box>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="ibox selected">
                                <div className="ibox-content">
                                    <DetailsBrandSideBar/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
                <DeleteModal show={openDeleteBrand}
                             closeDeleteDialog={closeDeleteBrandDialog}
                             deleteItem={deleteBrand}
                             itemToBeDeleted={['Brand Name: ' + brandToBeDeleted.brandName, 'Brand Manufacturer: ' + brandToBeDeleted.brandManufacturer]}
                />

                <ImportDataModal show={openImportBrand}
                                 closeImportModal={closeImportBrandModal}
                                 upload={uploadBrandExcelFile}
                                 excelTemplateFile={"/excelTemplates-Import/Brands.xlsx"}/>

                <ExportDataModal show={openExportBrand}
                                 closeExportModal={closeExportBrandModal}
                                 exportItems={exportBrands}/>
            </div>

            <SnackbarAlert snackbarStatus={snackbarStatus}
                           closeSnackbar={() => setSnackbarStatus(false)}
                           snackbarMessage={snackbarMessage}/>
        </div>
    );
}

export default BrandView;
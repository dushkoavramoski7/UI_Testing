import PopoverFilter from "./PopoverFilter";
import {IconButton} from "@material-ui/core";
import SearchOffSharpIcon from "@mui/icons-material/SearchOffSharp";
import {useStyles} from "../../factory/StyleFactory";
import {searchInputTableStyle} from "./style/SearchInputTableStyle";

function SearchInputTable({searchedVal, cancelSearch, searchFunc, openPopoverFilterBrand, setOpenPopoverFilterBrand, popoverBodyComponent}) {
    const classes = useStyles(searchInputTableStyle);
    return (
        <div className='col-7 mt-1 mb-2'>
            <div className='input-group'>
                {searchedVal === '' ?
                    <PopoverFilter openPopoverFilter={openPopoverFilterBrand}
                                   setOpenPopoverFilter={setOpenPopoverFilterBrand}
                        popoverBodyComponent={popoverBodyComponent}/> : null}
                <input type="text"
                       placeholder="Search"
                       value={searchedVal}
                       onChange={(searchVal) => searchFunc(searchVal)}
                       className="form-control"
                />
                {searchedVal !== '' ?
                    <span
                        className={`input-group-addon ${classes.cursorPointerHover} ${classes.greyHover}`}
                        style={{borderLeft: '0px'}} onClick={cancelSearch}>
                                <a>
                                    <IconButton className={`input-group-addon`}
                                                size={'small'} style={{padding: 0}}>
                                        <SearchOffSharpIcon fontSize={'small'}/>
                                    </IconButton>
                                </a>
                    </span> : null
                }
            </div>
        </div>
    )
}

export default SearchInputTable;
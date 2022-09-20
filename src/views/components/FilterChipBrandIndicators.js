import Chip from "@mui/material/Chip";
import {removeElementFromArray} from "../../utils/utils";
import {brandActions} from "../../redux/action/brandActions";
import {useDispatch, useSelector} from "react-redux";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import {styled} from "@material-ui/core";


function FilterChipBrandIndicators() {
    const filterBy = useSelector(state => state.brand.filterBy);
    const dispatch = useDispatch();

    const modifyAppliedFilter = (removeFilter, column) => {
        let brandName = filterBy.brandName;
        let brandManufacturer = filterBy.brandManufacturer;
        let brandActiveFlag = filterBy.brandActiveFlag;
        let brandCreatedAfter = filterBy.brandCreatedAfter;
        let brandCreatedBefore = filterBy.brandCreatedBefore;
        if(column === 'brandName') {
            brandName = removeElementFromArray(removeFilter, filterBy.brandName);
        }
        else if(column === 'brandManufacturer') {
            brandManufacturer = removeElementFromArray(removeFilter, filterBy.brandManufacturer);
        }
        else if(column === 'brandActiveFlag') {
            brandActiveFlag = ''
        }
        else if(column === 'brandCreatedAfter') {
            brandCreatedAfter = null
        }
        else if(column === 'brandCreatedBefore') {
            brandCreatedBefore = null
        }
        dispatch(brandActions.filterBrands({brandName, brandManufacturer, brandActiveFlag, brandCreatedAfter, brandCreatedBefore}, false))
    }
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.3),
    }));

    return (
        <ul
            style={{
                display: 'flex',
                justifyContent: 'start',
                flexWrap: 'wrap',
                listStyle: 'none',
                border: 'none',
                margin: '0px',
                padding: '0px',
                marginLeft: '-3px'
            }}
        >
            {filterBy.brandActiveFlag!=='' ?
                <ListItem key={filterBy.brandActiveFlag}>
                    <Chip label={filterBy.brandActiveFlag === '1' ? <span>Active: <b>True</b></span> : <span>Active: <b>False</b></span>}
                          size={'small'}
                          style={{backgroundColor: 'rgb(242,242,242)'}}
                          icon={<FilterAltRoundedIcon />}
                          onDelete={() => modifyAppliedFilter(filterBy.brandActiveFlag, 'brandActiveFlag')}
                    />
                </ListItem>
                : null}
            {filterBy.brandName.length !== 0 ?
                filterBy.brandName.map((name) => (
                <ListItem key={name}>
                    <Chip label={<span>Name: <b>{name}</b></span>}
                          size={'small'}
                          style={{backgroundColor: 'rgb(242,242,242)'}}
                          icon={<FilterAltRoundedIcon />}
                          onDelete={() => modifyAppliedFilter(name, 'brandName')}
                    />
                </ListItem>
                ))
                : null
            }

            {filterBy.brandManufacturer.length !== 0 ?
                filterBy.brandManufacturer.map((manufacturer) => (
                <ListItem key={manufacturer}>
                    <Chip label={<span>Manufacturer: <b>{manufacturer}</b></span>}
                          size={'small'}
                          style={{backgroundColor: 'rgb(242,242,242)'}}
                          icon={<FilterAltRoundedIcon />}
                          onDelete={() => modifyAppliedFilter(manufacturer, 'brandManufacturer')}
                    />
                </ListItem>
                ))
                : null
            }

            {filterBy.brandCreatedAfter!==null ?
                <ListItem>
                    <Chip label={<span>Created after: <b>{filterBy.brandCreatedAfter.toDateString()}</b></span>}
                          size={'small'}
                          style={{backgroundColor: 'rgb(242,242,242)'}}
                          icon={<FilterAltRoundedIcon />}
                          onDelete={() => modifyAppliedFilter(filterBy.brandCreatedAfter, 'brandCreatedAfter')}
                    />
                </ListItem> : null}

            {filterBy.brandCreatedBefore!==null ?
                <ListItem>
                    <Chip label={<span>Created before: <b>{filterBy.brandCreatedBefore.toDateString()}</b></span>}
                          size={'small'}
                          style={{backgroundColor: 'rgb(242,242,242)'}}
                          icon={<FilterAltRoundedIcon />}
                          onDelete={() => modifyAppliedFilter(filterBy.brandCreatedBefore, 'brandCreatedBefore')}
                    />
                </ListItem> : null}
        </ul>
    )
}
export default FilterChipBrandIndicators;
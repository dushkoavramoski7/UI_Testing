import {OverlayTrigger, Popover} from "react-bootstrap";
import {useStyles} from "../../factory/StyleFactory";
import {popoverFilterStyle} from "./style/PopoverFilterStyle";
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
import {IconButton} from "@material-ui/core";

function PopoverFilter({openPopoverFilter, setOpenPopoverFilter, popoverBodyComponent}) {
    const classes = useStyles(popoverFilterStyle);
    return (
        <>
            <OverlayTrigger trigger="click" placement="bottom-start" key="bottom"
                            show={openPopoverFilter}
                            delay={{ show: 150, hide: 150 }}
                            overlay={
                                <Popover className={`${classes.popoverBodyStyle}`}>
                                    <div className={`popover-body`}>
                                        <div className="arrow"/>
                                        {popoverBodyComponent}
                                    </div>
                                </Popover>
                            }>
                  <span className={`input-group-addon ${classes.cursorPointerHover} ${classes.greyHover}`}
                        style={{borderRight: '0px'}} onClick={() => setOpenPopoverFilter(!openPopoverFilter)}
                  data-test={"filterButton"}>
                      <IconButton size={'small'} className={`input-group-addon`} style={{padding: 0}}>
                          {!openPopoverFilter ? <ExpandMoreSharpIcon fontSize={'small'}/> : <ExpandLessSharpIcon fontSize={'small'}/>}
                      </IconButton>
                  </span>
            </OverlayTrigger>
        </>
    )
}

export default PopoverFilter;
import Modal from "react-bootstrap/Modal";
import {FormControlLabel, IconButton} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import {useStyles} from "../../factory/StyleFactory";
import {exportDataModalStyle} from "./style/ExportDataModalStyle";
import LoadingButton from "@mui/lab/LoadingButton";
import {useEffect, useState} from "react";
import {RadioGroup} from "@mui/material";
import Radio from "@mui/material/Radio";

function ExportDataModal({show, closeExportModal, exportItems}) {
    const classes = useStyles(exportDataModalStyle);
    const [loading, setLoading] = useState(false);
    const [fileFormat, setFileFormat] = useState('xlsx');
    const [filteredItems, setFilteredItems] = useState('true');

    const exportHere = () => {
        setLoading(true)
        exportItems({fileFormat,filteredItems}, function () {
            setLoading(false)
        })
    }

    useEffect(() => {
        setFileFormat('xlsx')
        setFilteredItems('true')
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={closeExportModal}
            backdrop="static"
            keyboard={false}
            centered={false}
        >
            <Modal.Header>
                <div className='container'>
                    <div className='row'>
                        <div className="col text-center">
                            <h1 className="modal-title">Export Data</h1>
                            <small className="font-bold">Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry.</small>
                        </div>
                    </div>
                </div>
                <a type="button" className="close">
                    <IconButton size={'small'}>
                        <CloseIcon onClick={closeExportModal} fontSize={'small'}/>
                    </IconButton>
                </a>
            </Modal.Header>
            <Modal.Body className={`${classes.modalBodyBgColor}`}>
                <b>Follow these steps:</b>
                <ol>
                    <li> If you want to export filtered items, make sure the filter is already applied before this window is opened
                    </li>
                    <li> Select the bellow options (customizations) for exporting items</li>
                    <li>Click the Export button</li>
                </ol>
                <b>IMPORTANT</b>
                <br/>
                <ul>
                    <li>Make sure one of the bellow options (customizations) are selected before exporting items and wait
                        for response status
                    </li>
                </ul>
                <div className={"row"}>
                    <div className="form-group col-6" style={{marginBottom: '-8px', marginTop: '-6px'}}>
                        <label htmlFor="exportFilteredItems">Filtered Items: </label>
                        <RadioGroup id="exportFilteredItems" name="filteredItems" onChange={(e) => setFilteredItems(e.target.value)}>
                            <div className={'row d-flex justify-content-around'}>
                                <FormControlLabel control={
                                    <Radio sx={{
                                        color: 'grey',
                                        '&.Mui-checked': {
                                            color: 'rgb(26,179,148)',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgb(26,179,148, 0.05)'
                                        },
                                    }}
                                           size={'small'}
                                           checked={filteredItems==='true'}/>
                                }
                                                  value={'true'}
                                                  label={<span style={{ fontSize: '14px' }}><b>True</b> <br/>(filtered)</span>}/>

                                <FormControlLabel control={
                                    <Radio sx={{
                                        color: 'grey',
                                        '&.Mui-checked': {
                                            color: 'rgb(26,179,148)',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgb(26,179,148, 0.05)'
                                        },
                                    }}
                                           size={'small'}
                                           checked={filteredItems==='false'}/>
                                }
                                                  value={'false'}
                                                  label={<span style={{ fontSize: '14px' }}> <b>False</b> (all)</span>}/>

                            </div>
                        </RadioGroup>
                    </div>

                    <div className="form-group col-6" style={{marginBottom: '-8px', marginTop: '-6px'}}>
                        <label htmlFor="exportFileFormat">File Format: </label>
                        <RadioGroup id="exportFileFormat" name="fileFormat" onChange={(e) => setFileFormat(e.target.value)}>
                            <div className={'row d-flex justify-content-around'}>
                                <FormControlLabel control={
                                    <Radio sx={{
                                        color: 'grey',
                                        '&.Mui-checked': {
                                            color: 'rgba(26,179,148, 0.5)',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgb(26,179,148, 0.05)'
                                        },
                                    }}
                                           size={'small'}
                                           checked={fileFormat === 'xlsx'}/>
                                }
                                                  value={"xlsx"}
                                                  label={<span style={{ fontSize: '14px' }}><b>Excel</b> (xlsx)</span>}/>

                                <FormControlLabel control={
                                    <Radio sx={{
                                        color: 'grey',
                                        '&.Mui-checked': {
                                            color: 'rgba(26,179,148, 0.5)',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgb(26,179,148, 0.05)'
                                        },
                                    }}
                                           size={'small'}
                                           checked={fileFormat === 'csv'}/>
                                }
                                                  value={"csv"}
                                                  label={<span style={{ fontSize: '14px' }}><b>CSV</b></span>}/>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-white" onClick={closeExportModal}>Close</button>
                <button type="submit" className="btn btn-primary" hidden={loading} onClick={exportHere}>Export</button>
                <LoadingButton style={{border: 'none'}} loading={loading} variant="outlined" hidden={!loading}/>
            </Modal.Footer>
        </Modal>
    )
}

export default ExportDataModal;
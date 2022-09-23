import Modal from 'react-bootstrap/Modal'
import {IconButton} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import {useStyles} from "../../factory/StyleFactory";
import {importDataModalStyle} from "./style/ImportDataModalStyle";
import {useEffect, useState} from "react";

function ImportDataModal({show, closeImportModal, upload, excelTemplateFile}) {
    const classes = useStyles(importDataModalStyle);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [fileTouched, setFileTouched] = useState(false);

    useEffect(() => {
        setFile();
        setFileName('');
        setFileTouched(false);
    }, [show]);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name)
        setFileTouched(true)
    };

    function validateFileUpload() {
        return Boolean(file);
    }

    const uploadFile = () => {
        if(fileTouched && validateFileUpload() === true) {
            let formData = new FormData();
            formData.append('file', file);
            upload(formData);
            closeImportModal();
        }
        else {
            setFileTouched(true)
        }
    }

    return (
        <Modal
            show={show}
            onHide={closeImportModal}
            backdrop="static"
            keyboard={false}
            centered={false}
            data-test = {"importModal"}
        >
            <Modal.Header>
                <div className='container'>
                    <div className='row'>
                        <div className="col text-center">
                            <h1 className="modal-title">Import Data</h1>
                            <small className="font-bold">Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry.</small>
                        </div>
                    </div>
                </div>
                <a type="button" className="close">
                    <IconButton size={'small'}>
                        <CloseIcon onClick={closeImportModal} fontSize={'small'}/>
                    </IconButton>
                </a>
            </Modal.Header>
                <Modal.Body className={`${classes.modalBodyBgColor}`}>
                    <a href={excelTemplateFile} download data-test={"downloadBrandExcel"}>
                            <button className="btn btn-primary  dim float-right" type="button" style={{textTransform: 'none'}}><i className="fa fa-download"/></button>
                    </a>
                    <b>Follow these steps:</b>
                    <ol>
                        <li> Download the Excel template to your computer by clicking the Download <i className="fa fa-download"/> button
                        </li>
                        <li> Integrate your data into the template file, minding the column names</li>
                        <li>Upload document in the below input</li>
                        <li>Click the Upload button</li>
                    </ol>
                    <b>IMPORTANT</b>
                    <br/>
                        <ul>
                            <li>If you do not have data for a particular column, leave it empty and do not move or delete
                                the column
                            </li>
                        </ul>
                        <div className="custom-file mb-3">
                            <input type="file"
                                   id="file"
                                   name="file"
                                   onChange={onFileChange}
                                   className="custom-file-input"/>
                            {fileName === ''  ?
                            <label className="custom-file-label" htmlFor="file">Choose file</label> : <label className="custom-file-label text-muted" htmlFor="file">{fileName}</label>}
                            {fileTouched && validateFileUpload() === false ? (
                                <div className={`${classes.errorText}`}>File is required</div>
                            ) : null}
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-white" onClick={closeImportModal}>Close</button>
                    <button type="submit" className="btn btn-primary" onClick={uploadFile} disabled={fileTouched && !validateFileUpload()}>Upload</button>
                </Modal.Footer>
        </Modal>
    )
}
export default ImportDataModal;
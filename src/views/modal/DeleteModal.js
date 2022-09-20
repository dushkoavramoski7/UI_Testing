import Modal from 'react-bootstrap/Modal'
import {useStyles} from "../../factory/StyleFactory";
import {deleteModalStyle} from "./style/DeleteModalStyle";
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@material-ui/core";
import {useState} from "react";

function DeleteModal({show, closeDeleteDialog, deleteItem, itemToBeDeleted}) {
    const classes = useStyles(deleteModalStyle);
    const [loading, setLoading] = useState(false);

    const callDeleteFunction = () => {
        setLoading(true);
        deleteItem(function () {
            setLoading(false)
        })
    }

    return (
        <Modal
            show={show}
            onHide={closeDeleteDialog}
            backdrop="static"
            keyboard={false}
            centered={false}
        >
            <Modal.Header>
                <div className='container'>
                    <div className='row'>
                        <div className="col text-center">
                            <h1>Are you sure?</h1>
                            <h5 className="text-danger font-weight-bold">PROCEED TO DELETING ITEM</h5>
                        </div>
                    </div>
                </div>
                <a type="button" className="close">
                    <IconButton size={'small'}>
                        <CloseIcon onClick={closeDeleteDialog} fontSize={'small'}/>
                    </IconButton>
                </a>
            </Modal.Header>
            <Modal.Body className={`${classes.modalBodyBgColor}`}>
                    <p className="text-center" style={{fontSize: '16px', marginBottom: '-12px'}}>Do you really want to delete this item:
                        <ul className={'text-center list-unstyled'}>
                            {itemToBeDeleted.map((item) => (
                                <li key={item}>{item.split(":")[0]}: <span className="font-weight-bold">{item.split(":")[1]}</span> {itemToBeDeleted.indexOf(item) === itemToBeDeleted.length-1 ? '?' : null}</li>
                            ))}
                        </ul>
                   </p>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-white" onClick={closeDeleteDialog}>Close</button>
                <button type="submit" className="btn btn-danger" hidden={loading} onClick={() => callDeleteFunction()}>Delete</button>
                <LoadingButton style={{border: 'none'}} loading={loading} variant="outlined" hidden={!loading}/>
            </Modal.Footer>
        </Modal>
    )
}
export default DeleteModal;
import {useState} from "react";
import AddNoteForm from "../forms/AddNoteForm";
import {brandActions} from "../../redux/action/brandActions";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@material-ui/core";

const sortNotesByDateCreated = (notes) => {
    return notes.slice().sort((a, b) => {
        return new Date(a.noteDateCreated).getTime() - new Date(b.noteDateCreated).getTime()
    }).reverse();
}

function DetailsBrandSideBar() {
    const dispatch = useDispatch();
    const brand = useSelector(state => state.brand.brandSelected);
    const [showNoteForm, setShowNoteForm] = useState(false);


    const deleteNote = (noteId, brandId) => {
        dispatch(brandActions.deleteNoteInBrand(noteId, brandId));
    }
    const changeStatus = (note, brandId) => {
        dispatch(brandActions.changeStatusNote(note, brandId));
    }

    return (
        <div className="tab-content" style={ {overflow: 'hidden', height: '1%'} }>
            <div style={{textAlign: 'center'}}> { Object.keys(brand).length === 0 ? <span >No entity found</span> : null }</div>
            <div  style={ Object.keys(brand).length === 0 ? { display: 'none'} : {} }>
                <div className="tab-pane">
                    <div className="row m-b-md">
                        <div className="col-lg-12 text-left">
                            <h2 style={{textAlign: 'justify'}}>{brand.brandName}</h2>
                            <strong>
                                About the brand
                            </strong>
                            <p style={{textAlign: 'justify',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                lineClamp: '3',
                                WebkitBoxOrient: 'vertical'}}>{brand.brandDescription}</p>
                        </div>
                        <div className="col-lg-12">
                            <button type="button" className="btn btn-block btn-w-m btn-warning float-right disabled">
                                Details
                            </button>
                        </div>
                    </div>
                    <div className="client-detail" style={ {overflow: 'hidden', height: '1%'} }>
                        <div>
                            <hr/>
                            <strong>Last activity</strong>
                            <ul className="list-group clear-list">
                                <li className="list-group-item" style={{border: 'none'}}>
                                    {brand.formattedBrandDateCreated}
                                </li>
                                <li className="list-group-item" style={{border: 'none'}}>
                                    {brand.formattedBrandDateModified}
                                </li>
                            </ul>

                            <strong>Notes</strong>
                            <p className="small"><i className="fa fa-hand-o-up"/> Drag notes between list
                                to order
                            </p>

                            <div >
                                <a className="btn btn-sm btn-white mb-3" onClick={() => setShowNoteForm(!showNoteForm)}> {!showNoteForm ?
                                            <span> <i className="fa fa-plus"/> Add Note </span> :
                                                 <span> <i className="fa fa-times"/> Close Note </span> }
                                </a>
                            </div>
                            <AddNoteForm showNoteForm={showNoteForm} brand={brand}/>

                            {brand.notes?.length === 0 ? <div className="text-center">No notes added</div> : null}
                            <div style={brand.notes?.length !== 0 ? brand.notes?.length > 4 ? {height: '457px'} : {overflow: 'hidden', height: '1%'} : {display: 'none'}}>
                                <ul className={"full-height-scroll sortable-list connectList agile-list" } id="todo" hidden={brand.notes?.length <= 4}>
                                    {brand.notes && sortNotesByDateCreated(brand.notes).map((note) => (
                                        <li className={note.notePriority === 'HIGH' ? "warning-element" :
                                            note.notePriority === 'MEDIUM' ? "info-element" :
                                                note.notePriority === 'LOW' ? "success-element" : ""}
                                            style={{  position: 'relative'}}
                                            id="task1"
                                            key={note.noteId}>
                                            <div style={{width: '67%'}}>{note.noteText}</div>
                                            <span
                                                className="card-subtitle mb-2 text-muted">Priority: {note.notePriority}
                                            </span>
                                            <div className="agile-detail">
                                                 <span
                                                     className={note.noteStatus === 'DONE' ?  "float-right label label-primary" : "float-right label"}
                                                     style={{ position: 'absolute', top: '7px', right: '8px'}}
                                                     onClick={() => changeStatus(note, brand.brandId)}
                                                 >
                                                    {note.formattedNoteStatus}
                                                </span>
                                                <a  style={{color: '#C41E3A', position: 'absolute', bottom: '3px', right: '8px' }} type="button" className="close">
                                                   <IconButton size={'small'} style={{color: '#C41E3A'}}>
                                                    <CloseIcon fontSize={'small'}
                                                               onClick={() => deleteNote(note.noteId, brand.brandId)}/>
                                                   </IconButton>
                                                </a>
                                                <i className="fa fa-clock-o"/>
                                                <span>  </span>
                                                <span>
                                                    {note.formattedNoteDateCreated}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <ul className={"sortable-list connectList agile-list" } id="todo1" hidden={brand.notes?.length > 4}>
                                    {brand.notes && sortNotesByDateCreated(brand.notes).map((note) => (
                                        <li className={note.notePriority === 'HIGH' ? "warning-element" :
                                            note.notePriority === 'MEDIUM' ? "info-element" :
                                                note.notePriority === 'LOW' ? "success-element" : ""}
                                            style={{  position: 'relative'}}
                                            id="task1"
                                            key={note.noteId}>
                                            <div style={{width: '67%'}}>{note.noteText}</div>
                                            <span
                                                className="card-subtitle mb-2 text-muted">Priority: {note.notePriority}
                                            </span>
                                            <div className="agile-detail">
                                                <span
                                                    className={note.noteStatus === 'DONE' ?  "float-right label label-primary" : "float-right label"}
                                                    style={{ position: 'absolute', top: '7px', right: '8px'}}
                                                    onClick={() => changeStatus(note, brand.brandId)}
                                                >
                                                    {note.formattedNoteStatus}
                                                </span>
                                                <a  style={{color: '#C41E3A', position: 'absolute', bottom: '3px', right: '8px' }} type="button" className="close">
                                                    <IconButton size={'small'} style={{color: '#C41E3A'}}>
                                                        <CloseIcon fontSize={'small'}
                                                                   onClick={() => deleteNote(note.noteId, brand.brandId)}/>
                                                    </IconButton>
                                                </a>
                                                <i className="fa fa-clock-o"/>
                                                <span>  </span>
                                                <span>
                                                    {note.formattedNoteDateCreated}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailsBrandSideBar;
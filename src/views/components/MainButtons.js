import {Link} from "react-router-dom";

function MainButtons({openExportModal, openImportModal, addItemLink}) {
    return (
        <div className='col-5 d-flex justify-content-end align-items-center'>
            <button className="btn btn-light m-1"
                    style={{backgroundColor: '#f3f3f4'}}
                    onClick={() => openExportModal()}> <span style={{color: '#808a90'}}>Export</span>
            </button>
            <button className="btn btn-light m-1"
                    style={{backgroundColor: '#f3f3f4'}}
                    onClick={() => openImportModal()}> <span style={{color: '#808a90'}}>Import</span>
            </button>
            <Link
                to={addItemLink}
                className="btn btn-primary trigger-btn text-white m-1 m-r-sm btn-lg">
                <span className={"font-weight-bold"}> <i className="fa fa-sm fa-plus align-self-center"/> NEW </span>
            </Link>
        </div>
    )
}
export default MainButtons;
import {Link} from "react-router-dom";

function MainButtons({openExportModal, openImportModal, addItemLink}) {
    return (
        <div className='col-5'>
            <Link
                to={addItemLink}
                className="btn btn-primary trigger-btn text-white m-1 m-r-sm btn-lg float-right">
                <span className={"font-weight-bold"}> <i className="fa fa-sm fa-plus align-self-center"/> NEW </span>
            </Link>
            <button className="btn btn-light m-1 float-right"
                    style={{backgroundColor: '#f3f3f4'}}
                    onClick={() => openImportModal()}> <span style={{color: '#808a90'}}>Import</span>
            </button>
            <button className="btn btn-light m-1 float-right"
                    style={{backgroundColor: '#f3f3f4'}}
                    onClick={() => openExportModal()}> <span style={{color: '#808a90'}}>Export</span>
            </button>
        </div>
    )
}
export default MainButtons;
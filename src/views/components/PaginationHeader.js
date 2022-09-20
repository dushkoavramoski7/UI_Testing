function PaginationHeader({itemsPerPage, setItemsPerPage, setItemOffset, setEndOffset, setPage}) {
    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setItemOffset(0);
        setEndOffset(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='row mt-2' style={{marginBottom: '-10px'}}>
            <div className='col d-flex justify-content-start'>
                <span>Show</span>
                <select
                    className="form-select form-select-sm ml-1"
                    style={{border: '1px solid #e5e6e7', color: 'grey'}}
                    value={itemsPerPage}
                    onChange={handleChangeRowsPerPage}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span className='ml-1'> entities </span>
            </div>
        </div>
    )
}
export default PaginationHeader;
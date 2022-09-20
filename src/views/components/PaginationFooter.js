import {Pagination} from "@mui/material";

function PaginationFooter({itemsPerPage, itemOffset, setItemOffset, endOffset, setEndOffset, page, setPage, arrObjects}) {

    const handlePageClick = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
        const newOffset = (((value - 1) * itemsPerPage) % arrObjects.length);
        const endOffset = newOffset + itemsPerPage;
        setItemOffset(newOffset);
        setEndOffset(endOffset);
    };

    const countPages = () => {
        return Math.ceil(arrObjects.length / itemsPerPage)
    }

    return (
        <div className='col'>
            <div className='row '>
                <div className='col-5 d-flex justify-content-start'  style={{marginLeft: '-10px'}}>
                    {arrObjects.length === 0 ?
                    <span>
                        No entities found
                    </span> :
                    <span>
                        {itemOffset + 1} - {endOffset > arrObjects.length ? arrObjects.length : endOffset} of {arrObjects.length} entities
                    </span>}
                </div>
                <div className='col-7 d-flex justify-content-end'>
                    <Pagination count={countPages()}
                                style={{marginRight: '-20px'}}
                                defaultPage={1}
                                siblingCount={0}
                                boundaryCount={10}
                                size={'small'}
                                page={page + 1}
                                onChange={handlePageClick}
                                shape="rounded"
                                showFirstButton={true}
                                showLastButton={true}
                    />
                </div>
            </div>

        </div>
    )
}

export default PaginationFooter;
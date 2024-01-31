import React from 'react'

const TablePagination = ({totalPages, page, setPage, limit, setLimit}) => {
  return (
    <div className="join">
      <button className="join-item btn btn-sm" onClick={() => setPage(page = Math.max(page - 1, 1))}>«</button>
      {totalPages >= 6 ? (<>
        <button className={`join-item btn btn-sm` + (page === 1 ? " btn-active" : "")} onClick={() => setPage(1)}>1</button>
        {page === 1 ?
          <button className="join-item btn btn-sm" onClick={() => setPage(2)}>2</button>
          :
          <button className="join-item btn btn-sm pointer-events-none">...</button>
        }
        {page !== 1 && page != totalPages ?
          <button className="join-item btn btn-sm btn-active pointer-events-none">{page}</button>
        :
          <button className="join-item btn btn-sm" onClick={() => setPage((page === 1 ? 3 : totalPages-3))}>{(page === 1 ? 3 : totalPages-3)}</button>
        }
        {page === totalPages ?
          <button className="join-item btn btn-sm" onClick={() => setPage(totalPages-2)}>{totalPages-2}</button>
          :
          <button className="join-item btn btn-sm pointer-events-none">...</button>
        }
        <button className={`join-item btn btn-sm` + (page === totalPages ? " btn-active" : "")} onClick={() => setPage(totalPages)}>{totalPages}</button>
        </>) : (<>
          {Array.from({length: totalPages}, (_, i) => (
            <button key={i} className={`join-item btn btn-sm` + (page === i+1 ? " btn-active" : "")} onClick={() => setPage(i+1)}>{i+1}</button>
          ))}
        </>)
      }
      <button className="join-item btn btn-sm" onClick={() => setPage(page = Math.min(page + 1, totalPages))}>»</button>
    </div>
  )
};

export default TablePagination
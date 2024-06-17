import React, { memo } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const Paginate = ({ onPageChange, pageCount, currentPage }) => {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        forcePage={currentPage}
        pageCount={pageCount}
        previousLabel={<GrFormPrevious />}
        nextLabel={<GrFormNext />}
        containerClassName="containerClassName"
        // pageClassName="pageClassName"
        pageLinkClassName="pageLinkClassName"
        nextLinkClassName="pageLinkClassName"
        previousLinkClassName="pageLinkClassName"
        activeLinkClassName="activeLinkClassName"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default memo(Paginate);

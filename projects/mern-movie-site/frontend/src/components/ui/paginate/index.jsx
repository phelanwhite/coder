import React, { memo } from "react";
import style from "./style.module.css";
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
        containerClassName={style?.containerClassName}
        // pageClassName="pageClassName"
        pageLinkClassName={style?.pageLinkClassName}
        nextLinkClassName={style?.pageLinkClassName}
        previousLinkClassName={style?.pageLinkClassName}
        activeLinkClassName={style?.activeLinkClassName}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default memo(Paginate);

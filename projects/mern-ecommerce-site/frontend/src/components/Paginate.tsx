import React, { FC, memo } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

const Paginate: FC<ReactPaginateProps> = ({ ...props }) => {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={5}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageLinkClassName="pageLinkClassName"
        activeLinkClassName="activeLinkClassName"
        containerClassName="containerClassName"
        {...props}
      />
    </div>
  );
};

export default memo(Paginate);

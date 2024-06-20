import React, { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "components/ui/loader";
import {
  useAddReviewMutation,
  useGetReviewMovieIdQuery,
} from "../services/reviewApi";

const ReviewList = ({ id, media_type }) => {
  const [addReview, addReviewResult] = useAddReviewMutation();
  const getReviewMovieId = useGetReviewMovieIdQuery({
    media_id: id,
    media_type,
  });

  const [formValue, setFormValue] = useState({
    media_id: id,
    comment: "",
  });

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ body: formValue });
  };

  useEffect(() => {
    if (addReviewResult.isSuccess) {
      toast.success(addReviewResult?.data?.message);
    }
    if (addReviewResult.isError) {
      toast.error(addReviewResult?.error?.data?.message);
    }
  }, [addReviewResult]);

  if (addReviewResult.isLoading) return <Loader />;
  return (
    <div>
      <div className="text-xl capitalize font-semibold mb-4 border-l-red-500 border-l-4 pl-4">
        Reviews
      </div>
      <form action="" method="post" onSubmit={handleSubmit}>
        <textarea
          placeholder="Comments..."
          name="comment"
          value={formValue.comment}
          onChange={handleInputChange}
          className="input-box"
          rows={10}
        />
        <button className="mt-2 btn btn-danger">Submit</button>
      </form>
      <ul className="mt-8 flex flex-col gap-4">
        {getReviewMovieId?.data?.result?.map((review, index) => (
          <li key={review?._id} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={review?.user?.avatar} loading="lazy" alt="" />
            </div>
            <div className="flex-1">
              <div className=" mb-2 flex items-center gap-4">
                <span className="font-semibold">
                  {review?.user?.name || review?.user?.username}
                </span>
                <span className="text-xs">
                  {new Date(
                    review?.updatedAt || review?.createdAt
                  ).toDateString()}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-stone-100 text-black">
                <div
                  dangerouslySetInnerHTML={{ __html: review?.comment }}
                ></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(ReviewList);

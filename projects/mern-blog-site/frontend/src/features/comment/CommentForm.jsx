const CommentForm = ({ handleSubmit, comment, setComment }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} action="" method="post">
        <div className="flex flex-col gap-4">
          <textarea
            className="input-box resize-none "
            rows={5}
            name="comment"
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className=" btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

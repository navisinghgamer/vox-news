import Comment from "./comment";

export default ({ comments }) => {
  return (
    <React.Fragment>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </React.Fragment>
  );
};

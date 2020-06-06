import Layout from "../components/layout";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import CommentList from "../components/comment-list";

export async function getServerSideProps({ query }) {
  let story;

  try {
    const storyId = query.id;
    const response = await fetch(
      `https://node-hnapi.herokuapp.com/item/${storyId}`
    );
    story = await response.json();
  } catch (error) {
    console.log(error);
    story = null;
  }

  return {
    props: {
      story,
    },
  };
}

const Story = ({ story }) => {
  if (!story) {
    return <Error statusCode={503} />;
  }

  return (
    <Layout title={story.title} backButton>
      <main>
        <h1 className="story-title">
          <a href={story.url}>{story.title}</a>
        </h1>
        <div className="story-details">
          <strong>{story.points} points</strong>
          <strong>{story.comments_count} comments</strong>
          <strong>{story.time_ago}</strong>
        </div>
        {story.comments.length > 0 ? (
          <CommentList comments={story.comments} />
        ) : (
          <div>No comments for this story.</div>
        )}
      </main>
      <style jsx>{`
        main {
          padding: 1em;
        }

        .story-title {
          font-size: 1.2rem;
          margine: 0;
          font-weight: 300;
          padding-bottom: 0.5rem;
        }

        .story-title a {
          color: #333;
          text-decoration: none;
        }

        .story-title a:hover {
          color: #13818d;
          text-decoration: underline;
        }

        .story-details {
          font-size: 0.8rem;
          padding-bottom: 1em;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 1em;
        }

        .story-details strong {
          margin-right: 1em;
        }

        .story-details a {
          color: #13818d;
        }
      `}</style>
    </Layout>
  );
};

export default Story;

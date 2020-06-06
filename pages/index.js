import fetch from "isomorphic-fetch";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/story-list";
import Layout from "../components/layout";

export async function getServerSideProps({ query }) {
  let stories;
  let page;

  try {
    page = Number(query.page) || 1;

    const response = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    );
    stories = await response.json();
  } catch (error) {
    console.log(error);
    stories = [];
  }

  return {
    props: {
      stories,
      page,
    },
  };
}

const Home = ({ stories, page }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />;
  }

  return (
    <Layout title="Vox News">
      <StoryList stories={stories} />
      <footer>
        <Link href={`/?page=${page + 1}`}>
          <a>Next Page ({page + 1})</a>
        </Link>
      </footer>
      <style jsx>{`
        footer {
          padding: 1em;
        }

        footer a {
          font-weight: bold;
          color: #13818d;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

export default Home;

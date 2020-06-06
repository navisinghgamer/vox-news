import Link from "next/link";
import Head from "next/head";
import Router from "next/router";

const Layout = ({ children, title, backButton }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container">
        <nav>
          {backButton && (
            <span className="back-button" onClick={() => Router.back()}>
              &#x2b05;
            </span>
          )}
          <Link href="/">
            <a>
              <span className="main-title">Vox News</span>
            </a>
          </Link>
        </nav>
        {children}
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: #f9fbfa;
        }

        nav {
          background: #13818d;
          padding: 1em;
        }

        nav > * {
          display: inline-block;
          color: white;
        }

        nav a {
          text-decoration: none;
        }

        nav .main-title {
          font-weight: bold;
        }

        nav .back-button {
          font-size: 0.9rem;
          padding-right: 1em;
          cursor: pointer;
        }
      `}</style>

      <style global jsx>{`
        body {
          background: white;
          font-family: Verdena, Geneva, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Layout;

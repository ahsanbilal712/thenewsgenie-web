import Link from "next/link";

const Breadcrumb = ({ bCat, aPage }) => {
  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {bCat && (
              <li className="breadcrumb-item">
                <Link href={`/categories/${bCat}`}>
                  <a>{bCat}</a>
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {aPage}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;

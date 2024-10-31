import Link from "next/link";
import Offcanvas from "react-bootstrap/Offcanvas";
import SocialLink from "../../data/social/SocialLink.json";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose, categories }) => {
  return (
    <Offcanvas
      show={ofcshow}
      onHide={ofcHandleClose}
      placement="end"
      className="offcanvas-menu"
    >
      <Offcanvas.Header
        closeButton
        className="close-offcanvasmeu"
      ></Offcanvas.Header>
      <div className="side-nav">
        <div className="side-nav-inner nicescroll-container">
          <form action="#" className="side-nav-search-form">
            <div className="form-group search-field">
              <input
                type="text"
                className="search-field"
                name="search-field"
                placeholder="Search..."
              />
              <button className="side-nav-search-btn">
                <i className="fas fa-search" />
              </button>
            </div>
          </form>

          <div className="side-nav-content">
            <div className="row">
              <div className="col-lg-12">
                <ul className="main-navigation side-navigation list-inline flex-column">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/latest">
                      <a>Latest</a>
                    </Link>
                  </li>
                  {categories?.map((category, index) => (
                    <li key={`category-${index}`}>
                      <Link href={`/categories/${category}`}>
                        <a>{category}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-lg-12 mt-5">
                <div className="contact-social-share">
                  <div className="axil-social-title h5">Follow Us</div>
                  <ul className="social-share social-share__with-bg">
                    <li>
                      <a href={SocialLink.fb.url}>
                        <i className={SocialLink.fb.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.twitter.url}>
                        <i className={SocialLink.twitter.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.instagram.url}>
                        <i className={SocialLink.instagram.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.linked.url}>
                        <i className={SocialLink.linked.icon} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
};

export default OffcanvasMenu;

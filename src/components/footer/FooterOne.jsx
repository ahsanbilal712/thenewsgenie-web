import Link from "next/link";
import Image from "next/image";
import SocialLink from "../../data/social/SocialLink.json";

const FooterOne = () => {
  const categories = [
    "Pakistan",
    "World",
    "Sports",
    "Business",
    "Entertainment",
    "Weather",
    "Health",
    "Science",
    "Technology",
  ];

  return (
    <footer className="page-footer bg-grey-dark-key">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            {/* Categories Column */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h2 className="footer-widget-title">Categories</h2>
                <ul className="footer-nav">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link href={`/categories/${category}`}>
                        <a>{category}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h2 className="footer-widget-title">Quick Links</h2>
                <ul className="footer-nav">
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
                  <li>
                    <Link href="/about-us">
                      <a>About Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Links Column */}
            <div className="col-lg-4 col-md-12">
              <div className="footer-widget">
                <div className="footer-social-share-wrapper">
                  <div className="footer-social-share">
                    <div className="axil-social-title">Find us here</div>
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

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-logo-container text-center mb-4">
            <Link href="/">
              <a>
                <Image
                  src="/images/newsgenielogo3.png"
                  alt="The News Genie"
                  width={300}
                  height={180}
                />
              </a>
            </Link>
          </div>
          <p className="axil-copyright-txt text-center">
            © {new Date().getFullYear()}. All rights reserved by The News Genie.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;

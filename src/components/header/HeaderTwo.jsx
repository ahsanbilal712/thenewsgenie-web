import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLink from "../../data/social/SocialLink.json";
import OffcanvasMenu from "./OffcanvasMenu";

const HeaderTwo = () => {
  const [categories, setCategories] = useState([
    "Pakistan",
    "World",
    "Sports",
    "Business",
    "Entertainment",
    "Weather",
    "Health",
    "Science",
    "Technology",
  ]); // Example categories
  const menuRef = useRef();

  const toggleDropdownMenu = () => {
    const dropdownSelect = menuRef.current.childNodes;
    let dropdownList = [];

    for (let i = 0; i < dropdownSelect.length; i++) {
      const element = dropdownSelect[i];
      if (element.classList.contains("has-dropdown")) {
        dropdownList.push(element);
      }
    }

    dropdownList.forEach((element) => {
      element.children[0].addEventListener("click", () => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
          element.childNodes[1].classList.remove("opened");
        } else {
          dropdownList.forEach((submenu) => {
            if (element !== submenu) {
              submenu.classList.remove("active");
              submenu.childNodes[1].classList.remove("opened");
            } else {
              submenu.classList.add("active");
              submenu.childNodes[1].classList.add("opened");
            }
          });
        }
      });
    });
  };

  useEffect(() => {
    toggleDropdownMenu();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchshow, setSearchShow] = useState(false);
  const headerSearchShow = () => {
    setSearchShow(true);
  };
  const headerSearchClose = () => {
    setSearchShow(false);
  };

  const [mobileToggle, setMobileToggle] = useState(false);
  const MobileMenuToggler = () => {
    setMobileToggle(!mobileToggle);
    const HtmlTag = document.querySelector("html");
    const menuSelect = document.querySelectorAll(".main-navigation li");

    if (HtmlTag.classList.contains("main-menu-opened")) {
      HtmlTag.classList.remove("main-menu-opened");
    } else {
      setTimeout(() => {
        HtmlTag.classList.add("main-menu-opened");
      }, 800);
    }

    menuSelect.forEach((element) => {
      element.addEventListener("click", function () {
        if (!element.classList.contains("has-dropdown")) {
          HtmlTag.classList.remove("main-menu-opened");
          setMobileToggle(false);
        }
      });
    });
  };

  return (
    <>
      <OffcanvasMenu
        ofcshow={show}
        ofcHandleClose={handleClose}
        categories={categories}
      />
      <header className="page-header">
        <div className="header-top header-top__style-two bg-grey-dark-one">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-4">
                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
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
              <div className="brand-logo-container col-md-4 text-center">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/logo-intellinews.jpeg"
                      alt="brand-logo"
                      width={100}
                      height={75}
                    />
                  </a>
                </Link>
              </div>
              <div className="col-md-4">
                <ul className="ml-auto social-share header-top__social-share justify-content-end">
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
        <nav className="navbar bg-grey-dark-one navbar__style-four">
          <div className=" mx-auto w-[1420px]">
            <div className="navbar-inner flex justify-center lg:ml-24">
              <div className="navbar-toggler-wrapper">
                <button className="side-nav-toggler" onClick={handleShow}>
                  <span />
                  <span />
                  <span />
                </button>
              </div>
              <div className="main-nav-wrapper mr-[100px]">
                <ul className="main-navigation list-inline" ref={menuRef}>
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
                  {categories.map((category, index) => (
                    <li key={`category-${index}`}>
                      <Link href={`/categories/${category}`}>
                        <a>{category}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`main-nav-toggler d-block d-lg-none ${
                  mobileToggle ? "expanded" : ""
                }`}
              >
                <div className="toggler-inner" onClick={MobileMenuToggler}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderTwo;

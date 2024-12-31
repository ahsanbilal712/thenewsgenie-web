import Image from "next/image";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import SectionTitleTwo from "../components/elements/SectionTitleTwo";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";
import TeamSection from "../components/team/TeamSection";

const AboutUsPage = () => {
  return (
    <>
      <HeadMeta metaTitle="About Us" />
      <HeaderTwo />
      <Breadcrumb aPage="About Us" />
      <BreadcrumbBanner pageTitle="About Us" />
      <div className="axil-about-us section-gap section-gap-top__with-text">
        <div className="container">
          <SectionTitleTwo
            title="How we work"
            paragraph=" We gather news from reliable sources like Geo News, Dawn, ARY, and Tribune every hour. 
            Using advanced technology, similar stories are grouped together, and the main points are 
            summarized to give you a clear overview. Each fact is matched with its source, so you 
            know where it comes from. After publishing, we monitor feedback to ensure quality. Users 
            can explore news, search topics, and even follow specific interests for tailored updates, 
            while admins manage content for accuracy and relevance. This automated process keeps you 
            informed efficiently and transparently."
          />
        </div>
      </div>
      <div className="axil-about-us section-gap section-gap-top__with-text">
        <div className="container">
          <SectionTitleTwo
            title="Who We Are"
            paragraph="The News Genie is a cutting-edge, AI-driven news platform that curates and delivers the latest news by aggregating data from various credible sources. Our mission is to provide reliable, up-to-date news that is unbiased and insightful, helping you stay informed in today's fast-paced world."
          />
        </div>
      </div>
      <div className="axil-about-us-details section-gap bg-grey-light-three">
        <div className="container">
          <h3>Our Vision</h3>
          <p>
            At IntelliNews, our vision is to be the most trusted source of news
            in the digital age. We believe in the power of information to shape
            opinions, inspire action, and foster global understanding. We strive
            to deliver news that is not only accurate but also meaningful and
            relevant to our audience.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to provide a seamless, user-friendly platform where
            users can access diverse perspectives on the world's most pressing
            issues. We use advanced AI algorithms to aggregate news from
            multiple sources, ensuring that our readers get a comprehensive view
            of every story. By prioritizing credibility and objectivity, we aim
            to combat misinformation and deliver truth-driven content.
          </p>

          <h3>Our Values</h3>
          <ul>
            <li>
              <strong>Integrity:</strong> We are committed to delivering news
              that is truthful, fair, and impartial.
            </li>
            <li>
              <strong>Innovation:</strong> We leverage the latest technology to
              enhance the way news is curated and consumed.
            </li>
            <li>
              <strong>Inclusivity:</strong> We value diverse perspectives and
              aim to represent a wide range of voices in our reporting.
            </li>
            <li>
              <strong>Transparency:</strong> We believe in being open about our
              news-gathering processes and the sources we use.
            </li>
            <li>
              <strong>Responsibility:</strong> We recognize the impact of our
              content and are committed to reporting that respects ethical
              standards.
            </li>
          </ul>

          <h3>Our Team</h3>
          <p>
            IntelliNews is powered by a dynamic team of experienced developers, and AI experts. Our team works tirelessly to ensure
            that our content is accurate, engaging, and reflective of the latest
            developments worldwide. We are passionate about news and dedicated
            to keeping our audience informed.
          </p>
          <TeamSection />

          <h3>Why Choose IntelliNews?</h3>
          <p>
            In a world overflowing with information, IntelliNews stands out for
            its commitment to quality journalism. Our platform is designed to
            make news accessible and engaging, with features that allow you to
            explore stories in depth or get a quick update on the go. Whether
            you're a news enthusiast or just looking to stay informed,
            IntelliNews is your go-to source for trusted news.
          </p>

          <h3>How We Work</h3>
          <p>
            We gather news from reliable sources like Geo News, Dawn, ARY, and Tribune every hour. 
            Using advanced technology, similar stories are grouped together, and the main points are 
            summarized to give you a clear overview. Each fact is matched with its source, so you 
            know where it comes from. After publishing, we monitor feedback to ensure quality. Users 
            can explore news, search topics, and even follow specific interests for tailored updates, 
            while admins manage content for accuracy and relevance. This automated process keeps you 
            informed efficiently and transparently.
          </p>

          <h3>Contact Us</h3>
          <p>
            Have questions, feedback, or want to get in touch with our team?
            We're here to help! Reach out to us at:
            <br />
            <strong>Email:</strong> thenewsgenie1@gmail.com
          </p>
        </div>
      </div>
      <FooterOne />
      
    </>
  );
};

export default AboutUsPage;



import Image from "next/image";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderTwo from "../components/header/HeaderTwo";

const PrivacyPolicyPage = () => {
  return (
    <>
      <HeadMeta metaTitle="Privacy Policy" />
      <HeaderTwo />
      <Breadcrumb aPage="Privacy Policy" />
      <BreadcrumbBanner pageTitle="Privacy Policy" />
      <div className="axil-privacy-policy section-gap section-gap-top__with-text">
        <div className="container">
          <h2 className="axil-title m-b-xs-40">Privacy Policy</h2>
          <p>
            <strong>Effective Date:</strong> 1st August, 2024
          </p>

          <h3>1. Introduction</h3>
          <p>
            Welcome to IntelliNews, an AI-driven news generation platform that
            curates and delivers news by scraping data from various credible
            sources. We value your privacy and are committed to protecting the
            personal information you share with us. This Privacy Policy outlines
            how we collect, use, store, and protect your data when you visit our
            website and use our services.
          </p>

          <h3>2. Information We Collect</h3>
          <h4>2.1. Personal Information</h4>
          <p>
            When you interact with our platform, we may collect personal
            information that can be used to identify you. This includes:
            <ul>
              <li>
                <strong>Contact Information:</strong> Such as your name, email
                address, and phone number when you sign up for newsletters or
                contact us for support.
              </li>
              <li>
                <strong>Account Information:</strong> If you create an account,
                we may collect your username and password.
              </li>
              <li>
                <strong>Communication Data:</strong> Any communication you have
                with us, including emails, messages, and support requests.
              </li>
            </ul>
          </p>

          <h4>2.2. Non-Personal Information</h4>
          <p>
            We also collect non-personal information, which cannot be used to
            identify you. This includes:
            <ul>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                website, such as pages visited, time spent on the site, and
                interactions with content.
              </li>
              <li>
                <strong>Technical Data:</strong> Your IP address, browser type,
                operating system, and device information.
              </li>
            </ul>
          </p>

          <h3>3. How We Use Your Information</h3>
          <p>
            We use the collected information for various purposes, including:
            <ul>
              <li>
                <strong>Content Delivery:</strong> To deliver personalized news
                content based on your preferences and interests.
              </li>
              <li>
                <strong>Communication:</strong> To respond to your inquiries,
                send newsletters, and provide updates about our services.
              </li>
              <li>
                <strong>Improvement of Services:</strong> To analyze usage
                patterns and improve our platform’s functionality and user
                experience.
              </li>
              <li>
                <strong>Security:</strong> To monitor and ensure the security of
                our website and protect against unauthorized access or misuse.
              </li>
            </ul>
          </p>

          <h3>4. Data Scraping and News Aggregation</h3>
          <p>
            Our platform scrapes data from multiple news sources to generate
            news articles based on similar facts across different sources. We
            ensure that all news sources are properly mentioned and cited within
            the news articles. Each news page includes a link to the parent news
            source, allowing you to verify the original content.
          </p>

          <h3>5. Sharing Your Information</h3>
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your information in the following
            circumstances:
            <ul>
              <li>
                <strong>With Service Providers:</strong> We may share your
                information with third-party service providers who assist us in
                operating our website, conducting business, or serving you.
                These providers are contractually obligated to keep your
                information confidential.
              </li>
              <li>
                <strong>For Legal Reasons:</strong> We may disclose your
                information if required to do so by law or in response to valid
                legal processes, such as a subpoena, court order, or government
                request.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of all or a portion of our assets, your
                information may be transferred to the new entity.
              </li>
            </ul>
          </p>

          <h3>6. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience on our website. Cookies are small files stored on your
            device that help us understand your preferences and provide a more
            personalized experience. You can control the use of cookies through
            your browser settings.
          </p>

          <h3>7. Data Security</h3>
          <p>
            We take the security of your data seriously and implement
            appropriate measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. These
            measures include encryption, secure data storage, and regular
            security assessments.
          </p>

          <h3>8. Third-Party Links</h3>
          <p>
            Our website may contain links to third-party websites, including the
            news sources we cite. Please note that we are not responsible for
            the privacy practices or content of these external sites. We
            encourage you to review the privacy policies of any third-party
            sites you visit.
          </p>

          <h3>9. Your Rights</h3>
          <p>
            You have certain rights regarding your personal information,
            including:
            <ul>
              <li>
                <strong>Access:</strong> You can request a copy of the personal
                information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can request that we correct any
                inaccuracies in your personal information.
              </li>
              <li>
                <strong>Deletion:</strong> You can request that we delete your
                personal information, subject to certain legal obligations.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt out of receiving marketing
                communications from us at any time.
              </li>
            </ul>
          </p>

          <h3>10. Children’s Privacy</h3>
          <p>
            Our website is not intended for use by children under the age of 13.
            We do not knowingly collect personal information from children. If
            we become aware that a child under 13 has provided us with personal
            information, we will take steps to delete such information.
          </p>

          <h3>11. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal obligations. We will notify you of
            any significant changes by posting the updated policy on our
            website. Your continued use of our website after such changes
            indicates your acceptance of the new policy.
          </p>
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export default PrivacyPolicyPage;

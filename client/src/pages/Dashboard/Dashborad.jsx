import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/Logo copy";
import "./Dashboard.css";
import analytics from "../../assets/components/Analytics 1.svg";
import cards from "../../assets/components/div-2.svg";
import play from "../../assets/components/div.svg";
import audiomackIcon from "../../assets/components/Frame-3.png";
import bandsintownIcon from "../../assets/components/Frame-4.png";
import bonfireIcon from "../../assets/components/Frame-4.png";
import booksIcon from "../../assets/components/Frame-5.svg";
import buyMeAGiftIcon from "../../assets/components/Frame-4.svg";
import cameoIcon from "../../assets/components/Frame-3.svg";
import clubhouseIcon from "../../assets/components/Frame-6.svg";
import communityIcon from "../../assets/components/Auto Layout Horizontal.svg";
import customerIcon from "../../assets/components/_.svg";
import contactDetailsIcon from "../../assets/components/Frame-7.svg";
import sparks from "../../assets/components/Group 1000000868.svg";
import twitter from "../../assets/components/Frame-9.svg";
import "remixicon/fonts/remixicon.css";

const Dashboard = () => {
  const iconsmeet = [
    {
      icon: audiomackIcon,
      title: "Audiomack",
      description: "Add an Audiomack player to your Linktree",
    },
    {
      icon: bandsintownIcon,
      title: "Bandsintown",
      description: "Drive ticket sales by listing your events",
    },
    {
      icon: bonfireIcon,
      title: "Bonfire",
      description: "Display and sell your custom merch",
    },
    {
      icon: booksIcon,
      title: "Books",
      description: "Promote books on your Linktree",
    },
    {
      icon: buyMeAGiftIcon,
      title: "Buy Me A Gift",
      description: "Let visitors support you with a small gift",
    },
    {
      icon: cameoIcon,
      title: "Cameo",
      description: "Make impossible fan connections possible",
    },
    {
      icon: clubhouseIcon,
      title: "Clubhouse",
      description: "Let your community in on the conversation",
    },
    {
      icon: communityIcon,
      title: "Community",
      description: "Build an SMS subscriber list",
    },
    {
      icon: contactDetailsIcon,
      title: "Contact Details",
      description: "Easily share downloadable contact details",
    },
  ];
  return (
    <div className="matter">
      <div className="headerss">
        <div className="market">
          <Logo style={{ width: "5rem" }} />{" "}
          <p className="place">| Marketplace</p>
        </div>
        <div className="btncont">
          <Link to={"/signup"} className="btnforsignup">
            Sign up free
          </Link>
        </div>
      </div>
      <div className="grid1">
        <div className="left1">
          <h1 className="h1ofgrid1">
            The easiest place to update and share your Connection
          </h1>
          <h5 className="h5ofgrid1">
            Help your followers discover everything you’re sharing all over the
            internet, in one simple place. They’ll thank you for it!
          </h5>
          <Link to={"/signup"} className="grid1link">
            Get your free Spark
          </Link>
        </div>
        <div className="right1">
          <img className="anak" src={analytics} alt="" />
        </div>
      </div>
      <div className="grid2">
        <div className="left2">
          <img src={cards} alt="" />
        </div>
        <div className="right2">
          <h1 className="h1fromgrid2">
            Analyze your audience and keep your followers engaged
          </h1>
          <p className="fromgrid2">
            Track your engagement over time, monitor revenue and learn what’s
            converting your audience. Make informed updates on the fly to keep
            them coming back.
          </p>
        </div>
      </div>
      <div className="grid3">
        <div className="left3">
          <h1 className="h1ofgrid1">
            Share limitless content in limitless ways
          </h1>
          <h5 className="h5ofgrid1">
            Connect your content in all its forms and help followers find more
            of what they’re looking for. Your TikToks, Tweets, YouTube videos,
            music, articles, recipes, podcasts and more… It all comes together
            in one powerful place
          </h5>
        </div>
        <div className="right3">
          <img className="anak1" src={play} alt="" />
        </div>
      </div>
      <div className="">
        {/* Left Side: Title + Customer Right in the same row */}
        <div className="grid4">
          <h1 className="left4">
            Here what our <span style={{ color: "#1DA35E" }}>customer</span> has
            to say
          </h1>
          <div className="right4">
            <img src={customerIcon} alt="Customer Icon" className="staricon" />
            <p className="shortDescription">
              [short description goes in here] lorem ipsum is a placeholder text
              to demonstrate.
            </p>
          </div>
        </div>

        {/* Below the text, aligned left */}
        <button className="readcus">Read customer stories</button>
      </div>

      {/* 2x2 Grid Section */}
      <div className="grid5">
        <div className="left51">
          <h2 className="heads51">Amazing tool! Saved me months</h2>
          <p>
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="bottom51">
            <div className="leftbottom51"></div>
            <div className="">
              <span>John Master</span>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>
        <div className="right52">
          <h2 className="heads51">Amazing tool! Saved me months</h2>
          <p>
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="bottom51">
            <div className="leftbottom51"></div>
            <div className="">
              <span>John Master</span>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>
        <div className="right53">
          <h2 className="heads51">Amazing tool! Saved me months</h2>
          <p>
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="bottom51">
            <div className="leftbottom51"></div>
            <div className="">
              <span>John Master</span>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>
        <div className="left51">
          <h2 className="heads51">Amazing tool! Saved me months</h2>
          <p>
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="bottom51">
            <div className="leftbottom51"></div>
            <div className="">
              <span>John Master</span>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="linkshead">All links and apps integrations</h2>
      <div className="gridSection">
        {iconsmeet.map((item, index) => (
          <div key={index} className="luxcont">
            <img src={item.icon} alt={item.title} className="iconimage" />
            <div className="">
              <h3 style={{ margin: "0 0 0.5rem 0", fontWeight: "400" }}>
                {item.title}
              </h3>
              <p style={{ margin: "0" }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">
        <div className="footerContainer">
          {/* Top section: Buttons on left, Links on right */}
          <div className="footerTop">
            <div className="footerTopButtons">
              <Link to="/login" className="linktologin">
                Log in
              </Link>
              <Link to="/signup" className="linktosignup">
                Sign up free
              </Link>
            </div>
          </div>

          <div className="footerTopLinks">
            <div>
              <p style={{ cursor: "pointer" }}>About Spark</p>
              <p style={{ cursor: "pointer" }}>Blog</p>
              <p style={{ cursor: "pointer" }}>Press</p>
              <p style={{ cursor: "pointer" }}>Social Good</p>
              <p style={{ cursor: "pointer" }}>Contact</p>
            </div>
            <div>
              <p style={{ cursor: "pointer" }}>Careers</p>
              <p style={{ cursor: "pointer" }}>Getting Started</p>
              <p style={{ cursor: "pointer" }}>Features and How-Tos</p>
              <p style={{ cursor: "pointer" }}>FAQs</p>
              <p style={{ cursor: "pointer" }}>Report a Violation</p>
            </div>
            <div>
              <p style={{ cursor: "pointer" }}>Terms and Conditions</p>
              <p style={{ cursor: "pointer" }}>Privacy Policy</p>
              <p style={{ cursor: "pointer" }}>Cookie Notice</p>
              <p style={{ cursor: "pointer" }}>Trust Center</p>
            </div>
          </div>
        </div>

        {/* Bottom section: Acknowledgment on left, Social icons on right */}
        <div className="footerBottom">
          <p className="acknowledgment">
            We acknowledge the Traditional Custodians of the land on which our
            office stands, The Wurundjeri people of the Kulin Nation, and pay
            our respects to Elders past, present and emerging.
          </p>

          <div className="socialIcons">
            <span>
              <img src={twitter} className="iconsfills" alt="" />
            </span>
            <span>
              <i className="ri-instagram-fill iconsfill"></i>
            </span>
            <span>
              <i className="ri-youtube-fill iconsfill"></i>
            </span>
            <span>
              <i className="ri-tiktok-fill iconsfill"></i>
            </span>
            <span>
              <img src={sparks} alt="twitter" className="" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

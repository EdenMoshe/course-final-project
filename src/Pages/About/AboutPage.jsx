import { Fragment } from "react";
import "./AboutPage.css";
import mobileCartoonWallpaper from "../../assets/mobileCartoonWallpaper.png";

const AboutPage = () => {
  const handleClickBtn = (event) => {
    alert("Your message has bean sent successfully");
  };
  return (
    <Fragment>
      <div className="aboutContainer">
        <img
          className="mobileCartoonWallpaper"
          src={mobileCartoonWallpaper}
          alt="About page wallpaper"
        />
        <h1>About Us</h1>
        <p>
          Our site offers buying and selling services of mobile items Phones,
          computers, and related accessories
        </p>

        <h3>What can you buy on our website?</h3>

        <p>
          Our site offers a wide range of phones and accessories from all the
          leading manufacturers, with an emphasis on the advanced devices from
          an official importer of Apple and Samsung. On the site you can also
          find a dedicated store for all Apple products, including the new
          iPhone series, iPads, headphones and watches. In the Samsung store on
          the website you will find the series of Galaxy devices, smart watches
          and earphones from the brand. What else can you find on our website?!
          Quality phone covers, screen protectors, portable batteries, home
          chargers, car chargers, gadgets, music accessories, Bluetooth products
          and memory cards, tablets, laptops and more.
        </p>

        <h3>What can you sell on our site?</h3>

        <p>
          Mobile devices, computers and related accessories with an official
          importer's warranty, in good condition and new. All products offered
          for sale will undergo a quality check before being published on the
          website
        </p>

        <h4>Our shipping policy:</h4>
        <p>
          You bought a new product! The mission is upon us! Free home delivery
          on any purchase over $350.
        </p>

        <section className="text-center contact-section">
          <section className="text-center">
            <h3 className="mb-5">Contact us</h3>

            <div className="row" style={{ justifyContent: "end" }}>
              <div className="col-lg-5">
                <iframe
                  src="https://maps.google.com/maps?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F%20%D7%94%D7%96%D7%94%D7%91&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-100 w-100"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div className="col-lg-7">
                <form>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="row mb-4">
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="form-floating">
                            <input
                              type="text"
                              id="form3Example1"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="email"
                              id="form3Example2"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example2"
                            >
                              Email Address
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          type="text"
                          id="form3Example3"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form3Example3">
                          Subject
                        </label>
                      </div>
                      <div className="form-floating mb-4">
                        <textarea
                          className="form-control"
                          id="form4Example3"
                          rows="4"
                        ></textarea>
                        <label className="form-label" htmlFor="form4Example3">
                          Message
                        </label>
                      </div>
                      <div className="text-center text-md-start">
                        <button
                          onClick={handleClickBtn}
                          type="submit"
                          className="btn btn-primary mb-5 mb-md-0"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      </div>
    </Fragment>
  );
};

export default AboutPage;

import "../../styles/layout/Footer.scss";
import PetsIcon from "@mui/icons-material/Pets";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
export const Footer = () => {
  return (
    <footer className="footerContainer">
      <PetsIcon
        sx={{
          fontSize: "50pt",
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          top: "-30px",
        }}
      ></PetsIcon>
      <section className="footerInfoContainer">
        <article className="footerLinksContainer">
          <a href="">About us</a>
          <div className="divider"></div>
          <a href="">Help at the shelter</a>
          <div className="divider"></div>
          <a href="">Cats</a>
          <div className="divider"></div>
          <a href="">Dogs</a>
          <div className="divider"></div>
          <a href="">Animals</a>
        </article>

        <article className="footerInformationContainer">
          <div className="footerInformation">
            <h3>Contact</h3>

            <p>+34 6006745333</p>
            <p>AnimalRescue@example.com</p>
            <p>Atalaya del mar 3, 178 56 Malaga</p>
          </div>
          <div className="divider"></div>

          <div className="footerInformation">
            <h3>Hours</h3>
            <p>Monday-Friday: 06.00 - 18.00</p>
            <p> Saturday: 10.00 - 18.00</p>
            <p>Sunday: 10.00- 16.00</p>
          </div>
          <div className="divider"></div>

          <div className="footerInformation">
            <h3>Information</h3>
            <p>
              Please call or send an email to book an apointment for the animals
              you want to see.
            </p>
            <p>
              Volonteers are always welcome to help out, register and book a
              time that suits you.
            </p>
          </div>
        </article>
      </section>

      <section className="footerSocialMedia">
        <div className="letsConnectConatiner">
          <p>Lets connect</p>
        </div>
        <div className="divider"></div>
        <div className="iconsContainer">
          <FacebookIcon></FacebookIcon>
          <TwitterIcon></TwitterIcon>
          <InstagramIcon></InstagramIcon>
        </div>
      </section>
    </footer>
  );
};

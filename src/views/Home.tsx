import "../styles/Home.scss";
export const Home = () => {
  return (
    <main className="mainContainer">
      <section className="cardMainContainer">
        <article className="cardContainer">
          <h5 className="cardHeader">About us</h5>
          <div className="textContainer">
            <span>
              Animal Rescue is not a profit-driven company that runs on
              donations and help from volunteers. We have been in Malaga for 40
              years and have helped over 5000 homeless animals over the years.
            </span>
          </div>
        </article>
        <article className="cardSmallContainerFirst">
          <h5 className="cardHeader">Donate to help</h5>
          <div className="textContainer">
            <span>länk</span>
          </div>
        </article>
        <article className="cardSmallContainerSecond">
          <h5 className="cardHeader">Adopt a animal</h5>
          <div className="textContainer">
            <span>länk</span>
          </div>
        </article>
        <article className="cardContainer">
          <h5 className="cardHeader">Volonteer</h5>
          <div className="textContainer">
            <span>
              Animal Rescue is not a profit-driven company that runs on
              donations and help from volunteers. We have been in Malaga for 40
              years and have helped over 5000 homeless animals over the years.
            </span>
          </div>
        </article>
      </section>
    </main>
  );
};

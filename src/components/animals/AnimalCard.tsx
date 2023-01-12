import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAnimal } from "../../interfaces/IAnimal";
import "../../styles/components/animals/animalCard.scss";

interface IAnimalCardProps {
  animal: IAnimal;
}
export const AnimalCard = (props: IAnimalCardProps) => {
  const [openHoverModal, setOpenhoverModal] = useState(false);
  const navigate = useNavigate();

  const handleHover = () => {
    let interval = setInterval(() => {
      setOpenhoverModal(true);
      clearInterval(interval);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setOpenhoverModal(false);
  };

  return (
    <section
      onClick={() => navigate(`/Adopt/${props.animal.id}`)}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      className="animalContainer"
    >
      <div className="nameContainer">
        <p>{props.animal.name}</p>
      </div>
      <div className="imgContainer">
        <img
          className="animalImg"
          src={require(`../../assets/${props.animal.img[0]}`)}
          alt={props.animal.img[0]}
        />
      </div>
      <div className="infoContainer">
        <p>Age: {props.animal.age}</p>
        <p>Price: {props.animal.price}</p>
      </div>

      {/* <AnimalHoverModal
        show={openHoverModal}
        animal={props.animal}
      ></AnimalHoverModal> */}
    </section>
  );
};

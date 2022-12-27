import { IAnimal } from "../../interfaces/IAnimal";
import Alicia1 from "../../assets/Alicia/Alicia1.jpeg";
import "../../styles/animals/ShowAnimal.scss";
//import Alicia from '../../assets/Alicia';

interface IShowAnimalProps {
  animal: IAnimal;
}
export const ShowAnimal = (props: IShowAnimalProps) => {
  return (
    <section className="animalContainer">
      <div className="nameContainer">
        <p>{props.animal.name}</p>
      </div>
      <div className="imgContainer">
        <img className="animalImg" src={Alicia1} alt={props.animal.img[0]} />
      </div>
      <div className="infoContainer">
        <p>Age: {props.animal.age}</p>
        <p>Price: {props.animal.price}</p>
      </div>
    </section>
  );
};

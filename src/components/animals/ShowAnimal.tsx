import { IAnimal } from "../../interfaces/IAnimal";
import Alicia1 from "../../assets/Alicia/Alicia1.jpeg";
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
        <img src={Alicia1} alt={props.animal.img[0]} />
      </div>
    </section>
  );
};

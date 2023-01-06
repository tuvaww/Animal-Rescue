import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../interfaces/IAnimal";
import { ImageCarousel } from "../reusables/ImageCarousel";
import "../../styles/animals/animalDetails.scss";

export const AnimalDetails = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState<IAnimal>();
  useEffect(() => {
    getAnimal();
  }, [id]);

  const getAnimal = async () => {
    const response = await fetch(`http://localhost:8000/getAnimal/${id}`);

    const data = await response.json();
    setAnimal(data);
  };
  return (
    <section className="animalDetailsContainer">
      <div className="nameContainer">
        <p>{animal?.name}</p>
      </div>
      <ImageCarousel
        imgUrl={animal?.img.length ? animal?.img : []}
      ></ImageCarousel>
      {/*       <section className="detailsContainer">
       */}{" "}
      <article className="informartion">
        <div>
          <p>{animal?.age} years</p>
        </div>
        <div>
          <p> {animal?.breed}</p>
        </div>
        <div>
          <p> {animal?.gender}</p>
        </div>
        <div>
          <p> {animal?.price} €</p>
        </div>
        <div>
          <p>Arrived at shelter: {animal?.arrivedAtShelter}</p>
        </div>
        <div>
          <p> {animal?.weight} kg</p>
        </div>
        <div>
          <p> {animal?.health}</p>
        </div>
      </article>
      <article className="descContainer">
        <span>{animal?.description}</span>
      </article>
      {/*       </section>
       */}{" "}
    </section>
  );
};

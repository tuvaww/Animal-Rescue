import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../interfaces/IAnimal";
import { ImageCarousel } from "../reusables/ImageCarousel";
import "../../styles/components/animals/animalDetails.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
export const AnimalDetails = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState<IAnimal>();

  const [animalIsSaved, setAnimalIsSaved] = useState(false);

  useEffect(() => {
    let listFromStorage = JSON.parse(sessionStorage.getItem("Animals") || "[]");

    listFromStorage.map((a: IAnimal) => {
      if (a.id === animal?.id) {
        setAnimalIsSaved(true);
      }
    });
  }, []);
  useEffect(() => {
    getAnimal();
  }, [id]);

  const getAnimal = async () => {
    const response = await fetch(`http://localhost:8000/getAnimal/${id}`);

    const data = await response.json();
    setAnimal(data);
  };

  const addToAdoptList = () => {
    let listFromStorage = JSON.parse(sessionStorage.getItem("Animals") || "[]");

    let copy: IAnimal[] = [...listFromStorage];

    if (animal) {
      copy.push(animal);

      sessionStorage.setItem("Animals", JSON.stringify(copy));
      setAnimalIsSaved(true);
    }
  };

  const removeFromAdoptList = () => {
    let listFromStorage = JSON.parse(sessionStorage.getItem("Animals") || "[]");

    let copy: IAnimal[] = [...listFromStorage];

    if (animal) {
      let index = copy.indexOf(animal);

      copy.splice(index, 1);

      sessionStorage.setItem("Animals", JSON.stringify(copy));
      setAnimalIsSaved(false);
    }
  };

  return (
    <section className="animalDetailsContainer">
      <div className="nameContainer">
        <p>{animal?.name}</p>
      </div>
      <ImageCarousel
        imgUrl={animal?.img.length ? animal?.img : []}
      ></ImageCarousel>

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

      <article className={`${!animalIsSaved ? "addContainer" : "hide"}`}>
        <span>Add {animal?.name} to your list to book a meeting ! </span>
        <AddCircleOutlineIcon
          onClick={addToAdoptList}
          sx={{ fontSize: "32pt", color: "#ffb4b4", cursor: "pointer" }}
        ></AddCircleOutlineIcon>
      </article>

      <article className={`${animalIsSaved ? "removeContainer" : "hide"}`}>
        <span>Remove {animal?.name} from your list ! </span>
        <RemoveCircleOutlineIcon
          onClick={removeFromAdoptList}
          sx={{ fontSize: "32pt", color: "#ffb4b4", cursor: "pointer" }}
        ></RemoveCircleOutlineIcon>
      </article>
    </section>
  );
};

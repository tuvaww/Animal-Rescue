import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { ShowAnimal } from "../components/animals/ShowAnimal";
import { IAnimal } from "../interfaces/IAnimal";
import "../styles/Adopt.scss";

export const Adopt = () => {
  const [animals, setAnimals] = useState<[IAnimal]>();
  let animalsExist: [IAnimal] = [
    {
      _id: "",
      id: "",
      type: "",
      name: "",
      age: "",
      arrivedAtShelter: "",
      price: "",
      description: "",
      breed: "",
      weight: "",
      isOkWithOtherAnimals: "",
      health: "",
      img: [],
    },
  ];
  let animalsHTML: JSX.Element[] = [];
  useEffect(() => {
    getAnimals();

    /* if (animals) {
      animalsExist = animals;
    } */
  }, []);

  const getAnimals = async () => {
    const response = await fetch("http://localhost:8000/getAnimals");
    const data = await response.json();
    setAnimals(data);
  };

  if (animals) {
    animalsHTML = animals.map((animal) => {
      return <ShowAnimal animal={animal} key={animal.id} />;
    });
  }

  return (
    <>
      <section className="mainAdoptContainer">{animalsHTML}</section>
    </>
  );
};

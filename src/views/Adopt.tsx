import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { AnimalCard } from "../components/animals/AnimalCard";
import { Selector } from "../components/reusables/Selector";
import { IAnimal } from "../interfaces/IAnimal";
import "../styles/Adopt.scss";

export const Adopt = () => {
  const [animals, setAnimals] = useState<[IAnimal]>();

  let animalsHTML: JSX.Element[] = [];
  useEffect(() => {
    getAnimals();
  }, []);

  const getAnimals = async () => {
    const response = await fetch("http://localhost:8000/getAnimals");
    const data = await response.json();
    setAnimals(data);
  };

  if (animals) {
    animalsHTML = animals.map((animal) => {
      return <AnimalCard animal={animal} key={animal.id} />;
    });
  }

  return (
    <>
      <section className="mainAdoptContainer">
        <article className="filteringContainer">
          <Selector name="Type" listOfSelectables={["Dog", "Cat"]}></Selector>
          <Selector
            name="Size"
            listOfSelectables={["< 20 kg", "< 10 kg", "> 20 kg"]}
          ></Selector>
          <Selector
            name="Gender"
            listOfSelectables={["Male", "Female"]}
          ></Selector>
        </article>

        <article className="animalCardsContainer">{animalsHTML}</article>
      </section>
    </>
  );
};

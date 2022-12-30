import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { AnimalCard } from "../components/animals/AnimalCard";
import { Selector } from "../components/reusables/Selector";
import { IAnimal } from "../interfaces/IAnimal";
import "../styles/Adopt.scss";

import TuneIcon from "@mui/icons-material/Tune";
import { FiltersCount } from "../components/reusables/FiltersCount";

export const Adopt = () => {
  const [animals, setAnimals] = useState<[IAnimal]>();
  let filtersList: string[] = [];

  const [filters, setFilters] = useState<string[]>([]);
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

  const getFilters = (selected: string[]) => {
    let listOfFilters = [...filters];

    for (let i = 0; i < selected.length; i++) {
      if (!filters.includes(selected[i])) {
        listOfFilters.push(selected[i]);
      }
    }

    setFilters(listOfFilters);
  };

  return (
    <>
      <section className="mainAdoptContainer">
        <FiltersCount
          filtersLength={filters.length}
          filters={filters}
        ></FiltersCount>
        <article className="filteringContainer">
          <Selector
            getFilters={getFilters}
            name="Type"
            listOfSelectables={["Dog", "Cat"]}
          ></Selector>
          <Selector
            getFilters={getFilters}
            name="Size"
            listOfSelectables={["< 20 kg", "< 10 kg", "> 20 kg"]}
          ></Selector>
          <Selector
            getFilters={getFilters}
            name="Gender"
            listOfSelectables={["Male", "Female"]}
          ></Selector>
        </article>

        <article className="animalCardsContainer">{animalsHTML}</article>
      </section>
    </>
  );
};

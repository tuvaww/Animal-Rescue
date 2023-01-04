import { ChangeEvent, useEffect, useState } from "react";
import { AnimalCard } from "../components/animals/AnimalCard";
import { Selector } from "../components/reusables/Selector";
import { IAnimal } from "../interfaces/IAnimal";
import "../styles/Adopt.scss";
import TuneIcon from "@mui/icons-material/Tune";

import { FiltersCount } from "../components/reusables/FiltersCount";
import { IFilters } from "../interfaces/IFilters";

export const Adopt = () => {
  const [animals, setAnimals] = useState<IAnimal[]>();
  const [sortedAnimals, setSortedAnimals] = useState<IAnimal[]>();
  const [filters, setFilters] = useState<IFilters>({
    Type: "",
    Size: "",
    Gender: "",
  });

  const [clearFilters, setClearFilters] = useState(false);
  const [search, setSearch] = useState("");
  let animalsHTML: JSX.Element[] = [];

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    let sortByFilters = animals?.filter((a) => {
      const gender = a.gender === filters.Gender;
      const type = a.type === filters.Type;

      if (filters.Gender && filters.Type && filters.Size) {
        return gender && type && calculateSizeFilter(a);
      }
      if (filters.Gender && !filters.Type && !filters.Size) {
        return gender;
      }
      if (filters.Gender && !filters.Type && filters.Size) {
        return gender && calculateSizeFilter(a);
      }
      if (filters.Gender && filters.Type && !filters.Size) {
        return gender && type;
      }
      if (filters.Type && filters.Size && !filters.Gender) {
        return type && calculateSizeFilter(a);
      }
      if (filters.Type && !filters.Gender && !filters.Size) {
        return type;
      }
      if (filters.Size && !filters.Gender && !filters.Type) {
        return calculateSizeFilter(a);
      }
    });
    if (!filters.Gender && !filters.Size && !filters.Type) {
      setSortedAnimals(animals);
    } else {
      setSortedAnimals(sortByFilters);
    }
  }, [filters]);

  const calculateSizeFilter = (animal: IAnimal) => {
    if (filters.Size.startsWith("<")) {
      return +animal.weight < +filters.Size.slice(2, -3);
    } else {
      return +animal.weight > +filters.Size.slice(2, -3);
    }
  };

  const getAnimals = async () => {
    const response = await fetch("http://localhost:8000/getAnimals");
    const data = await response.json();
    setAnimals(data);
    setSortedAnimals(data);
  };

  if (animals && sortedAnimals) {
    animalsHTML = sortedAnimals.map((animal) => {
      return <AnimalCard animal={animal} key={animal.id} />;
    });
  }

  const getFilters = (selected: string) => {
    let listOfFilters = { ...filters };

    if (selected === "Dog" || selected === "Cat" || selected === "Rabbit") {
      listOfFilters.Type = selected;
    }
    if (
      selected === "< 10 kg" ||
      selected === "< 20 kg" ||
      selected === "> 20 kg"
    ) {
      listOfFilters.Size = selected;
    }
    if (selected === "Male" || selected === "Female") {
      listOfFilters.Gender = selected;
    }

    setFilters(listOfFilters);
  };

  const clearAllFilters = () => {
    setFilters({ Type: "", Size: "", Gender: "" });
    setClearFilters(true);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log("search", search);

    getAnimalsBySearch();
  };

  const getAnimalsBySearch = () => {
    const searchByName = animals?.filter((a) => {
      return a.name.toLowerCase().startsWith(search.toLowerCase());
    });
    if (!search) {
      setSortedAnimals(animals);
    } else {
      setSortedAnimals(searchByName);
    }

    console.log(searchByName);
  };

  return (
    <>
      <section className="mainAdoptContainer">
        <article className="searchContainer">
          <input
            onChange={handleSearch}
            value={search}
            className="searchBar"
            id="searchBar"
            type="text"
            placeholder="Search by name"
          />
        </article>

        <FiltersCount
          clearAllFilters={clearAllFilters}
          filters={filters}
        ></FiltersCount>

        <article className="filteringContainer">
          <Selector
            clearedFilter={clearFilters}
            getFilters={getFilters}
            name="Type"
            listOfSelectables={["Dog", "Cat", "Rabbit"]}
          ></Selector>

          <Selector
            clearedFilter={clearFilters}
            getFilters={getFilters}
            name="Size"
            listOfSelectables={["< 10 kg", "< 20 kg", "> 20 kg"]}
          ></Selector>
          <Selector
            clearedFilter={clearFilters}
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

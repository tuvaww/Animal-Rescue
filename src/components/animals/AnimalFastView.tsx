import { useEffect, useState } from "react";
import { IAnimal } from "../../interfaces/IAnimal";

export const AnimalFastView = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [animal, setAnimal] = useState<IAnimal>();

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    getRandomIndex();
    console.log("animal", animal);
  }, [animals]);
  const getAnimals = async () => {
    const response = await fetch("http://localhost:8000/getAnimals");
    const data = await response.json();
    setAnimals(data);
  };

  const getRandomIndex = () => {
    var index = animals[Math.floor(Math.random() * animals.length)];
    setAnimal(index);
  };

  const animalImg = animals?.map((a) => {
    if (animals && animal && a.id === animal.id) {
      return (
        <img
          className="animalImg"
          key={a.id}
          src={require(`../../assets/${animal?.img[0]}`)}
          alt={`../../assets/${animal?.img[0]}`}
        />
      );
    }
  });

  return <section className="animalFastViewContainer">{animalImg}</section>;
};

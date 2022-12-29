import { useEffect, useState } from "react";
import { IAnimal } from "../../interfaces/IAnimal";
import "../../styles/animals/animalHoverModal.scss";

interface IAnimalHoverModalProps {
  show: boolean;
  animal: IAnimal;
}
export const AnimalHoverModal = (props: IAnimalHoverModalProps) => {
  const imagesArray = props.animal.img;
  let [index, setIndex] = useState(0);
  const [img, setImg] = useState(imagesArray[index]);
  let lengthOfImages = imagesArray.length;

  const handleRightClick = () => {
    if (index + 1 >= lengthOfImages) {
      setIndex(0);
      setImg(imagesArray[index]);
    } else if (index < lengthOfImages) {
      setIndex(index + 1);
      setImg(imagesArray[index]);
    }
  };

  console.log("length", lengthOfImages);
  console.log("i", index);
  console.log("img", img);
  return (
    <section
      className={` ${props.show ? "animalHoverContainer" : "hideAnimalHover"}`}
    >
      <div className="pointer"></div>

      <article className="imageContainer">
        <img
          onClick={handleRightClick}
          className="carouselImg"
          src={require("../../assets/" + img)}
          alt={img}
        />
      </article>
    </section>
  );
};

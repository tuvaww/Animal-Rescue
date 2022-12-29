import "../../styles/components/selector.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface ISelectorProps {
  name: string;
  listOfSelectables: string[];
}
export const Selector = (props: ISelectorProps) => {
  const [openSelectables, setOpenSelectables] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([
    ...props.listOfSelectables,
  ]);

  const handleSelect = (selected: string, i: number) => {
    if (selectedFilter.includes(selected)) {
      let removeSelected = selectedFilter.filter((item) => {
        return item != selected;
      });

      setSelectedFilter(removeSelected);
    } else {
      let copy = [...selectedFilter];
      copy.splice(i, 0, selected);

      setSelectedFilter(copy);
    }
  };

  const selectablesHTML = props.listOfSelectables.map((selectable, i) => {
    return (
      <div
        key={i}
        onClick={() => handleSelect(selectable, i)}
        className={`${
          selectedFilter.includes(selectable)
            ? "selectedContainer"
            : "notSelectedContainer"
        }`}
      >
        <p
          className={`${
            selectedFilter.includes(selectable) ? "selected" : "notSelected"
          }`}
        >
          {selectable}
        </p>
      </div>
    );
  });

  const handleShowSelectables = () => {
    setOpenSelectables(!openSelectables);
  };

  return (
    <section className="selectorContainer">
      <div className="headerSelector">
        <p>{props.name}</p>
        <ExpandMoreIcon
          onClick={handleShowSelectables}
          sx={{ cursor: "pointer" }}
        />
      </div>

      <div
        className={` ${
          openSelectables ? "selectablesContainer" : "hideSelectables"
        }`}
      >
        {selectablesHTML}
      </div>
    </section>
  );
};

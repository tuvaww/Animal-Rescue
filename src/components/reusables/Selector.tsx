import "../../styles/components/selector.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

interface ISelectorProps {
  name: string;
  listOfSelectables: string[];
  getFilters: (filter: string) => void;
  clearedFilter: boolean;
}

export const Selector = (props: ISelectorProps) => {
  const [openSelectables, setOpenSelectables] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    if (props.clearedFilter) {
      setSelectedFilter("");
    }
  }, [props.clearedFilter]);

  const handleSelect = (selected: string, i: number) => {
    if (selectedFilter === selected) {
      /*   let removeSelected = selectedFilter.filter((item) => {
        return item !== selected;
      }); */

      setSelectedFilter("");
    } else {
      /*  let copy = [...selectedFilter];
      copy.splice(i, 0, selected); */

      setSelectedFilter(selected);
    }
    props.getFilters(selected);
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
        onMouseLeave={() => setOpenSelectables(false)}
        className={` ${
          openSelectables ? "selectablesContainer" : "hideSelectables"
        }`}
      >
        {selectablesHTML}
      </div>
    </section>
  );
};

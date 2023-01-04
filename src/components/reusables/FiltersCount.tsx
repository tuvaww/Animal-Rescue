import TuneIcon from "@mui/icons-material/Tune";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { IFilters } from "../../interfaces/IFilters";

interface IFiltersCountProps {
  filters: IFilters;
  clearAllFilters: () => void;
}

export const FiltersCount = (props: IFiltersCountProps) => {
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    getFilterCount();
  }, [props.filters]);

  const getFilterCount = () => {
    var size = Object.values(props.filters);
    let count = 0;

    size.forEach((s) => {
      if (s.length) {
        count++;
      }
    });

    setFilterCount(count);
  };

  return (
    <div className="filterIconContainer">
      <div className="filterCount">
        <p>{filterCount}</p>
      </div>
      <Tooltip
        title="Clear all filters"
        arrow
        placement="left-start"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "white",
              "& .MuiTooltip-arrow": {
                color: "white",
              },
              color: "black",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            },
          },
        }}
      >
        <TuneIcon
          onClick={() => props.clearAllFilters()}
          sx={{
            cursor: "pointer",
            padding: "0 30px 30px 0",
          }}
        ></TuneIcon>
      </Tooltip>
    </div>
  );
};

import TuneIcon from "@mui/icons-material/Tune";

interface IFiltersCountProps {
  filtersLength: number;
  filters: string[];
}

export const FiltersCount = (props: IFiltersCountProps) => {
  return (
    <div className="filterIconContainer">
      <div className="filterCount">
        <p>{props.filtersLength}</p>
      </div>
      <TuneIcon
        sx={{
          cursor: "pointer",
          padding: "0 30px 30px 0",
        }}
      ></TuneIcon>

      <div className="filtersModal"></div>
    </div>
  );
};

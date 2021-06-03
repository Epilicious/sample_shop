import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { ReactElement, SyntheticEvent, useState } from "react";
import Product from "../types/Product";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

interface Props {
  setFilteredProducts: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  products: Product[];
}

function FilterForm(props: Props): ReactElement {
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (category === "all") {
      props.setFilteredProducts(undefined);
    } else {
      props.setFilteredProducts(() =>
        props.products.filter((product) => product.category === category)
      );
    }
    props.setCurrentPage(1);
  };

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <InputLabel id="category">Category:</InputLabel>
      <Select
        labelId="category"
        id="category-select"
        value={category}
        onChange={handleChange}
      >
        <MenuItem value={"all"}>{`All`} </MenuItem>
        <MenuItem value={"electronics"}>Electronic</MenuItem>
        <MenuItem value={"jewelery"}>Jewelery</MenuItem>
        <MenuItem value={"men's clothing"}>Men Fashion</MenuItem>
        <MenuItem value={"women's clothing"}>Women Fashion</MenuItem>
      </Select>
      <Button type="submit" variant="contained">
        Filter
      </Button>
    </form>
  );
}

export default FilterForm;

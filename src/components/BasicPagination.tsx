import React, { ChangeEvent, ReactElement, SyntheticEvent } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface Props {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
}

export default function BasicPagination(props: Props): ReactElement {
  const classes = useStyles();
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalProducts / props.productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <div className={classes.root}>
      <Pagination
        count={pageNumbers.length}
        page={props.currentPage}
        onChange={(event, page) => props.onChange(event, page)}
      />
    </div>
  );
}

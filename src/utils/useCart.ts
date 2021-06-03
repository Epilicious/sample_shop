import { ReactElement, SyntheticEvent } from "react";
import { Actions, useStore } from "../Store";
import Product from "../types/Product";

export const useCart = (): {
  onAddOne: (e: SyntheticEvent, product: Product) => void;
  onRemoveOne: (e: SyntheticEvent, product: Product) => void;
  onDelete: (e: SyntheticEvent, product: Product) => void;
} => {
  const { store, dispatch } = useStore();

  const onAddOne = (e: SyntheticEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", product });
  };
  const onRemoveOne = (e: SyntheticEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: "REMOVE_FROM_CART", product });
  };
  const onDelete = (e: SyntheticEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_FROM_CART", product });
  };

  return { onAddOne, onRemoveOne, onDelete };
};

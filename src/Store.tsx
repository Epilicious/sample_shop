import { CardTravel } from "@material-ui/icons";
import React, {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from "react";
import Product from "./types/Product";

export interface Store {
  cart: Product[];
}

export const initialStore: Store = {
  cart: [],
};

interface AddToCart {
  type: "ADD_TO_CART";
  product: Product;
}

interface RemoveFromCart {
  type: "REMOVE_FROM_CART";
  product: Product;
}

type Actions = AddToCart | RemoveFromCart;

export function reducer(store: Store, action: Actions): Store {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...store, cart: [...store.cart, action.product] };
    case "REMOVE_FROM_CART": {
      const index = store.cart
        .map((product) => product.id)
        .indexOf(action.product.id);
      return {
        ...store,
        cart: store.cart.filter((_product, _index) => _index !== index),
      };
    }
    default:
      return store;
  }
}

interface StoreContext {
  store: Store;
  dispatch: Dispatch<Actions>;
}

const StoreContext = createContext({} as StoreContext);

export const useStore = (): StoreContext => useContext(StoreContext);

export function StoreProvider(props: { children: ReactElement }): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

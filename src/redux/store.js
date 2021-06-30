import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./list-slice";
import showOptionsReducer from "./show-option-slice";

export default configureStore({
  reducer: { list: listReducer, showOptions: showOptionsReducer },
});

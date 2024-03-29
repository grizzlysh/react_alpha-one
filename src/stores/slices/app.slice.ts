import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

type AppState = {
  menu_accord: {[key: string]: any},
  menu_drawer: boolean,
}

const initialState: AppState = {
  menu_accord: {},
  menu_drawer: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMenuAccord: (state, action: PayloadAction<{[key: string]: any}>) => {
      state.menu_accord = action.payload;
    },
    setMenuDrawer: (state, action: PayloadAction<boolean>) => {
      state.menu_drawer = action.payload;
    },
  }
});

export const getMenuAccord                    = (state: RootState) => state.reducer.app.menu_accord;
export const getMenuDrawer                    = (state: RootState) => state.reducer.app.menu_drawer;
export const { setMenuAccord, setMenuDrawer } = appSlice.actions;
export default appSlice.reducer;
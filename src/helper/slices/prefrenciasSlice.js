import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import backEdn from '../backEnd';

export const fetchPref = createAsyncThunk(
  'fetchPreferences',
  async (thunkAPI) => {
    const response = await backEdn.getUserPref();
    return response;
  },
);

export const prefSlice = createSlice({
  name: 'preferencias',
  initialState: {
    nombre: '',
    tema: 'claro',
  },
  reducers: {
    changeTheme(state, action) {
      state.tema = action.payload;
    },
  },
  extraReducers: {
    [fetchPref.fulfilled]: (state, action) => {
      state.nombre = action.payload.NOMBRE;
      state.tema = action.payload.TEMA;
    },
  },
});

const { actions, reducer } = prefSlice;

export const { changeTheme } = actions;

export default reducer;

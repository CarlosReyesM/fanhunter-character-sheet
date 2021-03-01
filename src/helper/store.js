import { configureStore } from '@reduxjs/toolkit';
import  prefReducer  from './slices/prefrenciasSlice';

export default configureStore({
  reducer: {
    getPref: prefReducer,
  },
});

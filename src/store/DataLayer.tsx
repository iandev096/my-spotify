import React, { createContext, useContext, useReducer } from 'react';
import { DataLayerAction, DataLayerState, initialState } from './reducer';

export interface DataLayerProps {
  initialState: DataLayerState,
  reducer: (state: DataLayerState, action: DataLayerAction) => DataLayerState,
}

export const DataLayerContext = createContext<[DataLayerState, React.Dispatch<DataLayerAction>]>([initialState, () => {}]);

export const DataLayer: React.FC<DataLayerProps> = ({ initialState, children, reducer}) => {

  return (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataLayerContext.Provider>
  );
};

export const useDataLayer = () => useContext(DataLayerContext);

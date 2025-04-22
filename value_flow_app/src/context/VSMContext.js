// VSMContext.js - Manages the sequential VSM creation process
import React, { createContext, useReducer, useContext } from 'react';
import { valueStreamData } from '../valueStreamData';

// Create the context
const VSMContext = createContext();

// Steps in the sequential VSM creation process
export const VSM_STEPS = {
  DEFINE_SCOPE: 0,
  PROCESS_FLOW: 1,
  INVENTORY_POINTS: 2,
  INFO_FLOWS: 3,
  METRICS: 4,
  WASTE_IDENTIFICATION: 5,
  FUTURE_STATE: 6,
  IMPLEMENTATION: 7
};

// Reducer to handle state transitions
const vsmReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(VSM_STEPS.IMPLEMENTATION, state.currentStep + 1)
      };
      
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(VSM_STEPS.DEFINE_SCOPE, state.currentStep - 1)
      };
      
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
      
    case 'UPDATE_SCOPE':
      return {
        ...state,
        scopeDefinition: {
          ...state.scopeDefinition,
          ...action.payload
        }
      };
      
    case 'ADD_PROCESS':
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          processes: [...state.vsmData.processes, action.payload]
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'UPDATE_PROCESS':
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          processes: state.vsmData.processes.map(p => 
            p.id === action.payload.id ? { ...p, ...action.payload.process } : p
          )
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'REMOVE_PROCESS':
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          processes: state.vsmData.processes.filter(p => p.id !== action.payload)
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'ADD_INVENTORY':
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          inventoryPoints: [...state.vsmData.inventoryPoints, action.payload]
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'UPDATE_INVENTORY':
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          inventoryPoints: state.vsmData.inventoryPoints.map(i => 
            i.id === action.payload.id ? { ...i, ...action.payload.inventory } : i
          )
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'REMOVE_INVENTORY':
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          inventoryPoints: state.vsmData.inventoryPoints.filter(i => i.id !== action.payload)
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'ADD_FLOW':
      const { flowType, flow } = action.payload;
      return {
        ...state,
        vsmData: {
          ...state.vsmData,
          [flowType]: [...state.vsmData[flowType], flow]
        },
        history: [...state.history, state.vsmData]
      };
      
    case 'CALCULATE_METRICS':
      // Here we would calculate metrics based on the VSM data
      // This is a simplified example
      return state;
      
    case 'IDENTIFY_WASTE':
      return {
        ...state,
        wastes: [...state.wastes, action.payload]
      };
      
    case 'UNDO':
      if (state.history.length <= 1) return state;
      
      const newHistory = [...state.history];
      newHistory.pop();
      const previousState = newHistory[newHistory.length - 1];
      
      return {
        ...state,
        vsmData: previousState,
        history: newHistory
      };
      
    default:
      return state;
  }
};

// Provider component
export const VSMProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vsmReducer, {
    currentStep: VSM_STEPS.DEFINE_SCOPE,
    vsmData: JSON.parse(JSON.stringify(valueStreamData)), // Deep copy of initial data
    history: [JSON.parse(JSON.stringify(valueStreamData))], // For undo functionality
    scopeDefinition: {
      title: 'SimplePharma Value Stream',
      product: '',
      startPoint: '',
      endPoint: '',
      team: [],
      dateCreated: new Date().toISOString()
    },
    wastes: [], // Identified wastes in the current state
    improvements: [] // Proposed improvements for future state
  });

  // Actions for sequential steps
  const actions = {
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    goToStep: (step) => dispatch({ type: 'GO_TO_STEP', payload: step }),
    updateScope: (scopeData) => dispatch({ type: 'UPDATE_SCOPE', payload: scopeData }),
    addProcess: (process) => dispatch({ type: 'ADD_PROCESS', payload: process }),
    updateProcess: (id, process) => dispatch({ type: 'UPDATE_PROCESS', payload: { id, process } }),
    removeProcess: (id) => dispatch({ type: 'REMOVE_PROCESS', payload: id }),
    addInventory: (inventory) => dispatch({ type: 'ADD_INVENTORY', payload: inventory }),
    updateInventory: (id, inventory) => dispatch({ type: 'UPDATE_INVENTORY', payload: { id, inventory } }),
    removeInventory: (id) => dispatch({ type: 'REMOVE_INVENTORY', payload: id }),
    addFlow: (flowType, flow) => dispatch({ type: 'ADD_FLOW', payload: { flowType, flow } }),
    calculateMetrics: () => dispatch({ type: 'CALCULATE_METRICS' }),
    identifyWaste: (waste) => dispatch({ type: 'IDENTIFY_WASTE', payload: waste }),
    undo: () => dispatch({ type: 'UNDO' })
  };

  return (
    <VSMContext.Provider value={{ state, ...actions }}>
      {children}
    </VSMContext.Provider>
  );
};

// Custom hook for using the VSM context
export const useVSM = () => {
  const context = useContext(VSMContext);
  if (context === undefined) {
    throw new Error('useVSM must be used within a VSMProvider');
  }
  return context;
};
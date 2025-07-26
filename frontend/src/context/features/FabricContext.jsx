import { createContext, useContext, useReducer, useEffect } from 'react';

const FabricContext = createContext();

const fabricReducer = (state, action) => {
  switch(action.type) {
    case 'SET_FABRICS':
      return { ...state, fabrics: action.payload, loading: false };
    case 'SELECT_FABRIC':
      return { ...state, selected: action.payload };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        fabrics: state.fabrics.map(f => 
          f.id === action.payload ? { ...f, isFavorite: !f.isFavorite } : f
        )
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function FabricProvider({ children }) {
  const [state, dispatch] = useReducer(fabricReducer, {
    fabrics: [],
    selected: null,
    filters: {},
    loading: false
  });

  const loadFabrics = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch('/api/fabrics');
      const data = await res.json();
      dispatch({ type: 'SET_FABRICS', payload: data });
    } catch(error) {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const applyFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const filteredFabrics = state.fabrics.filter(fabric => {
    return Object.entries(state.filters).every(([key, value]) => {
      if(!value) return true;
      return fabric[key] === value;
    });
  });

  useEffect(() => {
    loadFabrics();
  }, []);

  return (
    <FabricContext.Provider value={{ 
      ...state,
      filteredFabrics,
      loadFabrics,
      applyFilters,
      toggleFavorite: id => dispatch({ type: 'TOGGLE_FAVORITE', payload: id })
    }}>
      {children}
    </FabricContext.Provider>
  );
}

export const useFabric = () => {
  const context = useContext(FabricContext);
  if(!context) throw new Error('useFabric must be used within FabricProvider');
  return context;
};
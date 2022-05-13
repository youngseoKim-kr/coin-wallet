import { createContext, useReducer } from 'react';

const coinInfo = { name: '' };

export const CoinInfoContext = createContext();
export const CoinInfoDispatchContext = createContext();

function coinReducer(state, action) {
  switch (action.type) {
    case 'NAME_UPDATE':
      return { name: action.coinInfo };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function GlobalContextProvider({ children }) {
  const [coinName, coinNameDispatch] = useReducer(coinReducer, coinInfo);

  return (
    <CoinInfoContext.Provider value={coinName}>
      <CoinInfoDispatchContext.Provider value={coinNameDispatch}>
        {children}
      </CoinInfoDispatchContext.Provider>
    </CoinInfoContext.Provider>
  );
}

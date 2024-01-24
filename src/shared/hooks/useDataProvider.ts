/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';

export const INITIAL = 'initial';
export const LOADING = 'loading';
export const SUCCESS = 'success';
export const ERROR = 'error';

type StateProps = {
  isRefresh: boolean;
  statusData: 'initial' | 'loading' | 'success' | 'error';
  data?: any;
  error?: Error | string;
};

type ActionProps = {
  type: string;
  payload: Partial<StateProps>;
};

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  switch (action.type) {
    case INITIAL: return {
      ...state,
      statusData: INITIAL,
      isRefresh: false,
    };
    case LOADING: return {
      ...state,
      statusData: LOADING,
      isRefresh: true,
    };
    case SUCCESS: return {
      ...state,
      statusData: SUCCESS,
      isRefresh: false,
      data: action.payload.data,
    };
    case ERROR: return {
      ...state,
      statusData: ERROR,
      isRefresh: true,
      error: action.payload.error,
    };
    default: return state;
  }
};

export const useDataProvider = (startInLoading: boolean = true) => {
  const initialState: StateProps = {
    statusData: startInLoading ? LOADING : INITIAL,
    isRefresh: startInLoading,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    loading: () => dispatch({
      type: LOADING,
      payload: { },
    }),
    success: (data?: any) => dispatch({
      type: SUCCESS,
      payload: { data },
    }),
    catch: (error: Error) => dispatch({
      type: ERROR,
      payload: { error },
    })
  };
};

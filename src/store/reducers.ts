import *  as fromActions from './actions';

export const initialState = {
  loaded: false,
  loading: false,
  data: [
    {label: 'Eat Pizza', complete: false}
  ]
};

export function reducer(state = initialState, action: { type: string; payload: any }) {

  switch (action.type) {
    case fromActions.ADD_TODO: {
      const todo = action.payload;

      // create the new todo or data array
      const data = [...state.data, todo];
      // merge new array back in the entire state object
      return {
        ...state,
        data: data
      }
    }

    case fromActions.REMOVE_TODO: {
      const data = state.data.filter(todo => todo.label != action.payload.label);
      return {
        ...state,
        data: data
      }
    }
  }

  return state;
}

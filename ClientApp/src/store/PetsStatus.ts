import { Action, Reducer } from "redux";
import { AppThunkAction } from "./";

export interface PetsStatusState {
  isLoading: boolean;
  startDateIndex?: number;
  statusList: PetsStatus[];
}

export interface PetsStatus {
  date: string;
  animalKind: string;
  name: string;
  temperature: number;
}

interface RequestPetsStatusAction {
  type: "REQUEST_PETS_STATUS";
  startDateIndex: number;
}

interface ReceivedPetsStatusAction {
  type: "RECEIVE_PETS_STATUS";
  startDateIndex: number;
  statusList: PetsStatus[];
}

type KnownAction = RequestPetsStatusAction | ReceivedPetsStatusAction;

export const actionCreators = {
  requestPetsStatus:
    (startDateIndex: number): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const appState = getState();
      if (
        appState &&
        appState.petsStatus &&
        startDateIndex !== appState.petsStatus.startDateIndex
      )
        fetch(`petsstatus`)
          .then((response) => response.json() as Promise<PetsStatus[]>)
          .then((data) => {
            dispatch({
              type: "RECEIVE_PETS_STATUS",
              startDateIndex: startDateIndex,
              statusList: data,
            });
          });

      dispatch({ type: "REQUEST_PETS_STATUS", startDateIndex: startDateIndex });
    },
};

const unloadedState: PetsStatusState = { statusList: [], isLoading: false };

export const reducer: Reducer<PetsStatusState> = (
  state: PetsStatusState | undefined,
  incomingAction: Action,
): PetsStatusState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_PETS_STATUS":
      return {
        startDateIndex: action.startDateIndex,
        statusList: state.statusList,
        isLoading: true,
      };
    case "RECEIVE_PETS_STATUS":
      if (action.startDateIndex === state.startDateIndex) {
        return {
          startDateIndex: action.startDateIndex,
          statusList: action.statusList,
          isLoading: false,
        };
      }
      break;
  }

  return state;
};

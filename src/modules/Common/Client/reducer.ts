import { IsPC } from "../../../utils/isPc";

interface State {
  isPc: boolean;
}

const initState: State = {
  isPc: IsPC(),
};

export const clientReducer = (state = initState): State => {
  return state;
};

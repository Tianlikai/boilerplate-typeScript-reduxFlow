export interface TypedAction {
  type: string;
}

export interface Fpa<Payload> extends TypedAction {
  payload: Payload;
}

export const FapFactory = <T>(type: string) => {
  return {
    create: (payload: T): Fpa<T> => ({ type, payload }),
    match: (action: TypedAction): action is Fpa<T> => action.type === type,
  };
};

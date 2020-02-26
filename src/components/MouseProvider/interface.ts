export interface MouseProviderState {
  x: number;
  y: number;
}

export interface MouseProviderProps {
  render: (state: MouseProviderState) => React.ReactNode;
}

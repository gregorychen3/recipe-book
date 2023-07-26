export interface Action {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

export interface SelectAction<T> {
  title: string;
  icon: JSX.Element;
  onClick: (selected: T[]) => void;
}

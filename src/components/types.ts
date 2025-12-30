export type Metric = {
  name: string;
  sum: number;
};

export type FormProps = {
  metrics: Metric[];
};

export type SigninState = {
  error: string | null;
};

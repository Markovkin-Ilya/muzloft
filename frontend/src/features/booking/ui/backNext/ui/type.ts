export type TBackNextUIProps = {
  price: number;
  nextText: string;
  backText: string;
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
};

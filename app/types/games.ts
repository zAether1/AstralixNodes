export interface GamePlan {
  name: string;
  price: string;
  ram: string;
  cpu: string;
  storage: string;
  slots: string | 'Ilimitados';
  pid: string;
  popular?: boolean;
}

export interface GameFeature {
  icon: string;
  title: string;
  desc: string;
}

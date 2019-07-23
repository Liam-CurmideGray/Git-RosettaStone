export interface StarwarsModule<T> {
  name: string;
  value: T;
}

export interface StarshipValue {
  name: string;
  pilotUrls: string[];
}

export interface PilotValue {
  name: string;
  height: number;
}

export interface ShipAnswer {
  type: string;
  name: string;
  message: string;
  choices: StarwarsModule<StarshipValue>[];
}

export interface StarshipAnswer {
  starship: StarshipValue;
}

export interface PilotAnswer {
  pilot: PilotValue;
}

export interface ShipModule<T> {
  name: string;
  value: T
}

export interface Value {
  name: string;
  url: string[];
}

export interface PilotAnswerValue {
    name: string;
    height: number;
}

export interface ShipAnswers {
    type: string;
    name: string;
    message: string;
    choices: ShipModule<Value>[];
  };

  export interface StarshipAnswer {
    Starship: Value;
  }

  export interface PilotAnswer {
    Pilot: PilotAnswerValue;
  }

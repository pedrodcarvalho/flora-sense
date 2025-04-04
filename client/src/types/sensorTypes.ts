interface Sensor {
  temperature: number;
  moisture: number;
  light: number;
  timestamp: string;
}

interface SensorState {
  data: Sensor[];
  loading: boolean;
  error: string | null;
}

export type { Sensor, SensorState };

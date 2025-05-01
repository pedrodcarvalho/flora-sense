import { SensorMode } from '../hooks/useSensorData';

interface Props {
  title: string;
  dataKey: string;
  data: any[];
  color: string;
  loading: boolean;
}

interface ModeToggleProps {
  mode: SensorMode;
  setMode: (m: SensorMode) => void;
}

export type { Props, ModeToggleProps };

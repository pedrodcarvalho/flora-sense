import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = 'http://localhost:5000';
const API_URL = 'http://localhost:5000/api/sensors';
const MAX_DOCUMENTS = 15;

export type SensorMode = 'websocket' | 'api';

export const useSensorData = (mode: SensorMode) => {
  const [data, setData] = useState<any[]>([]);
  const [propsKeys, setPropsKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let socket: Socket | null = null;
    let interval: NodeJS.Timeout;

    const process = (arr: any[]) => {
      const formatted = arr.slice(-MAX_DOCUMENTS).map((item) => {
        const copy = { ...item };
        Object.keys(copy).forEach((k) => {
          if (
            !['timestamp', '_id', '__v'].includes(k) &&
            typeof copy[k] === 'number'
          ) {
            copy[k] = Number(copy[k].toFixed(2));
          }
        });
        copy.timestamp = new Date(item.timestamp).toLocaleString('pt-BR', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        return copy;
      });
      setData(formatted);
      setLoading(false);
      if (formatted.length && propsKeys.length === 0) {
        setPropsKeys(
          Object.keys(formatted[0]).filter(
            (k) => !['timestamp', '_id', '__v'].includes(k)
          )
        );
      }
      setLoading(false);
      return formatted;
    };

    if (mode === 'websocket') {
      socket = io(SOCKET_URL);
      socket.on('sensorData', (newSensor) => {
        setData((prev) => {
          const updated = [...prev, newSensor].slice(-MAX_DOCUMENTS);
          const processedData = process(updated);
          return processedData;
        });
      });
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(API_URL);
          const processedData = process(res.data || []);
          setData(processedData);
        } catch {}
      };
      fetchData();
      interval = setInterval(fetchData, 60_000);
    }

    return () => {
      socket?.disconnect();
      clearInterval(interval);
    };
  }, [mode]);

  return { data, propsKeys, loading };
};

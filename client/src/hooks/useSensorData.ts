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

      // Process numeric values
      Object.keys(copy).forEach((k) => {
        if (
          !['timestamp', '_id', '__v'].includes(k) &&
          typeof copy[k] === 'number'
        ) {
          copy[k] = Number(copy[k].toFixed(2));
        }
      });

      // Handle timestamp formatting
      let timestamp;
      if (item.timestamp) {
        // Try to parse existing timestamp
        timestamp = new Date(item.timestamp);
      } else {
        // Use current time for WebSocket data without timestamp
        timestamp = new Date();
      }

      // Check if timestamp is valid
      if (!isNaN(timestamp.getTime())) {
        copy.timestamp = timestamp.toLocaleString('pt-BR', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      } else {
        // Fallback for invalid timestamps
        copy.timestamp = new Date().toLocaleString('pt-BR', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      }

      return copy;
    });

    setData(formatted);
    setLoading(false);

    // Set property keys only once
    if (formatted.length && propsKeys.length === 0) {
      setPropsKeys(
        Object.keys(formatted[0]).filter(
          (k) => !['timestamp', '_id', '__v'].includes(k)
        )
      );
    }

    return formatted;
  };

    if (mode === 'websocket') {
      socket = io(SOCKET_URL);
      socket.on('sensorData', (newSensor) => {
        setData((prev) => {
          // Ensure the new sensor data has a timestamp
          const sensorWithTimestamp = {
            ...newSensor,
            timestamp: newSensor.timestamp || new Date().toISOString()
          };
          const updated = [...prev, sensorWithTimestamp].slice(-MAX_DOCUMENTS);
          return process(updated);
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

declare module 'paramall-wheel-of-fortune' {
  import React from 'react';

  interface WheelData {
    option: string;
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  }

  interface WheelProps {
    mustStartSpinning: boolean;
    prizeNumber: number;
    data: WheelData[];
    onStopSpinning: () => void;
  }

  export const Wheel: React.FC<WheelProps>;
}

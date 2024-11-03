import React from 'react';
import { Clock } from 'lucide-react';

interface GroupTimerProps {
  expiresAt: number;
}

export function GroupTimer({ expiresAt }: GroupTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    function updateTimer() {
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="bg-red-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-600">
          <Clock size={20} />
          <span className="font-medium">Time Remaining</span>
        </div>
        <span className="text-xl font-bold text-red-600">{timeLeft}</span>
      </div>
    </div>
  );
}
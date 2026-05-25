'use client';
import { useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function AvailabilityPage() {
  const [selected, setSelected] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [availabilities, setAvailabilities] = useState<Record<string, boolean>>({});
  const lastFetchedMonth = useRef<string | null>(null);

  const fetchAvailabilities = async (date: Date) => {
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    if (lastFetchedMonth.current === monthKey) return; // Prevent duplicate fetches
    
    setLoading(true);
    lastFetchedMonth.current = monthKey;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate some random availabilities for the displayed month
    const newAvails: Record<string, boolean> = {};
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Randomly mark days as available or not
    for (let i = 1; i <= 31; i++) {
      const d = new Date(year, month, i);
      if (d.getMonth() === month) {
        // 70% chance to be available
        newAvails[d.toDateString()] = Math.random() > 0.3;
      }
    }
    
    setAvailabilities(prev => ({ ...prev, ...newAvails }));
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch for current month
    fetchAvailabilities(new Date());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Availability Demo</h1>
      <p className="mb-4 text-gray-600">
        Simulates fetching availability from an API when the month changes.
        Available dates are highlighted green, while unavailable dates are crossed out and cannot be selected.
      </p>
      
      <div className="relative inline-block">
        <Calendar 
          selected={selected} 
          onChange={(val) => setSelected(val as Date)} 
          onMonthChange={(date) => fetchAvailabilities(date)}
          modifiers={{
            // Add custom modifiers to target specific dates
            available: (date) => availabilities[date.toDateString()] === true,
            unavailable: (date) => availabilities[date.toDateString()] === false,
          }}
          disabledDates={
            // Convert unavailable keys back to Dates to fully disable selection logic
            Object.keys(availabilities)
              .filter(key => !availabilities[key])
              .map(key => new Date(key))
          }
          classNames={{
            day: {
              // Tie the custom modifiers to Tailwind classes
              available: "bg-green-100 text-green-800 hover:bg-green-200",
              unavailable: "bg-red-50 text-red-300 line-through cursor-not-allowed",
            }
          }}
        />
        
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg backdrop-blur-[1px] z-10 transition-all">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
          </div>
        )}
      </div>
      <p className="mt-4">Selected: {selected ? selected.toDateString() : 'None'}</p>
    </div>
  );
}

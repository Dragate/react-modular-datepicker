'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function BasicPage() {
  const [selected, setSelected] = useState(new Date());
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Basic Selection</h1>
      <Calendar selected={selected} onChange={setSelected} />
      <p className="mt-4">Selected: {selected?.toDateString()}</p>
    </div>
  );
}

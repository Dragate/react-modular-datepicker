'use client';
import { useState } from 'react';
import { Calendar } from 'react-modular-datepicker';

export default function MinMaxDisabledPage() {
  const [selected, setSelected] = useState<Date | null>(new Date());
  
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 5);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);

  const disabledDate1 = new Date();
  disabledDate1.setDate(disabledDate1.getDate() + 2);
  
  const disabledDate2 = new Date();
  disabledDate2.setDate(disabledDate2.getDate() + 5);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Min, Max & Disabled Dates</h1>
      <p className="mb-4 text-gray-600">
        Dates before 5 days ago and after 15 days from now are disabled.<br />
        Additionally, {disabledDate1.toDateString()} and {disabledDate2.toDateString()} are disabled.
      </p>
      <Calendar 
        selected={selected} 
        onChange={(val) => setSelected(val as Date)} 
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={[disabledDate1, disabledDate2]}
      />
      <p className="mt-4">Selected: {selected?.toDateString()}</p>
    </div>
  );
}

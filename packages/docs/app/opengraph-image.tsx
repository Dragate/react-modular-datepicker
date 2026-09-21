import { ImageResponse } from 'next/og';

export const alt = 'React Modular Datepicker - Modular, Lightweight & Type-Safe Datepicker for React';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface CalendarDayItem {
  num: string;
  outside?: boolean;
  selectedStart?: boolean;
  selectedMid?: boolean;
  selectedEnd?: boolean;
}

export default async function Image() {
  const daysHeader = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const week1: CalendarDayItem[] = [
    { num: '28', outside: true },
    { num: '29', outside: true },
    { num: '30', outside: true },
    { num: '1', outside: false },
    { num: '2', outside: false },
    { num: '3', outside: false },
    { num: '4', outside: false },
  ];

  const week2: CalendarDayItem[] = [
    { num: '5', outside: false },
    { num: '6', outside: false },
    { num: '7', outside: false },
    { num: '8', outside: false },
    { num: '9', outside: false },
    { num: '10', outside: false },
    { num: '11', outside: false },
  ];

  const week3: CalendarDayItem[] = [
    { num: '12', selectedStart: true },
    { num: '13', selectedMid: true },
    { num: '14', selectedMid: true },
    { num: '15', selectedMid: true },
    { num: '16', selectedMid: true },
    { num: '17', selectedMid: true },
    { num: '18', selectedEnd: true },
  ];

  const week4: CalendarDayItem[] = [
    { num: '19', outside: false },
    { num: '20', outside: false },
    { num: '21', outside: false },
    { num: '22', outside: false },
    { num: '23', outside: false },
    { num: '24', outside: false },
    { num: '25', outside: false },
  ];

  const weeks = [week1, week2, week3, week4];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0a0d14',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(197, 160, 89, 0.22) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(197, 160, 89, 0.15) 0%, transparent 40%)',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#f3f4f6',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Column: Branding & Information */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '560px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#d8b467',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '28px',
            }}
          >
            <span style={{ marginRight: '8px' }}>📅</span>
            <span>react-modular-datepicker</span>
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 20px 0',
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            React Modular <span style={{ color: '#c5a059' }}>Datepicker</span>
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#9ca3af',
              margin: '0 0 32px 0',
              lineHeight: 1.5,
            }}
          >
            Modular, lightweight, accessible, and type-safe datepicker for React. Compatible with Tailwind CSS, CSS variables, & custom CSS.
          </p>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {['🏗️ Headless Hook', '🎨 CSS & Tailwind Ready', '🛡️ Type-Safe', '⚡ Pluggable Adapters'].map((tag, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#161d2a',
                  border: '1px solid #2a3447',
                  color: '#e5e7eb',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  marginRight: '12px',
                  marginBottom: '12px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Calendar Preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '420px',
            backgroundColor: '#111827',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '14px',
              borderBottom: '1px solid #1f2937',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#1f2937',
                color: '#9ca3af',
                fontSize: '16px',
              }}
            >
              ‹
            </div>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb' }}>
              October 2025
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#1f2937',
                color: '#9ca3af',
                fontSize: '16px',
              }}
            >
              ›
            </div>
          </div>

          {/* Weekday Labels (Flexbox row instead of Grid) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            {daysHeader.map((day, i) => (
              <div
                key={i}
                style={{
                  width: '48px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#6b7280',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks (Flexbox rows instead of Grid) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {weeks.map((week, wIdx) => (
              <div
                key={wIdx}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                {week.map((item, dIdx) => {
                  let bgColor = 'transparent';
                  let textColor = '#d1d5db';
                  let borderRadius = '8px';
                  let fontWeight: number | string = 400;

                  if (item.outside) {
                    textColor = '#374151';
                  } else if (item.selectedStart) {
                    bgColor = '#c5a059';
                    textColor = '#ffffff';
                    borderRadius = '10px 0 0 10px';
                    fontWeight = 700;
                  } else if (item.selectedEnd) {
                    bgColor = '#c5a059';
                    textColor = '#ffffff';
                    borderRadius = '0 10px 10px 0';
                    fontWeight = 700;
                  } else if (item.selectedMid) {
                    bgColor = 'rgba(197, 160, 89, 0.25)';
                    textColor = '#f3f4f6';
                    borderRadius = '0px';
                    fontWeight = 600;
                  }

                  return (
                    <div
                      key={dIdx}
                      style={{
                        width: '48px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: bgColor,
                        color: textColor,
                        borderRadius: borderRadius,
                        fontWeight: fontWeight,
                        fontSize: '15px',
                      }}
                    >
                      {item.num}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

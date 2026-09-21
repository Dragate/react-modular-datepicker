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
  selected?: boolean;
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
    { num: '12', outside: false },
    { num: '13', outside: false },
    { num: '14', outside: false },
    { num: '15', selected: true },
    { num: '16', outside: false },
    { num: '17', outside: false },
    { num: '18', outside: false },
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

  const week5: CalendarDayItem[] = [
    { num: '26', outside: false },
    { num: '27', outside: false },
    { num: '28', outside: false },
    { num: '29', outside: false },
    { num: '30', outside: false },
    { num: '31', outside: false },
    { num: '1', outside: true },
  ];

  const weeks = [week1, week2, week3, week4, week5];

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
          {/* Logo Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#d8b467',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '28px',
            }}
          >
            {/* Embedded Logo SVG */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 200 200"
              style={{ marginRight: '10px' }}
            >
              <rect x="25" y="25" width="150" height="150" rx="30" fill="none" stroke="#C5A059" strokeWidth="12" />
              <line x1="25" y1="68" x2="175" y2="68" stroke="#C5A059" strokeWidth="8" opacity="0.85" />
              <rect x="48" y="86" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="86" y="86" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="124" y="86" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="48" y="124" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="86" y="124" width="28" height="28" rx="8" fill="#C5A059" />
              <rect x="124" y="124" width="28" height="28" rx="8" fill="#C5A059" />
            </svg>
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
            Modular, lightweight, accessible, and type-safe datepicker for React with customizable styling.
          </p>

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {['🏗️ Headless Hook', '🛡️ Type-Safe', '⚡ Pluggable Adapters'].map((tag, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#161d2a',
                  border: '1px solid #2a3447',
                  color: '#e5e7eb',
                  padding: '8px 16px',
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

        {/* Right Column: Visual Calendar Preview matching Basic Demo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '380px',
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(197, 160, 89, 0.1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
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
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#f9fafb' }}>
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

          {/* Weekday Labels */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            {daysHeader.map((day, i) => (
              <div
                key={i}
                style={{
                  width: '42px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#6b7280',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks Grid */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {weeks.map((week, wIdx) => (
              <div
                key={wIdx}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}
              >
                {week.map((item, dIdx) => {
                  let bgColor = 'transparent';
                  let textColor = '#e5e7eb';
                  let borderRadius = '8px';
                  let fontWeight: number | string = 500;

                  if (item.outside) {
                    textColor = '#374151';
                  } else if (item.selected) {
                    bgColor = '#c5a059';
                    textColor = '#000000';
                    borderRadius = '9999px';
                    fontWeight = 700;
                  }

                  return (
                    <div
                      key={dIdx}
                      style={{
                        width: '42px',
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

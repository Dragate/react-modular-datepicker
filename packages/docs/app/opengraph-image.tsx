import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { ImageResponse } from 'next/og';

dayjs.extend(localeData)

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
  const daysHeader = dayjs().localeData().weekdaysShort();

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
          padding: '50px 60px',
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
            maxWidth: '630px',
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
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '24px',
              maxWidth: '330px',
            }}
          >
            {/* Embedded Logo SVG */}
            <svg
              width="24"
              height="24"
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
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 18px 0',
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            React Modular <span style={{ color: '#c5a059' }}>Datepicker</span>
          </h1>

          <p
            style={{
              fontSize: '24px',
              color: '#9ca3af',
              margin: '0 0 28px 0',
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
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontSize: '18px',
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

        {/* Right Column: Visual Calendar Preview matching Live Preview Single Date Selection */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Calendar Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '360px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              padding: '18px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                borderBottom: '2px solid rgba(181, 190, 198, 0.4)',
                marginBottom: '10px',
              }}
            >
              {/* Back Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '9999px',
                  color: '#343a40',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#343a40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </div>

              {/* Month/Year Title */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 600, color: '#343a40' }}>
                  October
                </span>
                <span style={{ fontSize: '18px', fontWeight: 600, color: '#343a40' }}>
                  2025
                </span>
              </div>

              {/* Forward Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '9999px',
                  color: '#343a40',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#343a40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>

            {/* Weekdays Row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '8px',
                paddingBottom: '6px',
                borderBottom: '1px solid rgba(181, 190, 198, 0.4)',
              }}
            >
              {daysHeader.map((day, i) => (
                <div
                  key={i}
                  style={{
                    width: '44px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#9ca3af',
                    textTransform: "uppercase",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid with 1px border gap look */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(181, 190, 198, 0.25)',
              }}
            >
              {weeks.map((week, wIdx, arr) => (
                <div
                  key={wIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '1px',
                    marginBottom: wIdx === arr.length - 1 ? '0px' : '1px',
                  }}
                >
                  {week.map((item, dIdx) => {
                    let bgColor = '#ffffff';
                    let textColor = '#343a40';
                    let borderRadius = '0px';
                    let fontWeight: number | string = 500;

                    if (item.outside) {
                      textColor = '#ffffff';
                    } else if (item.selected) {
                      bgColor = '#c5a059';
                      textColor = '#ffffff';
                      borderRadius = '9999px';
                      fontWeight = 700;
                    }

                    return (
                      <div
                        key={dIdx}
                        style={{
                          width: '44px',
                          height: '44px',
                          display: 'flex',
                          flex: "1",
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: bgColor,
                          color: textColor,
                          borderRadius: borderRadius,
                          fontWeight: fontWeight,
                          fontSize: '16px',
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
      </div>
    ),
    {
      ...size,
    }
  );
}

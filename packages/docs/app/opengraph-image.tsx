import { ImageResponse } from 'next/og';

export const alt = 'React Modular Datepicker';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(197, 160, 89, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(197, 160, 89, 0.1) 0%, transparent 40%)',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#f3f4f6',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Section: Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '560px',
            gap: '20px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: '10px',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              padding: '8px 16px',
              borderRadius: '9999px',
            }}
          >
            {/* Calendar Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="25" y="25" width="150" height="150" rx="30" stroke="#C5A059" strokeWidth="12" />
              <line x1="25" y1="68" x2="175" y2="68" stroke="#C5A059" strokeWidth="8" opacity="0.85" />
              <rect x="48" y="86" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="86" y="86" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="124" y="86" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="48" y="124" width="28" height="28" rx="8" fill="#C5A059" opacity="0.2" />
              <rect x="86" y="124" width="28" height="28" rx="8" fill="#C5A059" />
              <rect x="124" y="124" width="28" height="28" rx="8" fill="#C5A059" />
            </svg>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#D8B775',
                letterSpacing: '0.5px',
              }}
            >
              react-modular-datepicker v0.0.5
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1px',
              color: '#ffffff',
            }}
          >
            Modular, Lightweight &amp; Type-Safe Datepicker
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '20px',
              lineHeight: 1.5,
              color: '#9ca3af',
            }}
          >
            Build date range pickers, single selection calendars, or headless custom layouts for React. Powered by Tailwind CSS and pluggable date adapters.
          </div>

          {/* Feature Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '10px',
            }}
          >
            <span
              style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#e5e7eb',
              }}
            >
              ⚡ Headless Hook
            </span>
            <span
              style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#e5e7eb',
              }}
            >
              🎨 Tailwind CSS v4
            </span>
            <span
              style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#e5e7eb',
              }}
            >
              🪶 Pluggable Adapters
            </span>
            <span
              style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#e5e7eb',
              }}
            >
              🌍 RTL &amp; Locales
            </span>
          </div>
        </div>

        {/* Right Section: Calendar Card Preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '420px',
            backgroundColor: '#111827',
            border: '2px solid rgba(197, 160, 89, 0.4)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(197, 160, 89, 0.15)',
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #1f2937',
              paddingBottom: '12px',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#f9fafb' }}>
              September 2026
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#9ca3af',
                }}
              >
                ‹
              </div>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#9ca3af',
                }}
              >
                ›
              </div>
            </div>
          </div>

          {/* Weekday Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div
                key={d}
                style={{
                  width: '40px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#6b7280',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid - Flex Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              [null, null, 1, 2, 3, 4, 5],
              [6, 7, 8, 9, 10, 11, 12],
              [13, 14, 15, 16, 17, 18, 19],
              [20, 21, 22, 23, 24, 25, 26],
              [27, 28, 29, 30, null, null, null],
            ].map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                {row.map((day, cIdx) => {
                  if (day === null) {
                    return <div key={cIdx} style={{ width: '40px', height: '40px' }} />;
                  }

                  const isSelected = day === 15;
                  const isRange = day >= 10 && day <= 14;

                  return (
                    <div
                      key={cIdx}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: isSelected ? '10px' : '8px',
                        backgroundColor: isSelected
                          ? '#C5A059'
                          : isRange
                          ? 'rgba(197, 160, 89, 0.2)'
                          : '#1f2937',
                        border: isSelected
                          ? 'none'
                          : isRange
                          ? '1px solid rgba(197, 160, 89, 0.4)'
                          : '1px solid transparent',
                        color: isSelected ? '#ffffff' : isRange ? '#D8B775' : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: isSelected || isRange ? 700 : 500,
                      }}
                    >
                      {day}
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

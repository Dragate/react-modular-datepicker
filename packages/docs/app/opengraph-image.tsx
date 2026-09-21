import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'React Modular Datepicker - Modular, Lightweight & Type-Safe Datepicker for React';
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
          backgroundColor: '#0a0d14',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(197, 160, 89, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(197, 160, 89, 0.12) 0%, transparent 40%)',
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
              gap: '10px',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              color: '#d8b467',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '28px',
              width: 'fit-content',
            }}
          >
            <span>📅</span>
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
            Modular, lightweight, accessible, and type-safe datepicker for React. Powered by Tailwind CSS & pluggable date adapters.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['🏗️ Headless Hook', '🎨 Tailwind CSS', '🛡️ Type-Safe', '⚡ Pluggable Adapters'].map((tag, idx) => (
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
            border: '1px solid rgba(197, 160, 89, 0.3)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(197, 160, 89, 0.15)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
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

          {/* Weekday Labels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
              <div
                key={i}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#6b7280',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
            }}
          >
            {/* Week 1 */}
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', fontSize: '15px' }}>28</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', fontSize: '15px' }}>29</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', fontSize: '15px' }}>30</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>1</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>2</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>3</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>4</div>

            {/* Week 2 */}
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>5</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>6</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>7</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>8</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>9</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>10</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>11</div>

            {/* Range Selection Highlight (12 to 18) */}
            <div
              style={{
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#c5a059',
                color: '#ffffff',
                borderRadius: '10px 0 0 10px',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              12
            </div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#f3f4f6', fontWeight: 600, fontSize: '15px' }}>13</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#f3f4f6', fontWeight: 600, fontSize: '15px' }}>14</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#f3f4f6', fontWeight: 600, fontSize: '15px' }}>15</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#f3f4f6', fontWeight: 600, fontSize: '15px' }}>16</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(197, 160, 89, 0.25)', color: '#f3f4f6', fontWeight: 600, fontSize: '15px' }}>17</div>
            <div
              style={{
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#c5a059',
                color: '#ffffff',
                borderRadius: '0 10px 10px 0',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              18
            </div>

            {/* Week 4 */}
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>19</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>20</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>21</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>22</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>23</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>24</div>
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '15px' }}>25</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

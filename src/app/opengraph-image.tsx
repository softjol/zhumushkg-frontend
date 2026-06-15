import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Жумуш.kg — работа в Кыргызстане'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 50%, rgba(160,131,247,0.18) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: 'white',
              letterSpacing: -4,
              display: 'flex',
            }}
          >
            Жумуш
            <span style={{ color: '#A083F7' }}>.kg</span>
          </div>
          <div
            style={{
              width: 80,
              height: 5,
              background: '#A083F7',
              borderRadius: 3,
            }}
          />
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: 1,
            }}
          >
            Работа и вакансии в Кыргызстане
          </div>
        </div>
      </div>
    ),
    size
  )
}

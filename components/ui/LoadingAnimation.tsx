import { css, keyframes } from '@emotion/react'

interface LoadingAnimationProps {
  message?: string
  subtitle?: string
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
`

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  message = 'Creating something amazing...',
  subtitle = 'The AI is analyzing your request and generating the perfect response'
}) => {
  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      padding: 40px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 12px;
      border: 1px solid #E5E7EB;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    `}>
      {/* Animated Circles */}
      <div css={css`
        position: relative;
        width: 200px;
        height: 200px;
        margin-bottom: 40px;
      `}>
        {/* Outer rings */}
        <div css={css`
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.1);
        `} />
        <div css={css`
          position: absolute;
          inset: 15px;
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.15);
        `} />
        <div css={css`
          position: absolute;
          inset: 30px;
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.2);
        `} />

        {/* Rotating container */}
        <div css={css`
          position: absolute;
          inset: 0;
          animation: ${rotate} 3s linear infinite;
        `}>
          {/* Center large circle */}
          <div css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #C084FC 0%, #A855F7 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 8px 24px rgba(168, 85, 247, 0.3);
          `}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill="white"/>
              <path d="M19 15L20 18L23 19L20 20L19 23L18 20L15 19L18 18L19 15Z" fill="white"/>
            </svg>
          </div>

          {/* Orbiting small circles */}
          <div css={css`
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FCA5A5 0%, #F87171 100%);
            box-shadow: 0px 4px 12px rgba(248, 113, 113, 0.3);
            animation: ${pulse} 2s ease-in-out infinite;
          `} />

          <div css={css`
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #F9A8D4 0%, #EC4899 100%);
            box-shadow: 0px 4px 12px rgba(236, 72, 153, 0.3);
            animation: ${pulse} 2s ease-in-out infinite 0.3s;
          `} />

          <div css={css`
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #93C5FD 0%, #60A5FA 100%);
            box-shadow: 0px 4px 12px rgba(96, 165, 250, 0.3);
            animation: ${pulse} 2s ease-in-out infinite 0.6s;
          `} />
        </div>
      </div>

      {/* Text */}
      <h3 css={css`
        font-family: 'Figtree', sans-serif;
        font-weight: 600;
        font-size: 20px;
        color: #212327;
        margin: 0 0 12px 0;
      `}>
        {message}
      </h3>

      <p css={css`
        font-family: 'Figtree', sans-serif;
        font-size: 14px;
        color: #6B7280;
        margin: 0;
        max-width: 400px;
        line-height: 1.6;
      `}>
        {subtitle}
      </p>
    </div>
  )
}

export default LoadingAnimation

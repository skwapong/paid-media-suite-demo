import { css } from '@emotion/react'
import { useState, useRef, useEffect } from 'react'
import { exportConversation, type ExportMessage } from '../../utils/chatExport'

interface ExportMenuProps {
  messages: ExportMessage[]
  disabled?: boolean
}

const ExportMenu: React.FC<ExportMenuProps> = ({ messages, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleExport = (format: 'txt' | 'md' | 'json' | 'html') => {
    exportConversation(messages, format, {
      includeTimestamps: true,
      includeActivities: true
    })
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} css={css`
      position: relative;
    `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || messages.length === 0}
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: white;
          border: 1px solid #DCE1EA;
          border-radius: 8px;
          color: #212327;
          font-family: 'Figtree', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: ${disabled || messages.length === 0 ? 'not-allowed' : 'pointer'};
          opacity: ${disabled || messages.length === 0 ? '0.5' : '1'};
          transition: all 0.2s;

          &:hover:not(:disabled) {
            background-color: #F9FBFF;
            border-color: #6F2EFF;
            color: #6F2EFF;
          }

          svg {
            width: 16px;
            height: 16px;
          }
        `}
      >
        <ExportIcon />
        Export
      </button>

      {isOpen && (
        <div css={css`
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background-color: white;
          border: 1px solid #DCE1EA;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          padding: 16px;
          min-width: 320px;
          z-index: 1000;
          animation: slideDown 0.2s ease-out;

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}>
          <div css={css`
            font-family: 'Figtree', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
          `}>
            Export Format
          </div>
          <div css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}>
            <ExportOption
              icon={<MarkdownIcon />}
              label="Markdown"
              extension=".md"
              description="Perfect for documentation and notes"
              benefits="Preserves formatting, easy to edit"
              color="#6F2EFF"
              gradient="linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)"
              onClick={() => handleExport('md')}
            />
            <ExportOption
              icon={<TextIcon />}
              label="Plain Text"
              extension=".txt"
              description="Simple and universally compatible"
              benefits="Smallest file size, works anywhere"
              color="#10B981"
              gradient="linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)"
              onClick={() => handleExport('txt')}
            />
            <ExportOption
              icon={<HtmlIcon />}
              label="HTML"
              extension=".html"
              description="View in any web browser"
              benefits="Rich formatting, shareable links"
              color="#F59E0B"
              gradient="linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)"
              onClick={() => handleExport('html')}
            />
            <ExportOption
              icon={<JsonIcon />}
              label="JSON"
              extension=".json"
              description="Structured data for developers"
              benefits="Machine-readable, includes metadata"
              color="#3B82F6"
              gradient="linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)"
              onClick={() => handleExport('json')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface ExportOptionProps {
  icon: React.ReactNode
  label: string
  extension: string
  description: string
  benefits: string
  color: string
  gradient: string
  onClick: () => void
}

const ExportOption: React.FC<ExportOptionProps> = ({
  icon,
  label,
  extension,
  description,
  benefits,
  color,
  gradient,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      css={css`
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px;
        background: ${gradient};
        border: 1px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        width: 100%;
        position: relative;
        overflow: hidden;

        &:hover {
          border-color: ${color};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px ${color}33;
        }

        &:active {
          transform: translateY(0);
        }
      `}
    >
      {/* Icon container */}
      <div css={css`
        min-width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
      `}>
        <div css={css`
          color: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
        `}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div css={css`
        flex: 1;
        min-width: 0;
      `}>
        <div css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 4px;
        `}>
          <div css={css`
            font-family: 'Figtree', sans-serif;
            font-size: 15px;
            font-weight: 600;
            color: #111827;
          `}>
            {label}
          </div>
          <div css={css`
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 11px;
            font-weight: 500;
            color: ${color};
            opacity: 0.8;
          `}>
            {extension}
          </div>
        </div>
        <div css={css`
          font-family: 'Figtree', sans-serif;
          font-size: 13px;
          color: #374151;
          margin-bottom: 6px;
          line-height: 1.4;
        `}>
          {description}
        </div>
        <div css={css`
          display: flex;
          align-items: center;
          gap: 6px;
        `}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6L5 9L10 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div css={css`
            font-family: 'Figtree', sans-serif;
            font-size: 11px;
            color: #6B7280;
            line-height: 1.3;
          `}>
            {benefits}
          </div>
        </div>
      </div>

      {/* Download indicator */}
      <div css={css`
        position: absolute;
        top: 8px;
        right: 8px;
        opacity: 0;
        transition: opacity 0.2s ease;

        button:hover & {
          opacity: 1;
        }
      `}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </button>
  )
}

// Icon Components
const MarkdownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 15V9L9 11L11 9V15M14 12H17M17 12L15 10M17 12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7H20M4 12H14M4 17H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const HtmlIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8L4 12L8 16M16 8L20 12L16 16M13 6L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const JsonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4C6.89543 4 6 4.89543 6 6V8C6 9.10457 5.10457 10 4 10M4 10C5.10457 10 6 10.8954 6 12V14C6 15.1046 6.89543 16 8 16M4 10C5.10457 10 6 10.8954 6 12M16 4C17.1046 4 18 4.89543 18 6V8C18 9.10457 18.8954 10 20 10M20 10C18.8954 10 18 10.8954 18 12V14C18 15.1046 17.1046 16 16 16M20 10C18.8954 10 18 10.8954 18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V10M8 2L5 5M8 2L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default ExportMenu

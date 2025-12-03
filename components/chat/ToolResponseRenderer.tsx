import { css } from '@emotion/react'
import { useState } from 'react'

interface ToolResponseProps {
  toolCall: {
    id?: string
    function_name?: string
    function_arguments?: string | any
    output?: any
    status?: string
  }
  success?: boolean
}

const ToolResponseRenderer: React.FC<ToolResponseProps> = ({ toolCall, success = true }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  // Determine if this tool call was successful
  const isSuccess = success && toolCall.status !== 'ERROR' && toolCall.status !== 'FAILED'

  // Check if this is an output tool or internal tool
  const isOutputTool = !!toolCall.output

  // Format arguments for display
  const formatArguments = () => {
    try {
      if (typeof toolCall.function_arguments === 'string') {
        const parsed = JSON.parse(toolCall.function_arguments)
        return JSON.stringify(parsed, null, 2)
      }
      return JSON.stringify(toolCall.function_arguments, null, 2)
    } catch {
      return typeof toolCall.function_arguments === 'string'
        ? toolCall.function_arguments
        : JSON.stringify(toolCall.function_arguments, null, 2)
    }
  }

  // Parse and format output for better display
  const formatOutput = () => {
    try {
      if (typeof toolCall.output === 'string') {
        // Try to parse as JSON first
        try {
          const parsed = JSON.parse(toolCall.output)
          return { type: 'json', content: JSON.stringify(parsed, null, 2) }
        } catch {
          // If not JSON, return as text
          return { type: 'text', content: toolCall.output }
        }
      }
      return { type: 'json', content: JSON.stringify(toolCall.output, null, 2) }
    } catch {
      return {
        type: 'text',
        content: typeof toolCall.output === 'string' ? toolCall.output : JSON.stringify(toolCall.output, null, 2)
      }
    }
  }

  const output = formatOutput()

  return (
    <div css={css`
      background-color: #ffffff;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    `}>
      {/* Header with tool name and View button */}
      <div css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      `}>
        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        `}>
          <span css={css`
            font-family: 'Figtree', sans-serif;
            font-weight: 600;
            font-size: 14px;
            color: #111827;
          `}>
            {toolCall.function_name || 'Tool Call'}
          </span>
          <span css={css`
            font-family: 'Figtree', sans-serif;
            font-size: 12px;
            color: #6B7280;
          `}>
            {isSuccess ? 'Executing action' : 'Failed'}
          </span>
        </div>

        <div css={css`
          display: flex;
          align-items: center;
          gap: 8px;
        `}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            css={css`
              background: none;
              border: none;
              cursor: pointer;
              padding: 4px 8px;
              display: flex;
              align-items: center;
              gap: 4px;
              font-family: 'Figtree', sans-serif;
              font-size: 13px;
              font-weight: 500;
              color: #1957DB;
              transition: opacity 0.2s;
              &:hover {
                opacity: 0.8;
              }
            `}
          >
            View
            <span css={css`
              transition: transform 0.2s;
              transform: rotate(${isExpanded ? '90deg' : '0deg'});
              display: flex;
              align-items: center;
            `}>
              <ChevronIcon />
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div css={css`
          border-top: 1px solid #E5E7EB;
          padding-top: 16px;
          margin-top: 12px;
        `}>
          {/* Output Content */}
          {isOutputTool && output.type === 'text' && (
            <div css={css`
              font-family: 'Figtree', sans-serif;
              font-size: 13px;
              color: #374151;
              line-height: 1.6;
              margin-bottom: 16px;
              white-space: pre-wrap;
              word-wrap: break-word;
            `}>
              {output.content}
            </div>
          )}

          {/* Arguments/Inputs Section */}
          {toolCall.function_arguments && (
            <div css={css`
              margin-bottom: 16px;
            `}>
              <div css={css`
                font-family: 'Figtree', sans-serif;
                font-size: 13px;
                font-weight: 600;
                color: #111827;
                margin-bottom: 12px;
              `}>
                Inputs:
              </div>
              <pre css={css`
                font-family: 'Monaco', 'Courier New', monospace;
                font-size: 12px;
                color: #374151;
                background-color: #F9FAFB;
                border: 1px solid #E5E7EB;
                border-radius: 6px;
                padding: 12px;
                white-space: pre-wrap;
                word-wrap: break-word;
                margin: 0;
                max-height: 400px;
                overflow-y: auto;
              `}>
{formatArguments()}
              </pre>
            </div>
          )}

          {/* Response/Output Section */}
          {isOutputTool && (
            <div css={css`
              margin-bottom: 16px;
            `}>
              <div css={css`
                font-family: 'Figtree', sans-serif;
                font-size: 13px;
                font-weight: 600;
                color: #111827;
                margin-bottom: 12px;
              `}>
                {output.type === 'json' ? 'JSON Schema of parameters:' : 'Response:'}
              </div>
              <pre css={css`
                font-family: 'Monaco', 'Courier New', monospace;
                font-size: 12px;
                color: #374151;
                background-color: #F9FAFB;
                border: 1px solid #E5E7EB;
                border-radius: 6px;
                padding: 12px;
                white-space: pre-wrap;
                word-wrap: break-word;
                margin: 0;
                max-height: 600px;
                overflow-y: auto;
              `}>
{output.content}
              </pre>
            </div>
          )}

          {/* Error message for failed tools */}
          {!isSuccess && (
            <div css={css`
              padding: 12px;
              background-color: #FEE2E2;
              border: 1px solid #FCA5A5;
              border-radius: 6px;
            `}>
              <div css={css`
                font-family: 'Figtree', sans-serif;
                font-size: 13px;
                color: #991B1B;
              `}>
                ❌ Tool execution failed
                {toolCall.status && (
                  <span css={css`
                    margin-left: 8px;
                    font-size: 12px;
                    opacity: 0.8;
                  `}>
                    Status: {toolCall.status}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ToolIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2L10 3L6 7L5 6L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 9L2 10L6 6L7 7L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default ToolResponseRenderer

/**
 * Chat Export Utilities
 * Provides functionality to export chat conversations in various formats
 */

export interface ExportMessage {
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  activities?: string[]
}

export interface ExportOptions {
  includeTimestamps?: boolean
  includeActivities?: boolean
  format?: 'txt' | 'md' | 'json' | 'html'
}

/**
 * Export chat conversation as plain text
 */
export const exportAsText = (
  messages: ExportMessage[],
  options: ExportOptions = {}
): string => {
  const { includeTimestamps = true, includeActivities = false } = options

  let output = 'Chat Conversation Export\n'
  output += '='.repeat(50) + '\n\n'

  messages.forEach((msg, index) => {
    const role = msg.type === 'user' ? 'You' : 'Assistant'

    if (includeTimestamps) {
      const timestamp = msg.timestamp.toLocaleString()
      output += `[${timestamp}] ${role}:\n`
    } else {
      output += `${role}:\n`
    }

    output += msg.content + '\n'

    if (includeActivities && msg.activities && msg.activities.length > 0) {
      output += '\nActivities:\n'
      msg.activities.forEach(activity => {
        output += `  - ${activity}\n`
      })
    }

    output += '\n' + '-'.repeat(50) + '\n\n'
  })

  return output
}

/**
 * Export chat conversation as Markdown
 */
export const exportAsMarkdown = (
  messages: ExportMessage[],
  options: ExportOptions = {}
): string => {
  const { includeTimestamps = true, includeActivities = false } = options

  let output = '# Chat Conversation Export\n\n'
  output += `*Exported on ${new Date().toLocaleString()}*\n\n`
  output += '---\n\n'

  messages.forEach((msg, index) => {
    const role = msg.type === 'user' ? '🧑 **You**' : '🤖 **Assistant**'

    if (includeTimestamps) {
      const timestamp = msg.timestamp.toLocaleString()
      output += `### ${role}\n*${timestamp}*\n\n`
    } else {
      output += `### ${role}\n\n`
    }

    output += msg.content + '\n\n'

    if (includeActivities && msg.activities && msg.activities.length > 0) {
      output += '**Activities:**\n\n'
      msg.activities.forEach(activity => {
        output += `- ${activity}\n`
      })
      output += '\n'
    }

    output += '---\n\n'
  })

  return output
}

/**
 * Export chat conversation as JSON
 */
export const exportAsJSON = (
  messages: ExportMessage[],
  options: ExportOptions = {}
): string => {
  const exportData = {
    exportedAt: new Date().toISOString(),
    messageCount: messages.length,
    messages: messages.map(msg => ({
      type: msg.type,
      content: msg.content,
      timestamp: msg.timestamp.toISOString(),
      ...(options.includeActivities && msg.activities && { activities: msg.activities })
    }))
  }

  return JSON.stringify(exportData, null, 2)
}

/**
 * Export chat conversation as HTML
 */
export const exportAsHTML = (
  messages: ExportMessage[],
  options: ExportOptions = {}
): string => {
  const { includeTimestamps = true, includeActivities = false } = options

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Conversation Export</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #6F2EFF 0%, #1957DB 100%);
      color: white;
      border-radius: 8px;
    }
    .message {
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .user {
      background-color: #E8F4F8;
      border-left: 4px solid #1957DB;
    }
    .assistant {
      background-color: #F3E8FF;
      border-left: 4px solid #6F2EFF;
    }
    .role {
      font-weight: bold;
      margin-bottom: 8px;
      color: #333;
    }
    .timestamp {
      font-size: 0.85em;
      color: #666;
      margin-left: 10px;
    }
    .content {
      line-height: 1.6;
      color: #444;
    }
    .activities {
      margin-top: 10px;
      padding: 10px;
      background-color: rgba(0,0,0,0.05);
      border-radius: 4px;
    }
    .activities h4 {
      margin: 0 0 8px 0;
      font-size: 0.9em;
      color: #666;
    }
    .activities ul {
      margin: 0;
      padding-left: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding: 15px;
      color: #666;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Chat Conversation Export</h1>
    <p>Exported on ${new Date().toLocaleString()}</p>
  </div>
  <div class="messages">
`

  messages.forEach((msg) => {
    const roleClass = msg.type === 'user' ? 'user' : 'assistant'
    const roleText = msg.type === 'user' ? '🧑 You' : '🤖 Assistant'

    html += `    <div class="message ${roleClass}">
      <div class="role">
        ${roleText}
        ${includeTimestamps ? `<span class="timestamp">${msg.timestamp.toLocaleString()}</span>` : ''}
      </div>
      <div class="content">${markdownToHTML(msg.content)}</div>
`

    if (includeActivities && msg.activities && msg.activities.length > 0) {
      html += `      <div class="activities">
        <h4>Activities:</h4>
        <ul>
`
      msg.activities.forEach(activity => {
        html += `          <li>${escapeHtml(activity)}</li>\n`
      })
      html += `        </ul>
      </div>
`
    }

    html += `    </div>\n`
  })

  html += `  </div>
  <div class="footer">
    <p>Generated by Paid Media Suite - Growth Studio</p>
  </div>
</body>
</html>`

  return html
}

/**
 * Escape HTML special characters
 */
const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Convert markdown content to rich HTML with visual styling
 */
const markdownToHTML = (content: string): string => {
  const lines = content.split('\n')
  let html = ''
  let inList = false
  let listType: 'numbered' | 'bullet' | null = null
  let listItems: string[] = []

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      if (listType === 'numbered') {
        // Numbered list as step cards
        html += '<div style="margin: 20px 0; display: flex; flex-direction: column; gap: 12px;">'
        listItems.forEach((item, idx) => {
          html += `
            <div style="display: flex; gap: 12px; padding: 16px; background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border-left: 4px solid #1957DB; border-radius: 8px;">
              <div style="min-width: 28px; height: 28px; border-radius: 50%; background: #1957DB; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0;">
                ${idx + 1}
              </div>
              <div style="flex: 1; line-height: 1.6; color: #0C4A6E;">${item}</div>
            </div>
          `
        })
        html += '</div>'
      } else {
        // Bullet list with checkmarks
        html += '<div style="margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">'
        listItems.forEach(item => {
          html += `
            <div style="display: flex; gap: 10px; padding: 8px 12px; border-radius: 6px;">
              <div style="min-width: 20px; height: 20px; margin-top: 2px; border-radius: 50%; background: linear-gradient(135deg, #10B981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L4 7L8 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div style="flex: 1; line-height: 1.6; color: #374151;">${item}</div>
            </div>
          `
        })
        html += '</div>'
      }
      listItems = []
      listType = null
      inList = false
    }
  }

  lines.forEach(line => {
    // Check for numbered list
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numberedMatch) {
      if (listType !== 'numbered') {
        flushList()
        listType = 'numbered'
        inList = true
      }
      listItems.push(processBold(numberedMatch[2]))
      return
    }

    // Check for bullet list
    const bulletMatch = line.match(/^\s*-\s+(.+)$/)
    if (bulletMatch) {
      if (listType !== 'bullet') {
        flushList()
        listType = 'bullet'
        inList = true
      }
      listItems.push(processBold(bulletMatch[1]))
      return
    }

    // Not a list item, flush any pending list
    flushList()

    // Check for headings with **
    const headingWithBoldMatch = line.match(/^##\s*\*\*(.+?)\*\*\s*$/)
    if (headingWithBoldMatch) {
      html += `
        <div style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-left: 4px solid #F59E0B; border-radius: 8px; margin: 20px 0 16px 0;">
          <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #F59E0B; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2V6L8 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="6" cy="6" r="4.5" stroke="white" stroke-width="1.5"/>
            </svg>
          </div>
          <div style="font-weight: 700; font-size: 15px; color: #92400E;">${headingWithBoldMatch[1]}</div>
        </div>
      `
      return
    }

    // Check for plain ## heading
    const headingMatch = line.match(/^##\s+(.+)$/)
    if (headingMatch) {
      html += `
        <div style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-left: 4px solid #F59E0B; border-radius: 8px; margin: 20px 0 16px 0;">
          <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #F59E0B; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2V6L8 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="6" cy="6" r="4.5" stroke="white" stroke-width="1.5"/>
            </svg>
          </div>
          <div style="font-weight: 700; font-size: 15px; color: #92400E;">${processBold(headingMatch[1])}</div>
        </div>
      `
      return
    }

    // Check for # heading
    const hashMatch = line.match(/^#+\s+(.+)$/)
    if (hashMatch) {
      html += `
        <div style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-left: 4px solid #F59E0B; border-radius: 8px; margin: 20px 0 16px 0;">
          <div style="min-width: 24px; height: 24px; border-radius: 50%; background: #F59E0B; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2V6L8 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="6" cy="6" r="4.5" stroke="white" stroke-width="1.5"/>
            </svg>
          </div>
          <div style="font-weight: 700; font-size: 15px; color: #92400E;">${processBold(hashMatch[1])}</div>
        </div>
      `
      return
    }

    // Check for callouts (Key Point, Important, etc.)
    const calloutMatch = line.match(/^\*\*(Key Point|Important|Note|Tip|Warning):\*\*\s*(.+)$/i)
    if (calloutMatch) {
      const type = calloutMatch[1].toLowerCase()
      const calloutContent = calloutMatch[2]

      let bgGradient = 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)'
      let borderColor = '#3B82F6'
      let iconColor = '#1D4ED8'
      let textColor = '#1E3A8A'
      let icon = '💡'

      if (type === 'important' || type === 'warning') {
        bgGradient = 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'
        borderColor = '#EF4444'
        iconColor = '#B91C1C'
        textColor = '#7F1D1D'
        icon = '⚠️'
      } else if (type === 'tip') {
        bgGradient = 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
        borderColor = '#10B981'
        iconColor = '#047857'
        textColor = '#064E3B'
        icon = '✨'
      } else if (type === 'note') {
        bgGradient = 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)'
        borderColor = '#6366F1'
        iconColor = '#4338CA'
        textColor = '#312E81'
        icon = '📌'
      }

      html += `
        <div style="display: flex; gap: 12px; padding: 16px; background: ${bgGradient}; border-left: 4px solid ${borderColor}; border-radius: 8px; margin: 16px 0;">
          <div style="font-size: 20px; line-height: 1; flex-shrink: 0; margin-top: 2px;">${icon}</div>
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 14px; color: ${iconColor}; margin-bottom: 6px;">${calloutMatch[1]}</div>
            <div style="font-size: 14px; color: ${textColor}; line-height: 1.6;">${processBold(calloutContent)}</div>
          </div>
        </div>
      `
      return
    }

    // Check for separator
    if (line.trim() === '---') {
      html += '<hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">'
      return
    }

    // Regular paragraph
    if (line.trim()) {
      html += `<div style="margin-bottom: 12px; color: #374151; line-height: 1.7;">${processBold(line)}</div>`
    } else {
      html += '<div style="height: 12px;"></div>'
    }
  })

  // Flush any remaining list
  flushList()

  return html
}

/**
 * Process bold text markers
 */
const processBold = (text: string): string => {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 700; color: #111827;">$1</strong>')
}

/**
 * Download exported conversation
 */
export const downloadExport = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export conversation in specified format
 */
export const exportConversation = (
  messages: ExportMessage[],
  format: 'txt' | 'md' | 'json' | 'html' = 'md',
  options: ExportOptions = {}
): void => {
  const timestamp = new Date().toISOString().split('T')[0]
  let content: string
  let filename: string
  let mimeType: string

  switch (format) {
    case 'txt':
      content = exportAsText(messages, options)
      filename = `chat-export-${timestamp}.txt`
      mimeType = 'text/plain'
      break
    case 'md':
      content = exportAsMarkdown(messages, options)
      filename = `chat-export-${timestamp}.md`
      mimeType = 'text/markdown'
      break
    case 'json':
      content = exportAsJSON(messages, options)
      filename = `chat-export-${timestamp}.json`
      mimeType = 'application/json'
      break
    case 'html':
      content = exportAsHTML(messages, options)
      filename = `chat-export-${timestamp}.html`
      mimeType = 'text/html'
      break
    default:
      content = exportAsMarkdown(messages, options)
      filename = `chat-export-${timestamp}.md`
      mimeType = 'text/markdown'
  }

  downloadExport(content, filename, mimeType)
}

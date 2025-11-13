'use client';

import { css } from '@emotion/react'
import { useRouter } from 'next/navigation'

interface AppCard {
  icon: string
  title: string
  description: string
  link?: string
  badge?: string
}

const HomePage = () => {
  const router = useRouter()

  const applications: AppCard[] = [
    {
      icon: '+',
      title: 'AI Agent Foundry',
      description: 'Build and manage AI agents, apps and knowledge bases to power customer experiences.',
    },
    {
      icon: '⊞',
      title: 'Foundry Workspace',
      description: 'Access and use purpose-built AI agents across campaigns, insights and operations.',
    },
    {
      icon: '📢',
      title: 'Engage Studio',
      description: 'Deliver and orchestrate AI-driven personalized email',
    },
    {
      icon: '🎨',
      title: 'Creative Studio',
      description: 'Use generative AI to create engaging and brand compliant content.',
    },
    {
      icon: '📊',
      title: 'Audience Studio',
      description: 'Identify, understand, and segment target audiences to deliver personalized marketing campaigns',
    },
    {
      icon: '📈',
      title: 'Growth Studio',
      description: 'Create, optimize, and analyze paid media campaign performance to drive measurable marketing growth',
      badge: 'Beta',
      link: '/campaign-hub'
    },
    {
      icon: '💾',
      title: 'Data Workbench',
      description: 'Manage queries, workflows, and databases to create Parent Segments',
    },
    {
      icon: '⚙',
      title: 'Jobs',
      description: 'Quickly review the status of your queries and data imports',
    },
    {
      icon: '⚙',
      title: 'Control Panel',
      description: 'Manage the settings of your Treasure Data Console',
    },
  ]

  const resources = [
    { icon: '📄', label: 'Documentation', link: '#' },
    { icon: '+', label: 'Release Notes', link: '#' },
    { icon: '🎓', label: 'TD Academy', link: '#' },
    { icon: '📦', label: 'Treasure Boxes', link: '#' },
    { icon: '💬', label: 'Live Chat', link: '#' },
    { icon: '🎫', label: 'Support Tickets', link: '#' },
    { icon: '🔄', label: 'System Status', link: '#' },
    { icon: '⌨', label: 'Keyboard Shortcuts', link: '#' },
  ]

  const handleCardClick = (app: AppCard) => {
    if (app.link) {
      router.push(app.link)
    }
  }

  return (
    <div css={css`
      display: flex;
      height: 100%;
      background-color: #f5f5f5;
    `}>
      {/* Main Content */}
      <div css={css`
        flex: 1;
        padding: 48px 64px;
        overflow-y: auto;
      `}>
        <h1 css={css`
          font-family: 'Figtree', sans-serif;
          font-size: 32px;
          font-weight: 600;
          color: #212327;
          margin: 0 0 48px 0;
        `}>
          Welcome Everyone!
        </h1>

        <h2 css={css`
          font-family: 'Figtree', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #212327;
          margin: 0 0 24px 0;
        `}>
          Your Applications
        </h2>

        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1400px;
        `}>
          {applications.map((app, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(app)}
              css={css`
                background: white;
                border-radius: 8px;
                padding: 24px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                cursor: ${app.link ? 'pointer' : 'default'};
                transition: all 0.2s;
                position: relative;

                &:hover {
                  box-shadow: ${app.link ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
                  transform: ${app.link ? 'translateY(-2px)' : 'none'};
                }
              `}
            >
              {app.badge && (
                <div css={css`
                  position: absolute;
                  top: 12px;
                  right: 12px;
                  background: #E3F2FD;
                  color: #1976D2;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: 500;
                `}>
                  {app.badge}
                </div>
              )}

              <div css={css`
                font-size: 32px;
                margin-bottom: 16px;
                opacity: 0.6;
              `}>
                {app.icon}
              </div>

              <h3 css={css`
                font-family: 'Figtree', sans-serif;
                font-size: 16px;
                font-weight: 600;
                color: #212327;
                margin: 0 0 8px 0;
              `}>
                {app.title}
              </h3>

              <p css={css`
                font-family: 'Figtree', sans-serif;
                font-size: 14px;
                color: #878F9E;
                margin: 0;
                line-height: 1.5;
              `}>
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Sidebar */}
      <div css={css`
        width: 280px;
        background: white;
        border-left: 1px solid #DCE1EA;
        padding: 48px 24px;
        overflow-y: auto;
      `}>
        <h3 css={css`
          font-family: 'Figtree', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #212327;
          margin: 0 0 24px 0;
        `}>
          Resources
        </h3>

        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}>
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              css={css`
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 6px;
                text-decoration: none;
                color: #212327;
                font-family: 'Figtree', sans-serif;
                font-size: 14px;
                transition: background-color 0.2s;

                &:hover {
                  background-color: #F9FBFF;
                }
              `}
            >
              <span css={css`
                font-size: 16px;
                opacity: 0.7;
              `}>{resource.icon}</span>
              {resource.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

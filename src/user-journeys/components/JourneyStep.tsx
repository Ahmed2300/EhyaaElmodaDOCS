import React from 'react';
import Icon from '../../api-docs/components/Icon';

interface JourneyStepProps {
  number: number;
  title: string;
  icon: string;
  children: React.ReactNode;
  apiCalls?: { method: string; path: string; desc: string }[];
  isLast?: boolean;
  color?: string;
}

const methodClass: Record<string, string> = {
  GET: 'badge-get',
  POST: 'badge-post',
  PUT: 'badge-put',
  PATCH: 'badge-patch',
  DELETE: 'badge-delete',
};

const JourneyStep: React.FC<JourneyStepProps> = ({
  number,
  title,
  icon,
  children,
  apiCalls,
  isLast = false,
  color = '#1a73e8',
}) => {
  return (
    <div className="journey-step-wrapper">
      <div className="journey-step-connector">
        <div className="journey-step-node" style={{ background: color }}>
          <Icon name={icon} size={18} style={{ color: '#fff' }} />
        </div>
        {!isLast && <div className="journey-step-line" style={{ background: color }} />}
      </div>
      <div className="journey-step-content">
        <div className="journey-step-header">
          <span className="journey-step-number" style={{ background: color }}>{number}</span>
          <h3 className="journey-step-title">{title}</h3>
        </div>
        <div className="journey-step-body">{children}</div>
        {apiCalls && apiCalls.length > 0 && (
          <div className="journey-step-api">
            <div className="journey-step-api-label">API Calls</div>
            <div className="journey-step-api-list">
              {apiCalls.map((api, i) => (
                <div key={i} className="journey-step-api-item">
                  <span className={`badge ${methodClass[api.method] || 'badge-get'}`}>{api.method}</span>
                  <code className="journey-api-path">{api.path}</code>
                  <span className="journey-api-desc">{api.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyStep;

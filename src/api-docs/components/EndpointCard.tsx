import React, { useState } from 'react';
import Icon from './Icon';
import CodeBlock from './CodeBlock';

interface EndpointCardProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  access: string;
  permission?: string;
  description: string;
  payload?: Record<string, unknown>;
  validation?: Record<string, string>;
  title?: string;
}

const methodColors: Record<string, string> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

const EndpointCard: React.FC<EndpointCardProps> = ({
  method,
  url,
  access,
  permission,
  description,
  payload,
  validation,
  title: _title,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="endpoint-card">
      <div className="endpoint-card-header" onClick={() => setExpanded(!expanded)}>
        <span className={`method ${methodColors[method]}`}>{method}</span>
        <span className="endpoint-url">{url}</span>
        <span className="endpoint-access">{access}</span>
        <Icon name={expanded ? 'expand_less' : 'expand_more'} size={18} style={{ color: '#5f6368', flexShrink: 0 }} />
      </div>
      {expanded && (
        <div className="endpoint-card-body">
          <div className="field-label">الوصف</div>
          <div className="field-value">{description}</div>

          {permission && (
            <>
              <div className="field-label">الصلاحية المطلوبة</div>
              <div className="field-value">
                <span className="badge badge-permission">{permission}</span>
              </div>
            </>
          )}

          <div className="field-label">مستوى الوصول</div>
          <div className="field-value">
            <span className={access === 'عام' ? 'badge badge-public' : 'badge badge-protected'}>{access}</span>
          </div>

          {payload && (
            <>
              <div className="field-label">نموذج الإرسال (Payload)</div>
              <CodeBlock code={JSON.stringify(payload, null, 2)} />
            </>
          )}

          {validation && (
            <>
              <div className="field-label">قواعد التحقق (Validation)</div>
              <table>
                <thead>
                  <tr>
                    <th>الحقل</th>
                    <th>القاعدة</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(validation).map(([field, rule]) => (
                    <tr key={field}>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{field}</td>
                      <td style={{ fontSize: 12 }}>{rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EndpointCard;

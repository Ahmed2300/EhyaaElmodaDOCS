import React from 'react';
import Icon from './Icon';

interface AlertProps {
  type: 'info' | 'warning' | 'error' | 'success';
  icon: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, icon, children }) => {
  return (
    <div className={`alert alert-${type}`}>
      <Icon name={icon} size={20} className="alert-icon" />
      <div className="alert-content">{children}</div>
    </div>
  );
};

export default Alert;

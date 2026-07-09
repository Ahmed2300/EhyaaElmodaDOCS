import React from 'react';
import Icon from './Icon';

interface SectionHeaderProps {
  icon: string;
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, description }) => {
  return (
    <div className="section-header">
      <div className="section-icon">
        <Icon name={icon} size={22} />
      </div>
      <h2>{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
};

export default SectionHeader;

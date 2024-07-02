import { Button } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

interface ISidebarButton {
  justIcon?: boolean
  innerItext?: string
  icon: string | React.ReactNode
  className?: string
  onClick?: () => void
}

const SidebarButton: React.FC<ISidebarButton> = ({ innerItext, icon, onClick, className, justIcon }) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      style={{ outline: 'none', boxShadow: 'none',padding:'20px', display: 'flex', justifyContent:'flex-start', textTransform:'none', color: '#000000'}}
      sx={{ height: 33, width: '100%', display: 'flex', padding: 0, alignItems: 'center' }}
    >
      <div
        className={clsx(
          'flex items-start text-xs',
          { 'gap-3': !justIcon },
          { 'justify-center': justIcon }
        )}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
          {icon}
        </span>
        {innerItext && !justIcon && <span className="truncate pt-1 text-sm">{innerItext}</span>}
      </div>
    </Button>
  );
};

export default SidebarButton;

import React from 'react';
import { X } from 'phosphor-react';
import Button from './Button';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Play / Pause' },
    { key: '←', desc: 'Previous photo' },
    { key: '→', desc: 'Next photo' },
    { key: 'Cmd + U', desc: 'Upload images' },
    { key: 'Shift + S', desc: 'Cycle theme' },
    { key: 'Shift + E', desc: 'Export video' },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 h-12 border-b border-[var(--color-border-default)]">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
            Keyboard Shortcuts
          </span>
          <Button variant="ghost" size="sm" onClick={onClose} icon={<X size={16} />} />
        </div>
        <div className="py-2">
          {shortcuts.map((s, i) => (
            <div 
              key={i} 
              className="px-4 py-2.5 flex items-center justify-between border-b last:border-0 border-[var(--color-bg-panel)]"
            >
              <span className="text-[13px] text-[var(--color-text-secondary)]">{s.desc}</span>
              <kbd className="px-2 py-1 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] rounded-[var(--radius-sm)] text-[11px] font-medium text-[var(--color-text-primary)] shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <div className="p-4 bg-[var(--color-bg-panel)] border-t border-[var(--color-border-default)]">
          <Button variant="primary" className="w-full" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsModal;

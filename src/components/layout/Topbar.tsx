import React from 'react';
import { useRekapStore } from '../../store/rekapStore';
import { Sun, Moon, Export } from 'phosphor-react';
import Button from '../ui/Button';
import SegmentedControl from '../ui/SegmentedControl';
import { useExport } from '../../hooks/useExport';

const Topbar: React.FC = () => {
  const { theme, toggleTheme, settings, updateSettings, isExporting, exportProgress } = useRekapStore();
  const { startExport } = useExport();

  const aspectRatioOptions = [
    { label: '16:9', value: '16:9' },
    { label: '4:3', value: '4:3' },
    { label: '5:4', value: '5:4' },
    { label: '1:1', value: '1:1' },
    { label: '9:16', value: '9:16' },
  ];

  return (
    <header className="h-12 border-b border-[var(--color-border-default)] flex items-center justify-between px-4 bg-[var(--color-bg-page)] z-10">
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-semibold text-[var(--color-text-primary)] tracking-tight">
          Rekap
        </span>
      </div>

      <div className="flex-1 flex justify-center">
        <SegmentedControl
          options={aspectRatioOptions}
          value={settings.aspectRatio}
          onChange={(v) => updateSettings({ aspectRatio: v as any })}
          className="max-w-[320px]"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[var(--color-bg-hover)] rounded-[var(--radius-sm)] p-1">
          {(['1x', '2x'] as const).map((q) => (
            <button
              key={q}
              onClick={() => updateSettings({ exportQuality: q })}
              className={`px-2 h-6 text-[11px] font-medium rounded-[2px] transition-all
                ${settings.exportQuality === q 
                  ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-sm' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
            >
              {q}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          icon={theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          aria-label="Toggle theme"
        />
        <Button
          variant="primary"
          size="md"
          icon={<Export size={18} weight="bold" />}
          onClick={startExport}
          disabled={isExporting}
          className="min-w-[100px]"
        >
          {isExporting ? `${exportProgress}%` : 'Export'}
        </Button>
      </div>
    </header>
  );
};

export default Topbar;

import React from 'react';
import { useRekapStore } from '../../store/rekapStore';
import Slider from '../ui/Slider';
import SegmentedControl from '../ui/SegmentedControl';

const ControlPanel: React.FC = () => {
  const { settings, updateSettings } = useRekapStore();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="py-6 border-b border-[var(--color-border-default)] last:border-0 px-5">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-5">
        {title}
      </h3>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );

  return (
    <aside className="w-[280px] border-l border-[var(--color-border-default)] flex flex-col bg-[var(--color-bg-panel)] overflow-y-auto">
      <Section title="Animation">
        <Slider
          label="Duration"
          value={settings.duration}
          min={0.2}
          max={5.0}
          step={0.1}
          unit="s"
          onChange={(v) => updateSettings({ duration: v })}
        />
        <div>
          <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] block mb-2">
            Transition
          </label>
          <SegmentedControl
            options={[
              { label: 'Fade', value: 'fade' },
              { label: 'Slide', value: 'slide' },
              { label: 'Zoom', value: 'zoom' },
              { label: 'None', value: 'none' },
            ]}
            value={settings.transition}
            onChange={(v) => updateSettings({ transition: v as any })}
          />
        </div>
      </Section>

      <Section title="Canvas">
        <Slider
          label="Padding"
          value={settings.padding}
          min={0}
          max={80}
          step={4}
          unit="px"
          onChange={(v) => updateSettings({ padding: v })}
        />
        <Slider
          label="Rounded"
          value={settings.borderRadius}
          min={0}
          max={48}
          step={2}
          unit="px"
          onChange={(v) => updateSettings({ borderRadius: v })}
        />
        <Slider
          label="Shadow"
          value={settings.shadow}
          min={0}
          max={40}
          step={1}
          onChange={(v) => updateSettings({ shadow: v })}
        />
      </Section>

      <Section title="Background">
        <SegmentedControl
          options={[
            { label: 'Color', value: 'color' },
            { label: 'Image', value: 'image' },
            { label: 'Slide', value: 'slide' },
          ]}
          value={settings.backgroundMode}
          onChange={(v) => updateSettings({ backgroundMode: v as any })}
        />
        
        {settings.backgroundMode === 'slide' && (
          <>
            <Slider
              label="Blur"
              value={settings.backgroundBlur}
              min={0}
              max={30}
              onChange={(v) => updateSettings({ backgroundBlur: v })}
            />
            <Slider
              label="Overlay"
              value={settings.backgroundOverlay}
              min={0}
              max={100}
              unit="%"
              onChange={(v) => updateSettings({ backgroundOverlay: v })}
            />
          </>
        )}
      </Section>

      <Section title="Layout">
        <div>
          <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] block mb-2">
            Image Fit
          </label>
          <SegmentedControl
            options={[
              { label: 'Cover', value: 'cover' },
              { label: 'Contain', value: 'contain' },
            ]}
            value={settings.imageFit}
            onChange={(v) => updateSettings({ imageFit: v as any })}
          />
        </div>
      </Section>
    </aside>
  );
};

export default ControlPanel;

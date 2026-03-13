import React from 'react';
import { useRekapStore } from '../../store/rekapStore';
import { Plus, Trash } from 'phosphor-react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '../ui/Button';
import { processFiles } from '../../lib/utils';

const SortablePhotoItem = ({ photo, index, isActive, onSelect, onDelete }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group flex items-center gap-3 p-2 rounded-[var(--radius-sm)] cursor-pointer transition-colors
        ${isActive ? 'bg-[var(--color-bg-hover)] shadow-[inset_2px_0_0_0_var(--color-interactive)]' : 'hover:bg-[var(--color-bg-hover)]'}`}
      onClick={() => onSelect(index)}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="w-11 h-11 rounded-[2px] overflow-hidden bg-[var(--color-bg-panel)] flex-shrink-0"
      >
        <img 
          src={photo.thumbnailUrl || photo.objectUrl} 
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium text-[var(--color-text-primary)] truncate">
          Slide {index + 1}
        </div>
        <div className="text-[11px] text-[var(--color-text-muted)] truncate">
          {photo.width} × {photo.height}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(photo.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1 text-[var(--color-text-muted)] hover:text-red-600 transition-opacity"
      >
        <Trash size={14} />
      </button>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { photos, activeIndex, setActiveIndex, addPhotos, removePhoto, reorderPhotos } = useRekapStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      reorderPhotos(oldIndex, newIndex);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(f => 
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    ).slice(0, 30 - photos.length);

    if (validFiles.length > 0) {
      const processed = await processFiles(validFiles);
      addPhotos(processed);
    }
  };

  return (
    <aside className="w-[220px] border-r border-[var(--color-border-default)] flex flex-col bg-[var(--color-bg-panel)] overflow-hidden">
      <div className="p-4 border-b border-[var(--color-border-default)] flex justify-between items-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Photos
        </span>
        <span className="text-[11px] text-[var(--color-text-muted)]">
          {photos.length} / 30
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={photos.map(p => p.id)} strategy={verticalListSortingStrategy}>
            {photos.map((photo, index) => (
              <SortablePhotoItem
                key={photo.id}
                photo={photo}
                index={index}
                isActive={activeIndex === index}
                onSelect={setActiveIndex}
                onDelete={removePhoto}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="p-3 border-t border-[var(--color-border-default)]">
        <label className="block cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              handleFileUpload(e);
              e.target.value = '';
            }}
            disabled={photos.length >= 30}
          />
          <Button
            variant="secondary"
            className="w-full"
            icon={<Plus size={16} />}
            disabled={photos.length >= 30}
            as="span"
          >
            Add photos
          </Button>
        </label>
      </div>
    </aside>
  );
};

export default Sidebar;

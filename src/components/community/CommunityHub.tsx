import React, { useState, useMemo } from 'react';
import { useRekapStore } from '../../store/rekapStore';
import { 
  MagnifyingGlass, 
  MusicNotes, 
  Sparkle,
  PlayCircle
} from 'phosphor-react';

// Mock templates and audio based on the discovered files
const TEMPLATES = [
  { 
    id: 't1', 
    title: 'Blue Ballad', 
    type: 'template', 
    category: 'templates',
    preview: '/src/pro/comm-templates/images/davidclode-chameleon-10097021_1920.jpg',
    audio: 'alec_koff-blues-ballad-487408.mp3'
  },
  { 
    id: 't2', 
    title: 'Organic Flow', 
    type: 'template', 
    category: 'templates',
    preview: '/src/pro/comm-templates/images/bin-rui-natural-10003071_1920.jpg',
    audio: 'aberrantrealities-organic-flow-1015-remastered-485950.mp3'
  },
  {
    id: 'a1',
    title: 'Epic Motivation',
    type: 'audio',
    category: 'audio',
    audio: 'kornevmusic-epic-478847.mp3'
  },
  {
    id: 'a2',
    title: 'Lazy Day LoFi',
    type: 'audio',
    category: 'audio',
    audio: 'penguinmusic-lazy-day-stylish-futuristic-chill-239287.mp3'
  }
];

const CommunityHub: React.FC = () => {
  const { setActiveView, setAudio, addPhotos } = useRekapStore();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'templates' | 'audio'>('all');

  const filteredItems = useMemo(() => {
    return TEMPLATES.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const handleSelect = (item: any) => {
    if (item.type === 'audio') {
      setAudio({ url: `/src/pro/comm-templates/audio/${item.audio}`, name: item.title });
    } else {
      // Load template (mocking photo adding)
      const mockPhoto = {
        id: Math.random().toString(),
        objectUrl: item.preview,
        name: item.title,
        file: new File([], item.title),
        width: 1920,
        height: 1080
      };
      addPhotos([mockPhoto]);
      setAudio({ url: `/src/pro/comm-templates/audio/${item.audio}`, name: item.title });
    }
    setActiveView('editor');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-page)] animate-in fade-in duration-500">
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">Community Hub</h1>
        <p className="text-[var(--color-text-secondary)] text-[14px]">Discover templates and sounds created by the community.</p>
      </div>

      <div className="flex items-center gap-4 px-8 py-4 border-b border-[var(--color-border-default)]">
        <div className="flex-1 relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input 
            type="text"
            placeholder="Search templates, music..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[var(--color-bg-panel)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center bg-[var(--color-bg-panel)] p-1 rounded-[var(--radius-md)] border border-[var(--color-border-default)]">
          {(['all', 'templates', 'audio'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 h-8 text-[12px] font-bold rounded-[var(--radius-sm)] transition-all capitalize
                ${activeTab === tab 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="group bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              <div className="aspect-video bg-[var(--color-bg-panel)] relative overflow-hidden">
                {item.preview ? (
                  <img src={item.preview} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-500/30">
                    <MusicNotes size={48} weight="bold" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle size={48} className="text-white drop-shadow-md" weight="fill" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-[var(--radius-sm)] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20
                    ${item.type === 'template' ? 'bg-indigo-500/80 text-white' : 'bg-emerald-500/80 text-white'}`}>
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-[14px] truncate">{item.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-[var(--color-text-muted)]">Premium</span>
                  <div className="flex items-center gap-1 text-blue-500">
                    <Sparkle size={12} weight="fill" />
                    <span className="text-[10px] font-bold">PRO</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;

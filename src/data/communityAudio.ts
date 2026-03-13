export interface CommunityTrack {
  id: string;
  name: string;
  filename: string;
  url: string;
  tags: string[];
}

const audioFiles = [
  "aberrantrealities-organic-flow-1015-remastered-485950.mp3",
  "alec_koff-blues-ballad-487408.mp3",
  "alexgrohl-motivation-sport-rock-trailer-478796.mp3",
  "audioknap-music-free-458044.mp3",
  "bodleasons-alone-296348.mp3",
  "bransboynd-night-summer-lounge-473222.mp3",
  "kornevmusic-epic-478847.mp3",
  "kornevmusic-upbeat-happy-corporate-487426.mp3",
  "mfcc-vlog-music-beat-advertising-promo-podcast-background-intro-274290.mp3",
  "nveravetyanmusic-stylish-deep-electronic-262632.mp3",
  "penguinmusic-lazy-day-stylish-futuristic-chill-239287.mp3",
  "producesplatinum-vlog-hip-hop-483574.mp3",
  "sonican-lo-fi-music-loop-sentimental-jazzy-love-473154.mp3",
  "starostin-comedy-cartoon-funny-background-music-492540.mp3",
  "tunetank-inspiring-cinematic-music-409347.mp3"
];

function formatName(filename: string): string {
  // Remove ID/numbers at the end and extension
  return filename
    .replace(/-\d+\.mp3$/, '')
    .replace(/\.mp3$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const COMMUNITY_TRACKS: CommunityTrack[] = audioFiles.map(file => ({
  id: file,
  name: formatName(file),
  filename: file,
  // Assuming Vite static asset handling or public folder. 
  // If in src/pro/audio, we might need import.meta.url or move to public.
  // Given previous turns, let's use the absolute-relative path that Vite handles.
  url: `/src/pro/audio/${file}`,
  tags: file.toLowerCase().split(/[-_.]/)
}));

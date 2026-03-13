import { useState } from 'react';
import { useRekapStore } from '../store/rekapStore';
import { renderFrame } from '../lib/renderer';
import { exportToMp4 } from '../lib/encoder';

export function useExport() {
  const { photos, settings, audio, setExporting, setExportProgress } = useRekapStore();
  const [error, setError] = useState<string | null>(null);

  const startExport = async () => {
    if (photos.length < 2) {
      setError('Minimum 2 photos required');
      return;
    }

    setExporting(true);
    setExportProgress(0);
    setError(null);

    try {
      const frameBlobs: Blob[] = [];
      const canvas = document.createElement('canvas');
      
      // Resolution mapping
      const resolutions = {
        '16:9': settings.exportQuality === '1x' ? { w: 1280, h: 720 } : { w: 1920, h: 1080 },
        '4:3': settings.exportQuality === '1x' ? { w: 960, h: 720 } : { w: 1440, h: 1080 },
        '5:4': settings.exportQuality === '1x' ? { w: 900, h: 720 } : { w: 1350, h: 1080 },
        '1:1': settings.exportQuality === '1x' ? { w: 720, h: 720 } : { w: 1080, h: 1080 },
        '9:16': settings.exportQuality === '1x' ? { w: 720, h: 1280 } : { w: 1080, h: 1920 },
      };

      const dim = resolutions[settings.aspectRatio];
      
      // 0. Pre-load all images for better performance
      const imageMap = new Map<string, HTMLImageElement>();
      await Promise.all(photos.map(async (photo) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = photo.objectUrl;
        });
        imageMap.set(photo.id, img);
      }));

      // 1. Render frames (One frame per photo)
      for (let i = 0; i < photos.length; i++) {
        // Pass the pre-loaded image to renderFrame if we modify it, 
        // OR renderFrame will load it from objectUrl (which is cached by browser anyway)
        // Let's just rely on the loop being faster since browser cache is warm now.
        await renderFrame(canvas, photos[i], settings, { width: dim.w, height: dim.h });
        
        const blob = await new Promise<Blob>((resolve) => 
          canvas.toBlob((b) => resolve(b!), 'image/png')
        );

        frameBlobs.push(blob);
        setExportProgress(Math.round(((i + 1) / photos.length) * 15)); // First 15% is rendering
      }

      // 2. Encode to MP4 (Using FFmpeg framerate to control duration)
      const inputFramerate = 1 / settings.duration;
      
      let audioBlob: Blob | null = null;
      if (audio) {
        audioBlob = await fetch(audio.url).then(r => r.blob());
      }

      const videoBlob = await exportToMp4(frameBlobs, inputFramerate, (progress) => {
        // Encoding is the main work now
        setExportProgress(15 + Math.round(progress * 0.85));
      }, audioBlob);

      // 3. Download
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rekap-export-${new Date().toISOString().slice(0, 10)}.mp4`;
      a.click();
      URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Export failed');
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  };

  return { startExport, error };
}

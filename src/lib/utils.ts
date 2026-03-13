import { type Photo } from '../types';

/**
 * Utility to process uploaded files, extract dimensions and generate thumbnails.
 */
export async function processFiles(files: File[]): Promise<Photo[]> {
  return Promise.all(
    files.map(async (file) => {
      const objectUrl = URL.createObjectURL(file);
      const dimensions = await getImageDimensions(objectUrl);
      const thumbnailUrl = await generateThumbnail(objectUrl);
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        objectUrl,
        thumbnailUrl,
        width: dimensions.width,
        height: dimensions.height,
      };
    })
  );
}

function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;
  });
}

async function generateThumbnail(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 88; // 2x for retina-like sharpness on 44px display
      canvas.width = size;
      canvas.height = size;
      
      if (ctx) {
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (size - w) / 2;
        const y = (size - h) / 2;
        ctx.drawImage(img, x, y, w, h);
      }
      
      canvas.toBlob((blob) => {
        if (blob) resolve(URL.createObjectURL(blob));
        else resolve(url);
      }, 'image/webp', 0.8);
    };
    img.src = url;
  });
}

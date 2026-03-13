import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

/**
 * Loads FFmpeg lazily on first call.
 */
async function loadFFmpeg() {
  if (ffmpeg) return ffmpeg;

  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}

/**
 * Encodes an array of PNG blobs into an MP4 video.
 */
export async function exportToMp4(
  frameBlobs: Blob[],
  fps: number,
  onProgress: (p: number) => void
): Promise<Blob> {
  const instance = await loadFFmpeg();

  instance.on('progress', ({ progress }) => {
    onProgress(Math.round(progress * 100));
  });

  // Write frames to virtual file system
  for (let i = 0; i < frameBlobs.length; i++) {
    const filename = `frame${i.toString().padStart(5, '0')}.png`;
    const data = new Uint8Array(await frameBlobs[i].arrayBuffer());
    await instance.writeFile(filename, data);
  }

  // Run FFmpeg command
  // -r: frame rate
  // -i: input pattern
  // -c:v: video codec
  // -pix_fmt: pixel format (required for some players)
  await instance.exec([
    '-r', fps.toString(),
    '-i', 'frame%05d.png',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    'output.mp4'
  ]);

  // Read the result
  const data = await instance.readFile('output.mp4');
  
  // Cleanup virtual files
  for (let i = 0; i < frameBlobs.length; i++) {
    await instance.deleteFile(`frame${i.toString().padStart(5, '0')}.png`);
  }
  await instance.deleteFile('output.mp4');

  return new Blob([(data as any).buffer], { type: 'video/mp4' });
}

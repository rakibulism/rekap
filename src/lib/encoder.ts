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
  inputFramerate: number,
  onProgress: (p: number) => void,
  audioBlob?: Blob | null
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

  // Write audio if provided
  if (audioBlob) {
    const audioData = new Uint8Array(await audioBlob.arrayBuffer());
    await instance.writeFile('audio_input', audioData);
  }

  // Run FFmpeg command
  // -framerate 1/duration: treat input images as having this framerate
  // -i: input pattern
  // -c:v libx264: H.264 codec
  // -r 30: fixed output framerate
  // -preset ultrafast: fastest encoding
  // -shortest: stop when the shortest stream ends (usually the images)
  const args = [
    '-framerate', inputFramerate.toString(),
    '-i', 'frame%05d.png',
  ];

  if (audioBlob) {
    args.push('-i', 'audio_input');
  }

  args.push(
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-pix_fmt', 'yuv420p',
    '-r', '30'
  );

  if (audioBlob) {
    // aac is more compatible and usually faster than mp3 in this context
    args.push(
      '-c:a', 'aac',
      '-b:a', '128k',
      '-map', '0:v:0',
      '-map', '1:a:0',
      '-shortest'
    );
  } else {
    // Ensure no audio stream is expected if not provided
    args.push('-an');
  }

  args.push('output.mp4');

  await instance.exec(args);

  // Read the result
  const data = await instance.readFile('output.mp4');
  
  // Cleanup virtual files
  for (let i = 0; i < frameBlobs.length; i++) {
    await instance.deleteFile(`frame${i.toString().padStart(5, '0')}.png`);
  }
  if (audioBlob) {
    await instance.deleteFile('audio_input');
  }
  await instance.deleteFile('output.mp4');

  return new Blob([(data as any).buffer], { type: 'video/mp4' });
}

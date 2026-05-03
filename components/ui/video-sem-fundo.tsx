import { useRef, useEffect } from 'react';

/**
 * VideoSemFundo - Remove o fundo escuro do vídeo via GPU (CSS)
 */
interface Props {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Velocidade de reprodução: 1 = normal, 0.5 = metade (padrão: 0.5) */
  velocidade?: number;
}

export function VideoSemFundo({ src, className = '', style, velocidade = 0.5 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define a velocidade de reprodução quando o vídeo carrega
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => { video.playbackRate = velocidade; };
    video.addEventListener('loadedmetadata', onLoaded);
    // Se já carregou
    if (video.readyState >= 1) video.playbackRate = velocidade;
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, [velocidade]);

  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        inset: 0,
        mixBlendMode: 'screen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'contrast(1.2) brightness(0.55)',
        }}
      />
    </div>
  );
}

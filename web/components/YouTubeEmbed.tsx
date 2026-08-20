interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  mute?: boolean;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title = 'HOMA Protocol Video',
  autoplay = false,
  mute = false,
  className = '',
}: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}`;

  return (
    <div className={`relative w-full h-[500px] ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
}


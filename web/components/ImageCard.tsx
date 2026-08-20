type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export default function ImageCard({ src, alt, caption }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover rounded-lg"
      />
      {caption && <p className="mt-2 text-sm text-gray-700">{caption}</p>}
    </div>
  );
}


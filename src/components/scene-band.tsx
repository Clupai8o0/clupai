import Image from "next/image";

// One wide illustration between a landing page's hero and its first section.
// By default it bridges into the next section: its lower part sits on the
// surface tone that section starts with. Pass bridge={false} when the next
// section stays on the page background.
// The art lives in public/illustrations; docs/illustrations.md has the brief.
export default function SceneBand({
  src,
  alt,
  bridge = true,
}: {
  src: string;
  alt: string;
  bridge?: boolean;
}) {
  return (
    <div className={bridge ? "scene-band scene-band-bridge" : "scene-band"}>
      <div className="scene-band-frame">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1344px"
        />
      </div>
    </div>
  );
}

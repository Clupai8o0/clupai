// A soft picture: a sharp frame with nothing sharp inside. Mood only, never presented as client work.
// A plain img on purpose: the files in public/soft are already small and they stay blurry.
export default function Soft({
  name,
  phone,
  className,
  eager,
}: {
  name: string;
  phone?: string;
  className?: string;
  eager?: boolean;
})
{
  const loading = eager ? "eager" : "lazy";
  return (
    <div className={`soft ${className ?? ""}`} aria-hidden="true">
      {phone ? (
        <picture>
          <source media="(max-width: 720px)" srcSet={`/soft/${phone}.webp`} />
          <img src={`/soft/${name}.webp`} alt="" loading={loading} />
        </picture>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/soft/${name}.webp`} alt="" loading={loading} />
      )}
    </div>
  );
}

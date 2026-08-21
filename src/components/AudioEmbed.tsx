// A SoundCloud (or similar) inline player, embedded on a project page.
export function AudioEmbed({ src, title }: { src: string; title: string }) {
  return (
    <section className="detail-audio reveal">
      <iframe
        title={`${title} — listen`}
        width="100%"
        height="420"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={src}
      />
    </section>
  );
}

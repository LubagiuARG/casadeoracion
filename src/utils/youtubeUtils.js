export function toYouTubeEmbed(url) {
  if (!url) return null;
  try {
    if (url.includes("embed/")) return url;
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1];
      if (id) {
        const cleanId = id.split('?')[0];
        return `https://www.youtube.com/embed/${cleanId}`;
      }
    }
    return url;
  } catch (e) {
    return url;
  }
}
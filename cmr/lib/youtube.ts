// Fetches CMR Developers' full YouTube upload list for the /videos page.
// There's no official, key-free way to list a channel's videos (the RSS
// feed and the Data API both require credentials/aren't reliably reachable
// from every host), so this reads the same public JSON the channel's own
// "Videos" tab embeds in its page source. If YouTube ever changes that
// internal structure, getChannelVideos() just returns [] and the page
// falls back to an embedded playlist player instead of failing.

const CHANNEL_HANDLE = 'cmrdeveloperspvtltd';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

function extractBalancedObject(source: string, openBraceIndex: number): string | null {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = openBraceIndex; i < source.length; i++) {
    const char = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === '{') depth++;
    else if (char === '}') {
      depth--;
      if (depth === 0) return source.slice(openBraceIndex, i + 1);
    }
  }
  return null;
}

export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/@${CHANNEL_HANDLE}/videos`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CMRDevelopersSite/1.0)' },
      next: { revalidate: 3600 }, // re-scrape at most once an hour
    });
    if (!res.ok) return [];
    const html = await res.text();

    const videos: YouTubeVideo[] = [];
    const seen = new Set<string>();
    const marker = '"lockupViewModel":';
    let searchFrom = 0;

    while (true) {
      const markerIndex = html.indexOf(marker, searchFrom);
      if (markerIndex === -1) break;
      const braceIndex = markerIndex + marker.length;
      searchFrom = braceIndex + 1;
      if (html[braceIndex] !== '{') continue;

      const objStr = extractBalancedObject(html, braceIndex);
      if (!objStr) continue;

      try {
        const obj = JSON.parse(objStr);
        const id: unknown = obj?.contentId;
        if (typeof id !== 'string' || id.length !== 11 || seen.has(id)) continue;

        const title: unknown = obj?.metadata?.lockupMetadataViewModel?.title?.content;
        const thumb: unknown = obj?.contentImage?.thumbnailViewModel?.image?.sources?.[0]?.url;
        if (typeof title !== 'string') continue;

        seen.add(id);
        videos.push({
          id,
          title,
          thumbnail: typeof thumb === 'string' ? thumb : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        });
      } catch {
        // Malformed/unexpected object shape — skip it, keep scanning
      }
    }

    return videos;
  } catch {
    return [];
  }
}

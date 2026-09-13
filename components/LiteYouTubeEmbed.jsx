"use client";

import { useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

function eventParams(video, placement, pageType) {
  const path = typeof window === "undefined" ? "" : window.location.pathname;

  return {
    platform: "youtube",
    link_url: video.youtubeUrl,
    page_path: path,
    placement,
    page_type: pageType,
    video_id: video.id,
  };
}

export default function LiteYouTubeEmbed({ video, placement, pageType = "service" }) {
  const [loaded, setLoaded] = useState(false);
  const title = video.cardTitle || video.title;
  const params = eventParams(video, placement, pageType);

  return (
    <article className="lite-youtube-card" aria-labelledby={`video-${video.id}-title`}>
      <div className="lite-youtube-frame">
        {loaded ? (
          <iframe
            src={`${video.embedUrl}?rel=0`}
            title={`YouTube video: ${title}`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="lite-youtube-preview"
            onClick={() => {
              setLoaded(true);
              trackEvent("video_play_request", params);
            }}
            aria-label={`Load YouTube video: ${title}`}
          >
            <img src={video.thumbnailUrl} alt="" loading="lazy" width="480" height="360" />
            <span className="lite-youtube-play">
              <PlayCircle size={42} aria-hidden="true" />
              <span>Load video</span>
            </span>
          </button>
        )}
      </div>

      <div className="lite-youtube-body">
        <span className="apple-product-tag">YouTube guidance</span>
        <h3 id={`video-${video.id}-title`}>{title}</h3>
        <p>{video.summary}</p>
        <dl className="video-meta-list">
          <div>
            <dt>Channel</dt>
            <dd>{video.channelName}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{video.displayDuration}</dd>
          </div>
        </dl>
        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-link apple-link-sm"
          onClick={() => trackEvent("youtube_outbound_click", params)}
        >
          <span>Watch on YouTube</span>
          <ExternalLink size={13} aria-hidden="true" />
          <span className="sr-only"> Opens in a new tab.</span>
        </a>
      </div>
    </article>
  );
}

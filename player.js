(() => {
  const video = document.getElementById("video");
  const rateSelect = document.getElementById("playback-speed");
  const captionsToggle = document.getElementById("captions-toggle");
  const captionButtonLabel = document.getElementById("caption-button-label");
  const playbackStatus = document.getElementById("playback-status");
  const captionStatus = document.getElementById("caption-status");
  const englishTrack = document.getElementById("english-track");
  const allowedRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
  let captionsEnabled = true;

  const formatRate = (rate) => Number(rate).toFixed(2) + "×";

  function setCaptionState(enabled) {
    captionsEnabled = enabled;
    const textTrack = video.textTracks && video.textTracks[0];
    if (textTrack) {
      textTrack.mode = enabled ? "showing" : "hidden";
    }
    captionsToggle.setAttribute("aria-pressed", String(enabled));
    captionButtonLabel.textContent = enabled ? "On · draft" : "Off";
    captionStatus.textContent = enabled ? "English captions on · draft" : "English captions off";
  }

  function setPlaybackRate(value) {
    const rate = Number(value);
    if (!allowedRates.includes(rate)) return;
    try {
      video.playbackRate = rate;
      video.defaultPlaybackRate = 1;
      playbackStatus.textContent = "Ready · " + formatRate(video.playbackRate);
    } catch (error) {
      playbackStatus.textContent = "This browser could not apply " + formatRate(rate);
    }
  }

  video.playbackRate = 1;
  video.defaultPlaybackRate = 1;
  if ("preservesPitch" in video) {
    video.preservesPitch = true;
  } else if ("webkitPreservesPitch" in video) {
    video.webkitPreservesPitch = true;
  } else if ("mozPreservesPitch" in video) {
    video.mozPreservesPitch = true;
  }
  rateSelect.value = "1";
  setCaptionState(true);

  rateSelect.addEventListener("change", () => setPlaybackRate(rateSelect.value));
  captionsToggle.addEventListener("click", () => setCaptionState(!captionsEnabled));

  video.addEventListener("ratechange", () => {
    playbackStatus.textContent = (video.paused ? "Ready · " : "Playing · ") + formatRate(video.playbackRate);
    rateSelect.value = String(video.playbackRate);
  });
  video.addEventListener("play", () => {
    playbackStatus.textContent = "Playing · " + formatRate(video.playbackRate);
  });
  video.addEventListener("pause", () => {
    playbackStatus.textContent = "Paused · " + formatRate(video.playbackRate);
  });
  video.addEventListener("ended", () => {
    playbackStatus.textContent = "Video ended · " + formatRate(video.playbackRate);
  });
  video.addEventListener("error", () => {
    const source = video.querySelector("source")?.getAttribute("src") || "the video file";
    playbackStatus.textContent = "Video unavailable · confirm " + source + " is present and supported.";
  });
  englishTrack.addEventListener("load", () => setCaptionState(captionsEnabled));
  englishTrack.addEventListener("error", () => {
    setCaptionState(false);
    captionsToggle.disabled = true;
    captionButtonLabel.textContent = "Unavailable";
    captionStatus.textContent = "English captions unavailable · check dentxpert_en_draft.vtt.";
  });
})();

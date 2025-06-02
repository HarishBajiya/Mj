<template>
  <div class="video-player-container">
    <!-- YouTube Video -->
    <div v-if="videoType === 'youtube'" class="youtube-container">
      <div v-if="!isLoaded" class="thumbnail-container" @click="loadVideo">
        <img :src="thumbnailUrl" :alt="videoTitle" class="thumbnail" @load="onThumbnailLoad">
        <div class="play-button">
          <v-icon size="48" color="white">mdi-play-circle-outline</v-icon>
        </div>
      </div>
      <youtube
        v-else
        :video-id="videoId"
        :player-vars="playerVars"
        @ready="onReady"
        @error="onError"
        class="youtube-player"
      ></youtube>
    </div>

    <!-- Direct Video File -->
    <div v-else-if="videoType === 'direct'" class="direct-video-container">
      <div v-if="!isLoaded" class="thumbnail-container" @click="loadVideo">
        <img v-if="customThumbnail" :src="customThumbnail" :alt="videoTitle" class="thumbnail" @load="onThumbnailLoad">
        <div v-else class="video-placeholder">
          <v-icon size="64" color="#F8D8A8">mdi-video</v-icon>
          <p class="placeholder-text">{{ videoTitle }}</p>
        </div>
        <div class="play-button">
          <v-icon size="48" color="white">mdi-play-circle-outline</v-icon>
        </div>
      </div>
      <video
        v-else
        :src="videoUrl"
        class="direct-video-player"
        controls
        autoplay
        @loadeddata="onReady"
        @error="onError"
      >
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- External Link (LinkedIn, etc.) -->
    <div v-else class="external-link-container">
      <div class="thumbnail-container" @click="openExternalLink">
        <img v-if="customThumbnail" :src="customThumbnail" :alt="videoTitle" class="thumbnail" @load="onThumbnailLoad">
        <div v-else class="external-placeholder">
          <v-icon size="64" color="#F8D8A8">mdi-link-variant</v-icon>
          <p class="placeholder-text">{{ videoTitle }}</p>
        </div>
        <div class="play-button external-play">
          <v-icon size="48" color="white">mdi-open-in-new</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    videoTitle: {
      type: String,
      required: true
    },
    customThumbnail: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isLoaded: false,
      isLoading: true,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
        controls: 1,
        showinfo: 0
      }
    }
  },
  computed: {
    videoType() {
      if (!this.videoUrl) return 'external';
      
      // Check for YouTube URLs
      if (this.videoUrl.includes('/embed/') && this.videoUrl.includes('youtube')) {
        return 'youtube';
      }
      
      // Check for direct video file URLs
      if (this.videoUrl.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i)) {
        return 'direct';
      }
      
      // Everything else is external
      return 'external';
    },
    videoId() {
      if (this.videoType !== 'youtube') return '';
      
      try {
        // Extract video ID from embed URL format
        const match = this.videoUrl.match(/\/embed\/([^?]+)/);
        if (match && match[1]) {
          return match[1];
        }
        return '';
      } catch (error) {
        console.error('Error parsing YouTube URL:', error, this.videoUrl);
        return '';
      }
    },
    thumbnailUrl() {
      if (this.videoType === 'youtube' && this.videoId) {
        return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
      }
      return this.customThumbnail || null;
    }
  },
  methods: {
    loadVideo() {
      if (this.videoType === 'external') {
        this.openExternalLink();
        return;
      }
      
      // For direct video files (MP4, etc.), emit event to show modal
      if (this.videoType === 'direct') {
        this.$emit('show-modal', {
          videoUrl: this.videoUrl,
          videoTitle: this.videoTitle
        });
        return;
      }
      
      // For YouTube videos, load inline
      this.isLoaded = true;
      this.$emit('loaded', true);
    },
    openExternalLink() {
      window.open(this.videoUrl, '_blank', 'noopener,noreferrer');
      this.$emit('external-link-opened', this.videoUrl);
    },
    onReady() {
      console.log('Video Player is ready');
      this.$emit('loaded', true);
    },
    onError(error) {
      console.error('Video Player Error:', error);
      this.$emit('error', error);
    },
    onThumbnailLoad() {
      this.isLoading = false;
      this.$emit('thumbnail-loaded');
    }
  },
  mounted() {
    // For YouTube videos, preload the thumbnail
    if (this.videoType === 'youtube' && this.thumbnailUrl) {
      const img = new Image();
      img.onload = () => {
        this.isLoading = false;
        this.$emit('thumbnail-loaded');
      };
      img.onerror = () => {
        this.isLoading = false;
        console.error('Failed to load thumbnail:', this.thumbnailUrl);
        this.$emit('thumbnail-loaded');
      };
      img.src = this.thumbnailUrl;
    } else {
      this.isLoading = false;
      this.$emit('thumbnail-loaded');
    }
    
    // Set a timeout to ensure loading state is cleared
    setTimeout(() => {
      this.isLoading = false;
      this.$emit('thumbnail-loaded');
    }, 2000);
  }
}
</script>

<style scoped>
.video-player-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 0;
  overflow: hidden;
}

.youtube-container,
.direct-video-container,
.external-link-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.thumbnail-container {
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  opacity: 0.9;
  z-index: 1;
  will-change: transform;
}

.video-placeholder,
.external-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #F8D8A8;
  text-align: center;
  padding: 2rem;
}

.placeholder-text {
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #F8D8A8;
  opacity: 0.8;
  line-height: 1.4;
  max-width: 80%;
}

.thumbnail-container:hover .thumbnail {
  opacity: 0.7;
  transform: scale(1.1);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: 10;
  cursor: pointer;
  pointer-events: none;
}

.thumbnail-container:hover .play-button {
  transform: translate(-50%, -50%) scale(1.1);
  opacity: 1;
  pointer-events: auto;
}

.play-button:hover .v-icon {
  color: #F8D8A8 !important;
}

.external-play:hover .v-icon {
  color: #F8D8A8 !important;
}

.youtube-player,
.direct-video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #000;
}

.direct-video-player {
  object-fit: cover;
}

/* Custom video controls styling */
.direct-video-player::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.8);
}

.direct-video-player::-webkit-media-controls-play-button,
.direct-video-player::-webkit-media-controls-volume-slider,
.direct-video-player::-webkit-media-controls-timeline {
  filter: invert(1);
}

/* Loading animation */
.thumbnail-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  z-index: 0;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 600px) {
  .play-button {
    width: 56px;
    height: 56px;
  }
  
  .play-button .v-icon {
    font-size: 40px !important;
  }
  
  .placeholder-text {
    font-size: 0.8rem;
  }
  
  .video-placeholder .v-icon,
  .external-placeholder .v-icon {
    font-size: 48px !important;
  }
}
</style>

<template>
  <div class="youtube-player-container">
    <div v-if="!isLoaded" class="thumbnail-container" @click="loadVideo">
      <img :src="thumbnailUrl" :alt="videoTitle" class="thumbnail" @load="onThumbnailLoad">
      <div class="play-button">
        <v-icon size="48" color="white">{{ icon }}</v-icon>
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
</template>

<script>
export default {
  name: 'YouTubePlayer',
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    videoTitle: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'mdi-play-circle-outline'
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
    videoId() {
      try {
        if (!this.videoUrl) return '';
        
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
      if (!this.videoId) {
        return 'https://via.placeholder.com/640x360/1a1a1a/F8D8A8?text=Video+Unavailable';
      }
      return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
    }
  },
  methods: {
    loadVideo() {
      this.isLoaded = true;
      this.$emit('loaded', true);
    },
    onReady() {
      console.log('YouTube Player is ready');
      this.$emit('loaded', true);
    },
    onError(error) {
      console.error('YouTube Player Error:', error);
      this.$emit('error', error);
    },
    onThumbnailLoad() {
      this.isLoading = false;
      this.$emit('thumbnail-loaded');
    }
  },
  mounted() {
    // Preload the thumbnail
    const img = new Image();
    img.onload = () => {
      this.isLoading = false;
      this.$emit('thumbnail-loaded');
    };
    img.onerror = () => {
      this.isLoading = false;
      console.error('Failed to load thumbnail:', this.thumbnailUrl);
      // Use a fallback image
      this.$emit('thumbnail-loaded');
    };
    img.src = this.thumbnailUrl;
    
    // Set a timeout to ensure loading state is cleared
    setTimeout(() => {
      this.isLoading = false;
      this.$emit('thumbnail-loaded');
    }, 2000);
  }
}
</script>

<style scoped>
.youtube-player-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 0;
  overflow: hidden;
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
}

.thumbnail-container:hover .thumbnail {
  opacity: 0.7;
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

/* Removed pulse animation */

.youtube-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #000;
}

/* Loading animation for thumbnail */
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
  
  .play-button v-icon {
    font-size: 22px;
  }
}
</style>

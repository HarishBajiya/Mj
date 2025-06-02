<template>
  <div 
    v-if="isVisible" 
    class="video-modal-overlay"
    @click="closeModal"
    @keydown.esc="closeModal"
    tabindex="0"
  >
    <div class="video-modal-container" @click.stop>
      <!-- Close Button -->
      <button 
        class="close-button"
        @click="closeModal"
        aria-label="Close video"
      >
        <v-icon size="24" color="white">mdi-close</v-icon>
      </button>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <v-progress-circular
          indeterminate
          color="white"
          size="64"
        ></v-progress-circular>
        <p class="loading-text">Loading video...</p>
      </div>

      <!-- Video Player -->
      <div v-else-if="!hasError" class="video-player-container">
        <video
          ref="videoPlayer"
          :src="videoUrl"
          class="modal-video-player"
          controls
          autoplay
          @loadeddata="onVideoLoaded"
          @error="onVideoError"
          @loadstart="onVideoLoadStart"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Error State -->
      <div v-else class="error-container">
        <v-icon size="64" color="white">mdi-alert-circle-outline</v-icon>
        <p class="error-text">Failed to load video</p>
        <p class="error-subtitle">Please try again later</p>
      </div>

      <!-- Video Title -->
      <div v-if="videoTitle && !isLoading" class="video-title">
        <h3>{{ videoTitle }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    videoUrl: {
      type: String,
      required: true
    },
    videoTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: true,
      hasError: false
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.resetState();
        this.$nextTick(() => {
          this.$el.focus();
        });
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore body scroll
        document.body.style.overflow = '';
        this.pauseVideo();
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    resetState() {
      this.isLoading = true;
      this.hasError = false;
    },
    onVideoLoadStart() {
      this.isLoading = true;
      this.hasError = false;
    },
    onVideoLoaded() {
      this.isLoading = false;
      this.hasError = false;
      console.log('Video loaded successfully');
    },
    onVideoError(error) {
      this.isLoading = false;
      this.hasError = true;
      console.error('Video loading error:', error);
    },
    pauseVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause();
      }
    }
  },
  beforeDestroy() {
    // Ensure body scroll is restored
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
.video-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

.video-modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scaleIn 0.3s ease-out;
}

.close-button {
  position: absolute;
  top: -50px;
  right: 0;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10001;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.close-button:focus {
  outline: 2px solid #F8D8A8;
  outline-offset: 2px;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 200px;
  color: white;
  text-align: center;
}

.loading-text {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

.error-text {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.error-subtitle {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.video-player-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-video-player {
  max-width: 90vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  background-color: #000;
}

.video-title {
  margin-top: 1rem;
  text-align: center;
  color: white;
  max-width: 90vw;
}

.video-title h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #F8D8A8;
  margin: 0;
  line-height: 1.4;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .video-modal-container {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal-video-player {
    max-width: 95vw;
    max-height: 75vh;
  }

  .close-button {
    top: -40px;
    right: -10px;
    width: 36px;
    height: 36px;
  }

  .video-title h3 {
    font-size: 1rem;
  }

  .loading-container,
  .error-container {
    min-width: 250px;
    min-height: 150px;
  }
}

@media (max-width: 480px) {
  .close-button {
    top: -35px;
    right: -5px;
    width: 32px;
    height: 32px;
  }

  .close-button .v-icon {
    font-size: 20px !important;
  }

  .video-title h3 {
    font-size: 0.9rem;
  }
}

/* Custom video controls styling for better visibility */
.modal-video-player::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-video-player::-webkit-media-controls-play-button,
.modal-video-player::-webkit-media-controls-volume-slider,
.modal-video-player::-webkit-media-controls-timeline {
  filter: invert(1);
}
</style>

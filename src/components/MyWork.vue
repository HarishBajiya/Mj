<template>
  <div id="app" class="dark-theme">
    <div class="global-loader" v-if="loading">
      <v-progress-linear
        indeterminate
        color="grey"
        height="3"
      ></v-progress-linear>
    </div>
    <v-container fluid class="pa-0">
      <div class="header mb-12">
        <div class="filters">
          <v-chip-group
            v-model="selectedType"
            mandatory
            class="mb-6"
          >
            <v-chip
              v-for="type in projectTypes"
              :key="type"
              :value="type"
              filter
              variant="elevated"
              class="filter-chip text-subtitle-1"
            >
              {{ type }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>

      <v-row no-gutters>
        <!-- Web Projects -->
        <template v-if="selectedType === 'Web'">
          <v-col
            v-for="(project, index) in filteredWebProjects"
            :key="'web-' + index"
            cols="12"
            sm="6"
            md="4"
            class="pa-0"
          >
            <v-card
              class="grid-item"
              elevation="0"
            >
              <div class="video-container">
                <div class="video-wrapper">
                  <YouTubePlayer
                    :video-url="project.link"
                    :video-title="project.title"
                    @loaded="loading = false"
                    icon="mdi-play-circle-outline"
                  />
                </div>
              </div>
              <div class="overlay">
                <div class="overlay-content">
                  <h3 class="text-subtitle-1 font-weight-medium mb-1 text-uppercase">{{ project.title }}</h3>
                  <h6 class="text-subtitle-2 font-weight-medium text-lowercase">\  {{ project.job }}</h6>
                </div>
              </div>
            </v-card>
          </v-col>
        </template>

        <!-- Narrative Projects -->
        <template v-else>
          <v-col
            v-for="(project, index) in narrativeProjects"
            :key="'narrative-' + index"
            cols="12"
            sm="6"
            md="4"
            class="pa-0"
          >
            <v-card
              class="grid-item"
              elevation="0"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="image-container">
                <v-img
                  :src="project.image"
                  :lazy-src="project.image"
                  class="project-image"
                  cover
                  position="center"
                  :class="{ 'loading': !imageLoaded }"
                  @load="imageLoaded = true"
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <div class="overlay">
                  <div class="overlay-content">
                    <h3 class="text-subtitle-1 font-weight-medium mb-1 text-uppercase">{{ project.title }}</h3>
                    <h6 class="text-subtitle-2 font-weight-medium text-lowercase">\  {{ project.job }}</h6>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import webProjects from "../data/Projects";
import narrativeProjects from "../data/NarrativeProjects";
import YouTubePlayer from './YouTubePlayer.vue';

export default {
  name: 'MyWork',
  components: {
    YouTubePlayer
  },
  data() {
    return {
      webProjects,
      narrativeProjects,
      loading: true,
      imageLoaded: false,
      selectedType: 'Web',
      selectedCategory: null,
      projectTypes: ['Web', 'Narrative']
    }
  },
  computed: {
    categories() {
      return [...new Set(this.webProjects.map(project => project.category))];
    },
    filteredWebProjects() {
      if (!this.selectedCategory) {
        return this.webProjects;
      }
      return this.webProjects.filter(project => project.category === this.selectedCategory);
    }
  },
  methods: {
    resetLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },
  watch: {
    selectedCategory() {
      this.resetLoading();
    },
    selectedType() {
      this.resetLoading();
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@300;400;500;600;700&display=swap');

.dark-theme {
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
}

#app {
  font-family: 'Cabin', sans-serif;
}

.header {
  text-align: center;
}

.header h1 {
  letter-spacing: 1px;
  color: #ffffff;
}

.filters {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.filter-chip {
  background-color: rgba(45, 45, 45, 0.8) !important;
  color: #ffffff !important;
  letter-spacing: 0.8px !important;
  font-weight: 500 !important;
  padding: 0 20px !important;
  height: 36px !important;
  font-size: 0.95rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(8px) !important;
}

.filter-chip:hover {
  background-color: rgba(55, 55, 55, 0.9) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.filter-chip.v-chip--selected {
  background-color: #F8D8A8 !important;
  border: 1px solid rgba(248, 216, 168, 0.2) !important;
  box-shadow: 0 4px 12px rgba(248, 216, 168, 0.3) !important;
  transform: translateY(-1px);
}

.filter-chip.v-chip--selected:hover {
  background-color: #F8D8A8 !important;
  box-shadow: 0 6px 14px rgba(248, 216, 168, 0.4) !important;
}

.grid-item {
  background-color: #1E1E1E !important;
  border-radius: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.grid-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.video-container, .image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #000000;
  overflow: hidden;
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.project-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-image.loading {
  min-height: 200px;
  background: linear-gradient(90deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 1;
  transition: all 0.3s ease;
  padding: 0 1rem 1.5rem 1rem;
  pointer-events: none;
  z-index: 5;
}

.grid-item:hover .overlay {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.2) 100%);
}

.grid-item:hover .project-image,
.grid-item:hover :deep(.thumbnail) {
  transform: scale(1.1);
}

.overlay-content {
  color: #F8D8A8;
  text-align: center;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: transform 0.3s ease;
  pointer-events: auto;
}

.overlay-content h3, .overlay-content h6 {
  color: #F8D8A8;
}

.grid-item:hover .overlay-content {
  /* No transform on hover */
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

@media (max-width: 960px) {
  .v-container {
    padding: 0 !important;
  }
  
  .header {
    margin-bottom: 2rem !important;
  }

  .header h1 {
    font-size: 2rem !important;
    margin-bottom: 1rem !important;
  }

  .overlay {
    opacity: 1;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  }
  
  .overlay-content {
    transform: translateY(0);
  }
  
  .overlay-content h3 {
    font-size: 0.8rem !important;
    line-height: 1.2 !important;
  }
  
  .overlay-content h6 {
    font-size: 0.65rem !important;
  }
}


@media (max-width: 600px) {
  .overlay-content h3 {
    font-size: 0.75rem !important;
    line-height: 1.1 !important;
  }
  
  .overlay-content h6 {
    font-size: 0.6rem !important;
  }
}
</style>

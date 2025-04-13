<template>
  <div id="app" class="dark-theme">
    <v-container fluid>
      <div class="header">
        <h1 class="text-h4 mb-6">Projects</h1>
        <div class="filters">
          <v-chip-group
            v-model="selectedType"
            mandatory
            class="mb-4"
          >
            <v-chip
              v-for="type in projectTypes"
              :key="type"
              :value="type"
              filter
              variant="elevated"
              class="filter-chip"
            >
              {{ type }}
            </v-chip>
          </v-chip-group>

          <v-chip-group
            v-if="selectedType === 'Web'"
            v-model="selectedCategory"
            mandatory
            class="mb-4"
          >
            <v-chip
              v-for="category in categories"
              :key="category"
              :value="category"
              filter
              variant="elevated"
              class="filter-chip"
            >
              {{ category }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>

      <div class="grid-container">
        <!-- Web Projects -->
        <template v-if="selectedType === 'Web'">
          <v-card
            v-for="(project, index) in filteredWebProjects"
            :key="'web-' + index"
            class="grid-item"
            elevation="3"
            :loading="loading"
          >
            <div class="video-container">
              <YouTubePlayer
                :video-url="project.link"
                :video-title="project.title"
                @loaded="loading = false"
              />
            </div>
            <v-card-text class="project-info">
              <div class="d-flex flex-column">
                <span class="text-h6 mb-2">{{ project.title }}</span>
                <v-chip
                  size="small"
                  color="primary"
                  class="mb-2"
                >
                  {{ project.category }}
                </v-chip>
                <span class="text-subtitle-1">{{ project.job }}</span>
              </div>
            </v-card-text>
          </v-card>
        </template>

        <!-- Narrative Projects -->
        <template v-else>
          <v-card
            v-for="(project, index) in narrativeProjects"
            :key="'narrative-' + index"
            class="grid-item"
            elevation="3"
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
                :aspect-ratio="16/9"
                :class="{ 'loading': !imageLoaded }"
                @load="imageLoaded = true"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="overlay">
                <div class="overlay-content">
                  <h3 class="text-h6 mb-2">{{ project.title }}</h3>
                  <v-chip
                    size="small"
                    color="white"
                    class="mb-2"
                    text-color="primary"
                  >
                    {{ project.job }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-card>
        </template>
      </div>
    </v-container>
  </div>
</template>

<script>
import webProjects from "../data/Projects";
import narrativeProjects from "../data/NarrativeProjects";
import YouTubePlayer from './YouTubePlayer.vue';

export default {
  name: 'Projects',
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
      selectedCategory: 'All',
      projectTypes: ['Web', 'Narrative']
    }
  },
  computed: {
    categories() {
      const uniqueCategories = ['All', ...new Set(this.webProjects.map(project => project.category))];
      return uniqueCategories;
    },
    filteredWebProjects() {
      if (this.selectedCategory === 'All') {
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
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap');

.dark-theme {
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
}

#app {
  font-family: 'Cabin', sans-serif;
}

.header {
  padding: 2rem 1rem;
  background-color: #1E1E1E;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  font-weight: 600;
  color: #ffffff;
}

.filters {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.filter-chip {
  background-color: #2d2d2d !important;
  color: #ffffff !important;
}

.filter-chip.v-chip--selected {
  background-color: #1976d2 !important;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.grid-item {
  width: 100%;
  break-inside: avoid;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #1E1E1E !important;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.video-container {
  position: relative;
  width: 100%;
  background-color: #000000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.image-container {
  position: relative;
  width: 100%;
  background-color: #000000;
}

.project-image {
  transition: transform 0.3s ease;
}

.project-image.loading {
  min-height: 200px;
  background: linear-gradient(90deg, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.project-info {
  padding: 1.5rem;
  color: #ffffff;
}

.project-info .text-h6 {
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
}

.project-info .text-subtitle-1 {
  color: #9e9e9e;
  font-weight: 500;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grid-item:hover .overlay {
  opacity: 1;
}

.grid-item:hover .project-image {
  transform: scale(1.05);
}

.overlay-content {
  color: white;
  text-align: center;
  padding: 1rem;
}

.overlay-content h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
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
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .header {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .project-info {
    padding: 1rem;
  }

  .overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.75);
  }
}
</style>

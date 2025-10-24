// YouTube Popular This Year Extension
// Content script that adds a "Popular This Year" filter to YouTube channel pages

class YouTubePopularThisYear {
  constructor() {
    this.isActive = false;
    this.originalVideos = [];
    this.filteredVideos = [];
    this.twelveMonthsAgo = new Date();
    this.twelveMonthsAgo.setMonth(this.twelveMonthsAgo.getMonth() - 12);
    
    this.init();
  }

  init() {
    // Wait for page to load and check if we're on a channel page
    if (this.isChannelPage()) {
      this.waitForSortButtons();
    }
  }

  isChannelPage() {
    // Check if we're on a YouTube channel page
    return window.location.pathname.includes('/channel/') || 
           window.location.pathname.includes('/c/') ||
           window.location.pathname.includes('/user/') ||
           window.location.pathname.includes('/@');
  }

  waitForSortButtons() {
    // Wait for the sort buttons to appear
    const observer = new MutationObserver((mutations) => {
      const sortContainer = document.querySelector('#sort-menu-button, yt-chip-cloud-modern');
      if (sortContainer) {
        observer.disconnect();
        this.addPopularThisYearButton();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also try to find it immediately in case it's already loaded
    const sortContainer = document.querySelector('#sort-menu-button, yt-chip-cloud-modern');
    if (sortContainer) {
      this.addPopularThisYearButton();
    }
  }

  addPopularThisYearButton() {
    // Look for existing sort buttons container
    const sortContainer = document.querySelector('#sort-menu-button, yt-chip-cloud-modern');
    if (!sortContainer) return;

    // Check if button already exists
    if (document.querySelector('.popular-this-year-btn')) return;

    // Create the button
    const button = document.createElement('button');
    button.className = 'popular-this-year-btn';
    button.textContent = 'Popular This Year';
    button.addEventListener('click', () => this.handlePopularThisYearClick());

    // Try to insert the button in the appropriate location
    const parentContainer = sortContainer.parentElement;
    if (parentContainer) {
      // Insert after the sort container
      parentContainer.insertBefore(button, sortContainer.nextSibling);
    } else {
      // Fallback: append to sort container
      sortContainer.appendChild(button);
    }
  }

  handlePopularThisYearClick() {
    if (this.isActive) {
      this.resetToOriginal();
    } else {
      this.applyPopularThisYearFilter();
    }
  }

  applyPopularThisYearFilter() {
    // Store original videos
    this.originalVideos = this.extractVideoData();
    
    // Filter videos from past 12 months
    this.filteredVideos = this.originalVideos.filter(video => {
      return video.uploadDate >= this.twelveMonthsAgo;
    });

    // Sort by view count (descending)
    this.filteredVideos.sort((a, b) => b.viewCount - a.viewCount);

    // Update the display
    this.updateVideoDisplay();
    
    // Update button state
    const button = document.querySelector('.popular-this-year-btn');
    if (button) {
      button.classList.add('active');
      button.textContent = 'Show All Videos';
    }

    this.isActive = true;
  }

  resetToOriginal() {
    // Restore original video order
    this.updateVideoDisplay(this.originalVideos);
    
    // Update button state
    const button = document.querySelector('.popular-this-year-btn');
    if (button) {
      button.classList.remove('active');
      button.textContent = 'Popular This Year';
    }

    this.isActive = false;
  }

  extractVideoData() {
    const videos = [];
    const videoElements = document.querySelectorAll('#contents ytd-rich-item-renderer, #contents ytd-video-renderer');
    
    videoElements.forEach((element, index) => {
      const videoData = this.parseVideoElement(element, index);
      if (videoData) {
        videos.push(videoData);
      }
    });

    return videos;
  }

  parseVideoElement(element, index) {
    try {
      // Extract video title and link
      const titleElement = element.querySelector('#video-title, a#video-title');
      if (!titleElement) return null;

      const title = titleElement.textContent.trim();
      const videoUrl = titleElement.href;

      // Extract view count
      const viewCountElement = element.querySelector('#metadata-line span:first-child, #metadata-line yt-formatted-string');
      let viewCount = 0;
      if (viewCountElement) {
        viewCount = this.parseViewCount(viewCountElement.textContent);
      }

      // Extract upload date
      const dateElement = element.querySelector('#metadata-line span:last-child, #metadata-line yt-formatted-string:last-child');
      let uploadDate = null;
      if (dateElement) {
        uploadDate = this.parseUploadDate(dateElement.textContent);
      }

      return {
        element: element,
        title: title,
        url: videoUrl,
        viewCount: viewCount,
        uploadDate: uploadDate,
        originalIndex: index
      };
    } catch (error) {
      console.error('Error parsing video element:', error);
      return null;
    }
  }

  parseViewCount(viewCountText) {
    if (!viewCountText) return 0;
    
    const text = viewCountText.toLowerCase().replace(/[^\d\w]/g, '');
    
    if (text.includes('k')) {
      return parseFloat(text.replace('k', '')) * 1000;
    } else if (text.includes('m')) {
      return parseFloat(text.replace('m', '')) * 1000000;
    } else if (text.includes('b')) {
      return parseFloat(text.replace('b', '')) * 1000000000;
    } else {
      return parseInt(text) || 0;
    }
  }

  parseUploadDate(dateText) {
    if (!dateText) return null;
    
    const text = dateText.toLowerCase();
    const now = new Date();
    
    if (text.includes('hour')) {
      const hours = parseInt(text.match(/\d+/)?.[0] || '0');
      return new Date(now.getTime() - hours * 60 * 60 * 1000);
    } else if (text.includes('day')) {
      const days = parseInt(text.match(/\d+/)?.[0] || '0');
      return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    } else if (text.includes('week')) {
      const weeks = parseInt(text.match(/\d+/)?.[0] || '0');
      return new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    } else if (text.includes('month')) {
      const months = parseInt(text.match(/\d+/)?.[0] || '0');
      return new Date(now.getTime() - months * 30 * 24 * 60 * 60 * 1000);
    } else if (text.includes('year')) {
      const years = parseInt(text.match(/\d+/)?.[0] || '0');
      return new Date(now.getTime() - years * 365 * 24 * 60 * 60 * 1000);
    }
    
    return null;
  }

  updateVideoDisplay(videos = this.filteredVideos) {
    const container = document.querySelector('#contents');
    if (!container) return;

    // Clear current videos
    container.innerHTML = '';

    // Add filtered videos
    videos.forEach(video => {
      container.appendChild(video.element);
    });
  }
}

// Initialize the extension when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new YouTubePopularThisYear();
  });
} else {
  new YouTubePopularThisYear();
}

// Re-initialize on navigation (for SPA behavior)
let currentUrl = window.location.href;
const urlObserver = new MutationObserver(() => {
  if (window.location.href !== currentUrl) {
    currentUrl = window.location.href;
    // Small delay to let the page load
    setTimeout(() => {
      if (document.querySelector('.popular-this-year-btn')) {
        document.querySelector('.popular-this-year-btn').remove();
      }
      new YouTubePopularThisYear();
    }, 1000);
  }
});

urlObserver.observe(document.body, {
  childList: true,
  subtree: true
});

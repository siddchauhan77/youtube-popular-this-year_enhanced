// YouTube Popular This Year Extension
// Content script that adds time period filters to YouTube channel pages

class YouTubePopularThisYear {
  constructor() {
    this.isActive = false;
    this.originalVideos = [];
    this.filteredVideos = [];
    this.currentTimePeriod = '1year'; // Default time period
    this.observer = null;
    
    this.init();
  }

  // Get the date threshold based on selected time period
  getDateThreshold() {
    const now = new Date();
    const threshold = new Date(now);
    
    switch(this.currentTimePeriod) {
      case '7days':
        threshold.setDate(threshold.getDate() - 7);
        break;
      case '3months':
        threshold.setMonth(threshold.getMonth() - 3);
        break;
      case '6months':
        threshold.setMonth(threshold.getMonth() - 6);
        break;
      case '1year':
      default:
        threshold.setMonth(threshold.getMonth() - 12);
        break;
    }
    
    return threshold;
  }

  // Get display text for current time period
  getTimePeriodText() {
    const textMap = {
      '7days': 'Last 7 Days',
      '3months': 'Last 3 Months',
      '6months': 'Last 6 Months',
      '1year': 'Last Year'
    };
    return textMap[this.currentTimePeriod] || 'Last Year';
  }

  init() {
    console.log('YouTube Popular This Year: Extension initialized');
    console.log('YouTube Popular This Year: Current URL:', window.location.href);
    
    // Wait for page to load and check if we're on a channel page
    if (this.isChannelPage()) {
      console.log('YouTube Popular This Year: Channel page detected');
      this.waitForSortButtons();
      this.setupMutationObserver();
    } else {
      console.log('YouTube Popular This Year: Not a channel page');
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
      // Look specifically for video filter chips container
      const sortContainer = document.querySelector('ytd-feed-filter-chip-bar-renderer #chips, yt-chip-cloud-modern, yt-chip-cloud, #chips-container');
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
    const sortContainer = document.querySelector('ytd-feed-filter-chip-bar-renderer #chips, yt-chip-cloud-modern, yt-chip-cloud, #chips-container');
    if (sortContainer) {
      this.addPopularThisYearButton();
    }

    // Fallback: try to find after a short delay
    setTimeout(() => {
      const sortContainer = document.querySelector('ytd-feed-filter-chip-bar-renderer #chips, yt-chip-cloud-modern, yt-chip-cloud, #chips-container');
      if (sortContainer) {
        this.addPopularThisYearButton();
      }
    }, 2000);
  }

  setupMutationObserver() {
    // Watch for changes to the page that might remove our buttons
    this.observer = new MutationObserver((mutations) => {
      let shouldReaddButtons = false;
      
      mutations.forEach((mutation) => {
        // Check if our buttons were removed
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check for our button class
              if (node.classList && node.classList.contains('popular-filter-btn')) {
                console.log('YouTube Popular This Year: Button was removed, will re-add');
                shouldReaddButtons = true;
              }
              // Also check if buttons are inside a removed node
              if (node.querySelector && node.querySelector('.popular-filter-btn')) {
                console.log('YouTube Popular This Year: Button container was removed, will re-add');
                shouldReaddButtons = true;
              }
            }
          });
        }
      });
      
      if (shouldReaddButtons) {
        // Wait a bit for YouTube to finish updating
        setTimeout(() => {
          // Double-check they don't already exist before re-adding
          const existingButton = document.querySelector('.popular-filter-btn');
          if (!existingButton) {
            this.addPopularThisYearButton();
          }
        }, 100);
      }
    });
    
    // Start observing the document body for changes
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('YouTube Popular This Year: MutationObserver setup complete');
  }

  addPopularThisYearButton() {
    // Look for video filter chips container specifically
    const sortContainer = document.querySelector('ytd-feed-filter-chip-bar-renderer #chips, yt-chip-cloud-modern, yt-chip-cloud, #chips-container');
    if (!sortContainer) {
      console.log('YouTube Popular This Year: Video filter chips container not found');
      console.log('YouTube Popular This Year: Available elements:', document.querySelector('ytd-feed-filter-chip-bar-renderer'));
      return;
    }

    // Check if buttons already exist
    if (sortContainer.querySelector('.popular-filter-btn')) {
      console.log('YouTube Popular This Year: Buttons already exist in chips container');
      return;
    }

    console.log('YouTube Popular This Year: Adding buttons to chips container:', sortContainer);
    console.log('YouTube Popular This Year: Current children count:', sortContainer.children.length);

    // Create all four buttons
    const periods = [
      { id: '7days', label: 'Last 7 Days' },
      { id: '3months', label: 'Last 3 Months' },
      { id: '6months', label: 'Last 6 Months' },
      { id: '1year', label: 'Last Year' }
    ];

    periods.forEach(period => {
      const button = document.createElement('button');
      button.className = 'popular-filter-btn';
      button.setAttribute('data-period', period.id);
      button.textContent = period.label;
      button.addEventListener('click', () => this.handleTimePeriodSelection(period.id));
      sortContainer.appendChild(button);
    });

    console.log('YouTube Popular This Year: ✅ All buttons successfully added to chips container');
  }

  handleTimePeriodSelection(period) {
    console.log('YouTube Popular This Year: Time period selected:', period);
    
    // If clicking the same period that's already active, turn it off
    if (this.isActive && this.currentTimePeriod === period) {
      this.resetToOriginal();
      return;
    }
    
    this.currentTimePeriod = period;
    
    // NEW: Reset YouTube's native filters first to ensure we have complete dataset
    console.log('YouTube Popular This Year: Checking for active YouTube filters...');
    const needsReset = this.resetYouTubeNativeFilters();
    
    // Update button states immediately for visual feedback
    const buttons = document.querySelectorAll('.popular-filter-btn');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-period') === period) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // If YouTube needed to reload, wait for it. Otherwise apply filter immediately
    const delay = needsReset ? 1200 : 100; // Give YouTube more time to reload when resetting
    console.log(`YouTube Popular This Year: Waiting ${delay}ms before applying filter...`);
    setTimeout(() => {
      this.applyPopularFilter();
    }, delay);
  }

  resetYouTubeNativeFilters() {
    // Find all YouTube filter chips
    const chips = document.querySelectorAll('yt-chip-cloud-chip-renderer');
    let needsReset = false;
    let activeFilter = null;
    
    // First, check if any non-Latest filter is active
    chips.forEach(chip => {
      const label = chip.querySelector('yt-formatted-string.yt-chip-cloud-chip-renderer');
      if (label) {
        const text = label.textContent.trim();
        const isSelected = chip.hasAttribute('selected') || chip.hasAttribute('aria-selected') || chip.getAttribute('aria-selected') === 'true';
        
        // If Popular or Oldest is selected, we need to reset
        if ((text === 'Popular' || text === 'Oldest') && isSelected) {
          console.log('YouTube Popular This Year: ⚠️  Found active YouTube filter:', text);
          needsReset = true;
          activeFilter = text;
        }
      }
    });
    
    // If reset needed, click Latest button
    if (needsReset) {
      console.log(`YouTube Popular This Year: 🔄 Resetting from "${activeFilter}" to "Latest" to get complete dataset...`);
      
      chips.forEach(chip => {
        const label = chip.querySelector('yt-formatted-string.yt-chip-cloud-chip-renderer');
        if (label && label.textContent.trim() === 'Latest') {
          const isAlreadySelected = chip.hasAttribute('selected') || chip.hasAttribute('aria-selected') || chip.getAttribute('aria-selected') === 'true';
          if (!isAlreadySelected) {
            chip.click();
            console.log('YouTube Popular This Year: ✅ Reset to Latest - waiting for page reload...');
          }
        }
      });
    } else {
      console.log('YouTube Popular This Year: ✅ No YouTube filter active, using current dataset');
    }
    
    return needsReset;
  }

  applyPopularFilter() {
    // Always recapture videos to ensure we have the latest DOM state
    // (especially important after YouTube's native filters reload the page)
    console.log('YouTube Popular This Year: Capturing current video data...');
    this.originalVideos = this.extractVideoData();
    
    if (this.originalVideos.length === 0) {
      console.log('YouTube Popular This Year: No videos found to filter');
      return;
    }
    
    console.log('YouTube Popular This Year: Found', this.originalVideos.length, 'videos to filter');
    
    // Get date threshold for current time period
    const threshold = this.getDateThreshold();
    console.log('YouTube Popular This Year: Filtering videos since', threshold.toDateString());
    
    // Filter videos from selected time period
    this.filteredVideos = this.originalVideos.filter(video => {
      return video.uploadDate && video.uploadDate >= threshold;
    });

    // Sort by view count (descending)
    this.filteredVideos.sort((a, b) => b.viewCount - a.viewCount);

    console.log(`YouTube Popular This Year: Filtered ${this.filteredVideos.length} videos from ${this.originalVideos.length} total`);

    // Update the display
    this.updateVideoDisplay();

    this.isActive = true;
  }

  resetToOriginal() {
    // Restore original video order
    this.updateVideoDisplay(this.originalVideos);
    
    // Update all button states - remove active from all
    const buttons = document.querySelectorAll('.popular-filter-btn');
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });

    this.isActive = false;
    console.log('YouTube Popular This Year: Filter reset to original view');
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
      console.log('YouTube Popular This Year: MutationObserver disconnected');
    }
  }

  extractVideoData() {
    const videos = [];
    // Look for video elements in the main content area
    const videoElements = document.querySelectorAll('#contents ytd-rich-item-renderer, #contents ytd-video-renderer, ytd-rich-item-renderer, ytd-video-renderer');
    
    console.log('YouTube Popular This Year: Found', videoElements.length, 'video elements');
    
    videoElements.forEach((element, index) => {
      const videoData = this.parseVideoElement(element, index);
      if (videoData) {
        videos.push(videoData);
        console.log('YouTube Popular This Year: Parsed video:', videoData.title.substring(0, 50), 'Views:', videoData.viewCount, 'Date:', videoData.uploadDate);
      }
    });

    return videos;
  }

  parseVideoElement(element, index) {
    try {
      // Extract video title and link - try multiple selectors
      const titleElement = element.querySelector('#video-title, a#video-title, h3 a, ytd-video-meta-block a');
      if (!titleElement) {
        console.log('YouTube Popular This Year: No title element found for video', index);
        return null;
      }

      const title = titleElement.textContent.trim();
      const videoUrl = titleElement.href;

      // Extract view count and date from all text content
      const allText = element.textContent;
      
      // Try to find view count in the text
      const viewCountMatch = allText.match(/(\d+(?:\.\d+)?[kmb]?)\s*views?/i);
      let viewCount = 0;
      if (viewCountMatch) {
        viewCount = this.parseViewCount(viewCountMatch[1] + ' views');
      }

      // Try to find date in the text
      const dateMatch = allText.match(/(\d+\s*(?:hour|day|week|month|year)s?\s*ago)/i);
      let uploadDate = null;
      if (dateMatch) {
        uploadDate = this.parseUploadDate(dateMatch[1]);
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
      console.error('YouTube Popular This Year: Error parsing video element:', error);
      return null;
    }
  }

  parseViewCount(viewCountText) {
    if (!viewCountText) return 0;
    
    console.log('YouTube Popular This Year: Parsing view count:', viewCountText);
    
    // Remove common words and clean the text
    let text = viewCountText.toLowerCase()
      .replace(/views?/g, '')
      .replace(/view/g, '')
      .replace(/,/g, '')
      .trim();
    
    if (text.includes('k')) {
      const num = parseFloat(text.replace('k', ''));
      return Math.floor(num * 1000);
    } else if (text.includes('m')) {
      const num = parseFloat(text.replace('m', ''));
      return Math.floor(num * 1000000);
    } else if (text.includes('b')) {
      const num = parseFloat(text.replace('b', ''));
      return Math.floor(num * 1000000000);
    } else {
      const num = parseFloat(text);
      return isNaN(num) ? 0 : Math.floor(num);
    }
  }

  parseUploadDate(dateText) {
    if (!dateText) return null;
    
    console.log('YouTube Popular This Year: Parsing upload date:', dateText);
    
    const text = dateText.toLowerCase();
    const now = new Date();
    
    if (text.includes('hour')) {
      const hours = parseInt(text.match(/\d+/)?.[0] || '0');
      const date = new Date(now.getTime() - hours * 60 * 60 * 1000);
      console.log('YouTube Popular This Year: Parsed as', hours, 'hours ago:', date);
      return date;
    } else if (text.includes('day')) {
      const days = parseInt(text.match(/\d+/)?.[0] || '0');
      const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      console.log('YouTube Popular This Year: Parsed as', days, 'days ago:', date);
      return date;
    } else if (text.includes('week')) {
      const weeks = parseInt(text.match(/\d+/)?.[0] || '0');
      const date = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
      console.log('YouTube Popular This Year: Parsed as', weeks, 'weeks ago:', date);
      return date;
    } else if (text.includes('month')) {
      const months = parseInt(text.match(/\d+/)?.[0] || '0');
      const date = new Date(now.getTime() - months * 30 * 24 * 60 * 60 * 1000);
      console.log('YouTube Popular This Year: Parsed as', months, 'months ago:', date);
      return date;
    } else if (text.includes('year')) {
      const years = parseInt(text.match(/\d+/)?.[0] || '0');
      const date = new Date(now.getTime() - years * 365 * 24 * 60 * 60 * 1000);
      console.log('YouTube Popular This Year: Parsed as', years, 'years ago:', date);
      return date;
    }
    
    console.log('YouTube Popular This Year: Could not parse date:', dateText);
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
      // Remove all existing filter buttons
      const buttons = document.querySelectorAll('.popular-filter-btn');
      buttons.forEach(btn => btn.remove());
      new YouTubePopularThisYear();
    }, 1000);
  }
});

urlObserver.observe(document.body, {
  childList: true,
  subtree: true
});

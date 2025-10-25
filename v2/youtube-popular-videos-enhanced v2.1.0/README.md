# YouTube Popular Videos Filter - Enhanced Edition

A Chrome extension that adds customizable time period filters to YouTube channel pages, allowing you to view the most popular videos from different time ranges.

## Features

- **Multiple Time Period Options**: Filter popular videos by:
  - Last 7 Days
  - Last 3 Months
  - Last 6 Months
  - Last Year
  
- **Smart Sorting**: Videos are automatically sorted by view count within the selected time period
- **Clean UI**: Dropdown menu design that matches YouTube's native interface
- **Easy Toggle**: Click the button to apply filters, and select different time periods from the dropdown menu

## How It Works

1. Navigate to any YouTube channel's videos page
2. Look for the "Popular Videos" button in the filter chips bar (next to Latest, Popular, Oldest)
3. Click the button to open the dropdown menu
4. Select your desired time period (7 days, 3 months, 6 months, or 1 year)
5. The videos will be filtered and sorted by view count for that time period
6. Click outside the dropdown or select a new time period to change the filter

## Installation

### From Source

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the folder containing the extension files
6. The extension is now installed and active!

## Files

- `manifest.json` - Extension configuration
- `content-script.js` - Main logic for filtering and UI
- `styles.css` - Styling to match YouTube's interface
- `icons/` - Extension icons

## Privacy

This extension:
- Does not collect any data
- Does not track your browsing
- Does not make external network requests
- Only runs on YouTube channel pages
- Works entirely locally in your browser

## Technical Details

The extension:
- Parses video metadata from YouTube's DOM
- Filters videos based on upload date relative to the current date
- Sorts filtered videos by view count
- Maintains the original video list for easy restoration
- Uses MutationObserver to persist through YouTube's SPA navigation

## Browser Compatibility

- Chrome (tested)
- Edge (should work)
- Brave (should work)
- Other Chromium-based browsers (should work)

## Updates in Enhanced Edition

### New Features:
- **Dropdown Menu**: Clean interface for selecting time periods
- **7 Days Filter**: See the most popular videos from just the last week
- **3 Months Filter**: Perfect for quarterly content analysis
- **6 Months Filter**: Mid-term popularity trends
- **Improved UI**: Better visual feedback with dropdown arrow animation
- **Persistent Selection**: Shows currently selected time period on the button

### UI Improvements:
- Dropdown menu that matches YouTube's dark/light theme
- Smooth animations for opening/closing the dropdown
- Better button states (hover, active)
- Clearer visual hierarchy

## License

MIT License - feel free to modify and distribute!

## Contributing

Found a bug or have a feature request? Feel free to open an issue or submit a pull request!

## Support

If you find this extension helpful, please star the repository and share it with others who might benefit from it!

# Changelog

## Version 2.0.0 - Enhanced Edition (2024)

### New Features
- **Multiple Time Period Filters**: Added support for 7 days, 3 months, 6 months, and 1 year filters
- **Dropdown Menu**: Implemented a clean dropdown menu for time period selection
- **Dynamic Button Text**: Button now displays the currently selected time period
- **Improved Date Calculations**: More accurate date threshold calculations for each time period

### UI Improvements
- New dropdown menu that matches YouTube's design language
- Animated dropdown arrow that rotates when menu is open
- Better visual feedback for hover and active states
- Support for both dark and light YouTube themes
- Smooth transitions and animations

### Technical Improvements
- Refactored time period logic for better maintainability
- Added `getDateThreshold()` method for flexible date filtering
- Added `getTimePeriodText()` method for dynamic button labels
- Improved dropdown event handling and click-outside detection
- Better container structure for dropdown positioning

### Bug Fixes
- Fixed button removal detection in MutationObserver
- Improved handling of YouTube's SPA navigation
- Better cleanup when navigating between pages

## Version 1.0.0 - Original Release

### Features
- Basic "Popular This Year" filter
- Sort videos by view count within the last 12 months
- Toggle between filtered and original view
- MutationObserver to maintain button on page updates

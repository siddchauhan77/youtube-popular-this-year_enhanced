# Testing Instructions for YouTube Popular This Year Extension

## Installation Steps

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

2. **Load the Extension**
   - Click "Load unpacked"
   - Select the "YT Popular This Year" folder
   - The extension should appear in your extensions list

3. **Create Icons (Required)**
   - Open `create-icons.html` in your browser
   - Download the three icon sizes (16x16, 48x48, 128x128)
   - Save them in the `icons/` folder as:
     - `icon16.png`
     - `icon48.png` 
     - `icon128.png`

## Testing Steps

### 1. Basic Functionality Test
- Navigate to any YouTube channel page (e.g., `youtube.com/@channelname`)
- Look for the "Popular This Year" button near the sort options
- Click the button to activate the filter
- Verify that:
  - Button text changes to "Show All Videos"
  - Videos are reordered by view count
  - Only videos from past 12 months are shown

### 2. Different Channel Types
Test on various channel page formats:
- `youtube.com/@username` (new format)
- `youtube.com/channel/UC...` (channel ID format)
- `youtube.com/c/channelname` (custom URL format)
- `youtube.com/user/username` (legacy format)

### 3. Edge Cases
- Channels with no videos from past 12 months
- Channels with very few videos
- Channels with thousands of videos
- Different video sorting states (Latest, Popular, Oldest)

### 4. UI Integration
- Button should match YouTube's design
- Should work in both light and dark mode
- Should not interfere with existing YouTube functionality
- Should persist through page navigation

## Expected Behavior

### When "Popular This Year" is clicked:
1. Extracts all video data from the current page
2. Filters videos uploaded within the past 12 months
3. Sorts by total view count (highest first)
4. Updates the video display
5. Button changes to "Show All Videos"

### When "Show All Videos" is clicked:
1. Restores original video order
2. Shows all videos (not just past 12 months)
3. Button changes back to "Popular This Year"

## Troubleshooting

### Button doesn't appear:
- Check if you're on a channel page (not video page)
- Refresh the page
- Check browser console for errors

### Videos not filtering correctly:
- Check if videos have proper date information
- Verify view count parsing is working
- Check browser console for errors

### Extension not loading:
- Verify all files are in the correct location
- Check that icons are properly named and sized
- Ensure manifest.json is valid

## Debug Information

Open browser developer tools (F12) and check the Console tab for any error messages. The extension logs useful debugging information.

## Performance Notes

- Extension should work smoothly on channels with 100+ videos
- Filtering should complete within 1-2 seconds
- Should not cause page slowdown or freezing

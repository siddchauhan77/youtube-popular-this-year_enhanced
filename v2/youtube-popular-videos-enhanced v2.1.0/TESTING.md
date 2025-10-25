# Testing Guide for YouTube Popular Videos Filter Extension

## Installation Steps

### 1. Extract the Extension
1. Download `youtube-popular-videos-enhanced.zip`
2. Extract it to a folder on your computer (e.g., `Desktop/youtube-extension`)
3. Remember the location of the extracted folder

### 2. Load Extension in Chrome

1. Open Google Chrome (or any Chromium-based browser like Brave, Edge, Opera)
2. Go to `chrome://extensions/` (type this in the address bar)
3. Enable **Developer mode** (toggle switch in the top-right corner)
4. Click **Load unpacked** button (top-left)
5. Select the extracted folder containing the extension files
6. You should see the extension appear with:
   - Name: "YouTube Popular Videos Filter"
   - Version: 2.0.0
   - Status: Enabled (toggle should be blue/on)

## Testing the Extension

### Test 1: Basic Button Visibility

1. Go to any YouTube channel with many videos:
   - Examples: 
     - https://www.youtube.com/@MrBeast/videos
     - https://www.youtube.com/@veritasium/videos
     - https://www.youtube.com/@mkbhd/videos

2. Look for the filter chips bar (where you see "Latest", "Popular", "Oldest" buttons)

3. **Expected Result**: You should see a new button labeled "Popular Videos ▼" at the end

### Test 2: Dropdown Menu Functionality

1. Click on the "Popular Videos ▼" button

2. **Expected Result**: 
   - A dropdown menu appears below the button
   - Menu contains 4 options:
     * Last 7 Days
     * Last 3 Months
     * Last 6 Months
     * Last Year
   - The dropdown arrow rotates 180 degrees
   - Menu has smooth animation

3. Click outside the dropdown

4. **Expected Result**: Dropdown closes

### Test 3: 7 Days Filter

1. Open the dropdown and click "Last 7 Days"

2. **Expected Result**:
   - Dropdown closes
   - Button text changes to "Last 7 Days ▼"
   - Button gets an active state (different background color)
   - Videos are filtered to show only those uploaded in the last 7 days
   - Videos are sorted by view count (highest first)
   - Older videos disappear from the list

3. Check the first few videos - they should all say "X days ago" or "X hours ago" (where X ≤ 7)

### Test 4: 3 Months Filter

1. Open the dropdown and click "Last 3 Months"

2. **Expected Result**:
   - Button text changes to "Last 3 Months ▼"
   - Videos from the last 3 months appear
   - Sorted by view count
   - Videos older than 3 months are hidden

### Test 5: 6 Months Filter

1. Open the dropdown and click "Last 6 Months"

2. **Expected Result**:
   - Button text changes to "Last 6 Months ▼"
   - Videos from the last 6 months appear
   - Sorted by view count

### Test 6: 1 Year Filter

1. Open the dropdown and click "Last Year"

2. **Expected Result**:
   - Button text changes to "Last Year ▼"
   - Videos from the last 12 months appear
   - Sorted by view count

### Test 7: Navigation Between Pages

1. Apply any filter (e.g., "Last 3 Months")
2. Navigate to another channel
3. Check if the button appears on the new channel

**Expected Result**: 
- Button appears on the new channel
- Button resets to "Popular Videos ▼" (not active)
- Extension works on the new channel

### Test 8: Theme Support

**Dark Theme Test:**
1. Ensure YouTube is in dark mode (Settings → Appearance → Dark)
2. Check the button and dropdown styling

**Expected Result**: 
- Button has light text on dark background
- Dropdown has dark background with light text
- All elements are readable

**Light Theme Test:**
1. Switch YouTube to light mode
2. Check the button and dropdown

**Expected Result**: 
- Button has dark text on light background
- Dropdown has light background with dark text
- All elements are readable

### Test 9: Console Logging (Advanced)

1. Open Chrome DevTools (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Navigate to a YouTube channel
4. Apply any filter

**Expected Result**:
- You should see console logs like:
  - "YouTube Popular This Year: Extension initialized"
  - "YouTube Popular This Year: Channel page detected"
  - "YouTube Popular This Year: Button added to chips container"
  - "YouTube Popular This Year: Time period selected: 7days" (or other period)
  - "YouTube Popular This Year: Filtered X videos from Y total"

## Troubleshooting

### Button doesn't appear

**Possible Causes:**
1. Not on a channel's videos page (must have `/videos` in URL)
2. Extension not loaded properly
3. YouTube updated their layout

**Solutions:**
1. Make sure you're on a channel's videos page
2. Reload the extension: Go to `chrome://extensions/` → Click refresh icon on the extension
3. Reload the YouTube page (F5)
4. Check console for errors (F12 → Console tab)

### Dropdown doesn't open

**Solutions:**
1. Check if button is clickable (hover should show different color)
2. Check console for JavaScript errors
3. Reload the extension and page

### Filters don't work correctly

**Solutions:**
1. Check console logs to see if videos are being parsed
2. Some channels may have videos without proper date/view metadata
3. Try a different channel with more recent uploads

### Videos not sorting by views

**Possible Cause:** YouTube's DOM structure changed

**Solution:**
1. Check console logs - look for "Parsed video:" messages
2. If view counts show as 0, the parsing selector may need updating

## Expected Behavior Summary

✅ **What Should Work:**
- Button appears on channel videos pages
- Dropdown opens/closes smoothly
- All 4 time period options work
- Videos filter by date correctly
- Videos sort by view count
- Button text updates to show active filter
- Works in dark and light themes
- Persists through navigation
- Button re-appears on new pages

❌ **What Won't Work:**
- Extension won't appear on non-channel pages (home, watch page, etc.)
- Won't filter videos that don't have visible date/view information
- Won't work if YouTube significantly changes their DOM structure

## Verification Checklist

Use this checklist to verify everything works:

- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] Button appears on channel videos pages
- [ ] Button has correct initial text: "Popular Videos ▼"
- [ ] Clicking button opens dropdown menu
- [ ] Dropdown has 4 options (7 days, 3 months, 6 months, 1 year)
- [ ] Clicking outside closes dropdown
- [ ] Selecting "Last 7 Days" filters and sorts videos correctly
- [ ] Button text updates to "Last 7 Days ▼"
- [ ] Selecting "Last 3 Months" works correctly
- [ ] Selecting "Last 6 Months" works correctly
- [ ] Selecting "Last Year" works correctly
- [ ] Button styling matches YouTube's theme (dark/light)
- [ ] Dropdown styling matches YouTube's theme
- [ ] Navigation to new channel resets the filter
- [ ] Button persists after scrolling and loading more videos
- [ ] No console errors appear during normal operation

## Additional Test Channels

Try these channels for comprehensive testing:

**High-frequency uploaders (good for 7-day filter):**
- MrBeast: https://www.youtube.com/@MrBeast/videos
- Linus Tech Tips: https://www.youtube.com/@LinusTechTips/videos

**Medium-frequency uploaders (good for 3-6 month filters):**
- Veritasium: https://www.youtube.com/@veritasium/videos
- MKBHD: https://www.youtube.com/@mkbhd/videos

**Low-frequency uploaders (good for 1-year filter):**
- Vsauce: https://www.youtube.com/@vsauce/videos
- CGP Grey: https://www.youtube.com/@CGPGrey/videos

## Reporting Issues

If you find bugs, note:
1. What you were doing when the bug occurred
2. What you expected to happen
3. What actually happened
4. Any console error messages (F12 → Console)
5. Your browser version and OS

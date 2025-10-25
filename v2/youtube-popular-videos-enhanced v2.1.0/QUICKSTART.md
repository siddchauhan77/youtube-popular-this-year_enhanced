# Quick Start Guide - 5 Minutes to Test

## Step 1: Install (2 minutes)

1. **Extract the ZIP file**
   - Unzip `youtube-popular-videos-enhanced.zip`
   - Remember where you saved it

2. **Load in Chrome**
   - Open Chrome
   - Go to: `chrome://extensions/`
   - Turn ON "Developer mode" (top-right toggle)
   - Click "Load unpacked" button
   - Select the extracted folder
   - Done! ✅

## Step 2: Test (3 minutes)

1. **Go to a YouTube channel**
   - Try: https://www.youtube.com/@MrBeast/videos
   - Or any channel with `/videos` in the URL

2. **Find the button**
   - Look for: "Popular Videos ▼" 
   - Location: Near "Latest", "Popular", "Oldest" buttons

3. **Click the button**
   - A dropdown menu appears with:
     * Last 7 Days
     * Last 3 Months
     * Last 6 Months
     * Last Year

4. **Select "Last 7 Days"**
   - Videos filter to show only recent uploads
   - They're sorted by view count
   - Button now says "Last 7 Days ▼"

5. **Try other options**
   - Click button again
   - Select "Last 3 Months"
   - Notice different videos appear

## What Should Happen

✅ **Correct Behavior:**
- Button appears automatically on channel pages
- Dropdown opens when you click the button
- Videos filter by your selected time period
- Videos are sorted by most views first
- Button shows which filter is active

❌ **If Something's Wrong:**
1. Check you're on a channel's `/videos` page
2. Reload the page (F5)
3. Open console (F12) and look for errors
4. See TESTING.md for detailed troubleshooting

## Quick Test Checklist

- [ ] Extension installed (shows in chrome://extensions/)
- [ ] On a YouTube channel videos page
- [ ] "Popular Videos ▼" button is visible
- [ ] Clicking button opens dropdown
- [ ] Can select "Last 7 Days"
- [ ] Videos change after selection
- [ ] Button text updates to "Last 7 Days ▼"

## Need Help?

See **TESTING.md** for:
- Detailed testing procedures
- Troubleshooting common issues
- Expected vs actual behavior
- Console logging guide

See **CODE_REVIEW.md** for:
- Technical implementation details
- Security review
- Known limitations

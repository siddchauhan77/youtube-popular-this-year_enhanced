# YouTube Popular This Year Extension

A Chrome extension that adds a "Popular This Year" filter to YouTube channel pages, showing the most viewed videos from the past 12 months.

## ✨ Features

- 🎯 **Smart Filtering**: Shows videos from the past 12 months only
- 📊 **View-Based Sorting**: Sorts by total view count (highest first)
- 🎨 **Native Styling**: Matches YouTube's exact button design
- 🔄 **Persistent Button**: Stays visible when switching between tabs
- 🌙 **Dark Mode Support**: Works in both light and dark themes
- ⚡ **Fast Performance**: Efficient video parsing and filtering

## 📦 Installation

### Quick Install (3 Steps)

1️⃣ **Download**: Go to https://github.com/beckyisj/youtube-popular-this-year  
Click "Code" → "Download ZIP"

2️⃣ **Extract**: Unzip the downloaded file to a folder

3️⃣ **Install**: 
- Open Chrome → Go to `chrome://extensions/`
- Enable "Developer mode" (toggle in top right)
- Click "Load unpacked" → Select the extracted folder
- Done! 🎉

### Chrome Web Store (Coming Soon)

We're working on getting this published to the Chrome Web Store for easier installation.

## 🚀 Usage

1. **Navigate to a YouTube Channel**
   - Go to any YouTube channel page (e.g., `youtube.com/@channelname/videos`)
   - Make sure you're on the "Videos" tab

2. **Find the Button**
   - Look for "Popular This Year" in the filter row
   - It appears after "Latest", "Popular", and "Oldest" buttons

3. **Use the Filter**
   - Click "Popular This Year" to see videos from the past 12 months
   - Videos are sorted by view count (most popular first)
   - Click again to return to the original view

## 🛠️ Development

### Tech Stack
- **Manifest V3**: Latest Chrome extension standard
- **Content Scripts**: DOM manipulation and video parsing
- **CSS**: Pixel-perfect YouTube styling
- **JavaScript**: Video filtering and sorting algorithms

### Key Files
- `manifest.json` - Extension configuration and permissions
- `content-script.js` - Main functionality and video processing
- `styles.css` - Button styling to match YouTube's design
- `icons/` - Extension icons (16px, 48px, 128px)

### Features Implemented
- ✅ YouTube channel page detection
- ✅ Dynamic button injection
- ✅ Video metadata parsing (views, dates)
- ✅ 12-month date filtering
- ✅ View count sorting
- ✅ MutationObserver for persistence
- ✅ Active/inactive button states
- ✅ Dark/light mode support

## 🐛 Troubleshooting

### Button Not Appearing
- Make sure you're on a YouTube channel's "Videos" tab
- Refresh the page
- Check the browser console for error messages

### Videos Not Filtering
- Ensure the channel has videos from the past 12 months
- Check that video metadata is loading properly
- Try refreshing the page

### Button Disappears
- This should be fixed in v1.0.0 with the MutationObserver
- If it still happens, refresh the page

## 📝 Version History

### v1.0.0 (Current)
- Initial release
- Core filtering functionality
- YouTube-native button styling
- Persistence across tab changes
- Dark/light mode support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **GitHub Repository**: [youtube-popular-this-year](https://github.com/beckyisj/youtube-popular-this-year)
- **Issues**: Report bugs or request features
- **Discussions**: Share ideas and feedback
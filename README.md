# YouTube Popular This Year Chrome Extension

A Chrome extension that adds a "Popular This Year" filter button to YouTube channel pages, showing the most viewed videos from the past 12 months.

## Features

- Adds a "Popular This Year" button to YouTube channel pages
- Filters videos from the past 12 months
- Sorts videos by total view count (highest first)
- Seamlessly integrates with YouTube's existing UI
- Works on all YouTube channel page types

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will now be active on YouTube

## Usage

1. Navigate to any YouTube channel page
2. Look for the "Popular This Year" button (appears near the sort options)
3. Click the button to filter videos from the past 12 months by view count
4. Click "Show All Videos" to return to the original view

## How It Works

- The extension injects a button into YouTube's channel page interface
- When clicked, it extracts video data (views, dates) from the current page
- Filters videos uploaded within the past 12 months
- Sorts by total view count in descending order
- Updates the video display to show the filtered results

## Technical Details

- Uses Chrome Extension Manifest V3
- Content script injection on YouTube pages
- DOM manipulation to extract and reorder video elements
- Handles YouTube's dynamic loading and navigation

## Browser Support

- Chrome (Manifest V3)
- Other Chromium-based browsers (Edge, Brave, etc.)

## Privacy

This extension:
- Only runs on YouTube pages
- Does not collect or transmit any data
- Works entirely locally in your browser
- No external API calls or data sharing

# YouTube-like Video Preview

This project implements a YouTube-like video preview feature using React and TypeScript. It enhances user experience by providing quick access to video content through interactive elements.

## Features

- Interactive video previews on hover
- Playback control with a trackbar
- Audio mute/unmute functionality
- Timestamp tracking and restoration
- Responsive design
- Two modes: interactive and static

## Implementation Details

- Built with React 17+ and TypeScript
- Uses Tailwind CSS for styling
- Fetches video data from an external API
- Implements custom hooks for data fetching
- Uses React Icons for UI elements

## Components

- `App`: Main component that renders the video list
- `VideoList`: Renders a list of video previews
- `VideoPreview`: Handles individual video preview functionality
  - Supports both interactive and static modes
  - Provides callbacks for video events (start, end, resume, seek)
- `useFetchVideos`: Custom hook for fetching video data

## Key Functionalities

1. Video Hover Preview: Displays thumbnail initially, plays video after a short delay on hover
2. Video Blur Behavior: Stops playback and reverts to thumbnail when cursor leaves
3. Playback Control: Includes a trackbar for navigation and real-time timestamp display
4. Timestamp Tracking: Remembers last position (when manually navigated) for resuming playback
5. Audio Control: Allows muting/unmuting during playback

## Installation

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd video_preview
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Development

To start the development server:

```
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the port specified in the console output) to view the application.

## Building for Production

To create a production build:

```
npm run build
```

This command will create a `dist` folder with the compiled and optimized version of your application.

## Preview Production Build

To preview the production build locally:

```
npm run preview
```

## Data Source

The application fetches video data from:
```
https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json
```

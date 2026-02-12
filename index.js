/**
 * @index.js
 * 
 * This is the entry point for the React Native application.
 * Metro bundler looks for this file by default.
 */

import { registerRootComponent } from 'react-native';

// Import the main App component
import App from './src/App';

// Register and launch the app
registerRootComponent(App);

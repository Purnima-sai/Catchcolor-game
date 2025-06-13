# Catchcolor-game
![image](https://github.com/user-attachments/assets/ccd986d8-4e17-4331-9169-cced5076497d)
Table of Contents
Description

Features

How to Play

Game Rules

Controls

Installation

Customization

Future Improvements

License

Description
Color Catch is an engaging browser-based game built with HTML, CSS, and JavaScript. Players control a basket to catch falling colored balls, matching them to the current target color to score points. This project is designed to be beginner-friendly while providing an entertaining gaming experience.

Features
🎨 Color matching gameplay with 5 different colors

🏆 Score tracking with visual feedback

⏯️ Start/Stop/Reset game controls

📱 Responsive design that works on desktop and mobile

📖 Built-in instructions and rules panel

🚨 Automatic game over when score drops too low

🔄 Retry option after game over

How to Play
Move your mouse (or finger on touch devices) to control the basket

Catch balls that match the current target color (shown in the basket)

Avoid catching balls of the wrong color

Try to get the highest score possible!

Game Rules
✅ Correct catch: +10 points (matching color)

❌ Wrong catch: -5 points (wrong color)

⛔ Game over: Score drops below -20

🔀 Target color changes randomly during gameplay

Controls
Button	Action
Start	Begins or resumes the game
Stop	Pauses the game
Reset	Completely restarts the game
Try Again	Restarts after game over
Installation
No installation required! Simply:

Copy the entire HTML code

Paste it into a new file with .html extension

Open the file in any modern web browser

Alternatively, you can:

Download the repository

Open the index.html file in your browser

Customization
You can easily modify the game by editing these variables in the JavaScript:

javascript
// Change game difficulty
const ballSpeed = 2 + Math.random() * 3; // Adjust speed range
const ballInterval = 1000; // Time between new balls (ms)

// Change scoring
const correctScore = 10; // Points for correct catch
const wrongPenalty = 5;  // Points lost for wrong catch
const gameOverThreshold = -20; // Score to trigger game over

// Change colors
const colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#3498db'];
Future Improvements
Planned enhancements for future versions:

Add sound effects for catches and game events

Implement different difficulty levels

Add high score tracking

Create power-ups and special balls

Add touch controls for mobile devices

Implement a level progression system

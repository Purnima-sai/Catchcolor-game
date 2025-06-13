  const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const startButton = document.getElementById('start-btn');
        const stopButton = document.getElementById('stop-btn');
        const resetButton = document.getElementById('reset-btn');
        const retryButton = document.getElementById('retry-btn');
        const gameOverScreen = document.getElementById('game-over');
        const finalScoreElement = document.getElementById('final-score');
        const targetColorName = document.getElementById('target-color-name');
        const targetColorDisplay = document.getElementById('target-color-display');
        
        // Game variables
        let score = 0;
        let gameRunning = false;
        let gameOver = false;
        let gamePaused = false;
        let animationId;
        let ballInterval;
        let targetColor;
        
        // Color names for display
        const colorNames = {
            '#e74c3c': 'Red',
            '#2ecc71': 'Green',
            '#f1c40f': 'Yellow',
            '#9b59b6': 'Purple',
            '#3498db': 'Blue'
        };
        
        // Basket properties
        const basket = {
            width: 80,
            height: 25,
            x: canvas.width / 2 - 40,
            y: canvas.height - 40,
            color: '#3498db'
        };
        
        // Falling balls
        let balls = [];
        const colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#3498db'];
        
        // Event listeners
        canvas.addEventListener('mousemove', moveBasket);
        startButton.addEventListener('click', startGame);
        stopButton.addEventListener('click', stopGame);
        resetButton.addEventListener('click', resetGame);
        retryButton.addEventListener('click', retryGame);
        
        // Move basket with mouse
        function moveBasket(e) {
            if (!gameRunning || gameOver || gamePaused) return;
            
            const rect = canvas.getBoundingClientRect();
            basket.x = e.clientX - rect.left - basket.width / 2;
            
            // Keep basket within canvas
            if (basket.x < 0) basket.x = 0;
            if (basket.x > canvas.width - basket.width) {
                basket.x = canvas.width - basket.width;
            }
        }
        
        // Update target color display
        function updateTargetColor() {
            targetColorName.textContent = colorNames[targetColor];
            targetColorDisplay.style.backgroundColor = targetColor;
        }
        
        // Start game
        function startGame() {
            if (gameRunning && !gamePaused) return;
            
            // If game was paused, resume it
            if (gamePaused) {
                gamePaused = false;
                gameLoop();
                return;
            }
            
            // Otherwise start new game
            gameRunning = true;
            gameOver = false;
            gamePaused = false;
            score = 0;
            balls = [];
            updateScore();
            targetColor = colors[Math.floor(Math.random() * colors.length)];
            basket.color = targetColor;
            updateTargetColor();
            gameOverScreen.style.display = 'none';
            retryButton.style.display = 'none';
            
            // Start ball dropping interval
            ballInterval = setInterval(createBall, 1000);
            
            // Start game loop
            gameLoop();
        }
        
        // Stop/pause game
        function stopGame() {
            if (!gameRunning || gameOver) return;
            
            gamePaused = true;
            clearInterval(ballInterval);
            cancelAnimationFrame(animationId);
        }
        
        // Reset game
        function resetGame() {
            gameRunning = false;
            gameOver = false;
            gamePaused = false;
            score = 0;
            balls = [];
            updateScore();
            cancelAnimationFrame(animationId);
            clearInterval(ballInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBasket();
            gameOverScreen.style.display = 'none';
            retryButton.style.display = 'none';
            targetColorName.textContent = '-';
            targetColorDisplay.style.backgroundColor = 'transparent';
        }
        
        // Retry game after game over
        function retryGame() {
            resetGame();
            startGame();
        }
        
        // Check for game over
        function checkGameOver() {
            if (score <= -20 && !gameOver) {
                gameOver = true;
                gameRunning = false;
                gamePaused = false;
                clearInterval(ballInterval);
                cancelAnimationFrame(animationId);
                finalScoreElement.textContent = score;
                gameOverScreen.style.display = 'flex';
                retryButton.style.display = 'block';
            }
        }
        
        // Create new falling ball
        function createBall() {
            if (!gameRunning || gamePaused) return;
            
            const ball = {
                x: Math.random() * (canvas.width - 30),
                y: 0,
                radius: 15,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 2 + Math.random() * 3
            };
            
            balls.push(ball);
        }
        
        // Update score display
        function updateScore() {
            scoreElement.textContent = score;
        }
        
        // Draw basket
        function drawBasket() {
            ctx.fillStyle = basket.color;
            ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
            
            // Draw basket sides
            ctx.beginPath();
            ctx.moveTo(basket.x, basket.y);
            ctx.lineTo(basket.x + 15, basket.y - 15);
            ctx.lineTo(basket.x + basket.width - 15, basket.y - 15);
            ctx.lineTo(basket.x + basket.width, basket.y);
            ctx.fillStyle = '#2980b9';
            ctx.fill();
        }
        
        // Draw balls
        function drawBalls() {
            balls.forEach((ball, index) => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.fill();
                ctx.closePath();
                
                // Update ball position
                if (!gamePaused) {
                    ball.y += ball.speed;
                }
                
                // Check if ball is caught
                if (
                    ball.y + ball.radius >= basket.y && 
                    ball.x >= basket.x && 
                    ball.x <= basket.x + basket.width
                ) {
                    // Check if color matches
                    if (ball.color === targetColor) {
                        score += 10;
                    } else {
                        score -= 5;
                    }
                    
                    updateScore();
                    balls.splice(index, 1);
                    checkGameOver();
                    
                    // Change target color occasionally
                    if (Math.random() < 0.3) {
                        targetColor = colors[Math.floor(Math.random() * colors.length)];
                        basket.color = targetColor;
                        updateTargetColor();
                    }
                }
                
                // Remove ball if it goes off screen
                if (ball.y - ball.radius > canvas.height) {
                    balls.splice(index, 1);
                }
            });
        }
        
        // Main game loop
        function gameLoop() {
            if (!gameRunning || gamePaused) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawBasket();
            drawBalls();
            
            animationId = requestAnimationFrame(gameLoop);
        }
        
        // Initial draw
        drawBasket();
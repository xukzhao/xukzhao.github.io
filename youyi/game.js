class Snake {
    constructor() {
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
    }

    move(food) {
        const head = { ...this.body[0] };

        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        this.body.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            return true;
        } else {
            this.body.pop();
            return false;
        }
    }

    changeDirection(newDirection) {
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        if (opposites[this.direction] !== newDirection) {
            this.nextDirection = newDirection;
        }
    }

    update() {
        this.direction = this.nextDirection;
    }

    checkCollision(gridSize) {
        const head = this.body[0];
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileSize = this.canvas.width / this.gridSize;
        this.snake = new Snake();
        this.food = this.generateFood();
        this.score = 0;
        this.gameLoop = null;
        this.isPaused = false;

        this.bindControls();
    }

    generateFood() {
        const food = {
            x: Math.floor(Math.random() * this.gridSize),
            y: Math.floor(Math.random() * this.gridSize)
        };

        for (const segment of this.snake.body) {
            if (food.x === segment.x && food.y === segment.y) {
                return this.generateFood();
            }
        }
        return food;
    }

    bindControls() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp': this.snake.changeDirection('up'); break;
                case 'ArrowDown': this.snake.changeDirection('down'); break;
                case 'ArrowLeft': this.snake.changeDirection('left'); break;
                case 'ArrowRight': this.snake.changeDirection('right'); break;
            }
        });

        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制食物
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(
            this.food.x * this.tileSize,
            this.food.y * this.tileSize,
            this.tileSize,
            this.tileSize
        );

        // 绘制蛇
        this.ctx.fillStyle = '#4CAF50';
        this.snake.body.forEach((segment, index) => {
            this.ctx.fillRect(
                segment.x * this.tileSize,
                segment.y * this.tileSize,
                this.tileSize,
                this.tileSize
            );
        });
    }

    update() {
        this.snake.update();
        if (this.snake.move(this.food)) {
            this.score += 10;
            document.getElementById('scoreValue').textContent = this.score;
            this.food = this.generateFood();
        }

        if (this.snake.checkCollision(this.gridSize)) {
            this.gameOver();
        }
    }

    gameLoop() {
        if (!this.isPaused) {
            this.update();
            this.draw();
        }
    }

    start() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        this.snake = new Snake();
        this.food = this.generateFood();
        this.score = 0;
        document.getElementById('scoreValue').textContent = this.score;
        this.isPaused = false;
        this.gameLoop = setInterval(() => this.gameLoop(), 150);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        document.getElementById('pauseBtn').textContent = this.isPaused ? '继续' : '暂停';
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        alert(`游戏结束！得分：${this.score}`);
    }
}

window.onload = () => {
    new Game();
};
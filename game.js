window.onload = () => {
    const z = document.getElementById("audio");

    function song() {
        z.play();
    }

    function endSong() {
        z.pause();
    }

    const score = document.querySelector(".score");
    const startScreen = document.querySelector(".startScreen");
    const gameArea = document.querySelector(".gameArea");
    const up = document.querySelector('.up');
    const down = document.querySelector('.down');
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');

    console.log(gameArea);

    startScreen.addEventListener("click", start);
    startScreen.addEventListener("click", song);

    let player = { speed: 1, score: 0, start: false, x: 0, y: 0 };
    const speedIncrementThreshold = 10; // Umbral para incrementar la velocidad
    let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

    function isCollide(a, b) {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return !(
            aRect.bottom < bRect.top ||
            aRect.top > bRect.bottom ||
            aRect.right < bRect.left ||
            aRect.left > bRect.right
        );
    }

    function moveLines() {
        const lines = document.querySelectorAll(".lines");
        lines.forEach(function (item) {
            if (item.y >= 750) {
                item.y = -50;
            }
            item.y += player.speed;
            item.style.top = item.y + "px";
        });
    }

    function endGame() {
        player.start = false;
        startScreen.classList.remove("hide");
    }

    function moveEnemy(car) {
        const enemy = document.querySelectorAll(".enemy");
        enemy.forEach(function (item) {
            if (isCollide(car, item)) {
                endGame();
                endSong();
                startScreen.innerHTML =
                    "Game over Perdiste! no hay nadie peor que vos..." +
                    player.score +
                    "<br>" +
                    " Probá de nuevo o envía un mensaje con la captura de tu logro a " +
                    "<a href='mailto:djcarloshermida@outlook.com'>DJCarlosHermida</a>";
            }

            if (item.y >= 700) {
                item.y = -300;
                item.style.left = Math.floor(Math.random() * 250) + "px";
            }

            item.y += player.speed;
            item.style.top = item.y + "px";
        });
    }

    function gamePlay() {
        const car = document.querySelector(".car");
        const road = gameArea.getBoundingClientRect();

        if (player.start) {
            moveLines();
            moveEnemy(car);

            if (keys.ArrowUp && player.y > road.top + 70) {
                player.y -= player.speed;
            }
            if (keys.ArrowDown && player.y < road.bottom - 70) {
                player.y += player.speed;
            }
            if (keys.ArrowLeft && player.x > 0) {
                player.x -= player.speed;
            }
            if (keys.ArrowRight && player.x < road.width - 50) {
                player.x += player.speed;
            }

            car.style.top = player.y + "px";
            car.style.left = player.x + "px";

            window.requestAnimationFrame(gamePlay);
            score.innerText = " score: " + player.score;
            player.score++;

            // Incrementa la velocidad cada cierto puntaje
            if (player.score % speedIncrementThreshold === 0) {
                player.speed += 0.1; // Ajustar valor deseado
            }
        }
    }

    function start() {
        gameArea.classList.remove('hide');
        startScreen.classList.add('hide');

        gameArea.innerHTML = "";

        player.start = true;
        player.score = 0;
        player.speed = 1; // Reinicia la velocidad al inicio del juego
        player.x = 0;
        player.y = 0;

        window.requestAnimationFrame(gamePlay);

        for (let x = 0; x < 5; x++) {
            let roadLine = document.createElement("div");
            roadLine.setAttribute("class", "lines");
            roadLine.y = x * 150;
            roadLine.style.top = roadLine.y + "px";
            gameArea.appendChild(roadLine);
        }

        let car = document.createElement("div");
        car.setAttribute("class", "car");
        gameArea.appendChild(car);

        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        for (let x = 0; x < 3; x++) {
            let enemyCar = document.createElement("div");
            enemyCar.setAttribute("class", "enemy");
            enemyCar.y = (x + 1) * 350 * -1;
            enemyCar.style.top = enemyCar.y + "px";
            enemyCar.style.backgroundColor = randomColor();
            enemyCar.style.left = Math.floor(Math.random() * 250) + "px";
            gameArea.appendChild(enemyCar);
        }
    }

    function randomColor() {
        const c = () => {
            let hex = Math.floor(Math.random() * 256).toString(16);
            return ("0" + String(hex)).substr(-2);
        };
        return "#" + c() + c() + c();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault(); // Evita el desplazamiento del navegador
            if (e.key === "ArrowUp") keys.ArrowUp = true;
            if (e.key === "ArrowDown") keys.ArrowDown = true;
            if (e.key === "ArrowLeft") keys.ArrowLeft = true;
            if (e.key === "ArrowRight") keys.ArrowRight = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === "ArrowUp") keys.ArrowUp = false;
        if (e.key === "ArrowDown") keys.ArrowDown = false;
        if (e.key === "ArrowLeft") keys.ArrowLeft = false;
        if (e.key === "ArrowRight") keys.ArrowRight = false;
    });

    up.addEventListener('touchstart', () => {
        keys.ArrowUp = true;
    });
    up.addEventListener('touchend', () => {
        keys.ArrowUp = false;
    });
    down.addEventListener('touchstart', () => {
        keys.ArrowDown = true;
    });
    down.addEventListener('touchend', () => {
        keys.ArrowDown = false;
    });
    left.addEventListener('touchstart', () => {
        keys.ArrowLeft = true;
    });
    left.addEventListener('touchend', () => {
        keys.ArrowLeft = false;
    });
    right.addEventListener('touchstart', () => {
        keys.ArrowRight = true;
    });
    right.addEventListener('touchend', () => {
        keys.ArrowRight = false;
    });
};

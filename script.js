// Lấy tất cả các ô trong bảng
const cells = document.querySelectorAll('.cell');

// Biến để lưu người chơi hiện tại, bảng trò chơi và trạng thái trò chơi
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Biến để lưu tỉ số
let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;

// Các điều kiện thắng lợi
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Liên kết hình ảnh cho X và O
const images = {
    'X': 'https://i.ibb.co/hB9J842/blob.png',
    'O': 'https://i.ibb.co/kh902qp/blob.png'
};

// Hàm xử lý khi người chơi nhấp vào ô
const handleCellClick = (event) => {
    // Lấy ô mà người chơi đã nhấp vào và chỉ số của ô đó
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Kiểm tra nếu ô đã được đánh dấu hoặc trò chơi đã kết thúc
    if (gameBoard[index] !== '' || !isGameActive) {
        return;
    }

    // Cập nhật bảng trò chơi và hiển thị người chơi hiện tại trên ô
    gameBoard[index] = currentPlayer;
    cell.innerHTML = `<img src="${images[currentPlayer]}" alt="${currentPlayer}">`;
    cell.classList.add('show');

    // Kiểm tra xem có người chơi nào thắng chưa
    if (checkWinner()) {
        // Nếu có người thắng cuộc, cập nhật tỉ số và hiển thị thông báo
        if (currentPlayer === 'X') {
            scoreX++;
            updateScore('score-x', scoreX);
        } else {
            scoreO++;
            updateScore('score-o', scoreO);
        }
        setTimeout(() => {
            alert(`Player ${currentPlayer} has won!`);
            resetGame();
        }, 200);
        isGameActive = false;
    } else if (!gameBoard.includes('')) {
        // Nếu tất cả các ô đã được đánh dấu mà không có người thắng cuộc, cập nhật tỉ số hòa và hiển thị thông báo hòa
        scoreTie++;
        updateScore('score-tie', scoreTie);
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 200);
        isGameActive = false;
    } else {
        // Chuyển đổi người chơi
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

// Hàm kiểm tra người thắng cuộc
const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
};

// Hàm cập nhật tỉ số với hiệu ứng nhảy số
const updateScore = (scoreId, newScore) => {
    const scoreElement = document.getElementById(scoreId);
    scoreElement.textContent = newScore;

    // Thêm lớp hiệu ứng và loại bỏ sau khi hoàn tất
    scoreElement.classList.add('animated');
    scoreElement.addEventListener('animationend', () => {
        scoreElement.classList.remove('animated');
    });
};

// Hàm reset trò chơi
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('show');
    });
};

// Thêm sự kiện click cho từng ô
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
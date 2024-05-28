let tongTien = 0;
let tienCuocTai = 0;
let tienCuocXiu = 0;
let tongCuocTai = 0;
let tongCuocXiu = 0;
let timer;
let demNguoc;

const tongSoTien = document.getElementById('tongtien');
const dsLichSuKQ = document.getElementById('danhsachlichsu');

// Tai trang thai game tu Local Storage
function loadGame() {
    const luuTien = localStorage.getItem('gameTaiXiu');
    const luuKQ = localStorage.getItem('gameTaiXiu1');
    if (luuTien !== null) {
        tongTien = parseInt(luuTien);
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    }
    if (luuKQ !== null) {
        dsLichSuKQ.innerHTML = luuKQ;
    }
}

// Lưu trò chơi vào local Storage
function saveGame() {
    localStorage.setItem('gameTaiXiu', tongTien);
    localStorage.setItem('gameTaiXiu1', dsLichSuKQ.innerHTML);
}

// Bắt đầu game
function batDauDemThoiGian() {
    let thoiGian = 30;
    demNguoc = setInterval(() => {
        thoiGian--;
        document.getElementById('thoigian').innerText = `Thời gian còn lại: ${thoiGian} giây`;
        if (thoiGian <= 0) {
            clearInterval(demNguoc);
            tungXucXac();
        }
    }, 1000);
}

function batDauGame() {
    batDauDemThoiGian();
    timer = setTimeout(() => {
        batDauGame();
        loadGame();
    }, 60000);
}

function thietLapLaiGame() {
    clearInterval(demNguoc);
    clearTimeout(timer);
    document.getElementById('thoigian').innerText = "Thời gian còn lại: 15 giây";
    batDauGame();
    saveGame();
}

// Kiểm tra tiền cược Tài
document.getElementById('cuoctai').addEventListener('click', function () {
    tienCuocTai = parseInt(document.getElementById('sotiencuoctai').value);
    if (tienCuocTai > tongTien) {
        alert("Bạn không có đủ tiền cược!");
    } else {
        tongTien -= tienCuocTai;
        tongCuocTai += tienCuocTai;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
        document.getElementById('tongcuoctai').innerText = `Tổng cược Tài: ${tongCuocTai}`;
    }
});

// Kiểm tra tiền cược Xỉu
document.getElementById('cuocxiu').addEventListener('click', function () {
    tienCuocXiu = parseInt(document.getElementById('sotiencuocxiu').value);
    if (tienCuocXiu > tongTien) {
        alert("Bạn không có đủ tiền cược!");
    } else {
        tongTien -= tienCuocXiu;
        tongCuocXiu += tienCuocXiu;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
        document.getElementById('tongcuocxiu').innerText = `Tổng cược Xỉu: ${tongCuocXiu}`;
    }
});

// Tung Xúc Xắc
function tungXucXac() {
    let xucXac1 = 0;
    let xucXac2 = 0;
    if (xx1 > 0) {
        xucXac1 = +xx1;
        xucXac2 = +xx2;
        xx1 = 0;
    } else if (xx1 === 0) {
        xucXac1 = Math.floor(Math.random() * 6) + 1;
        xucXac2 = Math.floor(Math.random() * 6) + 1;
    }
    const xucXac3 = Math.floor(Math.random() * 6) + 1;
    const ketQua = xucXac1 + xucXac2 + xucXac3;

    document.getElementById('dice1').src = `images/dice${xucXac1}.png`;
    document.getElementById('dice2').src = `images/dice${xucXac2}.png`;
    document.getElementById('dice3').src = `images/dice${xucXac3}.png`;

    let hienThiKetQua = `Kết quả: ${xucXac1} + ${xucXac2} + ${xucXac3} = ${ketQua}`;
    let ketQuaTai = "", ketQuaXiu = "";
    if (ketQua === 3 || ketQua === 18) {
        hienThiKetQua += " Bạn thua!";
    } else if (ketQua >= 4 && ketQua <= 10) {
        if (tongCuocXiu > 0) {
            tongTien += tongCuocXiu + tongCuocXiu * 0.98;
            ketQuaXiu += " Bạn thắng!";
        }
        if (tongCuocTai > 0) {
            ketQuaTai += " Bạn thua!";
        }
    } else if (ketQua >= 11 && ketQua <= 17) {
        if (tongCuocTai > 0) {
            tongTien += tongCuocTai + tongCuocTai * 0.98;
            ketQuaTai += " Bạn thắng!";
        }
        if (tongCuocXiu > 0) {
            ketQuaXiu += " Bạn thua!";
        }
    }
    tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    document.getElementById('ketqua').innerText = hienThiKetQua + " " + ketQuaTai + " " + ketQuaXiu;

    // Thêm vào lịch sử
    const listItem = document.createElement('li');
    listItem.textContent = hienThiKetQua + " " + ketQuaTai + " " + ketQuaXiu;
    dsLichSuKQ.appendChild(listItem);

    tongCuocTai = 0;
    tongCuocXiu = 0;
    document.getElementById('tongcuoctai').innerText = `Tổng cược Tài: ${tongCuocTai}`;
    document.getElementById('tongcuocxiu').innerText = `Tổng cược Xỉu: ${tongCuocXiu}`;

    thietLapLaiGame();
    saveGame();
}

// Mở + Đóng giao diện lịch sử
document.getElementById('xemlichsu').addEventListener('click', function () {
    document.getElementById('book-list-overlay').classList.remove('hidden');
});

document.getElementById('donglichsu').addEventListener('click', function () {
    document.getElementById('book-list-overlay').classList.add('hidden');
});

// Mở + Đóng giao diện nạp tiền
document.getElementById('yeucaunaptien').addEventListener('click', function () {
    document.getElementById('naptien-chinh').classList.remove('hidden');
});

document.getElementById('dongnaptien').addEventListener('click', function () {
    document.getElementById('naptien-chinh').classList.add('hidden');
});

// Nạp tiền
document.getElementById('naptien').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('sotiennap').value);
    if (amount > 0) {
        tongTien += amount;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    }
    document.getElementById('naptien-chinh').classList.add('hidden');
});

// Mở + Đóng giao diện rút tiền
document.getElementById('yeucauruttien').addEventListener('click', function () {
    document.getElementById('ruttien-chinh').classList.remove('hidden');
});

document.getElementById('dongruttien').addEventListener('click', function () {
    document.getElementById('ruttien-chinh').classList.add('hidden');
});

// Rút tiền
document.getElementById('ruttien').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('sotienrut').value);
    if (amount > 0 && amount <= tongTien) {
        tongTien -= amount;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    } else if (amount > tongTien) {
        alert("Bạn rút quá số tiền hiện có!");
    } else if (amount <= 0) {
        alert("Số tiền rút không hợp lệ!");
    }
    document.getElementById('ruttien-chinh').classList.add('hidden');
});
// Mở + Đóng giao diện can thiệp ket qua
document.getElementById('yeucaucanthiep').addEventListener('click', function () {
    document.getElementById('canthiepxucxac').classList.remove('hidden');
});

document.getElementById('dongcanthiep').addEventListener('click', function () {
    document.getElementById('canthiepxucxac').classList.add('hidden');
});

// Can thiệp xúc xắc
let xx1 = 0;
let xx2 = 0;
document.getElementById('apdungcanthiep').addEventListener('click', function () {
    const thayDoi1 = document.getElementById('canthiepxx1').value;
    const thayDoi2 = document.getElementById('canthiepxx2').value;
    xx1 = thayDoi1;
    xx2 = thayDoi2;
    document.getElementById('canthiepxucxac').classList.add('hidden');
});


// Bắt đầu ván game đầu tiên khi trang được tải
window.onload = () => {
    loadGame();
    batDauGame();
};

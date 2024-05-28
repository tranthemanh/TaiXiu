let tongTien = 0;
let tienCuocTai = 0;
let tienCuocXiu = 0;
let tongCuocTai = 0;
let tongCuocXiu = 0;
let timer;
let demNguoc;
let lichsukq = 0;

const tongSoTien = document.getElementById('tongtien');
const dsLichSuKQ = document.getElementById('danhsachlichsu');

//Tai trang thai game tu Local Storage
function loadGame() {
    const luuTien = localStorage.getItem('gameTaiXiu');
    const luuKQ = localStorage.getItem('gameTaiXiu1');
    if (luuTien !== null) {
        tongTien = parseInt(luuTien);
        tongSoTien.textContent = tongTien;
    }
    if (luuKQ !== null) {
        lichsukq = parseInt(luuKQ);
        dsLichSuKQ.textContent = lichsukq;
    }

}
//Lưu trò chơi vào local Storage
function saveGame() {
    localStorage.setItem('gameTaiXiu', tongTien);
    localStorage.setItem('gameTaiXiu1', lichsukq);
}

//Bat dau game
function batDauDemThoiGian() {
    let thoiGian = 15;
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

//Kiem tra tien cuoc Tai
document.getElementById('cuoctai').addEventListener('click', function () {
    tienCuocTai = parseInt(document.getElementById('sotiencuoctai').value);
    if (tienCuocTai > tongTien) {
        alert("Bạn không có đủ tiền cược!");
    } else {
        tongTien -= tienCuocTai;
        tongCuocTai += tienCuocTai;
        document.getElementById('tongtien').innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
        document.getElementById('tongcuoctai').innerText = `Tổng cược Tài: ${tongCuocTai}`;
    }
});

//Kiem tra tien cuoc Xiu
document.getElementById('cuocxiu').addEventListener('click', function () {
    tienCuocXiu = parseInt(document.getElementById('sotiencuocxiu').value);
    if (tienCuocXiu > tongTien) {
        alert("Bạn không có đủ tiền cược!");
    } else {
        tongTien -= tienCuocXiu;
        tongCuocXiu += tienCuocXiu;
        document.getElementById('tongtien').innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
        document.getElementById('tongcuocxiu').innerText = `Tổng cược Xỉu: ${tongCuocXiu}`;
    }
});

//Tung Xuc Xac
function tungXucXac() {
    const xucXac1 = Math.floor(Math.random() * 6) + 1;
    const xucXac2 = Math.floor(Math.random() * 6) + 1;
    const xucXac3 = Math.floor(Math.random() * 6) + 1;
    const ketQua = xucXac1 + xucXac2 + xucXac3;

    document.getElementById('dice1').src = `images/dice${xucXac1}.png`;
    document.getElementById('dice2').src = `images/dice${xucXac2}.png`;
    document.getElementById('dice3').src = `images/dice${xucXac3}.png`;

    let hienThiKetQua = `Ket qua: ${xucXac1} + ${xucXac2} + ${xucXac3} = ${ketQua}`;
    let ketQuaTai = "", ketQuaXiu = "";
    if (ketQua === 3 || ketQua === 18) {
        hienThiKetQua += "Bạn thua!";
    } else if (ketQua >= 4 && ketQua <= 10) {
        if (tongCuocXiu > 0) {
            tongTien += tongCuocXiu + tongCuocXiu * 0.98;
            ketQuaXiu += "Bạn thắng!";
        }
        if (tongCuocTai > 0) {
            ketQuaTai += "Bạn thua!";
        }
    } else if (ketQua >= 11 && ketQua <= 17) {
        if (tongCuocTai > 0) {
            tongTien += tongCuocTai + tongCuocTai * 0.98;
            ketQuaTai += "Bạn thắng!";
        }
        if (tongCuocXiu > 0) {
            ketQuaXiu += "Bạn thua!";
        }
    }
    document.getElementById('tongtien').innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    document.getElementById('ketqua').innerText = hienThiKetQua + " " + ketQuaTai + " " + ketQuaXiu;

    //Them vao lich su
    const danhSachLichSua = document.getElementById('danhsachlichsu');
    const listItem = document.createElement('li');
    listItem.textContent = hienThiKetQua + " " + ketQuaTai + " " + ketQuaXiu;
    danhSachLichSua.appendChild(listItem);

    tongCuocTai = 0;
    tongCuocXiu = 0;
    document.getElementById('tongcuoctai').innerText = `Tổng cược Tài: ${tongCuocTai}`;
    document.getElementById('tongcuocxiu').innerText = `Tổng cược Xỉu: ${tongCuocXiu}`;

    thietLapLaiGame();
    saveGame();
}

//Mo + Dong giao dien lich su
document.getElementById('xemlichsu').addEventListener('click', function () {
    document.getElementById('book-list-overlay').classList.remove('hidden');
});

document.getElementById('donglichsu').addEventListener('click', function () {
    document.getElementById('book-list-overlay').classList.add('hidden');
});
//Mo + Dong giao dien nap tien
document.getElementById('yeucaunaptien').addEventListener('click', function () {
    document.getElementById('naptien-chinh').classList.remove('hidden');
});

document.getElementById('naptien').addEventListener('click', function () {
    document.getElementById('naptien-chinh').classList.add('hidden');
});
document.getElementById('dongnaptien').addEventListener('click', function () {
    document.getElementById('naptien-chinh').classList.add('hidden');
});

//Nap tien
document.getElementById('naptien').addEventListener('click', function () {
    const amount = +document.getElementById('sotiennap').value;
    if (amount > 0) {
        tongTien += amount;
        document.getElementById('tongtien').innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    }
});

//Mo + Dong giao dien rút tien
document.getElementById('yeucauruttien').addEventListener('click', function () {
    document.getElementById('ruttien-chinh').classList.remove('hidden');
});

document.getElementById('ruttien').addEventListener('click', function () {
    document.getElementById('ruttien-chinh').classList.add('hidden');
});
document.getElementById('dongruttien').addEventListener('click', function () {
    document.getElementById('ruttien-chinh').classList.add('hidden');
});

//Rut tien
document.getElementById('ruttien').addEventListener('click', function () {
    const amount = +document.getElementById('sotienrut').value;
    if (tongTien <= 0) {
        alert("Bạn không có tiền để rút!");
    } else if (tongTien > 0 && amount > tongTien) {
        alert("Bạn rút quá số tiền hiện có!");
    } else if (amount > 0 && tongTien > 0) {
        tongTien -= amount;
        document.getElementById('tongtien').innerText = `Số tiền hiện có: ${tongTien.toFixed(2)}`;
    }
});

// Bắt đầu ván game đầu tiên khi trang được tải
window.onload = batDauGame;
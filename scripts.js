let tongTien = 0;
let tienCuocTai = 0;
let tienCuocXiu = 0;
let tongCuocTai = 0;
let tongCuocXiu = 0;
let timer;
let demNguoc;
let tongKQTai = 0;
let tongKQXiu = 0;

const tongSoTien = document.getElementById('tongtien');
const dsLichSuKQ = document.getElementById('danhsachlichsu');
const dsLichSuKQTai = document.getElementById('tongtai');
const dsLichSuKQXiu = document.getElementById('tongxiu');

// Tai trang thai game tu Local Storage
function loadGame() {
    const luuTien = localStorage.getItem('gameTaiXiu');
    const luuKQ = localStorage.getItem('gameTaiXiu1');
    const luuKQTai = localStorage.getItem('gameTaiXiu2');
    const luuKQXiu = localStorage.getItem('gameTaiXiu3');
    if (luuTien !== null) {
        tongTien = parseInt(luuTien);
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toLocaleString('vi-VN')} đ`;
    }
    if (luuKQ !== null) {
        dsLichSuKQ.innerHTML = luuKQ;
    }
    if (luuKQTai !== null) {
        tongKQTai = parseInt(luuKQTai);
        dsLichSuKQTai.innerText = `Tổng kết quả Tài: ${tongKQTai}`;
    }
    if (luuKQXiu !== null) {
        tongKQXiu = parseInt(luuKQXiu);
        dsLichSuKQXiu.innerText = `Tổng kết quả Xỉu: ${tongKQXiu}`;
    }
}

// Lưu trò chơi vào local Storage
function saveGame() {
    localStorage.setItem('gameTaiXiu', tongTien);
    localStorage.setItem('gameTaiXiu1', dsLichSuKQ.innerHTML);
    localStorage.setItem('gameTaiXiu2', tongKQTai);
    localStorage.setItem('gameTaiXiu3', tongKQXiu);
}

// Bắt đầu game
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
    tongSoTaiVaXiu();
}

//Nhập giá trị bằng tiền việt nam trong input
function nhapTienViet(input) {
    // Lấy giá trị hiện tại của input và loại bỏ ký tự VNĐ
    let value = input.value.replace(/[^0-9]/g, '');

    // Định dạng giá trị với dấu phẩy sau mỗi 3 chữ số
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    input.value = value;
}

// Kiểm tra tiền cược Tài
document.getElementById('cuoctai').addEventListener('click', function () {
    tienCuocTai = parseInt(document.getElementById('sotiencuoctai').value.replace(/,/g, ''));
    if (tienCuocTai > tongTien) {
        alert("Bạn không có đủ tiền cược!");
    } else {
        tongTien -= tienCuocTai;
        tongCuocTai += tienCuocTai;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toLocaleString('vi-VN')} đ`;
        document.getElementById('tongcuoctai').innerText = `Tổng cược Tài: ${tongCuocTai.toLocaleString('vi-VN')} đ`;
    }
});

// Kiểm tra tiền cược Xỉu
document.getElementById('cuocxiu').addEventListener('click', function () {
    tienCuocXiu = parseInt(document.getElementById('sotiencuocxiu').value.replace(/,/g, ''));
    if (tienCuocXiu > tongTien) {
        alert("Bạn không có đủ tiền cược!");
    } else {
        tongTien -= tienCuocXiu;
        tongCuocXiu += tienCuocXiu;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toLocaleString('vi-VN')} đ`;
        document.getElementById('tongcuocxiu').innerText = `Tổng cược Xỉu: ${tongCuocXiu.toLocaleString('vi-VN')} đ`;
    }
});

function tongSoTaiVaXiu() {
    let tongKQTai1 = 0;
    let tongKQXiu2 = 0;

    //kiểm tra tổng số lần ra tài và xỉu
    let list = dsLichSuKQ.children
    console.log(dsLichSuKQ.children)
    for (let i = 0; i < list.length; i++) {
        let kq = list[i].innerText.split(' ')
        let ch = 0
        if (kq.length === 11) {
            ch = parseInt(kq[kq.length - 3])
        } else {
            ch = parseInt(kq[kq.length - 1])
        }
        if (ch < 11) {
            tongKQXiu2++;
        } else {
            tongKQTai1++;
        }
    }
    dsLichSuKQTai.innerText = `Tổng kết quả Tài: ${tongKQTai1}`;
    dsLichSuKQXiu.innerText = `Tổng kết quả Xỉu: ${tongKQXiu2}`;
}

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
    if (ketQua >= 3 && ketQua <= 10) {
        if (tongCuocXiu > 0) {
            tongTien += tongCuocXiu + tongCuocXiu * 0.98;
            ketQuaXiu += " Bạn thắng!";
        }
        if (tongCuocTai > 0) {
            ketQuaTai += " Bạn thua!";
        }
    } else if (ketQua >= 11 && ketQua <= 18) {
        if (tongCuocTai > 0) {
            tongTien += tongCuocTai + tongCuocTai * 0.98;
            ketQuaTai += " Bạn thắng!";
        }
        if (tongCuocXiu > 0) {
            ketQuaXiu += " Bạn thua!";
        }
    }
    tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toLocaleString("vi-VN")} đ`;
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
    const amount = parseFloat(document.getElementById('sotiennap').value.replace(/,/g, ''));
    if (amount > 0) {
        tongTien += amount;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toLocaleString('vi-VN')} đ`;
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
    const amount = parseFloat(document.getElementById('sotienrut').value.replace(/,/g, ''));
    if (amount > 0 && amount <= tongTien) {
        tongTien -= amount;
        tongSoTien.innerText = `Số tiền hiện có: ${tongTien.toLocaleString('vi-VN')} đ`;
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

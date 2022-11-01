var dsNhanVien = [];

window.onload = function () {
  getData();
};

function khoiTaoNV() {
  // 1. Lấy thông tin người dùng nhập từ input
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var mkNV = document.getElementById("password").value;
  var ngayLamNV = document.getElementById("datepicker").value;
  var luongNV = document.getElementById("luongCB").value;
  var chucVuNV = document.getElementById("chucvu").value;
  var gioLamNV = document.getElementById("gioLam").value;

  // 1.5. Kiểm tra tkNV có bị trùng không
  for (var i = 0; i < dsNhanVien.length; i++) {
    if (dsNhanVien[i].tk === tkNV) {
      alert("Tài khoản này đã tồn tại!");
      return;
    }
  }

  // 2. Tạo đối tượng nhân viên từ thông tin người dùng nhập
  var nhanvien = new NhanVien(
    tkNV,
    tenNV,
    emailNV,
    mkNV,
    ngayLamNV,
    luongNV,
    chucVuNV,
    gioLamNV
  );

  // 3. Thêm nhân viên mới vào danh sách
  dsNhanVien.push(nhanvien);
  // in danh sách nhân viên ra bảng
  inDsNhanVien();
  // lưu ds nhân viên xuống local storage
  saveData();
}

function inDsNhanVien(data) {
  if (!data) data = dsNhanVien;
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
        <tr>
            <td>${data[i].tk}</td>
            <td>${data[i].hoTen}</td>
            <td>${data[i].email}</td>
            <td>${data[i].ngayLam}</td>
            <td>${data[i].chucVu}</td>
        </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}

function saveData() {
  var dsNhanVienJSON = JSON.stringify(dsNhanVien);
  localStorage.setItem("DS", dsNhanVienJSON);
}

function getData() {
  var dsNhanVienJSON = localStorage.getItem("DS");
  if (!dsNhanVienJSON) return;
  var dsNhanVienLocal = JSON.parse(dsNhanVienJSON);
  dsNhanVien = mapData(dsNhanVienLocal);
  inDsNhanVien();
}

function mapData(dataFromLocal) {
  var ketqua = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var dsNvCu = dataFromLocal[i];
    var dsNvMoi = new NhanVien(
      dsNvCu.tk,
      dsNvCu.hoTen,
      dsNvCu.email,
      dsNvCu.mk,
      dsNvCu.ngayLam,
      dsNvCu.luong,
      dsNvCu.chucVu,
      dsNvCu.gioLam
    );
    ketqua.push(dsNvMoi);
  }
  return ketqua;
}

// function tongLuong() {
//     var chonChucVu = document.getElementById("chucvu").value;
//     switch (chonChucVu) {
//       case 1:
//         alert("Chưa chọn chức vụ");
//         break;
//       case 2:
//         return NhanVien.luong * 3;
//       case 3:
//         return NhanVien.luong * 2;
//       case 4:
//         return NhanVien.luong;
//     }
//   };
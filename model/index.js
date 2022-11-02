var dsNhanVien = [];

window.onload = function () {
  getData();
};

function validateForm() {
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var mkNV = document.getElementById("password").value;

  var isValid = true;

  isValid &= kiemTraNhap(tkNV, "tbTKNV") && ktDoDai(tkNV, "tbTKNV", 4, 6);
  isValid &= kiemTraNhap(tenNV, "tbTen") && ktTenNV(tenNV, "tbTen");
  isValid &= kiemTraNhap(emailNV, "tbEmail") && ktEmail(emailNV, "tbEmail");
  isValid &=
    kiemTraNhap(mkNV, "tbMatKhau") &&
    ktDoDai(mkNV, "tbMatKhau", 6, 10) &&
    ktMatKhau(mkNV, "tbMatKhau");

  return isValid;
}

function khoiTaoNV() {
  // validate dữ liệu
  var isValid = validateForm();
  if (!isValid) return;

  // 1. Lấy thông tin người dùng nhập từ input
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var mkNV = document.getElementById("password").value;
  var ngayLamNV = document.getElementById("datepicker").value;
  var luongNV = +document.getElementById("luongCB").value;
  var chucVuNV = document.getElementById("chucvu").value;
  var gioLamNV = +document.getElementById("gioLam").value;

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
            <td>${data[i].tongLuong()}</td>
            <td>${data[i].loaiNV()}</td>
            <td>
            <button
              onclick="xoaNhanVien('${data[i].tk}')"
              class="btn btn-danger"
            >
              Xóa
            </button>
            <button
              onclick="layThongTin('${data[i].tk}')"
              class="btn btn-info"
              data-toggle="modal"
              data-target="#myModal"
            >
              Cập nhật
            </button>
            </td>
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

function findById(id) {
  for (var i = 0; i < dsNhanVien.length; i++) {
    if (dsNhanVien[i].tk === id) {
      return i;
    }
  }
  return -1;
}

function xoaNhanVien(taiKhoanNV) {
  var index = findById(taiKhoanNV);
  if (index === -1) {
    alert("Không tìm thấy tài khoản phù hợp");
    return;
  }
  dsNhanVien.splice(index, 1);
  inDsNhanVien();
  saveData();
}

// đưa thông tin của nhân viên muốn update lên form
function layThongTin(taiKhoanNV) {
  var index = findById(taiKhoanNV);
  if (index === -1) {
    alert("Không tìm thấy tài khoản phù hợp");
    return;
  }
  var nhanVien = dsNhanVien[index];

  document.getElementById("tknv").value = nhanVien.tk;
  document.getElementById("name").value = nhanVien.hoTen;
  document.getElementById("email").value = nhanVien.email;
  document.getElementById("password").value = nhanVien.mk;
  document.getElementById("datepicker").value = nhanVien.ngayLam;
  document.getElementById("luongCB").value = nhanVien.luong;
  document.getElementById("chucvu").value = nhanVien.chucVu;
  document.getElementById("gioLam").value = nhanVien.gioLam;

  document.getElementById("tknv").disabled = true;

  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline";
}

// cho người dùng sửa trên form, người dùng nhấn nút cập nhật => cập nhật
function capNhatNV() {
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var mkNV = document.getElementById("password").value;
  var ngayLamNV = document.getElementById("datepicker").value;
  var luongNV = +document.getElementById("luongCB").value;
  var chucVuNV = document.getElementById("chucvu").value;
  var gioLamNV = +document.getElementById("gioLam").value;

  var index = findById(tkNV);
  if (index === -1) {
    alert("Không tìm thấy id phù hợp");
    return;
  }

  var nhanVien = dsNhanVien[index];
  nhanVien.hoTen = tenNV;
  nhanVien.email = emailNV;
  nhanVien.mk = mkNV;
  nhanVien.ngayLam = ngayLamNV;
  nhanVien.luong = luongNV;
  nhanVien.chucVu = chucVuNV;
  nhanVien.gioLam = gioLamNV;

  saveData();
  getData();

  document.getElementById("formQLNV").reset();
  document.getElementById("tknv").disabled = false;
}

function btnThemNV() {
  document.getElementById("formQLNV").reset();
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "inline";
}

function timNhanVien() {
  var ketqua = [];
  var keyword = document.getElementById("searchName").value;

  for (var i = 0; i < dsNhanVien.length; i++) {
    var timLoaiNV = dsNhanVien[i].loaiNV();

    if (timLoaiNV.includes(keyword)) {
      ketqua.push(dsNhanVien[i]);
    }
  }
  inDsNhanVien(ketqua);
}

// VALIDATE
function kiemTraNhap(value, spanId) {
  if (value.length === 0) {
    document.getElementById(spanId).innerHTML = "* Bắt buộc nhập";
    document.getElementById(spanId).style.display = "inline";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

function ktDoDai(value, spanId, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanId
    ).innerHTML = `* Độ dài phải từ ${min} tới ${max} kí tự`;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

function ktTenNV(value, spanId) {
  var pattern = /^[A-z ]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "* Chỉ được nhập chữ";
  return false;
}

function ktEmail(value, spanId) {
  var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "* Định dạng email không đúng";
  return false;
}

function ktMatKhau(value, spanId) {
  var pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_:.]).*$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML =
    "* Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}

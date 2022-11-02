function NhanVien(TK, HoTen, Email, MK, NgayLam, Luong, ChucVu, GioLam) {
  this.tk = TK;
  this.hoTen = HoTen;
  this.email = Email;
  this.mk = MK;
  this.ngayLam = NgayLam;
  this.luong = Luong;
  this.chucVu = ChucVu;
  this.gioLam = GioLam;

  this.loaiNV = function () {
    if (GioLam < 160) {
      return "Trung bình";
    } else if (GioLam < 176) {
      return "Khá";
    } else if (GioLam < 192) {
      return "Giỏi";
    } else {
      return "Xuất sắc";
    }
  };
  this.tongLuong = function () {
    switch (ChucVu) {
      case "Sếp":
        return Luong * 3;
      case "Trưởng phòng":
        return Luong * 2;
      case "Nhân viên":
        return Luong;
    }
  };
}

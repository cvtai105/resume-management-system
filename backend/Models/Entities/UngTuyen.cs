using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class UngTuyen
    {
        public int Id { get; set; }
        public DateTime? NgayUngTuyen { get; set; }
        public int DangTuyenId { get; set; } = 0;
        public string? DanhGia { get; set; }
        public int UngVienId{get; set;}
        public DateTime? NgayKiemDuyen { get; set; }
        public string? TrangThai{get; set;} = String.Empty;
        public int? NhanVienKiemDuyenId { get; set; }
        public NhanVien? NhanVienKiemDuyen { get; set; }
        public DangTuyen? DangTuyen { get; set; }
        public UngVien? UngVien{get; set;}
        public List<HoSoUngTuyen>? HoSoUngTuyens { get; set; }
    }
}
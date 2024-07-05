using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Models.Entities
{
    public class ThanhToan
    {
        public int Id { get; set; }
        public int SoTien { get; set; }
        public bool DaThanhToan { get; set; } = false;
        public DateTime? HanThanhToan { get; set; }
        // [JsonIgnore]
        public int DangTuyenId { get; set; }
        public int HinhThucThanhToanId { get; set; }
        public List<DotThanhToan>? DotThanhToans { get; set; }
        // [JsonIgnore]
        public DangTuyen? DangTuyen { get; set; } 
        
    }
}
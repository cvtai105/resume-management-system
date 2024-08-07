using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Models.Entities
{
    public class HinhThucDangTuyen
    {
        public int Id { get; set; }
        public string TenHinhThuc { get; set; } = String.Empty;
        public string? MoTa { get; set; }
        // [JsonIgnore]
        public List<DangTuyen>? DangTuyens { get; set; }
    }
}
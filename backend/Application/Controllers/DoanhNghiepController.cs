using BusinessLogic;
using Microsoft.AspNetCore.Mvc;
using Models.Entities;
using Models.RequestModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Controllers{
    [Route("api/dangkydoanhnghiep")]
    [ApiController]
    public class DoanhNghiepController : ControllerBase {
        private readonly DoanhNghiepBL _doanhNghiepBL;

        public DoanhNghiepController(DoanhNghiepBL doanhNghiepBL)
        {
            _doanhNghiepBL = doanhNghiepBL;
        }

        [HttpPost]
        public async Task<ActionResult<DoanhNghiep>> AddDoanhNghiep(DoanhNghiepRequestModel request) {
            var doanhnghiep = new DoanhNghiep{
                TenDoanhNghiep = request.TenDoanhNghiep,
                MaSoThue = request.MaSoThue,
                DienThoai = request.DienThoai,
                NhanVienDangKyId = request.NhanVienDangKyId,
                XacNhan = request.XacNhan,
                Email = request.Email,
                MatKhau = request.MatKhau
            };
            Console.WriteLine(request);
            var addDoanhNghiep = await _doanhNghiepBL.Register(doanhnghiep);
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<DoanhNghiep>> GetDoanhNghiepByEmail(String gmail)
        {
            var doanhnghiep = await _doanhNghiepBL.GetDoanhNghiepByEmail(gmail);
            if (doanhnghiep == null)
            {
                return NotFound();
            }
            return Ok(doanhnghiep);
        }
    }
}
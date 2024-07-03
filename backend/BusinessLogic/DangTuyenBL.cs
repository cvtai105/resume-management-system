using DataAccess.DAOs;
using Models.Entities;
using Models.RequestModel;

namespace BusinessLogic
{
    public class DangTuyenBL
    {
       private readonly DangTuyenDAO _dangTuyenDAO;
        private readonly TieuChiTuyenDungDAO _tieuChiTuyenDungDAO;
        private readonly DoanhNghiepDAO _doanhNghiepDAO;
        private readonly HinhThucDangTuyenDAO _hinhThucDangTuyenDAO;
        private readonly NhanVienDAO _nhanVienDAO;
        private readonly UuDaiDAO _uuDaiDAO;
        private readonly DotThanhToanDAO _dotThanhToanDAO;
        private readonly ThanhToanDAO _thanhToanDAO;

        public DangTuyenBL(DangTuyenDAO dangTuyenDAO, TieuChiTuyenDungDAO tieuChiTuyenDungDAO, DoanhNghiepDAO doanhNghiepDAO, HinhThucDangTuyenDAO hinhThucDangTuyenDAO, NhanVienDAO nhanVienDAO, UuDaiDAO uuDaiDAO, DotThanhToanDAO dotThanhToanDAO, ThanhToanDAO thanhToanDAO)
        {
            _dangTuyenDAO = dangTuyenDAO;
            _tieuChiTuyenDungDAO = tieuChiTuyenDungDAO;
            _doanhNghiepDAO = doanhNghiepDAO;
            _hinhThucDangTuyenDAO = hinhThucDangTuyenDAO;
            _nhanVienDAO = nhanVienDAO;
            _uuDaiDAO = uuDaiDAO;
            _dotThanhToanDAO = dotThanhToanDAO;
            _thanhToanDAO = thanhToanDAO;
        }

        public async Task<DangTuyen> AddDangTuyen(DangTuyen dangTuyen)
        {
            var doanhNghiep = await _doanhNghiepDAO.GetById(dangTuyen.DoanhNghiepId);
            if (doanhNghiep == null)
            {
                throw new ArgumentException("Doanh nghiệp không tồn tại.");
            }
            dangTuyen.DoanhNghiep = doanhNghiep;

            // Validate and assign HinhThucDangTuyen if it is provided
            if (dangTuyen.HinhThucDangTuyenId.HasValue)
            {
                var hinhThucDangTuyen = await _hinhThucDangTuyenDAO.GetById(dangTuyen.HinhThucDangTuyenId.Value);
                if (hinhThucDangTuyen == null)
                {
                    throw new ArgumentException("Hình thức đăng tuyển không tồn tại.");
                }
                dangTuyen.HinhThucDangTuyen = hinhThucDangTuyen;
            }

            // Validate and assign NhanVienKiemDuyet if it is provided
            dangTuyen.NhanVienKiemDuyet = null;
            dangTuyen.UuDai = null;


           var addedDangTuyen = await _dangTuyenDAO.Add(dangTuyen);

           foreach (var payment in dangTuyen.ThanhToans)
            {
                payment.DangTuyenId = addedDangTuyen.Id;
                var addedThanhToan = await _thanhToanDAO.Add(payment);

                foreach (var installment in payment.DotThanhToans)
                {
                    installment.ThanhToanId = addedThanhToan.Id;
                    await _dotThanhToanDAO.Add(installment);
                }
            }

            // Add TieuChiTuyenDungs
            foreach (var criteria in dangTuyen.TieuChiTuyenDungs)
            {
                criteria.DangTuyenId = addedDangTuyen.Id;
                await _tieuChiTuyenDungDAO.Add(criteria);
            }

            

            // Add Payment Information
            // var thanhToan = new ThanhToan
            // {
            //     DangTuyenId = addedDangTuyen.Id,
            //     SoTien = request.TotalAmount,
            //     HanThanhToan = DateTime.UtcNow,
            // };
            // if (request.PaymentMethod == "Chuyển khoản"){
            //     thanhToan.DaThanhToan = true;
            //     thanhToan.HinhThucThanhToanId = 1;
            // }
            // else {
            //     thanhToan.DaThanhToan = false;
            //     thanhToan.HinhThucThanhToanId = 2;
            // }
            // var addedThanhToan = await _thanhToanDAO.Add(thanhToan);

            // if (request.PaymentType == "part")
            // {
            //     var dotThanhToan = new DotThanhToan
            //     {
            //         ThanhToanId = addedThanhToan.Id,
            //         SoTien = request.InstallmentAmount,
            //         NgayThanhToan = DateTime.UtcNow,
            //     };
            //     if (request.PaymentMethod == "Chuyển khoản"){
            //         dotThanhToan.HinhThucThanhToanId = 1;
            //     }
            //     else{
            //         dotThanhToan.HinhThucThanhToanId = 2;
            //     }
            //     await _dotThanhToanDAO.Add(dotThanhToan);
            // }
            return addedDangTuyen;
        }

        public async Task<DangTuyen?> GetDangTuyenById(int id)
        {
            return await _dangTuyenDAO.GetById(id);
        }
    }
}
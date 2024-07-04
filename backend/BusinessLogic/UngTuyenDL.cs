
using DataAccess.DAOs;
using Models.Entities;
using Models.RequestModel;
using DataAccess.Data;

public class UngTuyenBL
    {
        private readonly UngTuyenDAO _ungTuyenDAO;

        public UngTuyenBL(UngTuyenDAO ungTuyenDAO)
        {
            _ungTuyenDAO = ungTuyenDAO;
        }

        public async Task<IEnumerable<UngTuyen>> GetDoanhSachUngTuyenByIdBaiDang(int id)
        {
            return await _ungTuyenDAO.GetDoanhSachUngTuyenByIdBaiDang(id);
        }
    }
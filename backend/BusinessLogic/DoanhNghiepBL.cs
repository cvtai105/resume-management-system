using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.DAOs;
using Models.Entities;
using Models.RequestRecords;

namespace BusinessLogic
{
    public class DoanhNghiepBL(DoanhNghiepDAO doanhNghiepDAO)
    {
        private readonly DoanhNghiepDAO _doanhNghiepDAO = doanhNghiepDAO;

        public async Task<bool> IsValidUser (LoginRecord loginRecord)
        {
            var doanhNghiep = await _doanhNghiepDAO.GetByEmail(loginRecord.Email);
            return doanhNghiep != null && doanhNghiep.MatKhau == loginRecord.Password;
        }

        public async Task<DoanhNghiep?> Register(DoanhNghiep? doanhNghiep)
        {
            if (doanhNghiep == null)
            {
                return null;
            }
            return await _doanhNghiepDAO.Add(doanhNghiep);
        }
        
    }
}
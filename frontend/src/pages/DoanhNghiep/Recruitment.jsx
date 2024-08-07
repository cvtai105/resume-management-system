// src/components/ThongTinUngTuyen.js
import { useState, useEffect } from 'react';
import React  from 'react';
import { useParams} from 'react-router-dom';


const fetchApplicants = async (idDangTuyen) => {
  const response = await fetch(`http://localhost:5231/api/doanhnghiep/dangtuyen/${idDangTuyen}`);
  const data = await response.json();
  return data;
}

const Recruitment = () => {
  const idDangTuyen = useParams().id;
  console.log(idDangTuyen);

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants(idDangTuyen).then(data => setApplicants(data));
  }, [idDangTuyen]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thông Tin Ứng Tuyển</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {applicants.map((applicant, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img src={applicant.anhDaiDien} alt={applicant.hoTen} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center mb-2">{applicant.hoTen}</h2>
            <p className="text-center mb-2">Email: <a href={`mailto:${applicant.email}`} className="text-blue-500">{applicant.email}</a></p>
            <p className="text-center mb-2">Số điện thoại: {applicant.soDienThoai}</p>
            <div className="text-center mb-2">
              <a href={applicant.fileHoSo} className="text-white bg-blue-500 px-4 py-2 rounded-full">Tải CV</a>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="bg-coral-pink px-4 py-2 rounded-full">Từ chối</button>
              <button className="bg-teal px-4 py-2 rounded-full">Chấp nhận</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;
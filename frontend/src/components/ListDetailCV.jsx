import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { FaListUl, FaDollarSign, FaCalendarAlt, FaUsers, FaBriefcase, FaEnvelope, FaFileAlt,FaBirthdayCake  } from 'react-icons/fa'; // Ensure you have react-icons installed
const hostUngVienImgUrl = process.env.REACT_APP_UNGVIENIMAGE_URL;
const hostCVUrl = process.env.REACT_APP_CV_URL;
function ListDetailCV({ formData }) {
  let [data, setDangTuyens] = useState([]);

  const getDanhSach = async (registerId) => {
    try {
      const response = await axios.get(
        `http://localhost:5231/api/hosoungtuyen/danhsach/${registerId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered dang tuyens:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await getDanhSach(formData.registrationId);
        setDangTuyens(temp);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tính toán số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Lọc dữ liệu cho trang hiện tại
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Thêm các hàng trống nếu cần thiết
  const emptyRows = itemsPerPage - currentData.length;
  const rows = [...currentData, ...Array(emptyRows).fill({})];

  // Hàm để hiển thị các nút pagination với dấu ...
  const renderPaginationButtons = () => {
    const paginationButtons = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-600 text-sm ${
              currentPage === i ? "btn-dark" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      paginationButtons.push(
        <button
          key={1}
          className={`px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-600 text-sm ${
            currentPage === 1 ? "btn-dark" : ""
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage > 2) paginationButtons.push(<span>...</span>);

      if (currentPage > 1 && currentPage < totalPages) {
        paginationButtons.push(
          <button
            key={currentPage}
            className={
              "px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-600 btn-dark text-sm"
            }
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </button>
        );
      }
      if (currentPage < totalPages - 1)
        paginationButtons.push(<span>...</span>);

      paginationButtons.push(
        <button
          key={totalPages}
          className={`px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-600 text-sm ${
            currentPage === totalPages ? "btn-dark" : ""
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return paginationButtons;
  };
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState('');
  const handleButtonClick = (fileName) => {
    document.getElementById("la").innerText = fileName;
    setSelectedPdf(fileName);
    setShowPdfViewer(true);
  };
  return (
    <div className="flex justify-right items-center mt-20 bg-gray-100 ">
      <div id = 'la'></div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="overflow-x-auto">
          <h4 className="mb-2">DANH SÁCH HỒ SƠ</h4>
          <table className="min-w-full bg-white border custom-border">
            <thead>
              <tr>
                <th className="bg-grey px-6 py-3 border border-gray-300 text-left text-sm font-medium text-gray-700">
                  Số thứ tự
                </th>
                <th className="bg-grey px-6 py-3 border border-gray-300 text-left text-sm font-medium text-gray-700">
                  Tên chi tiết hồ sơ
                </th>
                <th className="bg-grey px-6 py-3 border border-gray-300 text-left text-sm font-medium text-gray-700">
                  Mô tả thêm
                </th>
                <th className="bg-grey px-6 py-3 border border-gray-300 text-left text-sm font-medium text-gray-700">
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="h-[42px]">
                  <td className="px-6  border border-gray-300 text-sm">
                    {row.id ? index + 1 : ""}
                  </td>
                  <td className="px-6  border border-gray-300 text-sm">
                    {row.tenHoSo}
                  </td>
                  <td className="px-6  border border-gray-300 text-sm">
                    {row.moTa}
                  </td>
                  <td className="px-6  border border-gray-300 text-sm">
                      
                        { row.id ? 
                        <div className="col-span-2 flex items-center justify-center">
                          <FaFileAlt className="text-gray-500" />
                          <a href={`${hostCVUrl}/${row.fileHoSo}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">CV.pdf</a> 
                        </div>
                         : ''}
                      
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {renderPaginationButtons()}
          <button
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListDetailCV;

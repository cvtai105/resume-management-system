import React from "react";

const FormDangKyTuyenDungBuoc3 = ({ prevStep, formData }) => {
  return (
    <div className="grid grid-cols-12 mt-10 mx-auto">
      <div className="container col-start-5 col-span-4 p-10 text-navy rounded-md shadow-lg space-y-5">
        <h2 className="text-2xl font-bold mb-4">Xác Thực Thông Tin Đã Điền</h2>
        <p><strong>Vị trí tuyển dụng:</strong> {formData.jobPosition}</p>
        <p><strong>Số người muốn tuyển dụng cho công việc này:</strong> {formData.numberOfHires}</p>
        <p><strong>Ngày bắt đầu tuyển dụng:</strong> {formData.startDate}</p>
        <p><strong>Ngày kết thúc tuyển dụng:</strong> {formData.endDate}</p>
        <p><strong>Tiêu chí phù hợp:</strong></p>
        <div
          className="border p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: formData.criteria }}
        />
        <p><strong>Hình thức đăng tuyển:</strong> {formData.postingType}</p>
        <p><strong>Mô tả hình thức đăng tuyển:</strong> {formData.postingDescription}</p>
        <div className="flex">
            <p><strong>Thời gian đăng tuyển:</strong> {formData.postingDuration}</p>
            <span className="ml-2">ngày</span>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={prevStep} className="text-dodger-blue">Quay lại</button>
          <button className="btn-dark">Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default FormDangKyTuyenDungBuoc3;

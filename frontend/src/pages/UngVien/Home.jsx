import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const hostApi = process.env.REACT_APP_API_URL;

function Home() {
    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const {data, loading, error} = useFetch(`${hostApi}/recruitments?page=${currentPage}`);
    console.log(data);

    const jobData = data?.data || [];

    useEffect(() => {
        setTotalPages(data?.pageCount || 1);
        console.log(jobData);
    }
    , [jobData]);

    
    return (
        <>
        <div className="flex justify-center items-center mt-6">
            <SearchBar />
        </div>
        <div className="px-44 min-h-screen bg-f7f7f7">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-dodger-blue">Việc làm mới</h3>
                <Pagination onPageChange={(x)=>setCurrentPage(x)} currentPage={currentPage} totalPages={totalPages}/>
            </div>
            <div className="job-card-grid text-sm">
            {jobData.map((job, index) => (
                <JobCard
                key={job.id}
                jobName={job.tenViTri}
                company={job.doanhNghiep}
                salaryRange={job.mucLuong}
                location={job.khuVuc}
                onClick={() => {navigate(`/jobs/${job.id}`)}}
                />
            ))}
            </div>
        </div>
        
        </>
    );
}

export default Home;

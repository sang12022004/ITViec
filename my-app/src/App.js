import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Title from "./components/Title";
import FilterBar from "./components/FilterBar";
import Footer from "./components/FooterBar";
import JobListBar from "./components/JobListBar";

function App() {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Trạng thái bộ lọc
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([500, 10000]);
  const [appliedSalary, setAppliedSalary] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);

  // Gọi API lấy dữ liệu công việc (dựa trên bộ lọc & phân trang)
  const fetchJobs = useCallback(async () => {
    try {
      let url;

      if (selectedWorkTypes.length === 0) {
        // Nếu không có bộ lọc work_type => lấy toàn bộ dữ liệu
        url = `https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/jobs`;
        console.log("Fetching all jobs from API:", url);
        const response = await axios.get(url);
        setJobs(response.data || []);
      } else {
        // Nếu có bộ lọc work_type, gọi API theo từng loại
        console.log("Fetching filtered jobs from API for work_types:", selectedWorkTypes);
        const requests = selectedWorkTypes.map(workType =>
          axios.get(`https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/jobs?work_type=${workType}`)
        );

        const responses = await Promise.all(requests);

        // Gộp dữ liệu từ tất cả các API request và loại bỏ trùng lặp
        const mergedJobs = [...new Map(responses.flatMap(res => res.data || []).map(job => [job.id, job])).values()];
        setJobs(mergedJobs);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách công việc:", error);
      setJobs([]); // Nếu có lỗi => giữ danh sách rỗng
    }
  }, [selectedWorkTypes]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, selectedLevels, salaryRange, appliedSalary, selectedFields, selectedCompanyTypes]);

  useEffect(() => {
    // Cập nhật số trang khi danh sách công việc thay đổi
    setTotalPages(Math.ceil(jobs.length / 4));
  }, [jobs]);

  return (
    <div className="main">
      <div className="background"></div>
      <Navbar />
      <SearchBar />
      <div className="wrapper">
        <Banner />
      </div>
      <Title />
      {/* Bộ lọc */}
      <FilterBar
        selectedLevels={selectedLevels} setSelectedLevels={setSelectedLevels}
        selectedWorkTypes={selectedWorkTypes} setSelectedWorkTypes={setSelectedWorkTypes}
        salaryRange={salaryRange} setSalaryRange={setSalaryRange}
        appliedSalary={appliedSalary} setAppliedSalary={setAppliedSalary}
        selectedFields={selectedFields} setSelectedFields={setSelectedFields}
        selectedCompanyTypes={selectedCompanyTypes} setSelectedCompanyTypes={setSelectedCompanyTypes}
      />
      {/* Danh sách công việc */}
      <JobListBar jobs={jobs} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <Footer />
    </div>
  );
}

export default App;

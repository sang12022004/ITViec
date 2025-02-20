import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import Title from "./components/Title";
import FilterBar from "./components/FilterBar";
import Footer from "./components/FooterBar";
import JobListBar from "./components/JobListBar";

function App() {
  const [allJobs, setAllJobs] = useState([]); // Dữ liệu gốc (không thay đổi)
  const [filteredJobs, setFilteredJobs] = useState([]); // Dữ liệu đã lọc
  const [companies, setCompanies] = useState([]); // Danh sách công ty
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ⚡ Trạng thái bộ lọc
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([500, 10000]);
  const [appliedSalary, setAppliedSalary] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]); // Bộ lọc lĩnh vực

  // **B1: Fetch tất cả dữ liệu khi mở trang (chỉ chạy 1 lần)**
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobResponse, companyResponse] = await Promise.all([
          axios.get("https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/jobs"),
          axios.get("https://67ad4bd83f5a4e1477dd4a73.mockapi.io/api/jobs/companies"),
        ]);

        setAllJobs(jobResponse.data || []);
        setFilteredJobs(jobResponse.data || []);
        setCompanies(companyResponse.data || []);
      } catch (error) {
        console.error("Lỗi tải danh sách công việc hoặc công ty:", error);
      }
    };

    fetchData();
  }, []);

  // **B2: Lọc dữ liệu trên client khi bộ lọc thay đổi**
  useEffect(() => {
    if (allJobs.length === 0 || companies.length === 0) return;

    let jobs = [...allJobs];

    // Lọc theo Work Type
    if (selectedWorkTypes.length > 0) {
      jobs = jobs.filter(job => selectedWorkTypes.some(type => job.work_type.includes(type)));
    }

    // Lọc theo Level
    if (selectedLevels.length > 0) {
      jobs = jobs.filter(job => selectedLevels.some(level => job.level?.includes(level)));
    }

    // Lọc theo Lương (Chỉ lấy nếu mức lương công khai)
    if (appliedSalary) {
      jobs = jobs.filter(job =>
        job.salary.visible &&
        parseInt(job.salary.amount.replace(/\D/g, "")) >= appliedSalary[0] &&
        parseInt(job.salary.amount.replace(/\D/g, "")) <= appliedSalary[1]
      );
    }

    // Lọc theo Công Ty
    if (selectedCompanyTypes.length > 0) {
      jobs = jobs.filter(job => {
        const company = companies.find(company => company.id === job.company_id);
        return company && selectedCompanyTypes.includes(company.company_model);
      });
    }

    // Lọc theo Ngành Nghề (Industry)
    if (selectedIndustries.length > 0 && companies.length > 0) {
      jobs = jobs.filter(job => {
        const company = companies.find(company => String(company.id) === String(job.company_id));

        //  Debug xem có tìm thấy công ty hay không
        if (!company) {
          console.warn("Không tìm thấy công ty cho job:", job);
          return false;
        }

        if (!company.industry) {
          console.warn("Công ty không có industry:", company);
          return false;
        }

        const trimmedIndustry = company.industry.trim(); // Xử lý khoảng trắng
        console.log("Lọc job:", job.title, "| Công ty:", company.name, "| Ngành:", trimmedIndustry);

        return selectedIndustries.includes(trimmedIndustry);
      });
    }

    // Cập nhật danh sách công việc đã lọc
    setFilteredJobs(jobs);
    setTotalPages(Math.ceil(jobs.length / 4));
  }, [allJobs, selectedLevels, selectedWorkTypes, appliedSalary, selectedCompanyTypes, selectedIndustries, companies]);

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
        selectedIndustries={selectedIndustries} setSelectedIndustries={setSelectedIndustries} // Truyền bộ lọc ngành nghề
      />
      {/* Danh sách công việc */}
      <JobListBar jobs={filteredJobs} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <Footer />
    </div>
  );
}

export default App;

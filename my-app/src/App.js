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
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); 
  const [companies, setCompanies] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Trạng thái bộ lọc
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([500, 10000]);
  const [appliedSalary, setAppliedSalary] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);
  const [selectedIndustries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Tất cả thành phố");

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
        console.error("❌ Lỗi tải danh sách công việc hoặc công ty:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allJobs.length === 0 || companies.length === 0) {
      return;
    }

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
        job.salary?.visible &&
        parseInt(job.salary.amount.replace(/\D/g, "")) >= appliedSalary[0] &&
        parseInt(job.salary.amount.replace(/\D/g, "")) <= appliedSalary[1]
      );
    }

    // Lọc theo Công Ty
    if (selectedCompanyTypes.length > 0) {
      jobs = jobs.filter(job => {
        const company = companies.find(company => String(company.id) === String(job.company_id));
        return company && selectedCompanyTypes.includes(company.company_model);
      });
    }

    // 🔍 Lọc theo Ngành Nghề (Industry)
    if (selectedIndustries.length > 0) {
      jobs = jobs.filter(job => {
        const company = companies.find(company => String(company.id) === String(job.company_id));
    
        if (!company) {
          return false;
        }
    
        if (!company.industry) {
          return false;
        }
    
        const trimmedIndustry = company.industry.trim();
    
        return selectedIndustries.includes(trimmedIndustry);
      });
    }
    if (selectedFields.length > 0) {
    
      jobs = jobs.filter(job => {
        const company = companies.find(company => String(company.id) === String(job.company_id));
    
        if (!company) {
          return false;
        }
    
        if (!company.industry) {
          return false;
        }
    
        const trimmedIndustry = company.industry.trim();
    
        return selectedFields.includes(trimmedIndustry);
      });
    
    }

  
      // Lọc theo từ khóa tìm kiếm (theo tiêu đề công việc hoặc mô tả)
      if (searchTerm.trim() !== "") {
        const lowerSearchTerm = searchTerm.toLowerCase();
        jobs = jobs.filter(job => {
            const jobTitle = job.title ? job.title.toLowerCase() : "";
            const jobDescription = job.description ? job.description.toLowerCase() : "";
            const company = companies.find(company => String(company.id) === String(job.company_id));
            const companyName = company && company.name ? company.name.toLowerCase() : "";
            const jobSkills = job.skills && Array.isArray(job.skills)
                ? job.skills.map(skill => skill.toLowerCase()).join(" ")
                : "";

            return (
                jobTitle.includes(lowerSearchTerm) || 
                jobDescription.includes(lowerSearchTerm) || 
                companyName.includes(lowerSearchTerm) || 
                jobSkills.includes(lowerSearchTerm)
            );
          });
      }

      const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
    
    // Lọc theo thành phố
    if (selectedCity !== "Tất cả thành phố") {
        if (selectedCity === "Others") {
            // Chỉ hiển thị các công việc KHÔNG thuộc Hồ Chí Minh, Hà Nội, Đà Nẵng
            jobs = jobs.filter(job => 
                job.location &&
                !["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"].some(city => 
                    removeDiacritics(job.location).includes(removeDiacritics(city))
                )
            );
        } else {
            // Hiển thị công việc thuộc thành phố được chọn (giữ nguyên dấu)
            jobs = jobs.filter(job => 
                job.location && job.location.includes(selectedCity)
            );
        }
  
      // Lọc theo thành phố
      if (selectedCity !== "Tất cả thành phố") {
          if (selectedCity === "Others") {
              // Chỉ hiển thị các công việc KHÔNG thuộc Hồ Chí Minh, Hà Nội, Đà Nẵng
              jobs = jobs.filter(job => 
                  job.location &&
                  !["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"].some(city => 
                      removeDiacritics(job.location).includes(removeDiacritics(city))
                  )
              );
          } else {
              // Hiển thị công việc thuộc thành phố được chọn (giữ nguyên dấu)
              jobs = jobs.filter(job => 
                  job.location && job.location.includes(selectedCity)
              );
          }
      }
    }

    // Cập nhật danh sách công việc đã lọc
    setFilteredJobs(jobs);
    setTotalPages(Math.ceil(jobs.length / 4));
  }, [allJobs, companies, searchTerm, selectedCity, selectedLevels, selectedWorkTypes, appliedSalary, selectedCompanyTypes, selectedIndustries, selectedFields]);

  return (
    <div className="main">
      <div className="background"></div>
      <Navbar />
      <SearchBar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
        selectedCity={selectedCity} setSelectedCity={setSelectedCity} 
        allJobs={allJobs} allCompanies={companies} 
      />

      <div className="wrapper">
        <Banner />
      </div>
      <Title jobCount={filteredJobs.length} />
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
      <JobListBar jobs={filteredJobs} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <Footer />
    </div>
  );
}

export default App;

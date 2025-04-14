import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function ResumeUploadForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!resumeFile || resumeFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
  
    setUploading(true);
    setError("");
    setSuccessMsg("");
  
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("uploadDate", uploadDate ? uploadDate.toISOString() : new Date().toISOString());
      formData.append("resumeFile", resumeFile);
  
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setSuccessMsg("Resume uploaded successfully!");
      console.log("Upload Success:", response.data);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
    navigate('/table');
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError("");
    } else {
      setResumeFile(null);
      setError("Only PDF files are allowed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">User Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Resume File (PDF only)</label>
          <label className="w-full flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600">
            <span>{resumeFile ? resumeFile.name : "Select your resume (PDF)"}</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload Date</label>
          <DatePicker
            selected={uploadDate}
            onChange={(date) => setUploadDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select a date and time"
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default ResumeUploadForm;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { Alert, Modal } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Subjects() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [levels, setLevels] = useState(null);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    levelId: "",
    subjectName: "",
  });

  const fetchLevels = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/level/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const levels = responseData?.response?.data;
        setLevels(levels);
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Failed to get levels");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieving levels:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/subject/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const subjects = responseData?.response?.data;
        setSubjects(subjects);
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Failed to get subjects");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieving subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const body = JSON.stringify({
      levelId: formData.levelId,
      subjectName: formData.subjectName,
    });
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/subject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        fetchSubjects();
        handleCancelCreate();
        setSuccessMessage(responseData.message || "Subject created successfully");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(responseData.message || "Failed to create subject");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating subject:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const body = JSON.stringify({
      subjectName: formData.subjectName,
      levelId: formData.levelId,
    });
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/subject/${subject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        fetchSubjects();
        handleCancelUpdate();
        setSuccessMessage(responseData.message || "Subject updated successfully");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(responseData.message || "Failed to update subject");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
    fetchLevels();
  };

  const handleUpdateClick = (subject) => {
    setSubject(subject);
    fetchLevels();
    setFormData({
      levelId: subject.levelId,
      subjectName: subject.name,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (subject) => {
    setSubject(subject);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/subject/${subject._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.status === 200) {
        fetchSubjects();
        setSuccessMessage(responseData.message || "Subject deleted successfully");
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        setAlertMessage(responseData.message || "Failed to delete subject");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setShowDeleteModal(false);
      setSubject(null);
    }
  };

  const handleCancelCreate = () => {
    setSuccessMessage(false);
    setAlertMessage(false);
    setShowCreateModal(false);
    setFormData({});
    setErrors({});
  };

  const handleCancelUpdate = () => {
    setSuccessMessage(false);
    setAlertMessage(false);
    setShowUpdateModal(false);
    setSubject(null);
    setFormData({});
    setErrors({});
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSubject(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex-1 overflow-auto">
      {successMessage && (
        <div
          className="absolute left-1/2 translate-x-[-50%]"
          style={{ zIndex: 1050, top: "2%", width: "50%" }}
        >
          <Alert
            closable
            showIcon
            message={successMessage}
            type="success"
            onClose={() => setAlertMessage(false)}
          />
        </div>
      )}
      {alertMessage && (
        <div
          className="absolute left-1/2 translate-x-[-50%]"
          style={{ zIndex: 1050, top: "2%", width: "50%" }}
        >
          <Alert
            closable
            showIcon
            message={alertMessage}
            type="error"
            onClose={() => setAlertMessage(false)}
          />
        </div>
      )}
      <div className="p-6">
        {subjects?.length > 0 ? (
          <>
            <h1 className="text-xl font-medium text-gray-800 mb-6">
              Subjects Management
            </h1>
            <div className="bg-white rounded-md shadow-sm">
              <div className="flex justify-end items-center px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateClick()}
                    className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                  >
                    Add Subject
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 text-sm">
                      <th className="text-left py-3 px-6 font-medium">Name</th>
                      <th className="text-left py-3 px-6 font-medium">Level</th>
                      <th className="text-left py-3 px-6 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects?.map((subject) => (
                      <tr
                        key={subject?._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">{subject.name}</td>
                        <td className="py-4 px-6">Level {subject.level}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-yellow-500 cursor-pointer"
                              onClick={() => handleUpdateClick(subject)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-400 cursor-pointer"
                              onClick={() => handleDeleteClick(subject)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-4xl text-center">No Subject found</h1>
            <div className="flex justify-center items-center px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCreateClick()}
                  className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Create Subject"
        open={showCreateModal}
        onCancel={() => handleCancelCreate()}
        footer={null}
      >
        <form onSubmit={handleCreateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="subjectName"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="subjectName"
              placeholder="Enter subject name"
              value={formData.subjectName || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.subjectName && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.subjectName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="levelId"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Level
            </label>
            <select
              name="levelId"
              value={formData.levelId || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select Level</option>
              {levels?.map((level) => (
                <option key={level._id} value={level._id}>
                  Level {level.level}
                </option>
              ))}
            </select>
            {errors?.levelId && (
              <p className="text-sm text-red-600 mt-1">{errors?.levelId[0]}</p>
            )}
          </div>
          <div className="flex align-items-center justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => handleCancelCreate()}
              className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0772AA] text-white rounded-md focus:outline-none cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Update Subject"
        open={showUpdateModal}
        onCancel={() => handleCancelUpdate()}
        footer={null}
      >
        <form onSubmit={handleUpdateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="subjectName"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="subjectName"
              placeholder="Enter subject name"
              value={formData.subjectName}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.subjectName && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.subjectName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="levelId"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Level
            </label>
            <select
              name="levelId"
              value={formData.levelId || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select Level</option>
              {levels?.map((level) => (
                <option key={level._id} value={level._id}>
                  Level {level.level}
                </option>
              ))}
            </select>
            {errors?.levelId && (
              <p className="text-sm text-red-600 mt-1">{errors?.levelId[0]}</p>
            )}
          </div>
          <div className="flex align-items-center justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => handleCancelUpdate()}
              className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0772AA] text-white rounded-md focus:outline-none cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={showDeleteModal}
        onCancel={handleCancelDelete}
        footer={[
          <button
            key="cancel"
            onClick={handleCancelDelete}
            className="px-4 py-2 mx-4 bg-gray-400 text-white rounded cursor-pointer"
          >
            Cancel
          </button>,
          <button
            key="delete"
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
          >
            Delete
          </button>,
        ]}
      >
        <p>
          Are you sure you want to delete this subject? All data related to this
          subject will also be deleted
        </p>
      </Modal>
    </main>
  );
}

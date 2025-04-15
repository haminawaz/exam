"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Alert, Modal } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Topics() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    subjectId: "",
    topicName: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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
      } else if (responseData?.message === "Jeton invalide ou expiré") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(
          responseData.message || "Impossible d'obtenir les sujets"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieving subjects:", error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/topic/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const topics = responseData?.response?.data;
        setTopics(topics);
      } else if (responseData?.message === "Jeton invalide ou expiré") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(
          responseData.message || "Impossible d'obtenir les sujets"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieving topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setDisabled(true);
    const body = JSON.stringify({
      subjectId: formData.subjectId,
      topicName: formData.topicName,
    });
    try {
      const response = await fetch(`${serverBaseUrl}/admin/topic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const responseData = await response.json();
      if (response.ok) {
        fetchTopics();
        handleCancelCreate();
        setSuccessMessage("Sujet créé avec succès");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "Une erreur s'est produite");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(
          responseData.message || "Echec de la création du sujet"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setDisabled(true);
    const body = JSON.stringify({
      topicName: formData.topicName,
      subjectId: formData.subjectId,
    });
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/topic/${topic._id}`,
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
        fetchTopics();
        handleCancelUpdate();
        setSuccessMessage("Sujet mis à jour avec succès");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "Une erreur s'est produite");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(
          responseData.message || "Echec de la mise à jour du sujet"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
    fetchSubjects();
  };

  const handleUpdateClick = (topic) => {
    setTopic(topic);
    fetchSubjects();
    setFormData({
      subjectId: topic.subjectId,
      topicName: topic.name,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (topic) => {
    setTopic(topic);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDisabled(true);
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/topic/${topic._id}`,
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
        fetchTopics();
        setSuccessMessage("Sujet supprimé avec succès");
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        setAlertMessage(
          responseData.message || "Echec de la suppression du sujet"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setShowDeleteModal(false);
      setTopic(null);
      setDisabled(false);
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
    setTopic(null);
    setFormData({});
    setErrors({});
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTopic(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTopics = React.useMemo(() => {
    let sortedData = [...topics];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  }, [topics, sortConfig]);

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
        {topics?.length > 0 ? (
          <>
            <h1 className="text-xl font-medium text-gray-800 mb-6">
              Topics Management
            </h1>
            <div className="bg-white rounded-md shadow-sm">
              <div className="flex justify-end items-center px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateClick()}
                    className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                  >
                    Add Topic
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 text-sm">
                      {[
                        { key: "name", label: "Topic" },
                        { key: "level", label: "Level" },
                        { key: "subject", label: "Subject" },
                      ].map(({ key, label }) => (
                        <th
                          key={key}
                          className="text-left py-3 px-6 font-medium"
                        >
                          <div
                            className="flex items-center gap-x-1 cursor-pointer hover:text-black transition"
                            onClick={() => requestSort(key)}
                          >
                            {label}
                            {sortConfig.key === key &&
                              (sortConfig.direction === "ascending" ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              ))}
                          </div>
                        </th>
                      ))}
                      <th className="text-left py-3 px-6 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTopics?.map((topic) => (
                      <tr
                        key={topic?._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">{topic.name}</td>
                        <td className="py-4 px-6">Level {topic.level}</td>
                        <td className="py-4 px-6">{topic.subject}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-yellow-500 cursor-pointer"
                              onClick={() => handleUpdateClick(topic)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-400 cursor-pointer"
                              onClick={() => handleDeleteClick(topic)}
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
            <h1 className="text-4xl text-center">No Topic found</h1>
            <div className="flex justify-center items-center px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCreateClick()}
                  className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                >
                  Add Topic
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Create Topic"
        open={showCreateModal}
        onCancel={() => handleCancelCreate()}
        footer={null}
      >
        <form onSubmit={handleCreateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="topicName"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="topicName"
              placeholder="Enter topic name"
              value={formData.topicName || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.topicName && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.topicName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="subjectId"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Subject
            </label>
            <select
              name="subjectId"
              value={formData.subjectId || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} (Level {subject.level})
                </option>
              ))}
            </select>
            {errors?.subjectId && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.subjectId[0]}
              </p>
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
              disabled={disabled}
              className="px-6 py-2 bg-[#0772AA] text-white rounded-md focus:outline-none cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Update Topic"
        open={showUpdateModal}
        onCancel={() => handleCancelUpdate()}
        footer={null}
      >
        <form onSubmit={handleUpdateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="topicName"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="topicName"
              placeholder="Enter topic name"
              value={formData.topicName || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.topicName && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.topicName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="subjectId"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Subject
            </label>
            <select
              name="subjectId"
              value={formData.subjectId || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} (Level {subject.level})
                </option>
              ))}
            </select>
            {errors?.subjectId && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.subjectId[0]}
              </p>
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
              disabled={disabled}
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
            disabled={disabled}
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
          >
            Delete
          </button>,
        ]}
      >
        <p>
          Are you sure you want to delete this topic? All data related to this
          topic will also be deleted
        </p>
      </Modal>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { Alert, Modal } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Level() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [levels, setLevels] = useState([]);
  const [errors, setErrors] = useState({});
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState(false);
  const [formAlertMessage, setFormAlertMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    level: "",
    difficulty: "facile",
    price: "",
    image: null,
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
      console.error("Error during retrieved levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({});
    const newFormData = new FormData();
    newFormData.append("levelName", formData.level);
    newFormData.append("difficulty", formData.difficulty);
    newFormData.append("price", formData.price);
    if (formData.image) {
      newFormData.append("levelImage", formData.image);
    }

    try {
      const response = await fetch(`${serverBaseUrl}/admin/level/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newFormData,
      });
      const responseData = await response.json();
      if (response.ok) {
        fetchLevels();
        setImagePreview(null);
        setFormSuccessMessage("Level created successfully");
        setTimeout(() => {
          setFormSuccessMessage(false);
          handleCancelCreate();
        }, 3000);
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setFormAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setFormAlertMessage(false), 3000);
        }
      } else {
        setFormAlertMessage(responseData.message || "Failed to create level");
        setTimeout(() => setFormAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating level:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({});
    const newFormData = new FormData();
    newFormData.append("levelName", formData.level);
    newFormData.append("difficulty", formData.difficulty);
    newFormData.append("price", formData.price);

    if (formData.image && formData.image instanceof File) {
      newFormData.append("levelImage", formData.image);
    }
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/level/${level._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: newFormData,
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        fetchLevels();
        setFormSuccessMessage("Level updated successfully");
        setTimeout(() => {
          setFormSuccessMessage(false);
          handleCancelUpdate();
        }, 3000);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setFormAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setFormAlertMessage(false), 3000);
        }
      } else {
        setFormAlertMessage(responseData.message || "Failed to update level");
        setTimeout(() => setFormAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error updating level:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  const handleUpdateClick = (level) => {
    setLevel(level);
    setFormData({
      level: level.level,
      difficulty: level.difficulty,
      price: level.price,
      image: level.image,
    });
    setShowUpdateModal(true);
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };

  const handleDeleteClick = (level) => {
    setLevel(level);
    setShowDeleteModal(true);
    setShowCreateModal(false);
    setShowUpdateModal(false);
  };

  const handleConfirmDelete = async () => {
    setDisabled(true);
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/level/${level._id}`,
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
        fetchLevels();
        setSuccessMessage("Level deleted successfully");
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        setAlertMessage(responseData.message || "Failed to delete level");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setShowDeleteModal(false);
      setLevel(null);
      setDisabled(false);
    }
  };

  const handleCancelCreate = () => {
    setFormSuccessMessage(false);
    setFormAlertMessage(false);
    setShowCreateModal(false);
    setImagePreview(null);
    setFormData({});
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelUpdate = () => {
    setFormSuccessMessage(false);
    setFormAlertMessage(false);
    setShowUpdateModal(false);
    setLevel(null);
    setImagePreview(null);
    setFormData({});
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setLevel(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
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
        {levels?.length > 0 ? (
          <>
            <h1 className="text-xl font-medium text-gray-800 mb-6">
              Levels Management
            </h1>

            <div className="bg-white rounded-md shadow-sm">
              <div className="flex justify-end items-center px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateClick()}
                    className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                  >
                    Add Level
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 text-sm">
                      <th className="text-left py-3 px-6 font-medium">Image</th>
                      <th className="text-left py-3 px-6 font-medium">Name</th>
                      <th className="text-left py-3 px-6 font-medium">
                        Diffculty
                      </th>
                      <th className="text-left py-3 px-6 font-medium">Price</th>
                      <th className="text-left py-3 px-6 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {levels?.map((level) => (
                      <tr
                        key={level?._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-1 px-6">
                          <img
                            src={level.image}
                            alt="level-img"
                            className="w-14 h-14"
                          />
                        </td>
                        <td className="py-4 px-6">Level {level.level}</td>
                        <td className="py-4 px-6">{level.difficulty}</td>
                        <td className="py-4 px-6">{level.price}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-yellow-500 cursor-pointer"
                              onClick={() => handleUpdateClick(level)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-400 cursor-pointer"
                              onClick={() => handleDeleteClick(level)}
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
            <h1 className="text-4xl text-center">No level found</h1>
            <div className="flex justify-center items-center px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCreateClick()}
                  className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                >
                  Add Level
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Create Level"
        open={showCreateModal}
        onCancel={() => handleCancelCreate()}
        footer={null}
      >
        {formSuccessMessage && (
          <div
            className="absolute left-1/2 translate-x-[-50%]"
            style={{ zIndex: 1050, top: "2%", width: "50%" }}
          >
            <Alert
              closable
              showIcon
              message={formSuccessMessage}
              type="success"
              onClose={() => setFormSuccessMessage(false)}
            />
          </div>
        )}
        {formAlertMessage && (
          <div
            className="absolute left-1/2 translate-x-[-50%]"
            style={{ zIndex: 1050, top: "2%", width: "50%" }}
          >
            <Alert
              closable
              showIcon
              message={formAlertMessage}
              type="error"
              onClose={() => setFormAlertMessage(false)}
            />
          </div>
        )}
        <form onSubmit={handleCreateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="level"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Level
            </label>
            <input
              type="number"
              name="level"
              placeholder="Enter level"
              value={formData.level || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            {errors?.level && (
              <p className="text-sm text-red-600 mt-1">{errors?.level[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="difficulty"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Difficulty
            </label>
            <select
              name="difficulty"
              required
              value={formData.difficulty}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
            >
              <option value="facile">Facile</option>
              <option value="difficile">Difficile</option>
            </select>
            {errors?.difficulty && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.difficulty[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.price && (
              <p className="text-sm text-red-600 mt-1">{errors?.price[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/svg+xml"
              ref={fileInputRef}
              onChange={handleImageChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-24 w-32 max-w-xs rounded-md"
                />
              </div>
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
        title="Update Level"
        open={showUpdateModal}
        onCancel={() => handleCancelUpdate()}
        footer={null}
      >
        {formSuccessMessage && (
          <div
            className="absolute left-1/2 translate-x-[-50%]"
            style={{ zIndex: 1050, top: "2%", width: "50%" }}
          >
            <Alert
              closable
              showIcon
              message={formSuccessMessage}
              type="success"
              onClose={() => setFormSuccessMessage(false)}
            />
          </div>
        )}
        {formAlertMessage && (
          <div
            className="absolute left-1/2 translate-x-[-50%]"
            style={{ zIndex: 1050, top: "2%", width: "50%" }}
          >
            <Alert
              closable
              showIcon
              message={formAlertMessage}
              type="error"
              onClose={() => setFormAlertMessage(false)}
            />
          </div>
        )}
        <form onSubmit={handleUpdateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="level"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Level
            </label>
            <input
              type="number"
              name="level"
              placeholder="Enter level"
              value={formData.level}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            {errors?.level && (
              <p className="text-sm text-red-600 mt-1">{errors?.level[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="difficulty"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Difficulty
            </label>
            <select
              name="difficulty"
              required
              value={formData.difficulty}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
            >
              <option value="facile">Facile</option>
              <option value="difficile">Difficile</option>
            </select>
            {errors?.difficulty && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.difficulty[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.price && (
              <p className="text-sm text-red-600 mt-1">{errors?.price[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/svg+xml"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-24 w-32 max-w-xs rounded-md"
                />
              </div>
            )}
            {formData.image && !imagePreview && (
              <div className="mt-3">
                <img
                  src={formData.image}
                  alt="Image Preview"
                  className="h-24 w-32 max-w-xs rounded-md"
                />
              </div>
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
          Are you sure you want to delete this level? All data related to this
          level will also be deleted
        </p>
      </Modal>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Modal } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Avatar() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [avatars, setAvatars] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ image: null });

  const fetchAvatars = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/avatar/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        setAvatars(responseData?.response?.data || []);
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Failed to get avatars");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieved avatars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const newFormData = new FormData();
    if (formData.image) {
      newFormData.append("avatarImage", formData.image);
    }

    try {
      const response = await fetch(`${serverBaseUrl}/admin/avatar/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newFormData,
      });
      const responseData = await response.json();
      if (response.ok) {
        fetchAvatars();
        setImagePreview(null);
        setSuccessMessage("Avatar created successfully");
        setTimeout(() => {
          setSuccessMessage(false);
          handleCancelCreate();
        }, 3000);
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Failed to create avatar");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating avatar:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleAvatarClick = (avatar) => {
    setAvatar(avatar);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDisabled(true);
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/avatar/${avatar._id}`,
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
        fetchAvatars();
        setSuccessMessage("Avatar deleted successfully");
        setTimeout(() => setSuccessMessage(false), 3000);
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Failed to delete avatar");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setShowDeleteModal(false);
      setAvatar(null);
      setDisabled(false);
    }
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
    setImagePreview(null);
    setFormData({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAvatar(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
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
        <h1 className="text-xl font-medium text-gray-800 mb-6">
          Avatars Management
        </h1>
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => handleCreateClick()}
              className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
            >
              Add Avatar
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-start">
            {avatars?.map((avatar) => (
              <div
                key={avatar?._id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleAvatarClick(avatar)}
              >
                <img
                  src={avatar.avatarUrl}
                  alt="avatar-img"
                  className="h-32 w-32 max-w-xs rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        title="Create Avatar"
        open={showCreateModal}
        onCancel={() => handleCancelCreate()}
        footer={null}
      >
        <form onSubmit={handleCreateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Avatar Image
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
          <div className="flex justify-end space-x-4 mt-6">
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
        <div className="flex flex-col items-center">
          <img
            src={avatar?.avatarUrl}
            alt="avatar-preview"
            className="w-32 h-32 mb-4"
          />
          <p>Are you sure you want to delete this avatar?</p>
        </div>
      </Modal>
    </main>
  );
}

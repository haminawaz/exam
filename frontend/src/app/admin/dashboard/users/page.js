"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Modal } from "antd";
import { EyeIcon, Plus } from "lucide-react";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Users() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [users, setUsers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState(false);
  const [formAlertMessage, setFormAlertMessage] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [userId, setUserId] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    level: "",
    tokenCreated: "",
    tokenExpiry: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const users = responseData?.response?.data;
        setUsers(users);
      } else if (responseData?.message === "Jeton invalide ou expiré") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Echec d'obtenir un utilisateur");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieved users:", error);
    } finally {
      setLoading(false);
    }
  };

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
      } else if (responseData?.message === "Jeton invalide ou expiré") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Impossible d'obtenir les niveaux ");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieved levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleTokenClick = (selectedUser) => {
    setShowTokenModal(true);
    setUserId(selectedUser?._id);
    fetchLevels();
  };

  const handleReadClick = (selectedUser) => {
    setShowReadModal(true);
    const order = selectedUser?.ordersInfo?.[0] || {};
    setUser({
      name: selectedUser?.firstName + " " + selectedUser?.lastName,
      email: selectedUser.email,
      address: selectedUser.address,
      level: selectedUser?.level || "—",
      tokenCreated: order.paymentDate
        ? new Date(order.paymentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
      tokenExpiry: order.expiryDate
        ? new Date(order.expiryDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const body = JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
    });
    try {
      const response = await fetch(`${serverBaseUrl}/admin/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const responseData = await response.json();
      if (response.ok) {
        fetchUsers();
        handleCancelCreate();
        setFormSuccessMessage("Utilisateur créé avec succès");
        setTimeout(() => {
          setFormSuccessMessage(false);
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
        setAlertMessage(responseData.message || "Echec de la création des utilisateur");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleCreateToken = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/token/${userId}?levelId=${selectedLevelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.status === 201) {
        fetchUsers();
        handleCancelToken();
        setSuccessMessage(
          "Echec de la création de l'avatar pour cet utilisateur. Envoyez également à l'adresse e-mail de l'utilisateur"
        );
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
        setAlertMessage(responseData.message || "Echec de la création du jeton");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating token:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleCancelCreate = () => {
    setFormSuccessMessage(false);
    setAlertMessage(false);
    setShowCreateModal(false);
    setFormData({});
    setErrors({});
  };

  const handleCancelRead = () => {
    setShowReadModal(false);
    setUser({});
  };

  const handleCancelToken = () => {
    setShowTokenModal(false);
    setUserId(false);
    setLevels([]);
    setSelectedLevelId("");
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
      <div className="p-6">
        {users.length > 0 ? (
          <>
            <h1 className="text-xl font-medium text-gray-800 mb-6">Users</h1>
            <div className="bg-white rounded-md shadow-sm">
              <div className="flex justify-end items-center px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateClick()}
                    className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                  >
                    Add User
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 text-sm">
                      <th className="text-left py-3 px-6 font-medium">Name</th>
                      <th className="text-left py-3 px-6 font-medium">Email</th>
                      <th className="text-left py-3 px-6 font-medium">
                        Address
                      </th>
                      <th className="text-left py-3 px-6 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr
                        key={user?._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">{user.address}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-green-500 cursor-pointer"
                              onClick={() => handleReadClick(user)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="text-yellow-500 cursor-pointer"
                              onClick={() => handleTokenClick(user)}
                            >
                              <Plus className="h-4 w-4" />
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
            <h1 className="text-4xl text-center">No user found</h1>
            <div className="flex justify-center items-center px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCreateClick()}
                  className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Create User"
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
              htmlFor="firstName"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              required
              placeholder="Enter first name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            {errors?.firstName && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.firstName[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              required
              placeholder="Enter last name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            {errors?.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors?.lastName[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
              placeholder="Enter email"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            {errors?.email && (
              <p className="text-sm text-red-600 mt-1">{errors?.email[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              required
              placeholder="Enter address"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            {errors?.address && (
              <p className="text-sm text-red-600 mt-1">{errors?.address[0]}</p>
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
        title="User Modal"
        open={showReadModal}
        onCancel={() => handleCancelRead()}
        footer={null}
      >
        <form className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={user.address || ""}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="level"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Level
            </label>
            <input
              type="text"
              name="level"
              value={user.level || ""}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="tokenCreated"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Token Created
            </label>
            <input
              type="text"
              name="tokenCreated"
              value={user.tokenCreated || ""}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="tokenExpiry"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Token Expiry
            </label>
            <input
              type="text"
              name="tokenExpiry"
              value={user.tokenExpiry || ""}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
        </form>
      </Modal>

      <Modal
        title="Token Creation"
        open={showTokenModal}
        onCancel={handleCancelToken}
        footer={[
          <button
            key="cancel"
            onClick={handleCancelToken}
            className="px-4 py-2 mx-4 bg-gray-400 text-white rounded cursor-pointer"
          >
            Cancel
          </button>,
          <button
            key="delete"
            disabled={disabled}
            onClick={handleCreateToken}
            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
          >
            Generate
          </button>,
        ]}
      >
        <>
          <label htmlFor="levelSelect" className="block mb-2 font-medium">
            Select Level
          </label>
          <select
            id="levelSelect"
            value={selectedLevelId}
            onChange={(e) => setSelectedLevelId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Level --</option>
            {[...levels]
              .sort((a, b) => a.level - b.level)
              .map((level) => (
                <option key={level._id} value={level._id}>
                  Level {level.level}
                </option>
              ))}
          </select>
          {errors?.levelId && (
            <p className="text-sm text-red-600 mt-1 mb-4">
              {errors?.levelId[0]}
            </p>
          )}
          <p>Are you sure you want to generate a token for this user?</p>
        </>
      </Modal>
    </main>
  );
}

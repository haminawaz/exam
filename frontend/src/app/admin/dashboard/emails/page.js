"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { Alert, Modal } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Subjects() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [emails, setEmails] = useState([]);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    header: "",
    footer: "",
  });

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/email/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const emails = responseData?.response?.data;
        setEmails(emails);
      } else if (responseData?.message === "Jeton invalide ou expiré") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Impossible de recevoir les e-mails");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieving emails:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const body = JSON.stringify({
      header: formData.header,
      footer: formData.footer,
    });
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/email/${email._id}`,
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
        fetchEmails();
        handleCancelUpdate();
        setSuccessMessage("E-mail mis à jour avec succès");
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
        setAlertMessage(responseData.message || "Impossible de mettre à jour l'e-mail");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUpdateClick = (email) => {
    setEmail(email);
    setFormData({
      name: email?.name,
      header: email?.header,
      footer: email?.footer,
    });
    setShowUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setSuccessMessage(false);
    setAlertMessage(false);
    setShowUpdateModal(false);
    setEmail(null);
    setFormData({});
    setErrors({});
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
        {emails?.length > 0 ? (
          <>
            <h1 className="text-xl font-medium text-gray-800 mb-6">
              Subjects Management
            </h1>
            <div className="bg-white rounded-md shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 text-sm">
                      <th className="text-left py-3 px-6 font-medium">Name</th>
                      <th className="text-left py-3 px-6 font-medium">Header</th>
                      <th className="text-left py-3 px-6 font-medium">Footer</th>
                      <th className="text-left py-3 px-6 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails?.map((email) => (
                      <tr
                        key={email?._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">{email?.name}</td>
                        <td className="py-4 px-6">{email?.header}</td>
                        <td className="py-4 px-6">{email?.footer}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-yellow-500 cursor-pointer"
                              onClick={() => handleUpdateClick(email)}
                            >
                              <Edit className="h-4 w-4" />
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
            <h1 className="text-4xl text-center">No Email found</h1>
          </div>
        )}
      </div>

      <Modal
        title="Update Subject"
        open={showUpdateModal}
        onCancel={() => handleCancelUpdate()}
        footer={null}
      >
        <form onSubmit={handleUpdateSubmit} className="p-3 space-y-3">
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
              value={email?.name}
              onChange={handleInputChange}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="header"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Header
            </label>
            <input
              type="text"
              name="header"
              placeholder="Enter header"
              value={formData.header}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.header && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.header[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="footer"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              footer
            </label>
            <input
              type="text"
              name="footer"
              placeholder="Enter footer"
              value={formData.footer}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.footer && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.footer[0]}
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
              className="px-6 py-2 bg-[#0772AA] text-white rounded-md focus:outline-none cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

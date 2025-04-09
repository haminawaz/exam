"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Users() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(false);

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
      } else if (responseData?.message === "Invalid token or expired") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(responseData.message || "Failed to get users");
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieved users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      <div className="p-6">
        {users.length > 0 ? (
          <>
            <h1 className="text-xl font-medium text-gray-800 mb-6">Users</h1>
            <div className="bg-white rounded-md shadow-sm">
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
                        Purchased Level
                      </th>
                      <th className="text-left py-3 px-6 font-medium">
                        Payment Date
                      </th>
                      <th className="text-left py-3 px-6 font-medium">
                        Payment Status
                      </th>
                      <th className="text-left py-3 px-6 font-medium">
                        Payment Expiry
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
                        <td className="py-4 px-6 text-center">
                          {user.level ? (
                            `Level ${user.level}`
                          ) : (
                            <p className="font-bold">—</p>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {user.ordersInfo[0]?.paymentDate ? (
                            new Date(
                              user.ordersInfo[0]?.paymentDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          ) : (
                            <p className="font-bold">—</p>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {user.ordersInfo[0]?.paymentStatus ? (
                            user.ordersInfo[0]?.paymentStatus
                          ) : (
                            <p className="font-bold">—</p>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {user.ordersInfo[0]?.expiryDate ? (
                            new Date(
                              user.ordersInfo[0]?.expiryDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          ) : (
                            <p className="font-bold">—</p>
                          )}
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
          </div>
        )}
      </div>
    </main>
  );
}

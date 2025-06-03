"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { Alert, Modal } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Topics() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [freeQuestions, setFreeQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [activeTab, setActiveTab] = useState("paid");
  const [formData, setFormData] = useState({
    question: "",
    options: [{ option: "" }, { option: "" }],
    correctOption: "",
    simulatorType: "paid",
    image: null,
    topicId: "",
  });
  const currentQuestions = activeTab === "paid" ? questions : freeQuestions;
  const [activeOptionQuestionId, setActiveOptionQuestionId] = useState(null);
  const optionPopupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState("bottom");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionPopupRef.current &&
        !optionPopupRef.current.contains(event.target)
      ) {
        setActiveOptionQuestionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionsClick = (questionId, e) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const spaceBelow = windowHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < 200 && spaceAbove > 200) {
      setPopupPosition("top");
    } else {
      setPopupPosition("bottom");
    }

    setActiveOptionQuestionId(
      activeOptionQuestionId === questionId ? null : questionId
    );
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/question/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const paidQ = responseData?.response?.data?.paidQuestions;
        const freeQ = responseData?.response?.data?.freeQuestions;
        setQuestions(paidQ);
        setFreeQuestions(freeQ);
      } else if (responseData?.message === "Jeton invalide ou expiré") {
        localStorage.clear();
        router.push("/admin/login");
      } else {
        setAlertMessage(
          responseData.message || "Impossible d'obtenir les questions"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during retrieving questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch(`${serverBaseUrl}/admin/question/topic`, {
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
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setDisabled(true);

    const newFormData = new FormData();
    newFormData.append("question", formData.question);
    newFormData.append(
      "options",
      formData.options.map((option) => option.option)
    );
    newFormData.append("correctOption", formData.correctOption);
    if (activeTab === "paid") {
      newFormData.append("simulatorType", "paid");
      newFormData.append("topicId", formData.topicId);
    } else {
      newFormData.append("simulatorType", "free");
    }
    if (formData.image && formData.image instanceof File) {
      newFormData.append("questionImage", formData.image);
    }
    try {
      const response = await fetch(`${serverBaseUrl}/admin/question`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newFormData,
      });
      const responseData = await response.json();
      if (response.ok) {
        handleCancelCreate();
        setSuccessMessage("Question créée avec succès");
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
          responseData.message || "Impossible de créer la question"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      fetchQuestions();
      setDisabled(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setDisabled(true);
    const newFormData = new FormData();
    newFormData.append("question", formData.question);
    newFormData.append(
      "options",
      formData.options.map((option) => option.option)
    );
    newFormData.append("correctOption", formData.correctOption);
    if (activeTab === "paid") {
      newFormData.append("simulatorType", "paid");
      newFormData.append("topicId", formData.topicId);
    } else {
      newFormData.append("simulatorType", "free");
    }

    if (formData.image && formData.image instanceof File) {
      newFormData.append("questionImage", formData.image);
    }
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/question/${question._id}`,
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
        handleCancelUpdate();
        setSuccessMessage("Question mise à jour avec succès");
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
          responseData.message || "Impossible de mettre à jour la question"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error updating question:", error);
    } finally {
      fetchQuestions();
      setDisabled(false);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
    fetchTopics();
  };

  const handleUpdateClick = (question) => {
    setQuestion(question);
    fetchTopics();
    const formattedOptions = question.options.map((optionValue) => ({
      option: optionValue,
    }));
    setFormData({
      question: question.question,
      options: formattedOptions,
      correctOption: question.correctOptions,
      simulatorType: question.simulatorType,
      image: question.questionImage,
      topicId: question.simulatorType === "paid" ? question.topicId : "",
    });
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (question) => {
    setQuestion(question);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDisabled(true);
    try {
      const response = await fetch(
        `${serverBaseUrl}/admin/question/${question._id}`,
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
        setSuccessMessage("Question supprimée successfully");
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        setAlertMessage(
          responseData.message || "Impossible de supprimer la question"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      fetchQuestions();
      setShowDeleteModal(false);
      setQuestion(null);
      setDisabled(false);
    }
  };

  const handleCancelCreate = () => {
    setSuccessMessage(false);
    setAlertMessage(false);
    setShowCreateModal(false);
    setImagePreview(null);
    setFormData({
      question: "",
      options: [{ option: "" }, { option: "" }],
      correctOption: "",
      simulatorType: "paid",
      image: null,
      topicId: "",
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelUpdate = () => {
    setSuccessMessage(false);
    setAlertMessage(false);
    setShowUpdateModal(false);
    setImagePreview(null);
    setQuestion(null);
    setFormData({
      question: "",
      options: [{ option: "" }, { option: "" }],
      correctOption: "",
      simulatorType: "paid",
      image: null,
      topicId: "",
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setQuestion(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleAddOption = () => {
    const hasEmptyOption = formData.options.some(
      (option) => option.option.trim() === ""
    );

    if (!hasEmptyOption) {
      setFormData({
        ...formData,
        options: [...formData.options, { option: "" }],
      });
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedQuestions = React.useMemo(() => {
    let sortedData = [...currentQuestions];
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
        <h1 className="text-xl font-medium text-gray-800 mb-6">
          Questions Management
        </h1>
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded cursor-pointer ${
              activeTab === "paid"
                ? "bg-[#0772AA] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("paid")}
          >
            Paid Questions
          </button>
          <button
            className={`px-4 py-2 rounded cursor-pointer ${
              activeTab === "free"
                ? "bg-[#0772AA] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("free")}
          >
            Free Questions
          </button>
        </div>

        {currentQuestions?.length > 0 ? (
          <>
            <div className="bg-white rounded-md shadow-sm">
              <div className="flex justify-end items-center px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateClick()}
                    className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                  >
                    Add Questions
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600 text-sm">
                      <th className="text-left py-3 px-6 font-medium">
                        Question Image
                      </th>
                      <th className="text-left py-3 px-6 font-medium">
                        Question
                      </th>
                      {activeTab === "paid" && (
                        <>
                          {[
                            { key: "topicName", label: "Topic" },
                            { key: "subjectName", label: "Subject" },
                            { key: "level", label: "Level" },
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
                                {sortConfig?.key === key &&
                                  (sortConfig.direction === "ascending" ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  ))}
                              </div>
                            </th>
                          ))}
                        </>
                      )}
                      <th className="text-left py-3 px-6 font-medium">
                        Options
                      </th>
                      <th className="text-left py-3 px-6 font-medium">Type</th>
                      <th className="text-left py-3 px-6 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedQuestions?.map((question) => (
                      <tr
                        key={question?._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-1 px-6">
                          {question.questionImage ? (
                            <img
                              src={question.questionImage}
                              alt="level-img"
                              className="w-14 h-14 object-contain"
                            />
                          ) : null}
                        </td>
                        <td className="py-4 px-6">
                          {truncateText(question.question, 20)}
                        </td>
                        {activeTab === "paid" && (
                          <>
                            <td className="py-4 px-6">{question.topicName}</td>
                            <td className="py-4 px-6">
                              {question.subjectName}
                            </td>
                            <td className="py-4 px-6">
                              Level {question.level}
                            </td>
                          </>
                        )}
                        <td className="py-4 px-6 relative">
                          <button
                            onClick={(e) => handleOptionsClick(question._id, e)}
                            className="cursor-pointer"
                          >
                            View Options
                          </button>

                          {activeOptionQuestionId === question._id && (
                            <div
                              ref={optionPopupRef}
                              className={`absolute z-50 bg-white border border-gray-300 rounded shadow-md min-w-[250px] max-w-[600px]  ${
                                popupPosition === "top"
                                  ? "bottom-full mb-2"
                                  : "top-full mt-2"
                              } right-0`}
                              style={{
                                maxHeight: "250px",
                                overflowY: "auto",
                              }}
                            >
                              <div className="mb-3">
                                <div className="absolute top-2 right-2">
                                  <button
                                    onClick={() =>
                                      setActiveOptionQuestionId(null)
                                    }
                                    className=" text-black text-lg font-bold transform transition-transform duration-200 hover:rotate-90 cursor-pointer"
                                    aria-label="Close"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                              {question.options.map((option, index) => (
                                <div
                                  key={index}
                                  className={`py-1 px-2 pt-3 rounded ${
                                    option === question.correctOptions
                                      ? "text-green-600 font-semibold"
                                      : "text-gray-700"
                                  }`}
                                >
                                  <span className="font-bold">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  . {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6"> {question.simulatorType}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-yellow-500 cursor-pointer"
                              onClick={() => handleUpdateClick(question)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-400 cursor-pointer"
                              onClick={() => handleDeleteClick(question)}
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
            <h1 className="text-4xl text-center">
              {activeTab === "paid" ? "No Paid" : "No Free"} Questions found
            </h1>
            <div className="flex justify-center items-center px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCreateClick()}
                  className="px-4 py-2 bg-[#0772AA] text-white text-sm rounded cursor-pointer"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Create Question"
        open={showCreateModal}
        onCancel={() => handleCancelCreate()}
        footer={null}
      >
        <form onSubmit={handleCreateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="question"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Question
            </label>
            <textarea
              type="text"
              name="question"
              placeholder="Enter question"
              value={formData.question || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.question && (
              <p className="text-sm text-red-600 mt-1">{errors?.question[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="options"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Options
            </label>
            {formData.options?.map((option, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name={`options[${index}].option`}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option.option || ""}
                    onChange={(e) =>
                      handleOptionChange(index, "option", e.target.value)
                    }
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            ))}
            {errors?.options && (
              <p className="text-sm text-red-600 mt-1">{errors?.options[0]}</p>
            )}
            <button
              type="button"
              onClick={handleAddOption}
              className="text-blue-500 mt-2 cursor-pointer"
            >
              Add More Options
            </button>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="correctOption"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Correct Option
            </label>
            <select
              name="correctOption"
              value={formData.correctOption || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
            >
              <option value="">Select Correct Option</option>
              {formData.options?.map((option, index) => (
                <option key={index} value={option.option}>
                  {String.fromCharCode(65 + index)}. {option.option}
                </option>
              ))}
            </select>
            {errors?.correctOption && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.correctOption[0]}
              </p>
            )}
          </div>
          {activeTab === "paid" && (
            <div className="flex flex-col">
              <label
                htmlFor="topicId"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Topic
              </label>
              <select
                name="topicId"
                value={formData.topicId || ""}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
              >
                <option value="">Select Topic</option>
                {topics?.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.topicName} (Subject {topic.subjectName} Level{" "}
                    {topic.level})
                  </option>
                ))}
              </select>
              {errors?.topicId && (
                <p className="text-sm text-red-600 mt-1">
                  {errors?.topicId[0]}
                </p>
              )}
            </div>
          )}
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
              <div className="mt-3 w-full">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-24 w-full object-contain rounded-md"
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
        title="Update Question"
        open={showUpdateModal}
        onCancel={() => handleCancelUpdate()}
        footer={null}
      >
        <form onSubmit={handleUpdateSubmit} className="p-3 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="question"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Question
            </label>
            <textarea
              name="question"
              placeholder="Enter question"
              value={formData.question || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors?.question && (
              <p className="text-sm text-red-600 mt-1">{errors?.question[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="options"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Options
            </label>
            {formData.options?.map((option, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    name={`options[${index}].option`}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option.option || ""}
                    onChange={(e) =>
                      handleOptionChange(index, "option", e.target.value)
                    }
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            ))}
            {errors?.options && (
              <p className="text-sm text-red-600 mt-1">{errors?.options[0]}</p>
            )}
            <button
              type="button"
              onClick={handleAddOption}
              className="text-blue-500 mt-2 cursor-pointer"
            >
              Add More Options
            </button>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="correctOption"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Correct Option
            </label>
            <select
              name="correctOption"
              value={formData.correctOption || ""}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
            >
              <option value="">Select Correct Option</option>
              {formData.options?.map((option, index) => (
                <option key={index} value={option.option}>
                  {String.fromCharCode(65 + index)}. {option.option}
                </option>
              ))}
            </select>
            {errors?.correctOption && (
              <p className="text-sm text-red-600 mt-1">
                {errors?.correctOption[0]}
              </p>
            )}
          </div>
          {activeTab === "paid" && (
            <div className="flex flex-col">
              <label
                htmlFor="topicId"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Topic
              </label>
              <select
                name="topicId"
                value={formData.topicId || ""}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer"
              >
                <option value="">Select Topic</option>
                {topics?.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.topicName} (Subject {topic.subjectName} Level{" "}
                    {topic.level})
                  </option>
                ))}
              </select>
              {errors?.topicId && (
                <p className="text-sm text-red-600 mt-1">
                  {errors?.topicId[0]}
                </p>
              )}
            </div>
          )}
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
            {imagePreview || formData.image ? (
              <div className="mt-3 w-full">
                <img
                  src={imagePreview || formData.image}
                  alt="Image Preview"
                  className="h-24 w-full object-contain rounded-md"
                />
              </div>
            ) : null}
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
        <p>Are you sure you want to delete this question?</p>
      </Modal>
    </main>
  );
}

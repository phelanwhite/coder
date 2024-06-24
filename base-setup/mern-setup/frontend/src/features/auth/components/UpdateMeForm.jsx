import UploadAndPreview from "components/form/upload-and-preview";
import React, { memo, useEffect, useState } from "react";
import { useGetMeQuery, useUpdateMeMutation } from "../services/authApi";
import { toast } from "react-toastify";
import { setCurrentUser } from "../services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/ui/loader";

const UpdateMeForm = () => {
  const user = useSelector((state) => state.authSlice?.currentUser);
  const dispatch = useDispatch();
  const getMeResult = useGetMeQuery();
  const [updateMe, updateMeResult] = useUpdateMeMutation();
  const [formValue, setFormValue] = useState({
    name: "",
    avatar: [],
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    state: "",
    bod: "",
    content: "",
  });
  const [files, setFiles] = useState(null);

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValue).forEach((item) => {
      formData.append(item[0], item[1]);
    });
    if (files) {
      formData.append(`file`, files[0]);
    }
    updateMe(formData);
  };

  // updateMeResult
  useEffect(() => {
    if (updateMeResult.isSuccess) {
      toast.success(updateMeResult.data?.message);
      dispatch(
        setCurrentUser({
          ...user,
          data: updateMeResult.data?.result,
        })
      );
    }
    if (updateMeResult.isError) {
      toast.error(updateMeResult.error?.data?.message);
    }
  }, [updateMeResult]);

  useEffect(() => {
    setFormValue((prev) => ({ ...prev, ...getMeResult.data?.result }));
  }, [getMeResult]);

  if (updateMeResult.isLoading) return <Loader />;

  return (
    <div className="p-6 rounded border">
      <div className="text-xl font-semibold mb-6">Update Profile</div>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <UploadAndPreview
            dataListURL={formValue.avatar}
            setDataListURL={setFiles}
          />
          <input
            className="input-box"
            type="text"
            placeholder="Name"
            required
            name="name"
            value={formValue.name || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="text"
            placeholder="Phone"
            name="phone"
            value={formValue.phone || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="text"
            placeholder="Address"
            name="address"
            value={formValue.address || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="text"
            placeholder="City"
            name="city"
            value={formValue.city || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="text"
            placeholder="Country"
            name="country"
            value={formValue.country || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="text"
            placeholder="Zip"
            name="zip"
            value={formValue.zip || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="text"
            placeholder="State"
            name="state"
            value={formValue.state || ""}
            onChange={handleInputChange}
          />
          <input
            className="input-box"
            type="date"
            placeholder="Bridth of day"
            name="bod"
            value={formValue.bod || ""}
            onChange={handleInputChange}
          />
          <textarea
            className="input-box resize-none"
            placeholder="Content"
            name="content"
            value={formValue.content || ""}
            rows={10}
            onChange={handleInputChange}
          />
          <button
            disabled={updateMeResult.isLoading}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(UpdateMeForm);

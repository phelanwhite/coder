import { useGetMeQuery, useUpdateMeMutation } from "features/auth/authApi";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "components/Wrapper";
import { setCurrentUser } from "features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "components/Loader";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();

  const getMeResult = useGetMeQuery();
  const [updateMe, updateMeResult] = useUpdateMeMutation();

  const [formValue, setFormValue] = useState({
    avatar: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    state: "",
    bod: "",
    content: "",
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValue).forEach((item) => {
      formData.append(item[0], item[1]);
    });
    formData.append("file", file);
    updateMe({ body: formData });
  };
  useEffect(() => {
    if (updateMeResult.isSuccess) {
      dispatch(setCurrentUser(updateMeResult.data?.data));
      toast.success(updateMeResult?.data?.message);
    }
    if (updateMeResult.isError) {
      toast.error(updateMeResult?.error?.data?.message);
    }
  }, [updateMeResult]);

  useEffect(() => {
    setFormValue({ ...getMeResult.data });
  }, [getMeResult]);

  if (getMeResult.isLoading || updateMeResult.isLoading) return <Loader />;
  return (
    <div>
      <Wrapper>
        <div className="my-8">
          <div className="max-w-[800px] w-full mx-auto ">
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="w-40 h-40 overflow-hidden rounded-full mx-auto">
                  <label htmlFor="file">
                    <input
                      className="hidden"
                      type="file"
                      id="file"
                      name="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <img
                      src={file ? URL.createObjectURL(file) : formValue.avatar}
                      alt=""
                      loading="lazy"
                    />
                  </label>
                </div>
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
        </div>
      </Wrapper>
    </div>
  );
};

export default memo(UpdateProfileForm);

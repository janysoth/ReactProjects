import React, { useEffect, useState } from 'react';
import FormButton from '../../components/Button/FormButton';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';

const ProfilePage = () => {
  useUserAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profileImageUrl: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;
        setUser(userData);
        setFormData({
          fullName: userData.fullName || "",
          email: userData.email || "",
          profileImageUrl: userData.profileImageUrl || "",
          password: "",
        });

        if (userData.profileImageUrl) {
          setProfilePic(userData.profileImageUrl);
        }

      } catch (error) {
        setError("Failed to load user data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");
    let uploadedImageUrl = formData.profileImageUrl;

    try {
      if (profilePic && typeof profilePic !== "string") {
        const uploadRes = await uploadImage(profilePic);
        uploadedImageUrl = uploadRes.imageUrl || "";
      }

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        profileImageUrl: uploadedImageUrl,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      const res = await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      alert("Profile updated successfully!");
      setFormData(prev => ({ ...prev, password: "" }));
    } catch (error) {
      console.error(error);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6 text-red-600">User not found.</div>;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Update Your Profile</h2>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Smith"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johnsmith@example.com"
            />

            <Input
              label="Current Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your current password to change"
            />

            <Input
              label="New Password (optional)"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-4">
            <FormButton type="submit" variant="primary">
              Save Changes
            </FormButton>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
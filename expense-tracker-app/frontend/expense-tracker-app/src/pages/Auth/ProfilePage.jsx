import React, { useEffect, useState } from 'react';
import FormButton from '../../components/Button/FormButton';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';

const ProfilePage = () => {
  useUserAuth();

  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
          header: {
            Authorization: `Bearer ${token}`,
          }
        });

        setUser(res.data);

        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          profileImageUrl: res.data.profileImageUrl || "",
          password: "",
        });
      } catch (error) {
        console.log("Failed to fetch user in ProfilePage: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleChange = (key, value) => {
  //   setFormData(prev => ({ ...prev, [key]: value }));
  // };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        profileImageUrl: formData.profileImageUrl,
      };

      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      const res = await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE, payload, {
        header: {
          Authorization: `Bearer ${token}`,
        }
      });

      setUser(res.data);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile in ProfilePage: ", error);
      alert("Update failed. Please try again.");
    }
  };

  if (loading) return <div className='p-4'>Loading...</div>;

  if (!user) return <div className="p-4 text-red-600">User not found.</div>;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-300"
            onClick={() => setModalOpen(true)}
          >
            Update Profile
          </button>
        </div>

        <div className="space-y-3">
          {user.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>

        </div>

        <Modal title="Update Profile" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Profile Image URL</label>
              <input
                type="text"
                name="profileImageUrl"
                value={formData.profileImageUrl}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">New Password (optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div className="flex justify-end gap-2">
              <FormButton
                variant="danger"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </FormButton>

              <FormButton
                variant="primary"
                type='submit'
              >
                Save Changes
              </FormButton>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
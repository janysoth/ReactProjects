import React, { useEffect, useState } from 'react';

import FormButton from '../../components/Button/FormButton';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';

const ProfilePage = () => {
  useUserAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    profileImageUrl: '',
    password: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          profileImageUrl: res.data.profileImageUrl || '',
          password: '',
        });
      } catch (error) {
        console.log('Failed to fetch user in ProfilePage: ', error);
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setError('');

    let profileImageUrl = formData.profileImageUrl;

    try {
      if (profilePic) {
        const uploadRes = await uploadImage(profilePic);
        profileImageUrl = uploadRes.imageUrl || '';
      }

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        profileImageUrl,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      const res = await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Profile update failed. Please try again.');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) return <div className="p-4 text-red-600">User not found.</div>;

  return (
    <DashboardLayout>
      <div className="card m-10 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <button
            className="add-btn"
            onClick={() => setModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            {user.profileImageUrl && (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover items-center"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="John Smith"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              placeholder="johnsmith@example.com"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Modal title="Edit Profile" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-2">
              <FormButton variant="danger" onClick={() => setModalOpen(false)}>
                Cancel
              </FormButton>

              <FormButton variant="primary" type="submit">
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
import React, { createContext, useContext, useState, useCallback } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  
  const [profileData, setProfileData] = useState({
    basicInfo: {
      firstName: 'Dave',
      lastName: 'Richards',
      email: 'dave@mail.com',
      yearOfBirth: '',
      gender: '',
      phone: '8332883854',
      altPhone: '',
      address: '',
      pincode: '',
      state: '',
      country: '',
    },
    education: {
      school: '',
      degree: '',
      course: '',
      completionYear: '',
      grade: '',
    },
    skills: {
      skills: '',
      projects: '',
    },
    experience: [
      { domain: '', subdomain: '', experience: '' },
      { domain: '', subdomain: '', experience: '' },
    ],
    links: {
      linkedin: 'linkedin.com/in/daverichards',
    },
  });

  const handleChange = useCallback((section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  const handleExperienceChange = useCallback((index, field, value) => {
    setProfileData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value,
      };
      return { ...prev, experience: newExperience };
    });
  }, []);

  const handleImageChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleResumeChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeUrl(URL.createObjectURL(file));
    }
  }, []);

  const value = {
    activeTab,
    setActiveTab,
    isHoveringAvatar,
    setIsHoveringAvatar,
    profileData,
    profileImageUrl,
    resumeFile,
    resumeUrl,
    handleChange,
    handleExperienceChange,
    handleImageChange,
    handleResumeChange,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;

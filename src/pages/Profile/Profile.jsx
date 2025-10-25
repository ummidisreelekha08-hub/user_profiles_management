import React, { useRef } from 'react';
import { useProfile } from '../../context/profileContext';

// This component is unchanged
const FormSectionCard = ({ title, children }) => {
  return (
    <div className="card mb-4 shadow-sm border-0"> {/* --- STYLE CHANGE: Added shadow-sm, removed border --- */}
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0" style={{ color: '#343a40' }}>{title}</h5>
          {/* In a real app, this button would likely trigger an 'edit' mode */}
          <button className="btn btn-sm" style={{ backgroundColor: '#f0eefe' }}>
            <i className="bi bi-pencil" style={{ color: '#7a5cfa' }}></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function Profile() {
  const {
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
  } = useProfile();

  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  const triggerResumeUpload = () => {
    resumeInputRef.current?.click();
  };

  // --- STYLES (Unchanged) ---
  const pendingTabs = ['education'];
  const tabContainerStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    padding: '4px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    width: 'fit-content',
  };
  const tabButtonStyle = {
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    position: 'relative',
  };
  const activeTabStyle = {
    ...tabButtonStyle,
    backgroundColor: '#f0eefe',
    color: '#7a5cfa',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };
  const inactiveTabStyle = {
    ...tabButtonStyle,
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  };
  const pendingDotStyle = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '12px',
    height: '12px',
    backgroundColor: '#fd7e14',
    borderRadius: '50%',
  };
  // --- END OF STYLES ---

  // --- NEW STYLES FOR AVATAR HOVER ---
  const avatarOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    pointerEvents: 'none', // Allow clicks to pass through to the div underneath
  };

  const avatarIconStyle = {
    fontSize: '48px',
    color: 'white',
  };
  // --- END OF NEW STYLES ---


  return (
    <div style={{ backgroundColor: 'white' }}> {/* --- STYLE CHANGE: Set background to white --- */}
      
      {/* --- STYLE TAG: Added for LinkedIn focus style --- */}
      <style>
        {`
          #linkedin:focus,
          #linkedin:active {
            border-color: #7a5cfa !important;
            box-shadow: 0 0 0 0.25rem rgba(122, 92, 250, 0.25) !important;
          }
        `}
      </style>

      {/* Hidden file inputs */}
      <input 
        type="file" 
        ref={imageInputRef} 
        onChange={handleImageChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <input
        type="file"
        ref={resumeInputRef}
        onChange={handleResumeChange}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx"
      />

      <div className="container-fluid p-4">
        {/* --- HEADER SECTION (UPDATED FOR IMAGE UPLOAD & HOVER) --- */}
        <div className="bg-white p-4 rounded-3 mb-4 d-flex align-items-center shadow-sm">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-4" 
            style={{ 
              width: '160px', 
              height: '160px', 
              backgroundColor: '#f0eefe',
              cursor: 'pointer',
              overflow: 'hidden', // To contain the image
              position: 'relative', // Added for overlay,
            }}
            onClick={triggerImageUpload} // Click to upload
            title="Click to upload profile picture"
            onMouseEnter={() => setIsHoveringAvatar(true)} // Added hover listener
            onMouseLeave={() => setIsHoveringAvatar(false)} // Added hover listener
          >
            {profileImageUrl ? (
              <img 
                src={profileImageUrl} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <i
                className="bi bi-person-fill" // Default icon
                style={{ fontSize: '48px', color: '#7a5cfa' }}
              ></i>
            )}
            
            {/* --- HOVER OVERLAY --- */}
            {isHoveringAvatar && (
              <div style={avatarOverlayStyle}>
                <i className="bi bi-pencil" style={avatarIconStyle}></i>
              </div>
            )}
            {/* --- END HOVER OVERLAY --- */}

          </div>
          <div>
            <h2 className="mb-1">{profileData.basicInfo.firstName} {profileData.basicInfo.lastName}</h2>
            <div className="d-flex align-items-center text-secondary mb-1">
              <span className="me-2">{profileData.basicInfo.email}</span>
              <i className="bi bi-clipboard" style={{ cursor: 'pointer' }}></i>
            </div>
            <span className="text-secondary">{profileData.basicInfo.phone}</span>
          </div>
        </div>

        {/* --- TAB NAVIGATION (Unchanged) --- */}
        <div style={tabContainerStyle}>
          <button 
            onClick={() => setActiveTab('basicInfo')} 
            style={activeTab === 'basicInfo' ? activeTabStyle : inactiveTabStyle}
          >
            Basic Info
          </button>
          <button 
            onClick={() => setActiveTab('education')} 
            style={activeTab === 'education' ? activeTabStyle : inactiveTabStyle}
          >
            Education & skills
            {pendingTabs.includes('education') && (
              <span style={pendingDotStyle}></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('experience')} 
            style={activeTab === 'experience' ? activeTabStyle : inactiveTabStyle}
          >
            Experience
          </button>
        </div>
        {/* --- END OF TAB NAVIGATION --- */}


        {/* --- CONTENT SECTIONS (UPDATED WITH STATE) --- */}
        <div>
          {activeTab === 'basicInfo' && (
            <FormSectionCard title="Basic Details">
              <form>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName" 
                      placeholder="e.g. John" 
                      value={profileData.basicInfo.firstName}
                      onChange={(e) => handleChange('basicInfo', 'firstName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName" 
                      placeholder="e.g. Doe"
                      value={profileData.basicInfo.lastName}
                      onChange={(e) => handleChange('basicInfo', 'lastName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="email" className="form-label">Email ID</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="e.g. mrnobody@mail.com"
                      value={profileData.basicInfo.email}
                      onChange={(e) => handleChange('basicInfo', 'email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="yearOfBirth" className="form-label">Year of birth</label>
                    <select 
                      className="form-select" 
                      id="yearOfBirth"
                      value={profileData.basicInfo.yearOfBirth}
                      onChange={(e) => handleChange('basicInfo', 'yearOfBirth', e.target.value)}
                    >
                      <option value="">YYYY</option>
                      {/* Populate years dynamically in a real app */}
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                      <option value="1998">1998</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select 
                      className="form-select" 
                      id="gender"
                      value={profileData.basicInfo.gender}
                      onChange={(e) => handleChange('basicInfo', 'gender', e.target.value)}
                    >
                      <option value="">Select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="phone" className="form-label">Phone number</label>
                    <div className="input-group">
                      <span className="input-group-text">🇮🇳</span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        placeholder="8332883854"
                        value={profileData.basicInfo.phone}
                        onChange={(e) => handleChange('basicInfo', 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="altPhone" className="form-label">Alternate Phone no</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="altPhone" 
                      placeholder="e.g. 9876543210"
                      value={profileData.basicInfo.altPhone}
                      onChange={(e) => handleChange('basicInfo', 'altPhone', e.target.value)}
                    />
                  </div>
                  <div className="col-md-8 mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea 
                      className="form-control" 
                      id="address" 
                      rows="3" 
                      placeholder="Enter here"
                      value={profileData.basicInfo.address}
                      onChange={(e) => handleChange('basicInfo', 'address', e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="pincode" 
                      placeholder="Enter here"
                      value={profileData.basicInfo.pincode}
                      onChange={(e) => handleChange('basicInfo', 'pincode', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">Domicile state</label>
                    <select 
                      className="form-select" 
                      id="state"
                      value={profileData.basicInfo.state}
                      onChange={(e) => handleChange('basicInfo', 'state', e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {/* Populate states in a real app */}
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="country" className="form-label">Domicile country</label>
                    <select 
                      className="form-select" 
                      id="country"
                      value={profileData.basicInfo.country}
                      onChange={(e) => handleChange('basicInfo', 'country', e.target.value)}
                    >
                      <option value="">Select an option</option>
                      <option value="USA">USA</option>
                      <option value="IN">India</option>
                    </select>
                  </div>
                </div>
              </form>
            </FormSectionCard>
          )}

          {activeTab === 'education' && (
            <>
              <FormSectionCard title="Education Details">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="school" className="form-label">School / College</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="school" 
                        placeholder="e.g. Lincoln College"
                        value={profileData.education.school}
                        onChange={(e) => handleChange('education', 'school', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="degree" className="form-label">Highest degree or equivalent</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="degree" 
                        placeholder="e.g. Bachelors in Technology"
                        value={profileData.education.degree}
                        onChange={(e) => handleChange('education', 'degree', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="course" className="form-label">Course</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="course" 
                        placeholder="e.g. Computer science engineering"
                        value={profileData.education.course}
                        onChange={(e) => handleChange('education', 'course', e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="completionYear" className="form-label">Year of completion</label>
                      <select 
                        className="form-select" 
                        id="completionYear"
                        value={profileData.education.completionYear}
                        onChange={(e) => handleChange('education', 'completionYear', e.target.value)}
                      >
                        <option value="">YYYY</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="grade" className="form-label">Grade</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="grade" 
                        placeholder="Enter here"
                        value={profileData.education.grade}
                        onChange={(e) => handleChange('education', 'grade', e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </FormSectionCard>

              <FormSectionCard title="Skills & Projects">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="skills" className="form-label">Skills</label>
                      <textarea 
                        className="form-control" 
                        id="skills" 
                        rows="4" 
                        placeholder="Enter here"
                        value={profileData.skills.skills}
                        onChange={(e) => handleChange('skills', 'skills', e.target.value)}
                      ></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="projects" className="form-label">Projects</label>
                      <textarea 
                        className="form-control" 
                        id="projects" 
                        rows="4" 
                        placeholder="Enter here"
                        value={profileData.skills.projects}
                        onChange={(e) => handleChange('skills', 'projects', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </FormSectionCard>
            </>
          )}

          {activeTab === 'experience' && (
            <>
              {/* Map over the experience array to create forms */}
              {profileData.experience.map((exp, index) => (
                <FormSectionCard title={`Work Experience ${index + 1}`} key={index}>
                  <form>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor={`domain${index}`} className="form-label">Domain</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id={`domain${index}`} 
                          placeholder="e.g. Technology"
                          value={exp.domain}
                          onChange={(e) => handleExperienceChange(index, 'domain', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor={`subdomain${index}`} className="form-label">Sub-domain</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id={`subdomain${index}`} 
                          placeholder="e.g. MERN Stack"
                          value={exp.subdomain}
                          onChange={(e) => handleExperienceChange(index, 'subdomain', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                      <label htmlFor={`experience${index}`} className="form-label">Experience</label>
                        <select 
                          className="form-select" 
                          id={`experience${index}`}
                          value={exp.experience}
                          onChange={(e) => handleExperienceChange(index, 'experience', e.target.value)}
                        >
                          <option value="">Select an option</option>
                          <option value="1-2">1-2 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </FormSectionCard>
              ))}
              {/* In a real app, you'd have a button to add/remove experience sections */}

              <div className="row">
                <div className="col-md-6">
                  <FormSectionCard title="LinkedIn">
                    <form>
                      <label htmlFor="linkedin" className="form-label">Profile URL</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="linkedin" 
                        placeholder="linkedin.com/in/mrbean"
                        value={profileData.links.linkedin}
                        onChange={(e) => handleChange('links', 'linkedin', e.target.value)}
                      />
                    </form>
                  </FormSectionCard>
                </div>
                <div className="col-md-6">
                  {/* --- RESUME CARD (UPDATED) --- */}
                  <FormSectionCard title="Resume">
                    {resumeFile ? (
                      // Show file info if uploaded
                      <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded">
                        <div>
                          <i className="bi bi-file-earmark-pdf-fill text-danger me-2"></i>
                          <span>{resumeFile.name}</span>
                        </div>
                        <a 
                          href={resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm" // --- STYLE CHANGE: Removed btn-primary ---
                          style={{ backgroundColor: '#f0eefe', color: '#7a5cfa', fontWeight: '500' }} // --- STYLE CHANGE: Matched image ---
                        >
                          View
                        </a>
                      </div>
                    ) : (
                      // Show upload button if not
                      <button 
                        className="btn w-100" // --- STYLE CHANGE: Removed btn-outline-primary ---
                        style={{ backgroundColor: '#f0eefe', color: '#7a5cfa', fontWeight: '500', border: '1px solid #f0eefe' }} // --- STYLE CHANGE: Matched theme ---
                        onClick={triggerResumeUpload}
                      >
                        <i className="bi bi-upload me-2"></i>
                        Upload Resume
                      </button>
                    )}
                  </FormSectionCard>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import "./WorkshopManagement.css";
import BannerImg from "../../assets/images/banner3.jpeg";
import { FiEdit, FiTrash2, FiUpload, FiX, FiCheck } from "react-icons/fi";

const WorkshopManagement = () => {
  const [workshops, setWorkshops] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isNewWorkshop, setIsNewWorkshop] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const defaultWorkshop = {
    title: "",
    description: "",
    duration: "",
    price: "",
    capacity: "",
    difficulty: "Beginner",
    materials: "",
    image: "",
    contact: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
    schedule: [{ day: "", time: "" }]
  };

  const [currentWorkshop, setCurrentWorkshop] = useState(defaultWorkshop);

  const handleEdit = (id) => {
    const workshopToEdit = workshops.find(w => w.id === id);
    setCurrentWorkshop(workshopToEdit);
    setEditingId(id);
    setIsNewWorkshop(false);
    setPreviewImage(workshopToEdit.image);
  };

  const handleAddNew = () => {
    setCurrentWorkshop(defaultWorkshop);
    setEditingId(null);
    setIsNewWorkshop(true);
    setPreviewImage(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (isNewWorkshop) {
      const newId = workshops.length > 0 ? Math.max(...workshops.map(w => w.id)) + 1 : 1;
      setWorkshops([...workshops, { ...currentWorkshop, id: newId }]);
    } else {
      setWorkshops(workshops.map(w => w.id === editingId ? currentWorkshop : w));
    }
    
    resetForm();
  };

  const handleDelete = (id) => {
    setWorkshops(workshops.filter(w => w.id !== id));
    if (editingId === id) resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes("contact.")) {
      const contactField = name.split(".")[1];
      setCurrentWorkshop({
        ...currentWorkshop,
        contact: {
          ...currentWorkshop.contact,
          [contactField]: value
        }
      });
    } else if (name.includes("schedule.")) {
      const [field, index, subField] = name.split(".");
      const updatedSchedule = [...currentWorkshop.schedule];
      updatedSchedule[index][subField] = value;
      
      setCurrentWorkshop({
        ...currentWorkshop,
        schedule: updatedSchedule
      });
    } else {
      setCurrentWorkshop({
        ...currentWorkshop,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setCurrentWorkshop({
          ...currentWorkshop,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addScheduleSlot = () => {
    setCurrentWorkshop({
      ...currentWorkshop,
      schedule: [...currentWorkshop.schedule, { day: "", time: "" }]
    });
  };

  const removeScheduleSlot = (index) => {
    const updatedSchedule = currentWorkshop.schedule.filter((_, i) => i !== index);
    setCurrentWorkshop({
      ...currentWorkshop,
      schedule: updatedSchedule
    });
  };

  const resetForm = () => {
    setCurrentWorkshop(defaultWorkshop);
    setEditingId(null);
    setIsNewWorkshop(false);
    setPreviewImage(null);
  };

  return (
    <div className="workshop-management">
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Workshop Management</h1>
          <p className="slide-in">Create and manage artisan workshops</p>
        </div>
      </div>

      {/* Add New Workshop Button */}
      <div className="add-workshop-btn-container">
        <button className="add-new-btn" onClick={handleAddNew}>
          + Add New Workshop
        </button>
      </div>

      {/* Workshop Form */}
      {(isNewWorkshop || editingId) && (
        <div className="workshop-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>{isNewWorkshop ? 'Create New Workshop' : `Edit: ${currentWorkshop.title}`}</h2>
              <button className="close-btn" onClick={resetForm}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-columns">
                {/* Left Column */}
                <div className="form-column">
                  <div className="form-group">
                    <label>Workshop Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={currentWorkshop.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter workshop title"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description*</label>
                    <textarea
                      name="description"
                      value={currentWorkshop.description}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Describe the workshop in detail"
                    />
                  </div>

                  <div className="form-group">
                    <label>Workshop Image*</label>
                    <div className="image-upload">
                      {previewImage ? (
                        <div className="image-preview">
                          <img src={previewImage} alt="Preview" />
                          <label className="change-image-btn">
                            <FiUpload /> Change Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="upload-area">
                          <div className="upload-icon">
                            <FiUpload />
                          </div>
                          <p>Click to upload an image</p>
                          <p className="upload-hint">Recommended size: 800x450px</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={isNewWorkshop}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="form-column">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Duration*</label>
                      <input
                        type="text"
                        name="duration"
                        value={currentWorkshop.duration}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 3 hours"
                      />
                    </div>
                    <div className="form-group">
                      <label>Price*</label>
                      <input
                        type="text"
                        name="price"
                        value={currentWorkshop.price}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. LKR 5,000"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Capacity*</label>
                      <input
                        type="number"
                        name="capacity"
                        value={currentWorkshop.capacity}
                        onChange={handleInputChange}
                        required
                        placeholder="Max participants"
                      />
                    </div>
                    <div className="form-group">
                      <label>Difficulty Level*</label>
                      <select
                        name="difficulty"
                        value={currentWorkshop.difficulty}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Materials Provided</label>
                    <input
                      type="text"
                      name="materials"
                      value={currentWorkshop.materials}
                      onChange={handleInputChange}
                      placeholder="List materials included"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="section-divider"></div>
              
              <div className="form-group">
                <label className="section-label">Schedule*</label>
                <div className="schedule-container">
                  {currentWorkshop.schedule.map((slot, index) => (
                    <div key={index} className="schedule-slot">
                      <div className="schedule-input-group">
                        <select
                          name={`schedule.${index}.day`}
                          value={slot.day}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select day</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                        <input
                          type="time"
                          name={`schedule.${index}.time`}
                          value={slot.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {currentWorkshop.schedule.length > 1 && (
                        <button
                          type="button"
                          className="remove-slot-btn"
                          onClick={() => removeScheduleSlot(index)}
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-slot-btn"
                    onClick={addScheduleSlot}
                  >
                    + Add Time Slot
                  </button>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="section-divider"></div>
              
              <div className="contact-section">
                <label className="section-label">Contact Information</label>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Name*</label>
                    <input
                      type="text"
                      name="contact.name"
                      value={currentWorkshop.contact.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Person in charge"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone*</label>
                    <input
                      type="tel"
                      name="contact.phone"
                      value={currentWorkshop.contact.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Contact number"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="contact.email"
                      value={currentWorkshop.contact.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address*</label>
                    <input
                      type="text"
                      name="contact.address"
                      value={currentWorkshop.contact.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Workshop location"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <FiCheck /> {isNewWorkshop ? 'Create Workshop' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Current Workshops Section */}
      <div className="workshop-list-section">
        <div className="section-header">
          <h2>Current Workshops</h2>
          <p className="section-subtitle">Manage your existing workshops</p>
        </div>
        
        {workshops.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FiEdit />
            </div>
            <h3>No workshops yet</h3>
            <p>Click "Add New Workshop" to create your first workshop</p>
          </div>
        ) : (
          <div className="workshop-grid">
            {workshops.map(workshop => (
              <div key={workshop.id} className="workshop-card">
                <div className="card-image">
                  <img src={workshop.image} alt={workshop.title} />
                </div>
                <div className="card-content">
                  <h3>{workshop.title}</h3>
                  <div className="card-meta">
                    <span className="price">{workshop.price}</span>
                    <span className="duration">{workshop.duration}</span>
                    <span className="difficulty">{workshop.difficulty}</span>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(workshop.id)}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(workshop.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopManagement;
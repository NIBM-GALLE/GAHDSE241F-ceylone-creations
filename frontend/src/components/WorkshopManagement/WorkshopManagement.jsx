import React, { useState, useEffect } from "react";
import "./WorkshopManagement.css";
import BannerImg from "../../assets/images/banner3.jpeg";
import { FiEdit, FiTrash2, FiUpload, FiX, FiCheck } from "react-icons/fi";

const defaultPlaceholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23E9ECEF'/%3E%3Ctext x='50%' y='50%' fill='%236C757D' dy='.3em' font-family='sans-serif' font-size='16px' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const WorkshopManagement = () => {
  const [workshops, setWorkshops] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isNewWorkshop, setIsNewWorkshop] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchWorkshops = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/workshops");
        if (response.ok) {
          const data = await response.json();
          setWorkshops(data);
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const handleEdit = (id) => {
    const workshopToEdit = workshops.find(w => w._id === id);
    setCurrentWorkshop(workshopToEdit);
    setEditingId(id);
    setIsNewWorkshop(false);
    if (workshopToEdit.image) {
      if (workshopToEdit.image.startsWith('http') || workshopToEdit.image.startsWith('data:')) {
        setPreviewImage(workshopToEdit.image);
      } else {
        setPreviewImage(`http://localhost:5000/uploads/${workshopToEdit.image}`);
      }
    } else {
      setPreviewImage(null);
    }
  };

  const handleAddNew = () => {
    setCurrentWorkshop(defaultWorkshop);
    setEditingId(null);
    setIsNewWorkshop(true);
    setPreviewImage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('title', currentWorkshop.title);
    formData.append('description', currentWorkshop.description);
    formData.append('duration', currentWorkshop.duration);
    formData.append('price', currentWorkshop.price);
    formData.append('capacity', currentWorkshop.capacity);
    formData.append('difficulty', currentWorkshop.difficulty);
    formData.append('materials', currentWorkshop.materials);
    formData.append('contact', JSON.stringify(currentWorkshop.contact));
    formData.append('schedule', JSON.stringify(currentWorkshop.schedule));
    
    if (currentWorkshop.image && typeof currentWorkshop.image !== 'string') {
      formData.append('image', currentWorkshop.image);
    }

    try {
      let response;
      const url = isNewWorkshop 
        ? "http://localhost:5000/api/workshops" 
        : `http://localhost:5000/api/workshops/${editingId}`;

      response = await fetch(url, {
        method: isNewWorkshop ? "POST" : "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedWorkshop = await response.json();
        if (isNewWorkshop) {
          setWorkshops([updatedWorkshop, ...workshops]);
        } else {
          setWorkshops(workshops.map(w => w._id === editingId ? updatedWorkshop : w));
        }
        resetForm();
      }
    } catch (error) {
      console.error("Error saving workshop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/workshops/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setWorkshops(workshops.filter(w => w._id !== id));
          if (editingId === id) resetForm();
        }
      } catch (error) {
        console.error("Error deleting workshop:", error);
      } finally {
        setIsLoading(false);
      }
    }
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
      updatedSchedule[Number(index)][subField] = value;
      
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
      };
      reader.readAsDataURL(file);
      setCurrentWorkshop({
        ...currentWorkshop,
        image: file 
      });
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
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Workshop Management</h1>
          <p className="slide-in">Create and manage artisan workshops</p>
        </div>
      </div>

      <div className="add-workshop-btn-container">
        <button className="add-new-btn" onClick={handleAddNew}>
          + Add New Workshop
        </button>
      </div>

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
                <div className="form-column">
                  <div className="form-group">
                    <label>Workshop Title*</label>
                    <input type="text" name="title" value={currentWorkshop.title} onChange={handleInputChange} required placeholder="Enter workshop title" />
                  </div>
                  <div className="form-group">
                    <label>Description*</label>
                    <textarea name="description" value={currentWorkshop.description} onChange={handleInputChange} required rows="5" placeholder="Describe the workshop in detail" />
                  </div>
                  <div className="form-group">
                    <label>Workshop Image*</label>
                    <div className="image-upload">
                      {previewImage ? (
                        <div className="image-preview">
                          <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                          <label className="change-image-btn">
                            <FiUpload /> Change Image
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                          </label>
                        </div>
                      ) : (
                        <label className="upload-area">
                          <div className="upload-icon"><FiUpload /></div>
                          <p>Click to upload an image</p>
                          <p className="upload-hint">Recommended size: 800x450px</p>
                          <input type="file" accept="image/*" onChange={handleImageChange} required={isNewWorkshop || !currentWorkshop.image} style={{ display: 'none' }} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Duration*</label>
                      <input type="text" name="duration" value={currentWorkshop.duration} onChange={handleInputChange} required placeholder="e.g. 3 hours" />
                    </div>
                    <div className="form-group">
                      <label>Price*</label>
                      <input type="text" name="price" value={currentWorkshop.price} onChange={handleInputChange} required placeholder="e.g. LKR 5,000" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Capacity*</label>
                      <input type="number" name="capacity" value={currentWorkshop.capacity} onChange={handleInputChange} required placeholder="Max participants" />
                    </div>
                    <div className="form-group">
                      <label>Difficulty Level*</label>
                      <select name="difficulty" value={currentWorkshop.difficulty} onChange={handleInputChange} required>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Materials Provided</label>
                    <input type="text" name="materials" value={currentWorkshop.materials} onChange={handleInputChange} placeholder="List materials included" />
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>
              <div className="form-group">
                <label className="section-label">Schedule*</label>
                <div className="schedule-container">
                  {currentWorkshop.schedule.map((slot, index) => (
                    <div key={index} className="schedule-slot">
                      <div className="schedule-input-group">
                        <select name={`schedule.${index}.day`} value={slot.day} onChange={handleInputChange} required>
                          <option value="">Select day</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                        <input type="time" name={`schedule.${index}.time`} value={slot.time} onChange={handleInputChange} required />
                      </div>
                      {currentWorkshop.schedule.length > 1 && (
                        <button type="button" className="remove-slot-btn" onClick={() => removeScheduleSlot(index)}><FiX /></button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-slot-btn" onClick={addScheduleSlot}>+ Add Time Slot</button>
                </div>
              </div>
              <div className="section-divider"></div>
              <div className="contact-section">
                <label className="section-label">Contact Information</label>
                <div className="form-group">
                  <label>Contact Name*</label>
                  <input type="text" name="contact.name" value={currentWorkshop.contact.name} onChange={handleInputChange} required placeholder="Person in charge" />
                </div>
                <div className="form-group">
                  <label>Phone*</label>
                  <input type="tel" name="contact.phone" value={currentWorkshop.contact.phone} onChange={handleInputChange} required placeholder="Contact number" />
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input type="email" name="contact.email" value={currentWorkshop.contact.email} onChange={handleInputChange} required placeholder="Email address" />
                </div>
                <div className="form-group">
                  <label>Address*</label>
                  <input type="text" name="contact.address" value={currentWorkshop.contact.address} onChange={handleInputChange} required placeholder="Workshop location" />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm} disabled={isLoading}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? 'Processing...' : <><FiCheck /> {isNewWorkshop ? 'Create Workshop' : 'Save Changes'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="workshop-list-section">
        <div className="section-header">
          <h2>Current Workshops</h2>
          <p className="section-subtitle">Manage your existing workshops</p>
        </div>
        
        {isLoading && workshops.length === 0 ? (
          <div className="loading-state"><p>Loading workshops...</p></div>
        ) : workshops.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><FiEdit /></div>
            <h3>No workshops yet</h3>
            <p>Click "Add New Workshop" to create your first workshop</p>
          </div>
        ) : (
          <div className="workshop-grid">
            {workshops.map((workshop) => {
              let imageUrl = defaultPlaceholderSrc; 
              if (workshop.image) {
                if (workshop.image.startsWith('http') || workshop.image.startsWith('data:')) {
                  imageUrl = workshop.image;
                } else {
                  imageUrl = `http://localhost:5000/uploads/${workshop.image}`;
                }
              }

              return (
                <div key={workshop._id} className="workshop-card">
                  <div className="card-image">
                    <img
                      src={imageUrl}
                      alt={workshop.title}
                      onError={(e) => {
                        if (e.target.src !== defaultPlaceholderSrc) {
                           e.target.onerror = null; 
                           e.target.src = defaultPlaceholderSrc;
                        }
                      }}
                    />
                  </div>
                  <div className="card-content">
                    <h3>{workshop.title}</h3>
                    <p>{workshop.description.substring(0, 100)}{workshop.description.length > 100 ? "..." : ""}</p>
                    <div className="card-meta">
                      <span className="price">Price: {workshop.price}</span>
                      <span className="duration">Duration: {workshop.duration}</span>
                      <span className="difficulty">Difficulty: {workshop.difficulty}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(workshop._id)} className="edit-btn"><FiEdit /> Edit</button>
                    <button onClick={() => handleDelete(workshop._id)} className="delete-btn"><FiTrash2 /> Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopManagement;
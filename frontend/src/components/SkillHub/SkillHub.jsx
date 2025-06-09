import React, { useState, useEffect } from "react";
import "./SkillHub.css";
import BadgeIcon from "../../assets/images/certification-badge.png";
import Skill1Img from "../../assets/images/skill1.jpg";
import Skill2Img from "../../assets/images/skill2.jpg";
import Skill3Img from "../../assets/images/skill3.jpg";
import Skill4Img from "../../assets/images/skill4.jpg";
import Skill5Img from "../../assets/images/skill5.jpg";
import Skill6Img from "../../assets/images/skill6.png";
import Skill7Img from "../../assets/images/skill7.jpg";

const SkillHub = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [showDetails, setShowDetails] = useState(null);
  const [progressData, setProgressData] = useState({});
  
  const learningPaths = [
    {
      id: "craft-master",
      title: "Traditional Craft Master",
      description: "Become a certified master in Sri Lankan traditional crafts. This path focuses on core artisan skills enhanced by technology.",
      color: "#8b5e3c",
      skills: [1, 4, 7]
    },
    {
      id: "digital-artisan",
      title: "Digital Artisan Entrepreneur",
      description: "Combine traditional skills with modern business acumen and digital tools to thrive in the online marketplace.",
      color: "#4a7c59",
      skills: [2, 5, 6]
    },
    {
      id: "sustainability-expert",
      title: "Sustainability Expert",
      description: "Master eco-friendly materials, sustainable practices, and circular economy principles in crafts.",
      color: "#3a86ff",
      skills: [3, 5, 7]
    }
  ];
  
  const [selectedPath, setSelectedPath] = useState(learningPaths.length > 0 ? learningPaths[0].id : null);

  useEffect(() => {
    // Simulating fetching progress data
    const mockProgress = {
      1: 25,
      2: 0,
      3: 100,
    };
    setProgressData(mockProgress);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Traditional Craft Mastery",
      description: "Master advanced techniques in wood carving, mask making, and lacquer work with our AR-guided tutorials.",
      image: Skill1Img,
      level: 3,
      duration: "8 weeks",
      format: "AR/VR + Live Mentoring",
      certification: "Master Artisan Certification",
      requirements: "Intermediate crafting skills",
      xp: 500,
      dependencies: [],
      tech: ["AR Guidance", "3D Modeling", "Skill Analytics"],
    },
    {
      id: 2,
      title: "Digital Marketing for Artisans",
      description: "Leverage AI tools to optimize your online presence and sales with predictive analytics.",
      image: Skill2Img,
      level: 2,
      duration: "6 weeks",
      format: "Interactive AI Coach",
      certification: "Digital Artisan Certification",
      requirements: "Basic computer skills",
      xp: 350,
      dependencies: [],
      tech: ["AI Analytics", "Automated SEO", "Chatbot Integration"],
    },
    {
      id: 3,
      title: "Sustainable Material Science",
      description: "Explore cutting-edge sustainable materials with our molecular visualization tools.",
      image: Skill3Img,
      level: 3,
      duration: "5 weeks",
      format: "3D Material Simulation",
      certification: "Green Craft Certification",
      requirements: "Basic chemistry knowledge",
      xp: 400,
      dependencies: [],
      tech: ["Material Simulation", "Carbon Footprint Tracker", "Eco-Scoring"],
    },
    {
      id: 4,
      title: "Advanced Textile Engineering",
      description: "Use CAD tools to design intricate patterns and optimize production workflows.",
      image: Skill4Img,
      level: 4,
      duration: "10 weeks",
      format: "CAD Software + IoT Looms",
      certification: "Textile Engineer Certification",
      requirements: "Weaving experience",
      xp: 600,
      dependencies: [1],
      tech: ["CAD Design", "IoT Integration", "Pattern Algorithm"],
    },
    {
      id: 5,
      title: "Artisan Business Intelligence",
      description: "Utilize blockchain and smart contracts for transparent business operations.",
      image: Skill5Img,
      level: 3,
      duration: "6 weeks",
      format: "Blockchain Simulation",
      certification: "Artisan Entrepreneur Certification",
      requirements: "None",
      xp: 450,
      dependencies: [2],
      tech: ["Blockchain", "Smart Contracts", "Market Predictions"],
    },
    {
      id: 6,
      title: "AI-Assisted Product Design",
      description: "Collaborate with AI to generate innovative product designs and prototypes.",
      image: Skill6Img,
      level: 4,
      duration: "7 weeks",
      format: "AI Co-Design Platform",
      certification: "AI Design Specialist",
      requirements: "Basic design skills",
      xp: 550,
      dependencies: [2, 4],
      tech: ["Generative AI", "3D Prototyping", "Market Fit Analysis"],
    },
    {
      id: 7,
      title: "Smart Craft Technologies",
      description: "Incorporate IoT and smart materials into traditional crafts for modern markets.",
      image: Skill7Img,
      level: 5,
      duration: "12 weeks",
      format: "IoT Kit + AR Instructions",
      certification: "Smart Craft Master",
      requirements: "Advanced crafting skills",
      xp: 750,
      dependencies: [1, 3],
      tech: ["IoT Integration", "Smart Materials", "AR Assembly"],
    },
  ];

  const handleDetailsToggle = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  const getLevelColor = (level) => {
    const colors = ['#4cc9f0', '#4895ef', '#4361ee', '#3f37c9', '#3a0ca3'];
    return colors[Math.min(Math.max(0, level - 1), colors.length - 1)];
  };

  const renderCourseCard = (course) => {
    const progress = progressData[course.id] || 0;
    const isCompleted = progress === 100;
    const isInProgress = progress > 0 && progress < 100;
    const areDependenciesMet = course.dependencies.every(depId => progressData[depId] === 100);
    const isLocked = !areDependenciesMet && !isCompleted && !isInProgress;

    let cardStatusClass = '';
    if (isCompleted) cardStatusClass = 'completed';
    else if (isInProgress) cardStatusClass = 'in-progress';
    else if (isLocked) cardStatusClass = 'locked';
    
    return (
      <div key={course.id} className={`course-box fade-up ${cardStatusClass}`}>
        <div className="course-image-container">
          <img src={course.image} alt={course.title} />
          {isCompleted && (
            <div className="completed-badge">
              <img src={BadgeIcon} alt="Certified" />
              <span>CERTIFIED</span>
            </div>
          )}
          {isLocked && !isCompleted && (
             <div className="locked-overlay">
               <i className="fas fa-lock"></i>
               <span>Requires: {course.dependencies.map(id => courses.find(c => c.id === id)?.title || 'Previous Course').join(', ')}</span>
             </div>
           )}
        </div>
        <h2>{course.title}</h2>
        <div className="course-meta">
          <span className="level-indicator" style={{ backgroundColor: getLevelColor(course.level) }}>
            Level {course.level}
          </span>
          <span className="xp-indicator">
            <i className="fas fa-star"></i> {course.xp} XP
          </span>
        </div>
        <p className="course-description">{course.description}</p>
        
        {(isInProgress || isCompleted) && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">{progress}% Complete</span>
          </div>
        )}
        
        <button
          className="details-btn"
          onClick={() => handleDetailsToggle(course.id)}
          disabled={isLocked && !isCompleted && !isInProgress}
        >
          {showDetails === course.id ? 'Hide Details' : (isCompleted ? 'View Certification' : 'Course Details')}
        </button>

        {showDetails === course.id && (
          <div className="course-details">
            <h3>Course Information</h3>
            <div className="tech-tags">
              {course.tech.map(tech => (
                <span key={tech} className="tech-tag"><i className="fas fa-microchip"></i> {tech}</span>
              ))}
            </div>
            <div className="details-grid">
              <div>
                <p><i className="fas fa-clock"></i> <strong>Duration:</strong> {course.duration}</p>
                <p><i className="fas fa-laptop-code"></i> <strong>Format:</strong> {course.format}</p>
              </div>
              <div>
                <p><i className="fas fa-award"></i> <strong>Certification:</strong> {course.certification}</p>
                <p><i className="fas fa-tasks"></i> <strong>Requirements:</strong> {course.requirements}</p>
              </div>
            </div>
            {course.dependencies.length > 0 && (
              <p className="dependencies">
                <strong><i className="fas fa-link"></i> Requires:</strong> {course.dependencies.map(id => 
                  courses.find(c => c.id === id)?.title || 'Unknown Course').join(', ')}
              </p>
            )}
            <button className={`enroll-btn ${isCompleted ? 'share-btn' : (isLocked ? 'locked-btn' : '')}`} disabled={isLocked && !isCompleted && !isInProgress}>
              {isCompleted ? <><i className="fas fa-share-alt"></i> Share Achievement</> : 
               isLocked ? <><i className="fas fa-lock"></i> Prerequisites Needed</> :
               isInProgress ? <><i className="fas fa-play-circle"></i> Continue Learning</> :
               <><i className="fas fa-rocket"></i> Enroll Now</>}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSkillTree = () => {
    const path = learningPaths.find(p => p.id === selectedPath);
    if (!path) return <div className="skill-tree-container"><p>Please select a learning path.</p></div>;

    const skillsInPath = path.skills;
    const completedSkillsCount = skillsInPath.filter(id => progressData[id] === 100).length;
    const totalSkillsInPath = skillsInPath.length;
    
    const milestoneProgressPercent = totalSkillsInPath > 0 ? (completedSkillsCount / totalSkillsInPath) * 100 : 0;

    const getMilestoneStatus = (milestoneIndex) => {
      if (totalSkillsInPath === 0) return '';
      if (milestoneIndex === 0) return completedSkillsCount > 0 ? 'completed' : (skillsInPath.some(id => progressData[id] > 0) ? 'active' : '');
      if (milestoneIndex === 1) return completedSkillsCount >= Math.ceil(totalSkillsInPath / 2) && totalSkillsInPath >=2 ? 'completed' : (completedSkillsCount > 0 && totalSkillsInPath >=2 ? 'active' : '');
      if (milestoneIndex === 2) return completedSkillsCount === totalSkillsInPath && totalSkillsInPath >=3 ? 'completed' : (completedSkillsCount >= Math.ceil(totalSkillsInPath / 2) && totalSkillsInPath >=3 ? 'active' : '');
      return '';
    };

    return (
      <div className="skill-tree-container">
        <div className="path-selector">
          {learningPaths.map(p => (
            <button 
              key={p.id}
              className={`path-btn ${selectedPath === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPath(p.id)}
              style={{ '--path-color': p.color }}
            >
              <i className={`fas fa-${p.id === "craft-master" ? "tools" : p.id === "digital-artisan" ? "store" : "leaf"}`}></i>
              {p.title}
            </button>
          ))}
        </div>
        
        <div className="skill-tree" style={{'--path-accent-color': path.color}}>
          <div className="path-info">
            <h3 style={{ color: path.color }}>{path.title}</h3>
            <p>{path.description}</p>
            
            <div className="path-milestones">
              <div className="path-milestones-track">
                <div className="path-milestones-progress" style={{ width: `${milestoneProgressPercent}%`, backgroundColor: path.color }}></div>
              </div>
              {['Beginner', 'Intermediate', 'Advanced'].map((label, index) => (
                 totalSkillsInPath > index && (
                    <div key={label} className={`milestone ${getMilestoneStatus(index)}`}>
                        <div className="milestone-circle" style={getMilestoneStatus(index) === 'completed' ? { backgroundColor: path.color, borderColor: path.color } : {}}>
                        {getMilestoneStatus(index) === 'completed' ? <i className="fas fa-check"></i> : index + 1}
                        </div>
                        <div className="milestone-label">{label}</div>
                    </div>
                 )
              ))}
            </div>
          </div>
          
          <div className="tree-nodes">
            {skillsInPath.map((skillId, index) => {
              const course = courses.find(c => c.id === skillId);
              if (!course) return null;

              const progress = progressData[course.id] || 0;
              const isCourseCompleted = progress === 100;
              const isCourseInProgress = progress > 0 && progress < 100;
              const areDependenciesMet = course.dependencies.every(depId => {
                const isDepInPath = skillsInPath.includes(depId);
                if (isDepInPath) {
                    const depIndex = skillsInPath.indexOf(depId);
                    return skillsInPath.slice(0, index).includes(depId) ? (progressData[depId] === 100) : true; 
                }
                return progressData[depId] === 100;
              });

              let nodeStatus = 'available';
              if (isCourseCompleted) nodeStatus = 'completed';
              else if (isCourseInProgress) nodeStatus = 'in-progress';
              else if (!areDependenciesMet && !skillsInPath.slice(0, index).every(prevSkillId => progressData[prevSkillId] === 100)) {
                 if (index > 0 && progressData[skillsInPath[index-1]] !== 100) nodeStatus = 'locked';
                 else if (!areDependenciesMet) nodeStatus = 'locked';
              }
              
              return (
                <div 
                  key={skillId} 
                  className={`tree-node ${index % 2 === 0 ? 'left' : 'right'} node-${nodeStatus}`}
                  style={{ '--level-color': getLevelColor(course.level) }}
                  onClick={() => handleDetailsToggle(course.id)}
                >
                  <div className="node-content">
                    {nodeStatus === 'locked' && <div className="node-lock-icon"><i className="fas fa-lock"></i></div>}
                    <h4>{course.title}</h4>
                    <div className="node-meta">
                      <span className="node-level">Level {course.level}</span>
                      <span className="node-xp"><i className="fas fa-star"></i> {course.xp} XP</span>
                    </div>
                    <div className="node-tech">
                      {course.tech.slice(0, 2).map(tech => (
                        <span key={tech} className="tech-tag small"><i className="fas fa-cogs"></i> {tech}</span>
                      ))}
                      {course.tech.length > 2 && <span className="tech-tag small">+{course.tech.length -2} more</span>}
                    </div>
                    <div className="progress-circle-container">
                        <div className="progress-circle" style={{ '--progress': `${progress}%`}}>
                            <span>{progress}%</span>
                        </div>
                    </div>
                  </div>
                  
                  {index < skillsInPath.length - 1 && (
                    <div className="tree-connector" style={{'--connector-color': path.color, '--connector-active': (progress === 100) ? '1' : '0.3' }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    const completedCoursesCount = Object.values(progressData).filter(p => p === 100).length;
    const inProgressCoursesCount = Object.values(progressData).filter(p => p > 0 && p < 100).length;
    const totalXP = courses.reduce((sum, course) => {
      return progressData[course.id] === 100 ? sum + course.xp : sum;
    }, 0);
    const currentPathDetails = selectedPath ? learningPaths.find(p => p.id === selectedPath) : null;
    
    return (
      <div className="dashboard">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-flag-checkered"></i></div>
            <h3>Current Path</h3>
            <p className="stat-value">{currentPathDetails ? currentPathDetails.title : 'Not Selected'}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
            <h3>Courses Completed</h3>
            <p className="stat-value">{completedCoursesCount}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-spinner"></i></div>
            <h3>In Progress</h3>
            <p className="stat-value">{inProgressCoursesCount}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-star"></i></div>
            <h3>Total XP Earned</h3>
            <p className="stat-value">{totalXP}</p>
          </div>
        </div>
        
        <div className="recommended-courses">
          <h3><i className="fas fa-lightbulb"></i> Recommended Next Steps</h3>
          <div className="course-container">
            {courses
              .filter(course => {
                const isCompleted = progressData[course.id] === 100;
                const isInProgress = progressData[course.id] > 0 && progressData[course.id] < 100;
                if (isCompleted || isInProgress) return false;
                return course.dependencies.every(depId => progressData[depId] === 100);
              })
              .slice(0, 3)
              .map(course => renderCourseCard(course))}
            {courses.filter(course => course.dependencies.every(depId => progressData[depId] === 100) && progressData[course.id] !== 100).length === 0 && (
              <p className="no-recommendations">You're on fire! No immediate recommendations based on completed prerequisites, or you've started/completed them all. Explore new paths or advanced courses!</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="skillhub">
      <div className="banner">
        <div className="banner-content">
          <h1 className="fade-in">Skill Development Hub</h1>
          <p className="slide-in">Augment Your Artisan Skills with Future Tech</p>
          <div className="banner-tech-tags">
            <span><i className="fas fa-brain"></i> AI Mentors</span>
            <span><i className="fas fa-vr-cardboard"></i> AR Guidance</span>
            <span><i className="fab fa-bitcoin"></i> Blockchain Certs</span>
            <span><i className="fas fa-wifi"></i> IoT Integration</span>
          </div>
        </div>
      </div>

      <div className="hub-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fas fa-chart-pie"></i> Dashboard 
        </button>
        <button 
          className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <i className="fas fa-book-open"></i> All Courses
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tree' ? 'active' : ''}`}
          onClick={() => setActiveTab('tree')}
        >
          <i className="fas fa-network-wired"></i> Skill Paths 
        </button>
      </div>

      <div className="hub-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'courses' && (
          <div className="course-container">
            {courses.map(course => renderCourseCard(course))}
          </div>
        )}
        {activeTab === 'tree' && renderSkillTree()}
      </div>
    </div>
  );
};

export default SkillHub;
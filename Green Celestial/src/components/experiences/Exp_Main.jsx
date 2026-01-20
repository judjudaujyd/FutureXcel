import React from 'react';
import { getImageUrl } from '../../config/api';
import "./exp_main.css";

const Exp_Main = ({ team, vision, projects }) => {

  return (
    <div className="exp_main">
      {/* Hero / Vision Section */}
      <div className="vision_hero">
        <div className="vision_content">
          {/* User reported "Our Vision" repeats, so we remove the hardcoded H1 and rely on styling or just the content if it's a header. 
              Actually, usually a page title is good. Let's make it "Future & Vision" to avoid simple duplication if their text starts with "Our Vision".
              Also removed hardcoded fallback text to prove data is from DB. */}
          <h1>Green Celestial Vision</h1>
          <p>{vision || "Loading vision data..."}</p>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="section_container">
        <h2 className="section_title">Featured Projects</h2>
        <div className="projects_grid">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="project_card">
                <div className="project_img_wrapper">
                  <img src={getImageUrl(project.image)} alt={project.title} loading="lazy" />
                </div>
                <div className="project_info">
                  <h3>{project.title}</h3>
                  <div className="exp_project_category">{project.category}</div>
                  {/* Added price for better detail */}
                  <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>${project.price?.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no_data">Loading projects...</p>
          )}
        </div>
      </div>

      {/* Team Section */}
      <div className="section_container team_section">
        <h2 className="section_title">Meet Our Team</h2>
        <div className="team_grid">
          {team && team.length > 0 ? (
            team.map((member) => (
              <div key={member._id} className="team_card_premium">
                <div className="member_img">
                  <img src={getImageUrl(member.img)} alt={member.name} loading="lazy" />
                </div>
                <div className="member_info">
                  <h3>{member.name}</h3>
                  <p className="member_role">{member.role}</p>
                  <p className="member_about">{member.about}</p>
                  <div className="member_skills">
                    {member.skills && member.skills.split(',').map((skill, i) => (
                      <span key={i} className="skill_tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no_data">Loading team...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Exp_Main;
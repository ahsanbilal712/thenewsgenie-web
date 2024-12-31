import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Ahsan Bilal",
      role: "AI/ML Engineer",
      linkedin: "https://www.linkedin.com/in/about-ahsanbilal/",
    },
    {
      name: "Muhammad Saad Johar",
      role: "AI/ML Engineer",
      linkedin: "https://www.linkedin.com/in/muhammad-saad-johar-641860194/",
    },
    {
      name: "Taha Atiq",
      role: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/taha-atiq-418953268/",
    },
  ];

  const mentor = {
    name: "Dr. Arshad Islam",
    role: "Project Mentor",
    linkedin: "https://www.linkedin.com/in/misalian/",
  };

  const lab = {
    name: "Parallel Computing Network Lab at FAST Islamabad",
    website: "https://pcn.net.pk/",
    logo: "/images/pcnlogo.png",
  };

  return (
    <div className="team-section container mx-auto py-16 bg-white">
      <h2 className="text-5xl font-extrabold mb-16 text-center text-gray-800">Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member p-8 bg-gray-100 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold mb-4 text-gray-700">{member.name}</h3>
            <p className="text-lg text-gray-500 mb-6">{member.role}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faLinkedin} style={{ width: '28px', height: '28px' }} />
            </a>
          </div>
        ))}
        <div className="mentor p-8 bg-gray-100 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-bold mb-4 text-gray-700">{mentor.name}</h3>
          <p className="text-lg text-gray-500 mb-6">{mentor.role}</p>
          <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FontAwesomeIcon icon={faLinkedin} style={{ width: '28px', height: '28px' }} />
          </a>
        </div>
        <div className="lab p-8 bg-gray-100 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-bold mb-4 text-gray-700">{lab.name}</h3>
          <a href={lab.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline mb-6 block">
            Visit Lab Website
          </a>
          <a href={lab.website} target="_blank" rel="noopener noreferrer">
            <Image src={lab.logo} alt="PCN Logo" width={70} height={70} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
import React, { useState, useRef } from "react";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    domain: "",
    status: "",
    objective: "",
    languages: "",
    interests: "",
    experience: "",
    education: "",
    skills: "",
    image: null,
  });

  const cvRef = useRef(); // Référence pour capturer le CV

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  const formatList = (items) => items.split(',').map(item => item.trim());

  const handleDownloadPdf = () => {
    const input = cvRef.current;
    html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // Largeur A4 en mm
      const pageHeight = 295; // Hauteur A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("mon_cv.pdf");
    });
  };

  return (
    <div className="App">
      <h1>MON CV</h1>
      <form onSubmit={handleSubmit}>
        {/* Formulaire */}
        <div>
          <label>Prénom: </label>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom: </label>
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Téléphone: </label>
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adresse: </label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Domaine: </label>
          <input
            type="text"
            name="domain"
            value={userInfo.domain}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>État (ex: étudiant, ingénieur): </label>
          <input
            type="text"
            name="status"
            value={userInfo.status}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Objectif: </label>
          <textarea
            name="objective"
            value={userInfo.objective}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Langues (séparées par des virgules): </label>
          <input
            type="text"
            name="languages"
            value={userInfo.languages}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Centres d'intérêt (séparés par des virgules): </label>
          <input
            type="text"
            name="interests"
            value={userInfo.interests}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Expérience: </label>
          <textarea
            name="experience"
            value={userInfo.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Éducation: </label>
          <textarea
            name="education"
            value={userInfo.education}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Compétences (séparées par des virgules): </label>
          <textarea
            name="skills"
            value={userInfo.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Photo de profil: </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <button type="submit">Générer CV</button>
      </form>

      {/* Layout de la page */}
      <div className="cv-layout" ref={cvRef}>
        <nav className="navbar">
          <header className="header">
            {userInfo.image && (
              <img
                src={userInfo.image}
                alt="Profil"
                className="profile-pic"
              />
            )}
            <div className="name-status">
              <h1>{userInfo.firstName} {userInfo.lastName}</h1>
              <p>{userInfo.status}</p>
            </div>
          </header>
        </nav>

        <div className="info-sections">
          <aside className="sidebar">
            <h3>Objectif</h3>
            <p>{userInfo.objective}</p>
            <h3>Contact</h3>
            <p>Téléphone: {userInfo.phone}</p>
            <p>Email: {userInfo.email}</p>
            <p>Adresse: {userInfo.address}</p>
            <h3>Langues</h3>
            <ul>
              {formatList(userInfo.languages).map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
            <h3>Centres d'intérêt</h3>
            <ul>
              {formatList(userInfo.interests).map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </aside>

          <main className="content">
            <section>
              <h3>Expérience</h3>
              <p>{userInfo.experience}</p>
            </section>
            <section>
              <h3>Éducation</h3>
              <p>{userInfo.education}</p>
            </section>
            <section>
              <h3>Compétences</h3>
              <ul>
                {formatList(userInfo.skills).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      
      <button onClick={handleDownloadPdf} className="download-btn">
        Télécharger le CV en PDF
      </button>
    </div>
  );
}

export default App;

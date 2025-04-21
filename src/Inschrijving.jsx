import { useState } from "react";
import Header from "./Header";

export default function Inschrijving() {
  const [file, setFile] = useState(null);
  const [voorNaam, setVoorNaam] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("voornaam", voorNaam);
    formData.append("familienaam", lastName);
    formData.append("file", file);

    try {
      const response = await fetch("https://inschrijving.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Upload gelukt! URL: " + data.document.url);
        window.location.href = "https://nos-adfontes.net/inschrijving/";
      } else {
        alert("Upload mislukt.");
      }
    } catch (error) {
      console.error("Fout bij upload:", error);
      alert("Upload mislukt door netwerkfout.");
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-2xl mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-4">Inschrijving</h1>
        <a
    href="http://nos-adfontes.net/wp-content/uploads/2025/04/Intakeformulier-2025-2026-AFL-2.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-4 bg-blue-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-md"
  >
    Intakeformulier
  </a>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Beste ontvanger,</h2>

        <p className="text-center text-gray-600 italic">
          U kunt uw zoon/dochter aanmelden door het intakeformulier volledig in te vullen en te uploaden...
        </p>
        <p className="text-center text-gray-600 italic mb-4">
          Na het uploaden kunt u ook zelf een afspraak maken via de kalender
        </p>
        <p className="text-center text-sm text-red-600 mb-6">
          Let op: Het invullen van het inschrijfformulier geeft nog geen garantie op plaatsing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Voornaam leerling *
              </label>
              <input
                type="text"
                value={voorNaam}
                onChange={(e) => setVoorNaam(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Familienaam leerling *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload intakeformulier *
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                border border-dashed border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="text-center">
            
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md shadow-md"
            >
              Uploaden
            </button>
            
          </div>
        </form>
      </div>
    </>
  );
}

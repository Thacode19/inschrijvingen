import { useState } from "react";
import Header from "./Header";

export default function Inschrijving() {
  const [file, setFile] = useState(null);
  const [voorNaam, setVoorNaam] = useState("");
  const [lastName, setLastName] = useState("");
  const [toonPDF, setToonPDF] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!file || !voorNaam || !lastName) {
      setError("Alle velden zijn verplicht");
      setIsSubmitting(false);
      return;
    }

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
        await response.json();
        alert("Upload gelukt! Druk oke om door te gaan naar de kalender om een afspraak te maken");
        window.location.href = "https://nos-adfontes.net/inschrijving/";
      } else {
        throw new Error("Upload mislukt");
      }
    } catch (error) {
      console.error("Fout bij upload:", error);
      setError(error.message || "Upload mislukt door netwerkfout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-4">Inschrijving</h1>

        {/* PDF Toggle */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setToonPDF(!toonPDF)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow"
          >
            {toonPDF ? "Verberg info" : "Financiële informatie"}
          </button>

          {toonPDF && (
            <div className="mt-4">
              <iframe
                src="https://res.cloudinary.com/dxu5lomow/image/upload/v1745242712/Financiele-informatie_2025-2026_oc3iib.pdf"
                width="100%"
                height="600px"
                className="border rounded-md shadow"
                title="Financiële informatie"
              />
            </div>
          )}
        </div>

        {/* Form Download Links */}
        <div className="flex justify-center gap-4">
          <a
            href="http://nos-adfontes.net/wp-content/uploads/2025/04/Intakeformulier-2025-2026-AFL-Final.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Intakeformulier AFL
          </a>
          <a
            href="http://nos-adfontes.net/wp-content/uploads/2025/04/Intakeformulier-2025-2026-NOS-Final.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-colors"
          >
            Intakeformulier NOS
          </a>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Beste Ouder/Verzorger,</h2>
          <p className="text-gray-600 italic">
            U kunt uw zoon/dochter aanmelden door het intakeformulier volledig in te vullen en te uploaden...
          </p>
          <p className="text-gray-600 italic mb-4">
            Na het uploaden kunt u ook zelf een afspraak maken via de kalender
          </p>
          <p className="text-sm text-red-600 mb-6">
            Let op: Het invullen van het inschrijfformulier geeft nog geen garantie op plaatsing.
          </p>
        </div>

        {/* Upload Form */}
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring focus:ring-blue-300"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring focus:ring-blue-300"
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

          {error && (
            <div className="text-red-600 text-center">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-blue-600 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
              } text-white font-semibold py-2 px-6 rounded-md shadow-md transition-colors min-w-[120px]`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verwerken...
                </span>
              ) : "Uploaden"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
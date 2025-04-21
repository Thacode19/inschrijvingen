// import { useEffect, useState } from "react";

// export default function DocumentenLijst() {
//   const [docs, setDocs] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3000/documents")
//       .then((res) => res.json())
//       .then((data) => setDocs(data))
//       .catch((err) => console.error("Fout bij ophalen:", err));
//   }, []);

//   // Filter documenten op voornaam of familienaam
//   const filteredDocs = docs.filter((doc) =>
//     `${doc.voornaam} ${doc.familienaam}`.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center">Ingezonden documenten</h2>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Zoek op naam..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded shadow-sm"
//         />
//       </div>

//       {filteredDocs.length === 0 ? (
//         <p className="text-center">Geen documenten gevonden.</p>
//       ) : (
//         <ul className="space-y-4">
//           {filteredDocs.map((doc) => (
//             <li key={doc.id} className="border p-4 rounded shadow">
//               <p><strong>Naam:</strong> {doc.voornaam} {doc.familienaam}</p>
//               <p className="mb-2">
//                 <strong>Bestand:</strong>{" "}
//                 <a
//                   href={doc.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   Bekijk document
//                 </a>
//               </p>
//               <a
//                 href={doc.url}
//                 download
//                 className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
//               >
//                 Download
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function DocumentenLijst() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://inschrijving.onrender.com/documents")
      .then((res) => res.json())
      .then((data) => setDocs(data))
      .catch((err) => console.error("Fout bij ophalen:", err));
  }, []);

  const filteredDocs = docs.filter((doc) =>
    `${doc.voornaam} ${doc.familienaam}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Ingezonden documenten</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Zoek op naam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded shadow-sm"
        />
      </div>

      {filteredDocs.length === 0 ? (
        <p className="text-center">Geen documenten gevonden.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Naam</th>
              <th className="p-2 border text-center">Bestand</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="border-t hover:bg-gray-100">
                <td className="p-2 border">{doc.voornaam} {doc.familienaam}</td>
                <td className="p-2 border text-center">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xl"
                    title="Bekijk document"
                  >
                    📄
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

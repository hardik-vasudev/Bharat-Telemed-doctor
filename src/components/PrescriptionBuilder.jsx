import { useState } from "react";
import { jsPDF } from "jspdf";
import medicinesData from "../data/medicines";


const PrescriptionBuilder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [customInstructions, setCustomInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicines([...selectedMedicines, { ...medicine, dosage: "1 Tablet", frequency: "3 times a day", customDosage: "", customFrequency: "" }]);
  };

  const handleDosageChange = (index, value) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index].dosage = value;
    updatedMedicines[index].customDosage = value === "Custom" ? "" : "";
    setSelectedMedicines(updatedMedicines);
  };

  const handleCustomDosageChange = (index, value) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index].customDosage = value;
    setSelectedMedicines(updatedMedicines);
  };

  const handleFrequencyChange = (index, value) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index].frequency = value;
    updatedMedicines[index].customFrequency = value === "Custom" ? "" : "";
    setSelectedMedicines(updatedMedicines);
  };

  const handleCustomFrequencyChange = (index, value) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index].customFrequency = value;
    setSelectedMedicines(updatedMedicines);
  };

  const handleRemoveMedicine = (index) => {
    setSelectedMedicines(selectedMedicines.filter((_, i) => i !== index));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Prescription", 10, 10);
    doc.setFontSize(12);
    doc.text("Follow-up Date: " + followUpDate, 10, 20);
    doc.text("------------------------------------------", 10, 30);
    
    let yPosition = 40;
    selectedMedicines.forEach((med, index) => {
      const dosage = med.dosage === "Custom" ? med.customDosage : med.dosage;
      const frequency = med.frequency === "Custom" ? med.customFrequency : med.frequency;
      doc.text(`${index + 1}. ${med.name} (${med.strength}) - ${dosage}, ${frequency}`, 10, yPosition);
      yPosition += 10;
    });
    
    doc.text("------------------------------------------", 10, yPosition);
    yPosition += 10;
    doc.text("Instructions:", 10, yPosition);
    yPosition += 10;
    doc.text(customInstructions, 10, yPosition, { maxWidth: 180 });
    
    doc.save("prescription.pdf");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Prescription Builder</h2>
      <input
        type="text"
        placeholder="Search medicine..."
        className="w-full p-2 border rounded-lg mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mb-4 max-h-40 overflow-y-auto border rounded-lg p-2">
        {medicinesData
          .filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((med, index) => (
            <div key={index} className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => handleMedicineSelect(med)}>
              <span>{med.icon} {med.name} ({med.strength})</span>
              <button className="text-green-600 font-bold">Add</button>
            </div>
          ))}
      </div>
      {selectedMedicines.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold text-lg text-green-700">Selected Medicines</h3>
          <div className="max-h-60 overflow-y-auto border p-2 rounded-lg">
            {selectedMedicines.map((med, index) => (
              <div key={index} className="p-3 bg-gray-100 rounded-lg mb-2">
                <div className="flex justify-between items-center">
                  <span>{med.icon} {med.name} ({med.strength})</span>
                  <button onClick={() => handleRemoveMedicine(index)} className="text-red-500 text-sm">✖ Remove</button>
                </div>
                <select className="w-full p-2 mt-2 border rounded-lg" value={med.dosage} onChange={(e) => handleDosageChange(index, e.target.value)}>
                  <option>1 Tablet</option>
                  <option>2 Tablets</option>
                  <option>1 Drop</option>
                  <option>2 Drops</option>
                  <option>Custom</option>
                </select>
                {med.dosage === "Custom" && <input type="text" placeholder="Enter Custom Dosage" className="w-full p-2 mt-2 border rounded-lg" onChange={(e) => handleCustomDosageChange(index, e.target.value)} />}
                <select className="w-full p-2 mt-2 border rounded-lg" value={med.frequency} onChange={(e) => handleFrequencyChange(index, e.target.value)}>
                  <option>1 time a day</option>
                  <option>2 times a day</option>
                  <option>3 times a day</option>
                  <option>Custom</option>
                </select>
                {med.frequency === "Custom" && <input type="text" placeholder="Enter Custom Frequency" className="w-full p-2 mt-2 border rounded-lg" onChange={(e) => handleCustomFrequencyChange(index, e.target.value)} />}
              </div>
            ))}
          </div>
        </div>
      )}
      <textarea placeholder="Enter any custom instructions..." className="w-full p-2 border rounded-lg mb-4" value={customInstructions} onChange={(e) => setCustomInstructions(e.target.value)} />
      <input type="date" className="w-full p-2 border rounded-lg mb-4" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
      <button onClick={handleDownloadPDF} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700">Publish & Download PDF</button>
    </div>
  );
};

export default PrescriptionBuilder;

import { useLocation } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3 },
  medicineContainer: { marginTop: 10, borderTop: "1px solid #000", paddingTop: 5 },
});


const PrescriptionPDF = () => {
  const location = useLocation();
  const { selectedMedicines, customInstructions, followUpDate } = location.state || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Prescription</Text>
          <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.medicineContainer}>
          <Text style={styles.title}>Medicines:</Text>
          {selectedMedicines?.map((med, index) => (
            <Text key={index} style={styles.text}>
              • {med.name} ({med.strength}) - {med.dosage}, {med.frequency}
            </Text>
          ))}
        </View>

        {customInstructions && (
          <View style={styles.section}>
            <Text style={styles.title}>Instructions:</Text>
            <Text style={styles.text}>{customInstructions}</Text>
          </View>
        )}

        {followUpDate && (
          <View style={styles.section}>
            <Text style={styles.title}>Follow-up Date:</Text>
            <Text style={styles.text}>{followUpDate}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

const PrescriptionPDFDownload = () => {
  const location = useLocation();
  const prescriptionData = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Download Prescription</h2>
      <PDFDownloadLink
        document={<PrescriptionPDF {...prescriptionData} />}
        fileName="Prescription.pdf"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default PrescriptionPDFDownload;

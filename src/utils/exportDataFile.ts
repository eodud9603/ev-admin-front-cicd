import jsPDF from "jspdf";

const exportPDF = (tableData: Array<any>) => {
  // setTableData(data)
  const unit: any = "pt";
  const size: any = "A4"; // Use A1, A2, A3 or A4
  const orientation: any = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const title = "DataTables | Minia - Minimal Admin & Dashboard Template";
  const headers = [
    ["FirstName", "LastName", "Age", "Visits", "Progress", "Status"],
  ];

  const Dataa = tableData.map((elt: any) => [
    elt.firstName,
    elt.lastName,
    elt.age,
    elt.visits,
    elt.progress,
    elt.status,
  ]);

  const content: any = {
    startY: 50,
    head: headers,
    body: Dataa,
  };

  doc.text(title, marginLeft, 40);
  // doc.autoTable(content);
  doc.save("DataTables Minia - Minimal Admin Dashboard Template.pdf.pdf");
};

export { exportPDF };

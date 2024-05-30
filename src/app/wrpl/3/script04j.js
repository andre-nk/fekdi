var monthsEnglish = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var monthsSpanish = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
var monthsIndonesian = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
var monthsJapanese = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

//Static content ---------------------------------------------------------
document.write("<table border='1' width='200'>");
document.write(
  "<tr><th>Month #</th><th>English</th><th>Spanish</th><th>Indonesian</th><th>Japanese</th></tr>"
);

//Dynamic content --------------------------------------------------------
for (var i = 0; i < 12; i++) {
  document.write(
    "<tr><td>" +
      (i + 1) +
      "</td><td>" +
      monthsEnglish[i] +
      "</td><td>" +
      monthsSpanish[i] +
      "</td><td>" +
      monthsIndonesian[i] +
      "</td><td>" +
      monthsJapanese[i] +
      "</td></tr>"
  );
}

//Static content  --------------------------------------------------------
document.write("</table>");

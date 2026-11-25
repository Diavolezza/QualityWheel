// Product quality model of ISO/IEC 25010:2023: 9 characteristics, 40 subcharacteristics.
// Clause numbers and English names follow the standard; German names follow the iSAQB CPSA-F curriculum
// and the iSAQB glossary where they name the term. Descriptions and quality scenarios are written in our
// own words (the text of the standard is copyrighted). Each scenario has context, stimulus, response and
// measurement, as in CPSA-F learning goal LG 02-04.
"use strict";
window.QW = window.QW || {};

QW.categories = [
  { id: "3.1", color: "#2E7D32", text: "#ffffff",
    name: { en: "Functional suitability", de: "Funktionale Eignung" },
    desc: { en: "How well the functions of the product match what the intended users need – the needs that are written down and the ones that are taken for granted.",
            de: "Wie gut die Funktionen des Produkts zu dem passen, was die vorgesehenen Nutzenden brauchen – zu den festgeschriebenen und zu den stillschweigend erwarteten Anforderungen." } },
  { id: "3.2", color: "#E65100", text: "#ffffff",
    name: { en: "Performance efficiency", de: "Leistungseffizienz" },
    desc: { en: "The product meets its requirements for time and throughput and uses resources economically – CPU, memory, storage, network, energy and materials.",
            de: "Das Produkt erfüllt seine Anforderungen an Zeit und Durchsatz und geht sparsam mit Ressourcen um – CPU, Speicher, Netz, Energie und Material." } },
  { id: "3.3", color: "#6D4C41", text: "#ffffff",
    name: { en: "Compatibility", de: "Kompatibilität" },
    desc: { en: "The product exchanges information with other products and can share a common environment and common resources with them.",
            de: "Das Produkt tauscht Informationen mit anderen Produkten aus und kann sich mit ihnen eine Umgebung und Ressourcen teilen." } },
  { id: "3.4", color: "#7B1FA2", text: "#ffffff",
    name: { en: "Interaction capability", de: "Interaktionsfähigkeit" },
    desc: { en: "Specified users can work with the product through its user interface and complete their tasks. In the 2011 version this characteristic was called usability.",
            de: "Festgelegte Nutzende können über die Benutzungsschnittstelle mit dem Produkt arbeiten und ihre Aufgaben erledigen. In der Version von 2011 hieß dieses Merkmal Usability (Benutzbarkeit)." } },
  { id: "3.5", color: "#1565C0", text: "#ffffff",
    name: { en: "Reliability", de: "Zuverlässigkeit" },
    desc: { en: "The product performs its functions under specified conditions for a specified period of time without interruptions or failures.",
            de: "Das Produkt erfüllt seine Funktionen unter festgelegten Bedingungen über einen festgelegten Zeitraum ohne Unterbrechungen und Ausfälle." } },
  { id: "3.6", color: "#C62828", text: "#ffffff",
    name: { en: "Security", de: "Sicherheit" },
    desc: { en: "The product protects information and data, so that persons and other products get exactly the access that their authorisation allows, and it defends itself against attacks. It means information security, not safety.",
            de: "Das Produkt schützt Informationen und Daten so, dass Personen und andere Produkte genau den Zugriff erhalten, den ihre Berechtigung erlaubt, und es wehrt Angriffe ab. Gemeint ist Informationssicherheit (Security), nicht Betriebssicherheit (Safety)." } },
  { id: "3.7", color: "#00838F", text: "#ffffff",
    name: { en: "Maintainability", de: "Wartbarkeit" },
    desc: { en: "The intended maintainers can change the product effectively and efficiently – correct it, improve it or adapt it.",
            de: "Die vorgesehenen Personen können das Produkt wirksam und effizient ändern – korrigieren, verbessern oder anpassen." } },
  { id: "3.8", color: "#827717", text: "#ffffff",
    name: { en: "Flexibility", de: "Flexibilität" },
    desc: { en: "The product can be adapted to changes in its requirements, its contexts of use or its system environment. In the 2011 version this characteristic was called portability.",
            de: "Das Produkt lässt sich an Änderungen seiner Anforderungen, seines Nutzungskontexts oder seiner Systemumgebung anpassen. In der Version von 2011 hieß dieses Merkmal Portability (Portierbarkeit)." } },
  { id: "3.9", color: "#F9A825", text: "#212121",
    name: { en: "Safety", de: "Betriebssicherheit" },
    desc: { en: "Under defined conditions the product avoids states in which human life, health, property or the environment are in danger. New in the 2023 version.",
            de: "Das Produkt vermeidet unter festgelegten Bedingungen Zustände, in denen Leben, Gesundheit, Eigentum oder Umwelt gefährdet sind. Neu in der Version von 2023; gemeint ist Betriebssicherheit (Safety), nicht Sicherheit im Sinne von Security." } }
];

QW.qualities = [
  // 3.1 Functional suitability
  { id: "3.1.1", name: { en: "Functional completeness", de: "Funktionale Vollständigkeit" },
    desc: { en: "The functions of the product cover all specified tasks and the goals of the intended users. Nothing that users need for their work is missing.",
            de: "Die Funktionen decken alle spezifizierten Aufgaben und die Ziele der vorgesehenen Nutzenden ab. Es fehlt nichts, was für die Arbeit gebraucht wird." },
    scenario: {
      context: { en: "Expense report after a business trip abroad", de: "Reisekostenabrechnung nach einer Auslandsreise" },
      stimulus: { en: "An employee enters receipts in three currencies and claims daily allowances", de: "Eine Mitarbeiterin erfasst Belege in drei Währungen und Tagespauschalen" },
      response: { en: "The product converts, checks and submits everything without a second tool", de: "Das Produkt rechnet um, prüft und reicht alles ein, ohne zweites Werkzeug" },
      measure: { en: "100 % of the travel cases in the specification work without a manual workaround", de: "100 % der spezifizierten Reisefälle ohne Umweg von Hand" } } },
  { id: "3.1.2", name: { en: "Functional correctness", de: "Funktionale Korrektheit" },
    desc: { en: "The product delivers correct results – with the precision that the task requires.",
            de: "Das Produkt liefert korrekte Ergebnisse – mit der Genauigkeit, die die Aufgabe verlangt." },
    scenario: {
      context: { en: "Monthly payroll run", de: "Monatliche Gehaltsabrechnung" },
      stimulus: { en: "Payslips are calculated for 2,000 employees", de: "Für 2.000 Beschäftigte werden Abrechnungen berechnet" },
      response: { en: "Taxes and contributions are calculated and rounded as the law requires", de: "Steuern und Abgaben werden gesetzeskonform berechnet und gerundet" },
      measure: { en: "0 differences to the reference calculation, to the cent", de: "0 Abweichungen zur Referenzrechnung, centgenau" } } },
  { id: "3.1.3", name: { en: "Functional appropriateness", de: "Funktionale Angemessenheit" },
    desc: { en: "The functions help users to reach their tasks and goals with the necessary steps – and without unnecessary ones.",
            de: "Die Funktionen helfen, Aufgaben und Ziele mit den nötigen Schritten zu erreichen – ohne überflüssige." },
    scenario: {
      context: { en: "Online ticket shop, frequent traveller", de: "Online-Ticketshop, Vielfahrerin" },
      stimulus: { en: "A known connection is booked again", de: "Eine bekannte Verbindung wird erneut gebucht" },
      response: { en: "Saved connection, passenger and payment data are offered", de: "Gespeicherte Verbindung, Reisende und Zahlungsdaten werden angeboten" },
      measure: { en: "Booking done in at most 3 steps", de: "Buchung in höchstens 3 Schritten erledigt" } } },
  // 3.2 Performance efficiency
  { id: "3.2.1", name: { en: "Time behaviour", de: "Zeitverhalten" },
    desc: { en: "Response times, processing times and throughput meet the requirements under the specified conditions.",
            de: "Antwortzeiten, Verarbeitungszeiten und Durchsatz erfüllen unter den festgelegten Bedingungen die Anforderungen." },
    scenario: {
      context: { en: "Normal operation, 500 concurrent users", de: "Normalbetrieb, 500 gleichzeitige Nutzende" },
      stimulus: { en: "A user starts a search", de: "Eine Person startet eine Suche" },
      response: { en: "The result list appears", de: "Die Ergebnisliste erscheint" },
      measure: { en: "95 % within 300 ms", de: "95 % in unter 300 ms" } } },
  { id: "3.2.2", name: { en: "Resource utilization", de: "Ressourcenverbrauch" },
    desc: { en: "The product does its job with no more resources than specified – CPU time, memory, storage, network, energy and materials. For Green IT this is the quality closest to energy use and CO₂ emissions.",
            de: "Das Produkt erledigt seine Aufgaben mit nicht mehr Ressourcen als festgelegt – Rechenzeit, Arbeitsspeicher, Speicherplatz, Netz, Energie und Material. Für Green IT ist das das Qualitätsmerkmal, das dem Energieverbrauch und den CO₂-Emissionen am nächsten ist." },
    scenario: {
      context: { en: "Nightly batch run with the typical amount of data", de: "Nächtlicher Batch-Lauf mit der typischen Datenmenge" },
      stimulus: { en: "The batch job starts", de: "Der Batch-Job startet" },
      response: { en: "The job runs on one server until it is done", de: "Der Job läuft auf einem Server durch" },
      measure: { en: "At most 2 kWh and 16 GB of memory per run", de: "Höchstens 2 kWh und 16 GB Arbeitsspeicher pro Lauf" } } },
  { id: "3.2.3", name: { en: "Capacity", de: "Kapazität" },
    desc: { en: "The product reaches the required maximum limits of its parameters, for example number of users, amount of data or transactions per second.",
            de: "Das Produkt erreicht die geforderten Höchstwerte seiner Kenngrößen, etwa Zahl der Nutzenden, Datenmenge oder Transaktionen pro Sekunde." },
    scenario: {
      context: { en: "Black Friday peak in the online shop", de: "Black-Friday-Spitze im Online-Shop" },
      stimulus: { en: "10,000 orders per hour arrive", de: "10.000 Bestellungen pro Stunde gehen ein" },
      response: { en: "All orders are accepted and processed", de: "Alle Bestellungen werden angenommen und verarbeitet" },
      measure: { en: "No order is rejected; the queue is empty again within 15 minutes", de: "Keine Bestellung wird abgewiesen; die Queue ist nach 15 Minuten wieder leer" } } },
  // 3.3 Compatibility
  { id: "3.3.1", name: { en: "Co-existence", de: "Koexistenz" },
    desc: { en: "The product works efficiently in an environment that it shares with other products, and it does not harm them.",
            de: "Das Produkt arbeitet effizient in einer Umgebung, die es mit anderen Produkten teilt, ohne diese zu beeinträchtigen." },
    scenario: {
      context: { en: "Server shared with a backup tool and a virus scanner", de: "Server, den sich das Produkt mit Backup-Werkzeug und Virenscanner teilt" },
      stimulus: { en: "Backup, virus scan and the product run at the same time at night", de: "Backup, Virenscan und das Produkt laufen nachts gleichzeitig" },
      response: { en: "All three finish without blocking each other", de: "Alle drei laufen durch, ohne sich zu blockieren" },
      measure: { en: "Each run takes at most 10 % longer than alone", de: "Jeder Lauf dauert höchstens 10 % länger als allein" } } },
  { id: "3.3.2", name: { en: "Interoperability", de: "Interoperabilität" },
    desc: { en: "The product exchanges information with other products, and both sides can really use the information they receive.",
            de: "Das Produkt tauscht Informationen mit anderen Produkten aus, und beide Seiten können die erhaltenen Informationen tatsächlich verwenden." },
    scenario: {
      context: { en: "Medical practice and pharmacy", de: "Arztpraxis und Apotheke" },
      stimulus: { en: "A doctor issues an electronic prescription", de: "Eine Ärztin stellt ein E-Rezept aus" },
      response: { en: "The pharmacy system receives and processes it in HL7 FHIR", de: "Das Apothekensystem empfängt und verarbeitet es in HL7 FHIR" },
      measure: { en: "99.9 % of prescriptions processed without manual correction", de: "99,9 % der Rezepte ohne Korrektur von Hand verarbeitet" } } },
  // 3.4 Interaction capability
  { id: "3.4.1", name: { en: "Appropriateness recognizability", de: "Erkennbarkeit der Brauchbarkeit" },
    desc: { en: "Users can recognise whether the product fits their needs – from the first impression, a demo, the home page or the documentation.",
            de: "Nutzende erkennen, ob das Produkt zu ihren Bedürfnissen passt – schon am ersten Eindruck, an einer Demo, der Startseite oder der Dokumentation." },
    scenario: {
      context: { en: "First visit to a library app", de: "Erster Besuch einer Bibliotheks-App" },
      stimulus: { en: "A new user opens the start page", de: "Eine neue Nutzerin öffnet die Startseite" },
      response: { en: "The start page shows the main functions, such as renewing loans", de: "Die Startseite zeigt die Hauptfunktionen, etwa Ausleihen verlängern" },
      measure: { en: "8 of 10 test users name the purpose within 10 seconds", de: "8 von 10 Testpersonen nennen den Zweck innerhalb von 10 Sekunden" } } },
  { id: "3.4.2", name: { en: "Learnability", de: "Erlernbarkeit" },
    desc: { en: "Specified users learn to use specified functions within a specified time.",
            de: "Festgelegte Nutzende lernen, festgelegte Funktionen in einer festgelegten Zeit zu verwenden." },
    scenario: {
      context: { en: "New call centre staff after a one-hour introduction", de: "Neue Call-Center-Mitarbeitende nach einer Stunde Einführung" },
      stimulus: { en: "A customer calls with a complaint", de: "Ein Kunde ruft mit einer Reklamation an" },
      response: { en: "The complaint is recorded without help", de: "Die Reklamation wird ohne Hilfe erfasst" },
      measure: { en: "90 % succeed at the first attempt within 5 minutes", de: "90 % schaffen es beim ersten Versuch in 5 Minuten" } } },
  { id: "3.4.3", name: { en: "Operability", de: "Bedienbarkeit" },
    desc: { en: "The product has functions and properties that make it easy to operate and to control.",
            de: "Das Produkt hat Funktionen und Eigenschaften, die es leicht bedienbar und steuerbar machen." },
    scenario: {
      context: { en: "Daily order entry by experienced staff", de: "Tägliche Auftragserfassung durch erfahrene Mitarbeitende" },
      stimulus: { en: "An order is processed using only the keyboard", de: "Ein Auftrag wird nur mit der Tastatur bearbeitet" },
      response: { en: "All steps work with the keyboard, and every action can be undone", de: "Alle Schritte gehen per Tastatur, jede Aktion lässt sich rückgängig machen" },
      measure: { en: "Order processed in under 60 seconds", de: "Auftrag in unter 60 Sekunden bearbeitet" } } },
  { id: "3.4.4", name: { en: "User error protection", de: "Schutz vor Fehlbedienung" },
    desc: { en: "The product prevents users from making operating errors.",
            de: "Das Produkt verhindert Bedienfehler." },
    scenario: {
      context: { en: "Customer administration", de: "Kundenverwaltung" },
      stimulus: { en: "A user tries to delete a customer with open invoices", de: "Jemand versucht, einen Kunden mit offenen Rechnungen zu löschen" },
      response: { en: "The deletion is blocked with an explanation", de: "Das Löschen wird mit einer Erklärung verhindert" },
      measure: { en: "0 customers with open invoices deleted per year", de: "0 gelöschte Kunden mit offenen Rechnungen pro Jahr" } } },
  { id: "3.4.5", name: { en: "User engagement", de: "User Engagement" },
    desc: { en: "The product presents functions and information in an inviting and motivating way, so that users like to continue. It replaced user interface aesthetics.",
            de: "Das Produkt präsentiert Funktionen und Informationen einladend und motivierend, sodass Nutzende gern weiterarbeiten. Ersetzt die frühere Ästhetik der Benutzeroberfläche." },
    scenario: {
      context: { en: "Language learning app, first month of use", de: "Sprachlern-App, erster Nutzungsmonat" },
      stimulus: { en: "A learner finishes the daily lesson", de: "Eine Lernende beendet die Tageslektion" },
      response: { en: "Progress and friendly feedback are shown", de: "Fortschritt und freundliches Feedback werden angezeigt" },
      measure: { en: "60 % of new users are still active after 30 days", de: "60 % der neuen Nutzenden sind nach 30 Tagen noch aktiv" } } },
  { id: "3.4.6", name: { en: "Inclusivity", de: "Inklusivität" },
    desc: { en: "People with very different backgrounds can use the product – different ages, abilities, cultures, languages, genders, education or economic situations.",
            de: "Menschen mit sehr unterschiedlichem Hintergrund können das Produkt nutzen – unterschiedlich in Alter, Fähigkeiten, Kultur, Sprache, Geschlecht, Bildung oder wirtschaftlicher Lage." },
    scenario: {
      context: { en: "Public authority portal", de: "Behördenportal" },
      stimulus: { en: "A person with basic German and an old smartphone applies for a certificate of residence", de: "Eine Person mit wenig Deutschkenntnissen und altem Smartphone beantragt eine Meldebescheinigung" },
      response: { en: "The application is available in plain language and several languages and works on the device", de: "Der Antrag steht in Leichter Sprache und mehreren Sprachen bereit und läuft auf dem Gerät" },
      measure: { en: "At least 85 % complete the application in user tests with diverse groups", de: "Mindestens 85 % schließen den Antrag in Nutzertests mit gemischten Gruppen ab" } } },
  { id: "3.4.7", name: { en: "User assistance", de: "Nutzerunterstützung" },
    desc: { en: "People with the widest possible range of characteristics and capabilities, including disabilities, reach their goals with the product. Together with inclusivity it replaced accessibility.",
            de: "Menschen mit möglichst unterschiedlichen Eigenschaften und Fähigkeiten – auch mit Behinderungen – erreichen mit dem Produkt ihre Ziele. Zusammen mit Inklusivität ersetzt sie die frühere Zugänglichkeit (Accessibility)." },
    scenario: {
      context: { en: "Online banking", de: "Online-Banking" },
      stimulus: { en: "A blind user makes a transfer with a screen reader", de: "Ein blinder Nutzer macht eine Überweisung mit Screenreader" },
      response: { en: "All fields and buttons are announced correctly", de: "Alle Felder und Schaltflächen werden korrekt vorgelesen" },
      measure: { en: "Task completed without help; WCAG 2.2 level AA met", de: "Aufgabe ohne Hilfe erledigt; WCAG 2.2 Stufe AA erfüllt" } } },
  { id: "3.4.8", name: { en: "Self-descriptiveness", de: "Selbstbeschreibungsfähigkeit" },
    desc: { en: "The product shows the right information at the right moment, so that its capabilities and its use are clear without searching in manuals or asking other people.",
            de: "Das Produkt zeigt zur richtigen Zeit die passenden Informationen, sodass Möglichkeiten und Bedienung ohne Suchen im Handbuch oder Nachfragen klar sind." },
    scenario: {
      context: { en: "Online form for a building permit", de: "Online-Formular für einen Bauantrag" },
      stimulus: { en: "Someone fills in the form for the first time", de: "Jemand füllt das Formular zum ersten Mal aus" },
      response: { en: "Every field is explained next to it, and the progress is shown (“Step 2 of 4”)", de: "Jedes Feld ist daneben erklärt, der Fortschritt wird angezeigt („Schritt 2 von 4“)" },
      measure: { en: "Less than 5 % of users contact the hotline", de: "Weniger als 5 % der Nutzenden wenden sich an die Hotline" } } },
  // 3.5 Reliability
  { id: "3.5.1", name: { en: "Faultlessness", de: "Fehlerfreiheit" },
    desc: { en: "The product works without faults in normal operation. It replaced maturity.",
            de: "Das Produkt arbeitet im Normalbetrieb fehlerfrei. Ersetzt den früheren Reifegrad (Maturity)." },
    scenario: {
      context: { en: "Normal operation of order processing", de: "Normalbetrieb der Auftragsverarbeitung" },
      stimulus: { en: "10,000 transactions per day are processed", de: "Täglich werden 10.000 Transaktionen verarbeitet" },
      response: { en: "The transactions are processed without faults", de: "Die Transaktionen werden fehlerfrei verarbeitet" },
      measure: { en: "Less than 1 known defect per 10,000 transactions", de: "Weniger als 1 bekannter Fehler pro 10.000 Transaktionen" } } },
  { id: "3.5.2", name: { en: "Availability", de: "Verfügbarkeit" },
    desc: { en: "The product is operational and accessible when it is needed. Availability depends on how rarely failures happen and how quickly the product is back after one.",
            de: "Das Produkt ist betriebsbereit und erreichbar, wenn es gebraucht wird. Verfügbarkeit hängt davon ab, wie selten Ausfälle sind und wie schnell das Produkt danach wieder läuft." },
    scenario: {
      context: { en: "Online shop, open 24 hours a day", de: "Online-Shop, rund um die Uhr geöffnet" },
      stimulus: { en: "Customers access the shop at any time", de: "Kundschaft ruft den Shop zu beliebiger Zeit auf" },
      response: { en: "The shop is reachable and usable", de: "Der Shop ist erreichbar und benutzbar" },
      measure: { en: "99.9 % per month – at most about 43 minutes of downtime", de: "99,9 % pro Monat – höchstens etwa 43 Minuten Ausfall" } } },
  { id: "3.5.3", name: { en: "Fault tolerance", de: "Fehlertoleranz" },
    desc: { en: "The product keeps working as intended even when hardware or software faults are present.",
            de: "Das Produkt arbeitet auch dann wie vorgesehen weiter, wenn Hardware- oder Softwarefehler vorliegen." },
    scenario: {
      context: { en: "Peak load, database cluster with three nodes", de: "Lastspitze, Datenbank-Cluster mit drei Knoten" },
      stimulus: { en: "One database node fails", de: "Ein Datenbankknoten fällt aus" },
      response: { en: "The shop keeps accepting orders", de: "Der Shop nimmt weiter Bestellungen an" },
      measure: { en: "No order is lost; response time at most doubles", de: "Keine Bestellung geht verloren; die Antwortzeit verdoppelt sich höchstens" } } },
  { id: "3.5.4", name: { en: "Recoverability", de: "Wiederherstellbarkeit" },
    desc: { en: "After an interruption or a failure the product recovers the affected data and returns to the desired state.",
            de: "Nach einer Unterbrechung oder einem Ausfall stellt das Produkt die betroffenen Daten wieder her und kehrt in den gewünschten Zustand zurück." },
    scenario: {
      context: { en: "Production", de: "Produktion" },
      stimulus: { en: "The database server crashes", de: "Der Datenbankserver stürzt ab" },
      response: { en: "The system is restored from backup and transaction log", de: "Das System wird aus Backup und Transaktionslog wiederhergestellt" },
      measure: { en: "Running again within 15 minutes (RTO), at most 5 minutes of data lost (RPO)", de: "Nach 15 Minuten wieder in Betrieb (RTO), höchstens 5 Minuten Daten verloren (RPO)" } } },
  // 3.6 Security
  { id: "3.6.1", name: { en: "Confidentiality", de: "Vertraulichkeit" },
    desc: { en: "Data are accessible only to those who are authorised.",
            de: "Daten sind nur für Berechtigte zugänglich." },
    scenario: {
      context: { en: "Hospital information system", de: "Krankenhausinformationssystem" },
      stimulus: { en: "A nurse from another ward opens a patient record", de: "Eine Pflegekraft einer anderen Station öffnet eine Patientenakte" },
      response: { en: "Access is denied and the attempt is logged", de: "Der Zugriff wird verweigert und der Versuch protokolliert" },
      measure: { en: "100 % of unauthorised accesses blocked in the penetration test", de: "100 % der unberechtigten Zugriffe im Penetrationstest abgewehrt" } } },
  { id: "3.6.2", name: { en: "Integrity", de: "Integrität" },
    desc: { en: "System state and data are protected against unauthorised change or deletion – by attackers as well as by computer errors.",
            de: "Systemzustand und Daten sind vor unberechtigter Änderung oder Löschung geschützt – durch Angreifer ebenso wie durch Rechnerfehler." },
    scenario: {
      context: { en: "Online banking", de: "Online-Banking" },
      stimulus: { en: "An attacker changes the amount of a transfer on its way", de: "Ein Angreifer ändert den Betrag einer Überweisung unterwegs" },
      response: { en: "The change is detected and the transfer is rejected", de: "Die Änderung wird erkannt und die Überweisung abgewiesen" },
      measure: { en: "100 % of manipulated transfers detected", de: "100 % der manipulierten Überweisungen erkannt" } } },
  { id: "3.6.3", name: { en: "Non-repudiation", de: "Nichtabstreitbarkeit" },
    desc: { en: "The product can prove that actions or events took place, so that nobody can deny them later.",
            de: "Das Produkt kann nachweisen, dass Aktionen oder Ereignisse stattgefunden haben, sodass sie später nicht abgestritten werden können." },
    scenario: {
      context: { en: "Online contract platform", de: "Online-Vertragsplattform" },
      stimulus: { en: "A customer later denies having signed a contract", de: "Ein Kunde bestreitet später, einen Vertrag unterschrieben zu haben" },
      response: { en: "The product shows the signature with a qualified timestamp", de: "Das Produkt legt die Signatur mit qualifiziertem Zeitstempel vor" },
      measure: { en: "Proof available for 10 years and accepted by auditors", de: "Nachweis 10 Jahre verfügbar und von Prüfern anerkannt" } } },
  { id: "3.6.4", name: { en: "Accountability", de: "Verantwortlichkeit" },
    desc: { en: "Actions can be traced back uniquely to the person or system that performed them.",
            de: "Aktionen lassen sich eindeutig auf die Person oder das System zurückführen, die sie ausgeführt hat." },
    scenario: {
      context: { en: "Price management in an online shop", de: "Preispflege im Online-Shop" },
      stimulus: { en: "A price is changed", de: "Ein Preis wird geändert" },
      response: { en: "The audit log records who changed it, when, and the old and new value", de: "Das Audit-Log hält fest, wer wann geändert hat, mit altem und neuem Wert" },
      measure: { en: "Every change can be traced to one person; log kept for 10 years", de: "Jede Änderung ist einer Person zuordenbar; Log 10 Jahre aufbewahrt" } } },
  { id: "3.6.5", name: { en: "Authenticity", de: "Authentifizierbarkeit" },
    desc: { en: "The product can prove that a subject or a resource really is what it claims to be.",
            de: "Das Produkt kann nachweisen, dass ein Subjekt oder eine Ressource tatsächlich das ist, wofür es sich ausgibt." },
    scenario: {
      context: { en: "Login to the employee portal from the internet", de: "Anmeldung am Mitarbeiterportal aus dem Internet" },
      stimulus: { en: "Someone logs in with a stolen password", de: "Jemand meldet sich mit einem gestohlenen Passwort an" },
      response: { en: "Login is refused without the second factor", de: "Die Anmeldung scheitert ohne zweiten Faktor" },
      measure: { en: "0 successful logins with a password alone", de: "0 erfolgreiche Anmeldungen allein mit Passwort" } } },
  { id: "3.6.6", name: { en: "Resistance", de: "Widerstandsfähigkeit" },
    desc: { en: "The product keeps operating while it is under attack, for example a denial-of-service or ransomware attack.",
            de: "Das Produkt bleibt während eines Angriffs betriebsfähig, etwa bei Denial-of-Service oder Ransomware." },
    scenario: {
      context: { en: "Online shop during a DDoS attack", de: "Online-Shop während eines DDoS-Angriffs" },
      stimulus: { en: "A botnet sends 100 times the normal traffic", de: "Ein Botnetz schickt das Hundertfache des normalen Verkehrs" },
      response: { en: "Rate limiting and a web application firewall filter the attack; the shop stays online", de: "Rate Limiting und Web Application Firewall filtern den Angriff; der Shop bleibt online" },
      measure: { en: "95 % of legitimate requests answered within 2 s", de: "95 % der berechtigten Requests in unter 2 s beantwortet" } } },
  // 3.7 Maintainability
  { id: "3.7.1", name: { en: "Modularity", de: "Modularität" },
    desc: { en: "A change to one component affects other components as little as possible. Components are cohesive inside and loosely coupled to each other.",
            de: "Eine Änderung an einer Komponente wirkt sich möglichst wenig auf andere aus. Komponenten haben innen eine hohe Kohäsion und sind untereinander lose gekoppelt." },
    scenario: {
      context: { en: "Development", de: "Entwicklung" },
      stimulus: { en: "The payment provider is changed", de: "Der Zahlungsanbieter wird gewechselt" },
      response: { en: "Only the payment module is changed", de: "Nur das Payment-Modul wird geändert" },
      measure: { en: "No change outside the payment module", de: "Keine Änderung außerhalb des Payment-Moduls" } } },
  { id: "3.7.2", name: { en: "Reusability", de: "Wiederverwendbarkeit" },
    desc: { en: "Parts of the product can be used in more than one system or for building other assets.",
            de: "Teile des Produkts lassen sich in mehr als einem System oder zum Bau weiterer Bausteine verwenden." },
    scenario: {
      context: { en: "Development of a new invoicing system", de: "Entwicklung eines neuen Rechnungssystems" },
      stimulus: { en: "Address validation is needed", de: "Eine Adressprüfung wird gebraucht" },
      response: { en: "The existing address validation component is used unchanged", de: "Die vorhandene Komponente zur Adressprüfung wird unverändert genutzt" },
      measure: { en: "Integrated in at most 2 person-days", de: "In höchstens 2 Personentagen integriert" } } },
  { id: "3.7.3", name: { en: "Analysability", de: "Analysierbarkeit" },
    desc: { en: "The impact of a planned change, the cause of a failure or the parts that have to be modified can be found effectively and efficiently.",
            de: "Die Auswirkung einer geplanten Änderung, die Ursache eines Fehlers oder die zu ändernden Teile lassen sich wirksam und effizient ermitteln." },
    scenario: {
      context: { en: "Production, error reported by a customer", de: "Produktion, Fehlermeldung einer Kundin" },
      stimulus: { en: "A support ticket with an error ID arrives", de: "Ein Support-Ticket mit Fehler-ID geht ein" },
      response: { en: "Logs and traces show the cause", de: "Logs und Traces zeigen die Ursache" },
      measure: { en: "Cause found within 30 minutes", de: "Ursache in unter 30 Minuten gefunden" } } },
  { id: "3.7.4", name: { en: "Modifiability", de: "Änderbarkeit" },
    desc: { en: "The product can be changed effectively and efficiently without introducing defects or reducing the existing quality.",
            de: "Das Produkt lässt sich wirksam und effizient ändern, ohne neue Fehler einzubauen oder die bestehende Qualität zu verschlechtern." },
    scenario: {
      context: { en: "Development, running release", de: "Entwicklung, laufendes Release" },
      stimulus: { en: "The VAT rate changes", de: "Der Mehrwertsteuersatz ändert sich" },
      response: { en: "Change only in the configuration; regression tests stay green", de: "Änderung nur in der Konfiguration; Regressionstests bleiben grün" },
      measure: { en: "Done in less than one person-day, without a code change", de: "In unter einem Personentag erledigt, ohne Code-Änderung" } } },
  { id: "3.7.5", name: { en: "Testability", de: "Testbarkeit" },
    desc: { en: "For a requirement, objective and feasible tests can be designed and run that show whether it is met.",
            de: "Für eine Anforderung lassen sich objektive und machbare Tests entwerfen und durchführen, die zeigen, ob sie erfüllt ist." },
    scenario: {
      context: { en: "Continuous integration", de: "Continuous Integration" },
      stimulus: { en: "A developer changes the interest calculation", de: "Ein Entwickler ändert die Zinsberechnung" },
      response: { en: "Automated tests run with test doubles and a settable clock", de: "Automatisierte Tests laufen mit Test-Doubles und einstellbarer Uhr" },
      measure: { en: "All tests for this requirement run in under 5 minutes, without external systems", de: "Alle Tests für diese Anforderung laufen in unter 5 Minuten, ohne externe Systeme" } } },
  // 3.8 Flexibility
  { id: "3.8.1", name: { en: "Adaptability", de: "Adaptierbarkeit" },
    desc: { en: "The product can be adapted to, or moved to, other hardware, software or usage environments effectively and efficiently.",
            de: "Das Produkt lässt sich wirksam und effizient an andere Hardware, Software oder Einsatzumgebungen anpassen oder dorthin übertragen." },
    scenario: {
      context: { en: "Move from the own data centre to a public cloud", de: "Umzug vom eigenen Rechenzentrum in eine Public Cloud" },
      stimulus: { en: "The application is moved to a cloud provider", de: "Die Anwendung zieht zu einem Cloud-Anbieter um" },
      response: { en: "It runs in containers without a code change", de: "Sie läuft in Containern ohne Code-Änderung" },
      measure: { en: "Migration in under 2 weeks; only configuration changed", de: "Umzug in unter 2 Wochen; nur Konfiguration geändert" } } },
  { id: "3.8.2", name: { en: "Scalability", de: "Skalierbarkeit" },
    desc: { en: "The product handles growing or shrinking workloads, or it adapts its capacity to a changing demand.",
            de: "Das Produkt bewältigt wachsende oder sinkende Last oder passt seine Kapazität an schwankenden Bedarf an." },
    scenario: {
      context: { en: "Daily lunchtime peak", de: "Tägliche Mittagsspitze" },
      stimulus: { en: "Load rises from 1,000 to 10,000 requests per minute within 10 minutes", de: "Die Last steigt binnen 10 Minuten von 1.000 auf 10.000 Requests pro Minute" },
      response: { en: "Autoscaling starts more instances and shuts them down afterwards", de: "Autoscaling startet weitere Instanzen und fährt sie danach wieder herunter" },
      measure: { en: "Response time stays under 500 ms; extra instances gone 30 minutes after the peak", de: "Antwortzeit bleibt unter 500 ms; zusätzliche Instanzen 30 Minuten nach der Spitze wieder weg" } } },
  { id: "3.8.3", name: { en: "Installability", de: "Installierbarkeit" },
    desc: { en: "The product can be installed and uninstalled successfully, effectively and efficiently in a specified environment.",
            de: "Das Produkt lässt sich in einer festgelegten Umgebung erfolgreich, wirksam und effizient installieren und deinstallieren." },
    scenario: {
      context: { en: "Laptop of a new team member", de: "Laptop eines neuen Teammitglieds" },
      stimulus: { en: "The application is installed", de: "Die Anwendung wird installiert" },
      response: { en: "One command installs it with all dependencies; uninstalling leaves nothing behind", de: "Ein Befehl installiert sie mit allen Abhängigkeiten; die Deinstallation hinterlässt nichts" },
      measure: { en: "Under 10 minutes, no manual steps", de: "Unter 10 Minuten, keine Schritte von Hand" } } },
  { id: "3.8.4", name: { en: "Replaceability", de: "Austauschbarkeit" },
    desc: { en: "The product can replace another specified product for the same purpose in the same environment. This reduces lock-in.",
            de: "Das Produkt kann ein anderes festgelegtes Produkt für denselben Zweck in derselben Umgebung ersetzen. Das verringert Lock-in." },
    scenario: {
      context: { en: "Replacement of the old document management system", de: "Ablösung des alten Dokumentenmanagementsystems" },
      stimulus: { en: "The new product takes over", de: "Das neue Produkt übernimmt" },
      response: { en: "It reads all old files and offers the same interfaces", de: "Es liest alle alten Dateien und bietet dieselben Schnittstellen" },
      measure: { en: "100 % of documents migrated; no change in connected systems", de: "100 % der Dokumente migriert; keine Änderung an angebundenen Systemen" } } },
  // 3.9 Safety
  { id: "3.9.1", name: { en: "Operational constraint", de: "Betriebsbegrenzung" },
    desc: { en: "When a hazard occurs during operation, the product keeps its operation within safe parameters or states.",
            de: "Tritt im Betrieb eine Gefährdung auf, hält das Produkt seinen Betrieb innerhalb sicherer Grenzen oder Zustände." },
    scenario: {
      context: { en: "E-bike on a long climb in summer", de: "E-Bike auf einem langen Anstieg im Sommer" },
      stimulus: { en: "The battery temperature reaches 60 °C", de: "Die Akkutemperatur erreicht 60 °C" },
      response: { en: "The motor reduces its power, whatever level of assistance is chosen", de: "Der Motor drosselt seine Leistung, egal welche Unterstützungsstufe gewählt ist" },
      measure: { en: "Battery temperature never above 65 °C", de: "Akkutemperatur nie über 65 °C" } } },
  { id: "3.9.2", name: { en: "Risk identification", de: "Risikoerkennung" },
    desc: { en: "The product identifies sequences of events or operations that could expose life, property or the environment to an unacceptable risk.",
            de: "Das Produkt erkennt Abfolgen von Ereignissen oder Bedienhandlungen, die Leben, Eigentum oder Umwelt einem unvertretbaren Risiko aussetzen können." },
    scenario: {
      context: { en: "Chemical reactor in operation", de: "Chemiereaktor im Betrieb" },
      stimulus: { en: "Pressure and temperature rise together", de: "Druck und Temperatur steigen gemeinsam" },
      response: { en: "The process control system detects the combination heading for a critical state", de: "Das Prozessleitsystem erkennt, dass die Kombination auf einen kritischen Zustand zuläuft" },
      measure: { en: "Detected at least 10 minutes before the critical limit", de: "Erkannt mindestens 10 Minuten vor der kritischen Grenze" } } },
  { id: "3.9.3", name: { en: "Fail safe", de: "Fail-safe" },
    desc: { en: "When a failure occurs, the product automatically switches to a safe operating mode or returns to a safe condition.",
            de: "Bei einem Ausfall wechselt das Produkt selbsttätig in einen sicheren Betriebsmodus oder kehrt in einen sicheren Zustand zurück." },
    scenario: {
      context: { en: "Railway operation", de: "Bahnbetrieb" },
      stimulus: { en: "The power supply of a signal fails", de: "Die Stromversorgung eines Signals fällt aus" },
      response: { en: "The signal shows “stop”", de: "Das Signal zeigt „Halt“" },
      measure: { en: "Within 100 ms, in every case", de: "In unter 100 ms, in jedem Fall" } } },
  { id: "3.9.4", name: { en: "Hazard warning", de: "Gefahrenwarnung" },
    desc: { en: "The product warns of unacceptable risks early enough, so that operators or internal controls can react and keep the operation safe.",
            de: "Das Produkt warnt rechtzeitig vor unvertretbaren Risiken, sodass Bedienpersonal oder interne Steuerungen reagieren und den Betrieb sicher halten können." },
    scenario: {
      context: { en: "Car on the motorway", de: "Auto auf der Autobahn" },
      stimulus: { en: "The car drifts towards the lane marking without the indicator on", de: "Das Auto driftet ohne Blinker auf die Fahrbahnmarkierung zu" },
      response: { en: "The lane departure warning alerts the driver with sound and vibration", de: "Der Spurhalteassistent warnt mit Ton und Vibration" },
      measure: { en: "Warning at least 1 second before the line is crossed", de: "Warnung mindestens 1 Sekunde vor dem Überfahren der Linie" } } },
  { id: "3.9.5", name: { en: "Safe integration", de: "Sichere Integration" },
    desc: { en: "The product stays safe during and after its integration with one or more other components.",
            de: "Das Produkt bleibt während und nach der Integration mit weiteren Komponenten sicher." },
    scenario: {
      context: { en: "Machine retrofitted with a new sensor module", de: "Maschine, nachgerüstet mit neuem Sensormodul" },
      stimulus: { en: "The module is integrated", de: "Das Modul wird integriert" },
      response: { en: "The safety functions are verified again and still work", de: "Die Sicherheitsfunktionen werden erneut geprüft und arbeiten weiter" },
      measure: { en: "All safety tests passed before the machine restarts", de: "Alle Sicherheitstests bestanden, bevor die Maschine wieder anläuft" } } }
];

// Derived fields: category of each subcharacteristic, lookup tables.
QW.categoryById = {};
QW.categories.forEach(function (c) { QW.categoryById[c.id] = c; });
QW.qualityById = {};
QW.qualities.forEach(function (q) {
  q.cat = q.id.split(".").slice(0, 2).join(".");
  QW.qualityById[q.id] = q;
});

// Unordered pair key: the two clause numbers in numeric order, joined by "|".
QW.compareIds = function (a, b) {
  var pa = a.split(".").map(Number), pb = b.split(".").map(Number);
  for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
    var d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
};
QW.pairKey = function (a, b) {
  return QW.compareIds(a, b) <= 0 ? a + "|" + b : b + "|" + a;
};

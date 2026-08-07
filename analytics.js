/* Google Analytics ist ohne Mess-ID vollständig deaktiviert. */
const GA_MEASUREMENT_ID = "";

if (GA_MEASUREMENT_ID) {
  const banner = document.createElement("div");
  banner.className = "consent-banner";
  banner.innerHTML = '<div><strong>Optionale Analyse</strong><p>Mit Ihrer Zustimmung verwenden wir Google Analytics.</p></div><div class="consent-actions"><button data-choice="deny">Ablehnen</button><button class="accept" data-choice="accept">Zustimmen</button></div>';
  document.body.appendChild(banner);
  const choice = localStorage.getItem("analytics-consent");
  if (choice) banner.hidden = true;
  if (choice === "accept") loadAnalytics();
  banner.addEventListener("click", event => {
    const value = event.target.dataset.choice;
    if (!value) return;
    localStorage.setItem("analytics-consent", value);
    banner.hidden = true;
    if (value === "accept") loadAnalytics();
  });
}

function loadAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
}

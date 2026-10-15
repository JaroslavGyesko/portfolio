// funkcia na skrytie bočného menu a vyhľadávacieho poľa v prípade, že sa zväčší šírka okna nad pomer 1.5/1, využíva sa pri prechode zo zobrazenia pre mobily/tablety na zobrazenie pri notebookoch/PC (nie je nutný reštart stránky)
window.addEventListener('resize', function() {
  var aspectRatio = window.innerWidth / window.innerHeight;

  var minAspectRatio = 1.5 / 1;

  var sidebar = document.querySelector('.sidebar');
  var container2 = document.querySelector('.container2');
  var searchContainer = document.getElementById('search-container');

  if (aspectRatio > minAspectRatio) {
    sidebar.classList.remove('active');
    container2.classList.remove('active-sidebar');
  }
  if (aspectRatio > minAspectRatio ) {
    searchContainer.classList.remove('active');
  }
});

// funkcie na zobrazenie/skrytie šípky, ktorá presúva stránku späť na vrchol a na samotný presun na vrchol stránky
window.onscroll = function() { scrollFunction() };
  
function scrollFunction() {
    var scrollButton = document.querySelector('.scroll-to-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { // ak je dokument posunutý o viac než 20 pixelov nadol, zobrazí sa tlačidlo na návrat na vrchol stránky
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
}

function scrollToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 300); // zmena rýchlosti posúvania
}

var originalImageSources = [];

// funkcia na uloženie pôvodných zdrojov obrázkov, súvisí s tmavým režimom
function saveOriginalImageSources() {
  var logoImages = document.querySelectorAll(".logos img");
  for (var i = 0; i < logoImages.length; i++) {
    originalImageSources[i] = logoImages[i].src;
  }
}

// funkcia na obnovenie pôvodných zdrojov obrázkov, spustí sa vtedy, keď sa vypne tmavý režim, aby sa opäť zobrazili pôvodné obrázky 
function restoreOriginalImageSources() {
  var logoImages = document.querySelectorAll(".logos img");
  for (var i = 0; i < logoImages.length; i++) {
    logoImages[i].src = originalImageSources[i];
  }
}
// funkcia na zmenu farieb log pri zapnutí tmavého režimu
function darkSwitch() {
  var bodyElement = document.body;
  var navElement = document.querySelector('nav');

  bodyElement.classList.toggle("dark-mode");
  navElement.classList.toggle("dark-mode-nav");
  if (document.body.classList.contains("dark-mode")) {
    // zmena zdrojov pre každý obrázok
    var logoImages = document.querySelectorAll(".logos img");
    for (var i = 0; i < logoImages.length; i++) {
      // podľa indexu obrázka sa mení jeho zdroj
      switch (i) {
        case 0:
          logoImages[i].src = "../../IMAGES/logo_magistrat_biele.png"
          break;
        case 1:
          logoImages[i].src = "../../IMAGES/muzeum_mesta_brna_biele_logo.png"
          break;
        case 2:
          logoImages[i].src = "../../IMAGES/muzeum_brnenska_biele_logo.png";
          break;
        case 3:
          logoImages[i].src = "../../IMAGES/unesco_biele_logo.png";
          break;
        break;
      }
    }
  } else {
    // ak je dark mode vypnutý, obnovia sa pôvodné zdroje obrázkov
    restoreOriginalImageSources();
  }
}  
document.addEventListener("DOMContentLoaded", function () {
    saveOriginalImageSources();
  });

 // funkcie na zobrazenie/skrytie poľa na vyhľadávanie 
function toggleSearch() {
    var searchContainer = document.getElementById("search-container");
    searchContainer.classList.toggle("active");
}

function toggleSearch_sidebar() {
    var searchContainer = document.querySelector('.sidebar #search-container');
    searchContainer.classList.toggle('active');
}

// funkcia, ktorá mení názov výstupu podľa jazyka dokumentu, momentálne nie je v prevádzke mapa stránok, takže vyhľadávanie nefunguje a užívateľovi sa zobrazí vyskakovacie okno s hláškou v jeho rodnom jazyku
// keď bude funkčné indexovanie stránky, vyhľadávanie bude funkčné a tým pádom táto funkcia nebude nutná
function submitSearchForm(event) {
  event.preventDefault();

  var lang = document.documentElement.lang;

  switch (lang) {
    case 'cz':
      alert("Na této funkcionalite se pracuje");
      break;
    case 'en':
      alert("This functionality is not yet available");
      break;
    case 'de':
      alert("An dieser Funktionalität wird gearbeitet");
      break;
    case 'he':
      alert("עובדים על הפונקציונליות הזו");
      break;
  }
}

// funkcia na zobrazenie bočného menu
function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  var container2 = document.querySelector('.container2');

  sidebar.classList.toggle('active');
  container2.classList.toggle('active-sidebar');
}

// ak kliknete na plochu mimo bočného menu a mimo tlačidla menu, bočné menu sa zatvorí
document.addEventListener('click', function(e) {
  var sidebar = document.querySelector('.sidebar');
  var container2 = document.querySelector('.container2');
  var menu_button = document.querySelector('.menu-button');

  if (!sidebar.contains(e.target) && !menu_button.contains(e.target)) {
    sidebar.classList.remove('active');
    container2.classList.remove('active-sidebar');
  }
});


// funkcia na zobrazenie mapy, dávam do pozornosti, že je potrebný účet na Google Cloud a API kľúč použitý pre tieto účely je výhradne môj a je funkčný len na skúšobné obdobie do marca, potom svoj API kľúč vymením a mapa nebude zobrazená
// mapa sa dá zobraziť aj pomocou google maps embedu bez nutnej registrácie, ale pre vykreslenie polygónu v tvare trojuholníka do mapy je už potrebné použiť Google Cloud
function initMap() {
  const fileName = window.location.pathname.split("/").pop(); 

  const language = getLanguageFromFileName(fileName);

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 49.20666624307557, lng: 16.614693961870685 },
    zoom: 17,
  });

  // súradnice trojuholníka
  const triangleCoords = [
    { lat: 49.20605196388529, lng: 16.613587531942827 },
    { lat: 49.20712757713163, lng: 16.61441739777426 },
    { lat: 49.20721271706067, lng: 16.61610101694018 },
  ];

  // definovanie štýlov trojuholníka
  const triangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: 'red',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#fa854b',
    fillOpacity: 0.35,
  });

  // definovanie informačného okna pri kliknutí na trojuholník
  const infoWindow = new google.maps.InfoWindow({
    content: getLocalizedInfoWindowContent(language),
  });

  infoWindow.setOptions({ className: 'hours' });

  google.maps.event.addListener(triangle, 'click', function (event) {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  // vykreslenie trojuholníka
  triangle.setMap(map);
}

  // nastavenie jazyka textu v informačnom okne podľa toho, v akom jazyku bola stránka načítaná
function getLanguageFromFileName(fileName) {
  if (fileName.startsWith('map_de')) {
    return 'de'; // German
  } else if (fileName.startsWith('map_he')) {
    return 'he'; // Hebrew
  } else if (fileName.startsWith('map_en')) {
    return 'en'; // English
  } else {
    return 'default'; // Čeština
  }
}

function getLocalizedInfoWindowContent(language) {
  switch (language) {
    case 'en':
      return `
        <div class="hours">
          <div style="font-weight: bold; display: flex; justify-content: center;">Opening Hours</div>
          <table style="color: black !important;">
            <tr><td>Tuesday - Friday:</td><td>8:00 AM - 7:00 PM</td></tr>
            <tr><td>Saturday:</td><td>9:00 AM - 7:00 PM</td></tr>
            <tr><td>Sunday:</td><td>10:00 AM - 6:00 PM</td></tr>
          </table>
        </div>
      `;
    case 'de':
      return `
        <div class="hours">
          <div style="font-weight: bold; display: flex; justify-content: center;">Öffnungszeiten</div>
          <table style="color: black !important;">
            <tr><td>Dienstag - Freitag:</td><td>8:00 - 19:00 Uhr</td></tr>
            <tr><td>Samstag:</td><td>9:00 - 19:00 Uhr</td></tr>
            <tr><td>Sonntag:</td><td>10:00 - 18:00 Uhr</td></tr>
          </table>
        </div>
      `;
    case 'he':
      return `
        <div class="hours">
          <div style="font-weight: bold; display: flex; justify-content: center;">שעות פתיחה</div>
          <table style="color: black !important;">
            <tr><td>יום שלישי - יום שישי:</td><td>8:00 - 19:00</td></tr>
            <tr><td>שבת:</td><td>9:00 - 19:00</td></tr>
            <tr><td>ראשון:</td><td>10:00 - 18:00</td></tr>
          </table>
        </div>
      `;
    default:
      return `
        <div class="hours">
          <div style="font-weight: bold; display: flex; justify-content: center;">Otvárací hodiny</div>
          <table style="color: black !important;">
            <tr><td>Úterý - Pátek:</td><td>8:00 - 19:00</td></tr>
            <tr><td>Sobota:</td><td>9:00 - 19:00</td></tr>
            <tr><td>Neděle:</td><td>10:00 - 18:00</td></tr>
          </table>
        </div>
      `;
  }
}

  /* NASTAVENIE COOKIES, ZATIAĽ SA NEPOUŽÍVA, NAKOĽKO STRÁNKA NEBEŽÍ NA ŽIADNOM SERVERI A NEUKLADAJÚ SA DÁTA O NÁVŠTEVE
  function showCookieModal() {
    var modalContainer = document.getElementById('cookie-modal-container');
    if (modalContainer) {
      modalContainer.style.display = 'flex';
    }
  }
  
  // funkcia pre zatvorenie pop-up okna
  function closeCookieModal() {
    var modalContainer = document.getElementById('cookie-modal-container');
    if (modalContainer) {
      modalContainer.style.display = 'none';
    }
  }
  
  // funkcia pre uloženie preferencií cookies s dobou expirácie 24 hodin
  function saveCookiePreferences(agree) {
    closeCookieModal(); // zavrie pop-up okno
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hodin v milisekundách
    document.cookie = "cookieConsent=" + agree + "; expires=" + expirationDate.toUTCString() + "; path=/"; // uloží súhlas alebo odmietnutie cookies do cookies súboru
  }
  
  // funkcia pre kontrolu, či už bol užívateľovi udelený súhlas
  function checkCookieConsent() {
    return document.cookie.includes("cookieConsent=true");
  }
  
  // čakanie na úplné načítanie stránky
  window.onload = function () {
    // kontrola, či sa má zobraziť pop-up
    if (!checkCookieConsent()) {
      showCookieModal();
    }
  };*/
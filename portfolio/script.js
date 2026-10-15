const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#dialog-content');
const details = {
  map: {
    kicker: '01 / GIS & DATA', title: 'Školské dáta, ktoré sa dajú čítať na mape.',
    text: 'Projekt vizualizuje údaje o žiakoch a učiteľoch v jednotlivých obciach Košického samosprávneho kraja. Používateľ môže prepínať vrstvy a porovnať absolútny počet žiakov aj pomer žiakov na učiteľa medzi rokmi 2010 a 2020.',
    note: 'Moja úloha: príprava mapy, vrstiev, vlastného informačného panelu a webového rozhrania.',
    action: '<a class="button dialog-button" href="projects/mapa-skol/index.html" target="_blank">Otvoriť interaktívnu mapu <span>↗</span></a>'
  },
  villa: {
    kicker: '02 / WEB & CULTURE', title: 'Tri brnianske vily. Jeden digitálny zážitok.',
    text: 'Koncept webu pomáha návštevníkovi objaviť architektúru a kultúrne dedičstvo Brna. Návrh kombinuje výber vily, mapu, rezervácie, kontakty a informácie o projekte v štyroch jazykových mutáciách.',
    note: 'Moja úloha: informačná architektúra, návrh a realizácia responzívneho webu, obsahové sekcie, jazykové mutácie a prvky prístupnosti.',
    action: '<a class="button dialog-button" href="projects/brno-villa-triangle/HTML/HOMEPAGE/index.html" target="_blank">Otvoriť reálny web <span>↗</span></a>'
  }
};
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const item = details[button.dataset.project];
  content.innerHTML = `<p class="eyebrow">${item.kicker}</p><h2 id="dialog-title">${item.title}</h2><p>${item.text}</p><p class="dialog-note">${item.note}</p>${item.action}`;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

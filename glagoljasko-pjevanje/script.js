let PITANJA = [], redoslijed = [], trenutno = 0, bodovi = 0;

function promijesaj(niz){
  for(let i = niz.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [niz[i], niz[j]] = [niz[j], niz[i]];
  }
  return niz;
}

async function ucitajPitanja(){
  try{
    const odgovor = await fetch('pitanja.json');
    if(!odgovor.ok) throw new Error('HTTP ' + odgovor.status);
    PITANJA = await odgovor.json();
    pocni();
  }catch(gr){
    document.getElementById('sadrzaj').innerHTML =
      '<div class="greska"><b>Pitanja se ne mogu učitati.</b><br>' +
      'Datoteka pitanja.json mora biti u istoj mapi kao i kviz, a kviz mora biti ' +
      'pokrenut s web-poslužitelja (npr. GitHub Pages ili stin.hr). ' +
      'Ako ga testirate lokalno, pokrenite u mapi kviza: <code>python -m http.server</code> ' +
      'i otvorite <code>http://localhost:8000</code>.<br><small>(' + gr + ')</small></div>';
  }
}

function pocni(){
  redoslijed = promijesaj(PITANJA.map((q,i)=>i));
  trenutno = 0; bodovi = 0;
  prikaziPitanje();
}

function prikaziPitanje(){
  const q = PITANJA[redoslijed[trenutno]];
  document.getElementById('napredak').style.width = (trenutno / PITANJA.length * 100) + '%';

  const opcije = promijesaj(q.odgovori.map((tekst,i)=>({tekst, tocan: i === q.tocan})));

  const s = document.getElementById('sadrzaj');
  s.innerHTML = `
    <div class="brojac">Pitanje ${trenutno+1} / ${PITANJA.length}</div>
    <div class="pitanje">${q.pitanje}</div>
    <div class="odgovori">
      ${opcije.map(o=>`<button class="odgovor" data-tocan="${o.tocan}">${o.tekst}</button>`).join('')}
    </div>
    <div class="objasnjenje" id="objasnjenje">${q.objasnjenje}</div>
    <div class="sredina"><button class="gumb" id="dalje">${trenutno + 1 < PITANJA.length ? 'Sljedeće pitanje →' : 'Pogledaj rezultat'}</button></div>
  `;

  s.querySelectorAll('.odgovor').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const tocan = btn.dataset.tocan === 'true';
      if(tocan) bodovi++;
      s.querySelectorAll('.odgovor').forEach(b=>{
        b.disabled = true;
        if(b.dataset.tocan === 'true') b.classList.add('tocan');
        else if(b === btn) b.classList.add('netocan');
      });
      document.getElementById('objasnjenje').style.display = 'block';
      document.getElementById('dalje').style.display = 'inline-block';
    });
  });

  document.getElementById('dalje').addEventListener('click', ()=>{
    trenutno++;
    if(trenutno < PITANJA.length) prikaziPitanje();
    else prikaziRezultat();
  });
}

function prikaziRezultat(){
  document.getElementById('napredak').style.width = '100%';
  const postotak = bodovi / PITANJA.length;
  let poruka;
  if(postotak === 1) poruka = "Izvrsno! Pravi ste poznavatelj glagoljaškog pjevanja — vrijeme je da snimke i poslušate.";
  else if(postotak >= 0.75) poruka = "Odlično! Glagoljaška baština očito vam nije strana.";
  else if(postotak >= 0.5) poruka = "Dobro! Ponešto već znate, a objašnjenja uz pitanja sigurno su otkrila i nešto novo.";
  else poruka = "Svaki je početak dobar — sada znate više nego prije kviza. Poslušajte snimke i pokušajte ponovno!";

  document.getElementById('sadrzaj').innerHTML = `
    <div class="sredina">
      <div class="brojac">Vaš rezultat</div>
      <div class="rezultat-broj">${bodovi} / ${PITANJA.length}</div>
      <div class="rezultat-tekst">${poruka}</div>
      <div class="rezultat-tekst" style="font-size:14.5px; color:var(--siva);">
        Glagoljaško pjevanje stoljetna je hrvatska tradicija pučkoga crkvenog pjevanja,
        od 2008. zaštićeno kulturno dobro — a živi samo dok se pjeva i sluša.
      </div>
      <button class="gumb" style="display:inline-block;" onclick="pocni()">Pokušaj ponovno</button>
    </div>
  `;
}

ucitajPitanja();

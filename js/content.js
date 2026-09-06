/* ============================================================
   CRUDO — CMS (editează aici, nu în HTML)
   Prețuri, program, adrese, meniu, galerie, rețele.
   ============================================================ */

const SITE = {
  phoneDisplay: "0269 000 000",
  phoneTel: "+40269000000",
  whatsapp: "40269000000",
  email: "salut@crudo-sibiu.ro",
  address: "Bulevardul Nicolae Bălcescu, Sibiu",
  mapsQuery: "Bulevardul Nicolae Bălcescu, Sibiu, Romania",
  instagram: "#instagram",
  facebook: "#facebook",

  hours: [
    { days: "Luni", time: "închis" },
    { days: "Marți – Duminică", time: "10:00 – 20:00" },
  ],

  hero: {
    kicker: "Sibiu · Bd. Bălcescu",
    title: "Crudo",
    tagline: "Focaccia proaspătă, gust italian, în inima Sibiului.",
    primaryCta: "Comandă acum",
    secondaryCta: "Vezi meniul",
    stats: [
      { value: "zilnic", label: "focaccia proaspătă" },
      { value: "35", suffix: "lei", label: "panini de la" },
      { value: "10–20", label: "program în cetate" },
    ],
  },

  story: {
    kicker: "Povestea",
    title: "Simplu, rapid, copt în fiecare dimineață.",
    paragraphs: [
      "Crudo e o focacceria de cartier: preparate italiene simple, făcute repede, cu ingrediente proaspete.",
      "Aluatul dospește lent, focaccia iese din cuptor zilnic, iar paniniile se umplu la comandă — bresaola, prosciutto, mortadella.",
      "Nimic pretențios. Doar pâine caldă, ulei bun și o felie de Italia pe Bălcescu.",
    ],
  },

  menu: {
    kicker: "Meniul",
    title: "Ce iese azi din cuptor",
    sub: "Panini de la 35 lei. Focaccia de post, cu ceapă și măsline, inclusă.",
    categories: [
      {
        id: "panini",
        label: "Panini",
        items: [
          { id: "pa1", name: "Bresaola", desc: "Bresaola, rucola, parmezan, strop de lămâie.", price: 38, tag: "De la 35 lei", image: "img/menu/menu-pa1-bresaola.png", info: "Carne uscată la aer, tăiată subțire, pe focaccia caldă. Rucola, parmezan ras și un strop de lămâie — acru cât să trezească sarea.", ingredients: ["Bresaola", "Rucola", "Parmezan", "Lămâie", "Focaccia"], allergens: "Gluten. Conține lactoză (parmezan).", pair: "Merge cu un pahar de vin alb." },
          { id: "pa2", name: "Prosciutto", desc: "Prosciutto crudo, mozzarella, roșii uscate, rucola.", price: 36, image: "img/menu/menu-pa2-prosciutto.png", info: "Prosciutto crudo așezat pe mozzarella moale, cu roșii uscate la soare și rucola. Sare, ulei, puțin piper — atât.", ingredients: ["Prosciutto crudo", "Mozzarella", "Roșii uscate", "Rucola", "Focaccia"], allergens: "Gluten. Conține lactoză (mozzarella).", pair: "Bun lângă limonada de casă." },
          { id: "pa3", name: "Mortadella", desc: "Mortadella, pistacchio, stracciatella.", price: 35, tag: "Clasic", image: "img/menu/menu-pa3-mortadella.png", info: "Clasicul de la tejghea: mortadella groasă, fistic tocat și o lingură de stracciatella. Dulce, sărat, cremos.", ingredients: ["Mortadella", "Fistic", "Stracciatella", "Focaccia"], allergens: "Gluten, lactoză, fructe cu coajă (fistic).", pair: "Cere extra sos de brânză dacă vrei și mai cremos." },
          { id: "pa4", name: "Caprese", desc: "Mozzarella, roșii, busuioc, ulei de măsline.", price: 35, tag: "Vegetarian", image: "img/menu/menu-pa4-caprese.png", info: "Caprese pe pâine caldă: mozzarella, roșii coapte, busuioc și ulei bun. Fără carne, fără povești.", ingredients: ["Mozzarella", "Roșii", "Busuioc", "Ulei de măsline", "Focaccia"], allergens: "Gluten. Conține lactoză.", pair: "Se înțelege bine cu un spritz." },
          { id: "pa5", name: "Porchetta", desc: "Porchetta crocantă, fenicul, salsa verde.", price: 40, tag: "Nou", image: "img/menu/menu-pa5-porchetta.png", info: "Porchetta tăiată la comandă, crustă crocantă, fenicul și salsa verde de pătrunjel. Cel mai consistent panini din listă.", ingredients: ["Porchetta", "Fenicul", "Salsa verde", "Focaccia"], allergens: "Gluten.", pair: "Ține de foame — bun cu o apă minerală." },
          { id: "pa6", name: "Verde", desc: "Dovlecel, vinete, ardei, pesto.", price: 35, tag: "Vegetarian", image: "img/menu/menu-pa6-verde.png", info: "Legume la grătar — dovlecel, vinete, ardei — cu pesto de busuioc. Ușor, aromat, fără carne.", ingredients: ["Dovlecel", "Vinete", "Ardei", "Pesto", "Focaccia"], allergens: "Gluten. Pesto-ul poate conține lactoză și fructe cu coajă.", pair: "Merge cu limonadă sau espresso după." },
        ],
      },
      {
        id: "focaccia",
        label: "Focaccia",
        items: [
          { id: "fo1", name: "Rozmarin și sare", desc: "Focaccia clasică, ulei de măsline, rozmarin proaspăt.", price: 18, image: "img/menu/menu-fo1-rozmarin.png", info: "Aluatul de dimineață, ulei de măsline și rozmarin proaspăt. O felie simplă, bună caldă, cu sau fără sos.", ingredients: ["Focaccia", "Ulei de măsline", "Rozmarin", "Sare grunjoasă"], allergens: "Gluten. Fără lactate.", pair: "Baza perfectă pentru sosul de brânză." },
          { id: "fo2", name: "De post · ceapă și măsline", desc: "Fără lactate. Ceapă caramelizată, măsline, oregano.", price: 20, tag: "De post", image: "img/menu/menu-fo2-post.png", info: "Fără unt, fără brânză. Ceapă caramelizată, măsline și oregano pe aluatul zilei. Ține post, ține și de foame.", ingredients: ["Focaccia", "Ceapă", "Măsline", "Oregano"], allergens: "Gluten. Fără lactate.", pair: "Bună cu apă plată sau limonadă." },
          { id: "fo3", name: "Roșii uscate", desc: "Roșii uscate la soare, capere, cimbru.", price: 22, image: "img/menu/menu-fo3-rosii.png", info: "Roșii uscate la soare, capere și cimbru. Sărat-acrișor, cu ulei destul cât să luciască felia.", ingredients: ["Focaccia", "Roșii uscate", "Capere", "Cimbru"], allergens: "Gluten. Fără lactate.", pair: "Completează un panini Caprese." },
          { id: "fo4", name: "Parmezan și miere", desc: "Parmezan ras, strop de miere, rozmarin.", price: 24, image: "img/menu/menu-fo4-parmezan.png", info: "Parmezan ras pe focaccia caldă, un strop de miere și rozmarin. Sărat, dulce, crocant pe margini.", ingredients: ["Focaccia", "Parmezan", "Miere", "Rozmarin"], allergens: "Gluten. Conține lactoză.", pair: "Se bea bine cu un cappuccino." },
          { id: "fo5", name: "Funghi", desc: "Ciuperci călite, cimbru, ulei de măsline.", price: 22, image: "img/menu/menu-fo5-funghi.png", info: "Ciuperci călite cu cimbru și ulei. Pământiu, cald, fără brânză — dacă vrei extra, ceri sosul casei.", ingredients: ["Focaccia", "Ciuperci", "Cimbru", "Ulei de măsline"], allergens: "Gluten. Fără lactate.", pair: "Merge cu espresso sau vin alb." },
        ],
      },
      {
        id: "bauturi",
        label: "Băuturi",
        items: [
          { id: "b1", name: "Espresso", desc: "Scurt, italian, fără povești.", price: 9, image: "img/menu/menu-b1-espresso.png", info: "O ceașcă scurtă, cremă deasă. După panini sau dimineața, înainte să se răcească focaccia.", ingredients: ["Espresso"], allergens: "Fără alergeni declarați.", pair: "După orice felie caldă." },
          { id: "b2", name: "Limonadă de casă", desc: "Lămâie, mentă, puțin zahăr de trestie.", price: 14, tag: "De casă", image: "img/menu/menu-b2-limonada.png", info: "Lămâie stoarsă, mentă, puțin zahăr de trestie și gheață. O facem în fiecare dimineață, nu din sirop.", ingredients: ["Lămâie", "Mentă", "Zahăr de trestie", "Apă"], allergens: "Fără alergeni declarați.", pair: "Cel mai bun prieten al paniniului Prosciutto." },
          { id: "b3", name: "Apă plată / minerală", desc: "Sticlă 330ml.", price: 8, image: "img/menu/menu-b3-apa.png", info: "Sticlă 330 ml, plată sau minerală — spui la tejghea. Rece, fără etichetă de restaurant.", ingredients: ["Apă"], allergens: "Fără alergeni.", pair: "Lângă porchetta sau orice felie sărată." },
          { id: "b4", name: "Vin alb, pahar", desc: "Sec, rece, bun lângă focaccia.", price: 16, image: "img/menu/menu-b4-vin.png", info: "Un pahar de alb sec, ținut la rece. Nu e listă de cramă — e vinul casei, bun lângă sare și ulei.", ingredients: ["Vin alb"], allergens: "Conține sulfiți.", pair: "Cu Bresaola sau focaccia cu rozmarin." },
          { id: "b5", name: "Spritz", desc: "Aperol, prosecco, o felie de portocală.", price: 22, tag: "Nou", image: "img/menu/menu-b5-spritz.png", info: "Aperol, prosecco, sifon și o felie de portocală. Aperitivul de pe Bălcescu, după 12.", ingredients: ["Aperol", "Prosecco", "Sifon", "Portocală"], allergens: "Conține sulfiți. Alcool.", pair: "Începe masa — apoi un Caprese." },
          { id: "b6", name: "Cappuccino", desc: "Espresso, lapte, spumă.", price: 12, image: "img/menu/menu-b6-cappuccino.png", info: "Espresso, lapte și spumă. Dimineața, sau după o felie de parmezan și miere.", ingredients: ["Espresso", "Lapte"], allergens: "Conține lactoză.", pair: "Cu focaccia Parmezan și miere." },
        ],
      },
    ],
    preview: ["pa1", "fo2", "b2"],
    signature: {
      id: "sig1",
      kicker: "Semnătura casei",
      name: "Sos de brânză topită",
      desc: "Trei brânzeturi topite lent, un strop de usturoi și piper. Se toarnă peste focaccia caldă sau se servește ca dip la panini.",
      price: 12,
      note: "Îl ceri extra — merită.",
      image: "img/menu/menu-sig1-sos.png",
      info: "Trei brânzeturi topite lent, usturoi și piper. Se toarnă peste focaccia caldă sau se pune ca dip lângă panini. Extra, nu e inclus în prețul feliei.",
      ingredients: ["Brânzeturi mixte", "Usturoi", "Piper"],
      allergens: "Conține lactoză.",
      pair: "Peste rozmarin-sare sau lângă Mortadella.",
    },
  },

  popups: {
    order: {
      kicker: "Comanda pe site",
      title: "E un mockup, nu o plată.",
      text: "Adaugi în coș, scrii un nume și un telefon, apeși trimite. Pe ecran apare un număr de comandă. Nimic nu se plătește și nimic nu pleacă spre un server — e doar ca să vezi cum ar merge fluxul.",
      facts: [
        { label: "Plată", value: "Nu se încasează" },
        { label: "Date", value: "Rămân în browser" },
        { label: "Ridicare", value: "Bălcescu, când va fi real" },
      ],
    },
    hours: {
      kicker: "La tejghea",
      title: "Când găsești cuptorul pornit.",
      text: "Luni odihnim aluatul. Marți–duminică deschidem la 10. Ultima felie o tăiem pe la 19:30, ca să nu pleci cu pâine rece.",
      facts: [
        { label: "Luni", value: "Închis" },
        { label: "Marți – Duminică", value: "10:00 – 20:00" },
        { label: "Ultima comandă", value: "19:30" },
        { label: "Adresă", value: "Bd. Nicolae Bălcescu, Sibiu" },
      ],
    },
    loyalty: {
      kicker: "Cardul de la tejghea",
      title: "La 10 panini, unul e pe noi.",
      text: "Nu e aplicație. Îți ținem noi un card la tejghea. Fiecare panini primește o ștampilă. La a zecea, următorul e cadou — tu doar spui numele.",
      facts: [
        { label: "Ce contează", value: "Doar panini, nu focaccia" },
        { label: "Unde stă cardul", value: "La noi, nu în buzunar" },
        { label: "Când se resetează", value: "După cadou, de la capăt" },
      ],
    },
  },

  gallery: [
    { src: "img/hero.jpg", alt: "Masa Crudo — felii, rucola și mezeluri" },
    { src: "https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?auto=format&fit=crop&w=900&q=80", alt: "Focaccia cu rozmarin, proaspăt ieșită din cuptor" },
    { src: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80", alt: "Panini la grătar, tăiat pe jumătate" },
    { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80", alt: "Pâine artizanală pe masă de lemn" },
    { src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", alt: "Sandwich italian cu mezeluri" },
    { src: "https://images.unsplash.com/photo-1608198399988-341f712c3711?auto=format&fit=crop&w=900&q=80", alt: "Pâine cu crustă aurie" },
    { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", alt: "Spațiul — lumină caldă, cafea, blat de lemn" },
    { src: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=900&q=80", alt: "Platou cu mezeluri italiene" },
  ],

  loyalty: {
    kicker: "Fidelitate",
    title: "La 10 panini, unul e pe noi.",
    text: "Un card digital de brutărie: aduni ștampile la fiecare panini. La a zecea, următorul e cadou. Îl ținem noi la tejghea — tu doar vii.",
    stamps: 10,
    filled: 3,
    reward: "1 panini cadou",
  },
};

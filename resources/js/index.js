let createAccordion = (title, id) => {
  return `<div class="accordion-item" id="card${id}">
  <h2 class="accordion-header" id="heading${id}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
      ${title}
    </button>
  </h2>
  <div id="collapse${id}" class=" collapse" aria-labelledby="heading${id} data-parent="#accordionId">
  </div>
</div>`;
};

let createCarousalOuter = (id, innerId) => {
  return `<div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="${innerId}">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}"  data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}"  data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
};

let createCarouselInner = (id, active) => {
  return `<div class="carousel-item ${active ? "active" : ""}" id="${id}">
    </div>`;
};

let createCard = (item) => {
  return `<div class="card d-block">
  <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
    <p class="card-subtitle text-secondary">${item.pubDate}</p>
    <p class="card-text">${item.description}</p>
    <a href="${item.link}" class="stretched-link" target="_blank"></a>
  </div>
</div>`;
};

async function addContentToPage() {
  for (let i = 0; i < magazines.length; i++) {
    let url = magazines[i];
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${url}`
    );
    let data = await response.json();
    console.log(data);

    // Create Accordian
    let accordianId = ID();
    let accordion = createAccordion(data.feed.title, accordianId);
    // console.log(accordion);
    document.getElementById("accordionId").innerHTML += accordion;

    // Only first accordion to expand Only
    if (i == 0) {
      document.getElementById(`collapse${accordianId}`).classList.add("show");
    }

    // Create Carousel
    let carouselID = ID();
    let carouselInnerId = ID();
    let carousel = createCarousalOuter(carouselID, carouselInnerId);
    // console.log(carousel);
    document.getElementById(`collapse${accordianId}`).innerHTML += carousel;

    // Add the cards in the carousal
    let items = data.items;
    for (let item in items) {
      let card = createCard(items[item]);
      let innerCarouselCardId = ID();
      let innerCarousalCard = createCarouselInner(
        innerCarouselCardId,
        item == 0
      );
      // console.log(innerCarousalCard);
      document.getElementById(`${carouselInnerId}`).innerHTML +=
        innerCarousalCard;
      document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
    }
  }
  // let url = magazines[0];
  //   let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
  //   let data = await response.json();
  //   console.log(data);
}
addContentToPage();

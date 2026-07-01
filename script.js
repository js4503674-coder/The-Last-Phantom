let allVideos = [];

const player = document.getElementById("player");
const title = document.getElementById("title");
const creatorText = document.getElementById("creator");
const grid = document.getElementById("grid");
const search = document.getElementById("search");
const sectionTitle = document.getElementById("sectionTitle");

// LOAD JSON DATA
fetch("videos.json")
  .then(res => res.json())
  .then(data => {
    allVideos = data;

    renderVideos(allVideos);

    if (allVideos.length > 0) {
        loadVideo(allVideos[0]);
    }
  });

// LOAD VIDEO INTO PLAYER
function loadVideo(video) {
    player.src = video.video;
    title.innerText = video.name;

    creatorText.innerText = video.creator
        ? `Created by ${video.creator}`
        : "";

    player.play();
}

// RENDER VIDEO LIST (HOME + SEARCH)
function renderVideos(videos) {
    grid.innerHTML = "";

    videos.forEach(v => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${v.thumbnail}">

            <div class="card-text">
                <p class="card-title">${v.name}</p>
                <p class="card-creator">${v.creator || ""}</p>
            </div>
        `;

        card.onclick = () => loadVideo(v);

        grid.appendChild(card);
    });
}

// SEARCH (NAME + TAGS)
search.addEventListener("input", () => {
    const query = search.value.toLowerCase().trim();

    if (query === "") {
        sectionTitle.innerText = "Home";
        renderVideos(allVideos);
        return;
    }

    const results = allVideos.filter(v => {
        const nameMatch = v.name.toLowerCase().includes(query);

        const tagMatch = v.tags?.some(tag =>
            tag.toLowerCase().includes(query)
        );

        return nameMatch || tagMatch;
    });

    sectionTitle.innerText = `Search: "${query}"`;

    renderVideos(results);
});
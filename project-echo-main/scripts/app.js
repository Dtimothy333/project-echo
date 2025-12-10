// Project Echo main script
// Uses jQuery, Fetch API, and JSON data to render project and achievement cards.

$(function () {
  console.log("Project Echo: document ready.");

  const $projectsRow = $("#projectsRow");
  const $projectsPlaceholder = $("#projectsPlaceholder");
  const $achievementsRow = $("#achievementsRow");
  const $achievementsPlaceholder = $("#achievementsPlaceholder");
  const $projectFilter = $("#projectFilter");
  const $yearSpan = $("#yearSpan");

  if ($yearSpan.length) {
    $yearSpan.text(new Date().getFullYear());
  }

  // =========================
  // Fetch Helper
  // =========================
  async function loadJson(path) {
    console.log(`Fetching JSON from: ${path}`);
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }

    return response.json();
  }

  // =========================
  // Card Helpers
  // =========================
  function createTagBadges(tags) {
    if (!Array.isArray(tags) || tags.length === 0) return "";

    return tags
      .map(
        (tag) =>
          `<span class="badge rounded-pill text-bg-light border">${tag}</span>`
      )
      .join(" ");
  }

  function safeText(text) {
    return text || "";
  }

  // =========================
  // Render Projects
  // =========================
  let allProjects = [];

  function renderProjects(projects) {
    $projectsRow.empty();

    if (!projects || projects.length === 0) {
      $projectsRow.append(
        `<p class="text-muted">No projects match this filter yet.</p>`
      );
      return;
    }

    projects.forEach((proj) => {
      const card = `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm">
            <img
              src="${proj.image}"
              class="card-img-top"
              alt="${safeText(proj.title)} thumbnail"
            />
            <div class="card-body d-flex flex-column">
              <h3 class="card-title h5 mb-1">${safeText(proj.title)}</h3>
              <p class="card-subtitle text-muted mb-2">
                ${safeText(proj.subtitle)}
              </p>
              <p class="card-text mb-3">
                ${safeText(proj.description)}
              </p>
              <div class="mt-auto">
                <div class="project-tags mb-2">
                  ${createTagBadges(proj.tags)}
                </div>
                <div class="d-flex flex-wrap gap-2">
                  <a
                    href="${proj.appUrl || "#"}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-sm btn-primary"
                  >
                    <i class="bi bi-play-circle"></i> View App
                  </a>
                  <a
                    href="${proj.codeUrl || "#"}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    <i class="bi bi-github"></i> Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      $projectsRow.append(card);
    });
  }

  // =========================
  // Render Achievements
  // =========================
  function renderAchievements(achievements) {
    $achievementsRow.empty();

    if (!achievements || achievements.length === 0) {
      $achievementsRow.append(
        `<p class="text-muted">No achievements to show yet.</p>`
      );
      return;
    }

    achievements.forEach((ach) => {
      const card = `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm">
            <img
              src="${ach.image}"
              class="card-img-top"
              alt="${safeText(ach.title)} badge"
            />
            <div class="card-body d-flex flex-column">
              <h3 class="card-title h5 mb-1">${safeText(ach.title)}</h3>
              <p class="card-subtitle text-muted mb-2">
                ${safeText(ach.issuer)}
              </p>
              <p class="card-text mb-3">
                ${safeText(ach.description)}
              </p>
              <div class="mt-auto">
                <div class="achievement-tags mb-2">
                  ${createTagBadges(ach.tags)}
                </div>
                ${
                  ach.link && ach.link !== "#"
                    ? `<a href="${ach.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">
                        View credential
                       </a>`
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
      `;

      $achievementsRow.append(card);
    });
  }

  // =========================
  // Filtering
  // =========================
  let filterUsageCount = 0;

  function filterProjects(query) {
    const trimmed = (query || "").toLowerCase().trim();

    if (!trimmed) {
      renderProjects(allProjects);
      return;
    }

    const filtered = allProjects.filter((proj) => {
      const textBlob = [
        proj.title,
        proj.subtitle,
        proj.description,
        ...(proj.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      return textBlob.includes(trimmed);
    });

    renderProjects(filtered);
  }

  $projectFilter.on("input", function () {
    const value = $(this).val() || "";
    filterUsageCount += 1;
    console.log(
      `Project filter used ${filterUsageCount} time(s). Current query: "${value}"`
    );
    filterProjects(value);
  });

  // =========================
  // Initialization
  // =========================
  async function initProjects() {
    const start = performance.now();
    const data = await loadJson("data/projects.json");
    const end = performance.now();

    allProjects = Array.isArray(data) ? data : [];
    $projectsPlaceholder.remove();
    renderProjects(allProjects);

    console.log(
      `Loaded ${allProjects.length} project(s) in ${(end - start).toFixed(
        1
      )} ms.`
    );
  }

  async function initAchievements() {
    const start = performance.now();
    const data = await loadJson("data/achievements.json");
    const end = performance.now();

    const achievements = Array.isArray(data) ? data : [];
    $achievementsPlaceholder.remove();
    renderAchievements(achievements);

    console.log(
      `Loaded ${achievements.length} achievement(s) in ${(end - start).toFixed(
        1
      )} ms.`
    );
  }

  (async function initApp() {
    try {
      await initProjects();
      await initAchievements();
      console.log("Project Echo initialized successfully.");
    } catch (error) {
      console.error("Error initializing Project Echo:", error);
    }
  })();
});


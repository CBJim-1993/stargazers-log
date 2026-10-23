const statusMessage = document.querySelector("#status");
const repositoryList = document.querySelector("#repository-list");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository-card";

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    heading.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const date = document.createElement("time");
    date.dateTime = repository.starred_at;
    date.textContent = `Starred on ${new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
    }).format(new Date(repository.starred_at))}`;

    item.append(heading, description, date);
    repositoryList.append(item);
  }

  statusMessage.hidden = true;
  repositoryList.hidden = false;
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("The repository data must be a JSON array");
    }

    renderRepositories(repositories);
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    statusMessage.textContent = "Unable to load starred repositories.";
  }
}

loadRepositories();

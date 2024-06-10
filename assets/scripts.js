const apiBaseUrl = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
    fetchRepositories();
    fetchSuggestedContents();
    fetchWorkColleagues();
});

async function fetchUserData() {
    try {
        const response = await fetch(`${apiBaseUrl}/user`);
        if (!response.ok) throw new Error('Network response was not ok');
        const user = await response.json();
        document.getElementById('name').innerText = user.name;
        document.getElementById('bio').innerText = user.bio;
        document.getElementById('location').innerText = user.location;
        document.getElementById('github-url').setAttribute('href', user.url);
        document.getElementById('pfp').setAttribute('src', user.photo);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
}

async function fetchRepositories() {
    try {
        const response = await fetch(`${apiBaseUrl}/repositories`);
        if (!response.ok) throw new Error('Network response was not ok');
        const repositories = await response.json();
        const repositoriesContainer = document.getElementById('repositories');

        repositories.forEach(repo => {
            const repoCard = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card h-100">
                        <a href="${repo.url}">
                            <img src="${repo.photo}" alt="${repo.name}" />
                            <div class="card__content">
                                <p class="card__title">${repo.name}</p>
                                <p class="card__description">${repo.description}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            repositoriesContainer.insertAdjacentHTML('beforeend', repoCard);
        });
    } catch (error) {
        console.error('Failed to fetch repositories:', error);
    }
}

async function fetchSuggestedContents() {
    const response = await fetch(`${apiBaseUrl}/suggestedContents`);
    const contents = await response.json();
    const contentsContainer = document.querySelector('.slider-wrapper');

    let sliderHtml = '<div class="slider">';
    let navHtml = '<div class="slider-nav">';

    contents.forEach((content, index) => {
        const slideId = `slide-${index + 1}`;
        sliderHtml += `<img id="${slideId}" src="${content.coverImageUrl}" alt="${content.title}">`;
        navHtml += `<a href="#${slideId}"></a>`;
    });

    sliderHtml += '</div>';
    navHtml += '</div>';

    contentsContainer.innerHTML = sliderHtml + navHtml;
}

async function fetchWorkColleagues() {
    try {
        const response = await fetch(`${apiBaseUrl}/workColleagues`);
        if (!response.ok) throw new Error('Network response was not ok');
        const colleagues = await response.json();
        const colleaguesContainer = document.getElementById('work-colleagues');

        colleagues.forEach(colleague => {
            const colleagueCard = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card h-100">
                        <a href="${colleague.profileUrl}">
                            <img src="${colleague.photoUrl}" alt="${colleague.name}" />
                            <div class="card__content">
                                <p class="card__title">${colleague.name}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            colleaguesContainer.insertAdjacentHTML('beforeend', colleagueCard);
        });
    } catch (error) {
        console.error('Failed to fetch work colleagues:', error);
    }
}
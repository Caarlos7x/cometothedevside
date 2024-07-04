window.addEventListener('scroll', onScroll)
const navigation = document.querySelector('#navigation')

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

function disableScrolling() {
  setTimeout(function() {
      document.body.style.overflow = 'hidden';
  }, 2000);
}

function enableScrolling() {
  document.body.style.overflow = '';
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2

  // verificar se a seção passou da linha
  // quais dados vou precisar?
  const sectionTop = section.offsetTop
  const sectionHeight = section.offsetHeight
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

  // verificar se a base está abaixo da linha alvo

  const sectionEndsAt = sectionTop + sectionHeight
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add('scroll')
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

// number auto counter 
let valueDisplays = document.querySelectorAll(".num");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if(startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
})



ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
}).reveal(`
  #home, 
  #home img, 
  #home .stats, 
  #services,
  #experience,
  #services header,
  #services .card
  #about, 
  #about header, 
  #about .content`)

  async function fetchRepoCount() {
    const username = 'caarlos7x'; // Substitua pelo seu nome de usuário do GitHub

    try {
      console.log(`Fetching data for user: ${username}`);
      const response = await fetch(`https://api.github.com/users/${username}`);
      console.log(`Response status: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Data received:', data);
      const repoCount = data.public_repos;
      
      document.getElementById('repoCount').innerText = repoCount;
    } catch (error) {
      console.error('Erro ao buscar a contagem de repositórios:', error);
      document.getElementById('repoCount').innerText = 'Erro ao buscar a contagem de repositórios.';
    }
  }

  fetchRepoCount();


  async function fetchLatestRepos() {
    const username = 'caarlos7x'; // Substitua pelo seu nome de usuário do GitHub
    const token = ''; // Substitua pelo seu token de acesso do GitHub

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=6`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const repos = await response.json();

      const reposContainer = document.getElementById('reposContainer');
      repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';
        repoDiv.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Sem descrição'}</p>
          <a href="${repo.html_url}" target="_blank">Ver Repositório</a>
        `;
        reposContainer.appendChild(repoDiv);
      });
    } catch (error) {
      console.error('Erro ao buscar os repositórios:', error);
      const reposContainer = document.getElementById('reposContainer');
      reposContainer.innerHTML = '<p>Erro ao buscar os repositórios.</p>';
    }
  }

  // Chame a função ao carregar a página
  document.addEventListener('DOMContentLoaded', fetchLatestRepos);

  fetchLatestRepos();

  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    // Verifica se o aniversário já aconteceu este ano
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  }

  function updateAge() {
    const birthDate = '1991-06-22'; // Data de aniversário no formato YYYY-MM-DD
    const age = calculateAge(birthDate);
    document.getElementById('ageCounter').innerText = age;
  }

  // Chama a função para atualizar a idade ao carregar a página
  updateAge();
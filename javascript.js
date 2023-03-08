console.log('Js Viculado')

const listaDeFilmes = document.querySelector('#film-list')
const inputAnoInicial = document.querySelector('#input-first-year')
const inputAnoFinal = document.querySelector('#input-second-year')
const botaoBuscar = document.querySelector('#button-search')



botaoBuscar.addEventListener('click', getFilmsByReleaseDate)


const FILMS_API_BASE_URL = 'https://api.themoviedb.org'


const FILMS_API_KEY = '8d2e4a0cb4fd4d93acfb2f6d404ed5f8'

const API_CONFIG = {
    method: "get",
    headers: {
        'Authorization': 'Bearer 8d2e4a0cb4fd4d93acfb2f6d404ed5f8',
        'Content-Type': 'application/json; charset=utf-8'
    }
}

async function getGenreList(){
  const responseGenreList = await fetch (`https://api.themoviedb.org/3/genre/movie/list?api_key=${FILMS_API_KEY}&language=pt-BR`)
  const genreList = await responseGenreList.json()
  console.log(genreList)
}
async function getFilmsByReleaseDate() {
    listaDeFilmes.innerHTML = '';
    var anoInicial = inputAnoInicial.value
    var anoFinal = inputAnoFinal.value
    // const response = await fetch(`${FILMS_API_BASE_URL}/3/movie/76341?api_key=8d2e4a0cb4fd4d93acfb2f6d404ed5f8&language=pt-BR`, API_CONFIG);
    const response = await fetch(`${FILMS_API_BASE_URL}/3/discover/movie?api_key=${FILMS_API_KEY}&language=pt-BR&region=BR&release_date.gte=${anoInicial}-01-01&release_date.lte=${anoFinal}-12-30&with_release_type=2|3`, API_CONFIG);
    const data = await response.json();
    console.log(data)

  
    data.results.forEach(result => {
      
      const card = `    <div class="card" style="width:30rem;">
        <img src="https://image.tmdb.org/t/p/w500/${result.backdrop_path}" class="card-img-top" alt="${result.title}">
        <div class="card-body">
          <h5 class="card-title">${result.title}</h5>
          <p> ${result.original_title} </p>
          <p class="card-text">Ano de Lançamento: ${result.release_date}</p>
          <p> Genero: </p>
          <p> Classificação do Filme: ${result.vote_average} </p> 
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne">
                  Sinopse
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                <p> ${result.overview} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`


      listaDeFilmes.insertAdjacentHTML('beforeend', card)

    }
    )
}

getGenreList()

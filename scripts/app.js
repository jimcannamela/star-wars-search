const $queryInput = document.querySelector('#searchForm #query'),
      $typeInput = document.querySelector('#searchForm #type'),
      $submitButton = document.querySelector('#searchForm [type=submit]');

let $posters;

function getFilmLI(filmURL) {
  // [1,2,3,4,5] -> slice(-2) -> [4,5]
  const index = parseInt(filmURL.split('/').slice(-2)[0]) - 1;

  const $li = document.createElement('li');
  $li.append($posters[index].cloneNode());

  return $li;
}

function insertData(data, resourceType) {
  const $container = document.createElement('div');
  $container.classList.add('resource', resourceType);

  const $name = document.createElement('h2');
  $name.textContent = data.name;
  $container.append($name);

  const $filmsSection = document.createElement('ul');
  data.films
    .map(getFilmLI)
    .map($li => $filmsSection.append($li))
  
  $container.append($filmsSection);

  document.body.append($container);
}

document.querySelector('#searchForm').addEventListener('submit', function(evt) {
  evt.preventDefault();

  for(let $r of document.body.querySelectorAll('.resource')) {
    $r.remove();
  }
  
  const query = $queryInput.value,
        resourceType = $typeInput.value;
  
  // console.log(resourceType);
  
  search(resourceType, query)
    .then(data => data.map(r => insertData(r, resourceType)));

  $queryInput.value = "";
});

loadFilmPosters()
  .then(function(filmPosters) {
    $posters = filmPosters.map(p => {
      const $img = document.createElement('img');
      $img.classList.add('poster');
      $img.src = p;

      return $img;
    });
    // console.log(posters);
    // document.body.append(...posters);
    // console.log(posters);
    $submitButton.removeAttribute('disabled');
  });
var btn = document.getElementsByTagName("button")[0];
var input = document.getElementById("userinput");
var rand_btn = document.getElementById("random");
const pokemon_html = document.querySelector(".pokemon");

SearchPokemon = async (api_obj) => {
  const { url, type, name } = api_obj; //destructured object
  const api_url = `${url}${type}/${name}`; //URL string
  const changeHtml = (data) => {
    cardImg = `${
      data.sprites.other.dream_world.front_default
        ? data.sprites.other.dream_world.front_default
        : data.sprites.front_default
        ? data.sprites.front_default
        : "https://thumbs.dreamstime.com/b/no-pokemon-here-sign-riga-latvia-july-restricted-area-over-white-background-go-very-popular-virtual-74549871.jpg"
    }`;
    player1.img = cardImg;
    player1.pokemonName = data.name;
    ///adding to HTML
    console.log(data);
    const newHtml = `
			<div class = "details" align="center">
				<h1 class= "name" > ${data.name} </h1>
				<img class="pokemonSprite" src= "${
          data.sprites.other.dream_world.front_default
            ? data.sprites.other.dream_world.front_default
            : data.sprites.front_default
            ? data.sprites.front_default
            : "https://thumbs.dreamstime.com/b/no-pokemon-here-sign-riga-latvia-july-restricted-area-over-white-background-go-very-popular-virtual-74549871.jpg"
        } " />
			</div>`;

    pokemon_html.innerHTML = newHtml; //add it into html
    input.value = ""; //to reset the input line
  };
  await fetch(api_url)
    .then((raw_data) => raw_data.json())
    .then((data) => changeHtml(data))
    .catch((err) => {
      //if some error happens, it shows the following message
      pokemon_html.innerHTML = `<h1> Some Pokemon not found!. Please use exact name or id. </h1>`;
      console.log(err);
    });
};

function inputLength() {
  //checks if the input line input is not empty
  return input.value.length;
}

function MakeUrl(value) {
  //creates the URL using "value"
  const api_obj = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    name: value,
  };
  return api_obj;
}

function getRandomInt(min, max) {
  //creates random integer
  var rand_int = Math.floor(Math.random() * (max - min) + min);
  console.log(rand_int);
  return rand_int;
}

async function Randomize(event) {
  const search_value = getRandomInt(1, 897); //gets random integer between min and max of Pokemon IDs
  await SearchPokemon(MakeUrl(search_value)); //uses gotten integer as Pokemon ID and search
}

function SearchAfterClick(event) {
  if (inputLength() > 0) {
    SearchPokemon(MakeUrl(input.value)); //search Pokemon by using inputted value
  }
}

function SearchAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    //checks the Enter keyboard command
    SearchPokemon(MakeUrl(input.value)); //search Pokemon by using inputted value
  }
}
btn.addEventListener("click", SearchAfterClick);
input.addEventListener("keypress", SearchAfterKeypress);
rand_btn.addEventListener("click", Randomize);

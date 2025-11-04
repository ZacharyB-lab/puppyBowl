//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
let players = [];
let singlePlayer;
const allPlayers = document.querySelector("#allPlayers");
const singlePlayerDiv = document.querySelector("#singlePlayer");
const addPlayerForm = document.querySelector("#addPlayerForm");

////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  //TODO
  const response = await fetch(
    "https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players"
  );
  const data = await response.json();
  return data.data.players;
};

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  //TODO

  const response = await fetch(
    "https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players/" + playerId
  );
  const data = await response.json();
  return data.data.player;
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * Do we have a way to do that currently...?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  //TODO
  const response = await fetch(
    "https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players",
    {
      method: "POST",
      body: JSON.stringify(newPlayer),
    }
  );
  const data = await response.json();
  return data.data.newPlayer;

  /* event.preventDefault();
  const formData = new FormData(addPlayerForm);
  const newPlayer = {
    name: formData.get("name"),
    breed: formData.get("breed"),
    status: formData.get("status"),
    imageurl: formData.get("url"),
  };
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newPlayer),
      }
    );
    const data = await response.json();
    players.push(data.data);
    render();
  } catch (error) {
    //console.error(error)
  } */
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() some information is required.
 * Unless we get that information, we cannot call removePlayer()....
 */
/**
 * Note#2: Don't be afraid to add parameters to this function if you need to!
 */

const removePlayer = async (playerId) => {
  //TODO

  const response = await fetch(
    "https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players/" + playerId,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data.data.player;

  /* if (event.target.classList.contains("playerDelete")) {
    const id = event.target.getAttritbute("data-id") * 1;
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players/${id}`,
        {
          method: "DELETE",
        };
        players = players.filter((player) => {
          return player.id !== id
        })
        singlePlayer = null;
        render();
    } catch (error) {
      //console.error(error)
    }
  } */
};

/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked
 * - Remove from roster. when clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  // TODO
  const html = players.map((player) => {
    return `
            <div>
                <h2 class="pName" data-id="${player.id}">${player.name}</h2>
                <img class="photo" src="${player.imageUrl}" />
            </div>
        `;
  });
  allPlayers.innerHTML = html.join("");

  singlePlayerDiv.innerHTML = singlePlayer
    ? `
      <div>
        <img class="display" src="${singlePlayer.imageUrl}" />
        <h2>Name: ${singlePlayer.name}</h2>
        <h3>ID: ${singlePlayer.id}</h3>
        <h4>Breed: ${singlePlayer.breed}</h4>
        <h4>Status: ${singlePlayer.status}</h4>
        <button class="playerDelete" data-id="${singlePlayer.id}">Delete</button>
      </div>
 `
    : "Click a Puppy to learn more";
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need...?
  try {
    players = await fetchAllPlayers();
    render();
    // document.querySelector("form").addEventListener("submit", async (event) => {
    //   event.preventDefault
    // });
  } catch (error) {
    console.error(error);
  }
};

init();

allPlayers.addEventListener("click", async (event) => {
  if (event.target.classList.contains("pName")) {
    const id = event.target.getAttribute("data-id") * 1;
    console.log(id);
    /* try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players/${id}`
      );
      const data = await response.json();
      console.log(data.data);
      singlePlayer = data.data;
      render();
    } catch (error) {
      //console.error(error)
    } */
    singlePlayer = players.find((player) => {
      return player.id === id;
    });
    render();
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  form.reset();
  const newPlayer = {
    name: formData.get("name"),
    breed: formData.get("breed"),
    status: formData.get("status"),
    imageUrl: formData.get("url"),
    teamId: null,
  };
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players",
      {
        method: "POST",
        body: JSON.stringify(newPlayer),
        headers: { "Content-type": "application/json" },
      }
    );
    players = await fetchAllPlayers();
    render();
  } catch (error) {
    console.error(error);
  }
});
singlePlayerDiv.addEventListener("click", async (event) => {
  if (event.target.classList.contains("playerDelete")) {
    const id = event.target.getAttribute("data-id") * 1;
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2510-ZakB/players/${id}`,
        {
          method: "DELETE",
        }
      );
      players = players.filter((player) => {
        return player.id !== id;
      });
      singlePlayer = null;
      render();
    } catch (error) {
      console.error(error);
    }
  }
});

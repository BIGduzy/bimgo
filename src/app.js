/**
 * @brief Starting point of the program
 */
function main()  {
    // Get all board tiles
    tiles = document.querySelectorAll(".bingo-tile");

    // Get the buzzwords from the API
    getBuzzwords().then((result) => {
		result = result.bimgo;
		// Set the board
		for (let i = 0; i < tiles.length; ++i) {
			// TODO: Set text
			tiles[i].querySelector('span').innerHTML = result[i].word;
			tiles[i].setAttribute('buzzword-id', result[i].id);
			tiles[i].addEventListener("click", onClick.bind(this, i, tiles[i]));
		}
    });
}

/**
 * @brief Checks if given DOM node as a selected attribute set to true
 * @param {object} The DOM node that needs the be checked
 */
function isSelected(obj) {
    return obj.getAttribute("selected") === "true";
}

/**
 * @brief Returns the value of given DOM node's buzzword-id attribute
 * @param {object} The DOM node
 */
function getBuzzwordId(tile) {
    return tile.getAttribute("buzzword-id");
}

/**
 * @brief On click logic for board tiles
 */
function onClick(id, tile) {
    // Select/deselect clicked tile
    tile.setAttribute("selected", !isSelected(tile));

    if (isBoardComplete()) {
        // Send victory to API
        sendVictory().then((result) => {
            // Reset board
            for (let i = 0; i < tiles.length; ++i) {
                tiles[i].setAttribute("selected", false);
            }

            if (result.winner) {
                // TODO: Show winner!
            }
        });
    }
}

/**
 * @brief Checks if the board is fully filled in
 * @details Checks if there are 4 selected tiles in a row, column of diagonal
 */
function isBoardComplete() {
    selected = {};

    // Get all selected tiles
    for (let i = 0; i < tiles.length; ++i) {
        selected[i] = isSelected(tiles[i]); // The Attribute is a string
    }

           // Check rows
    return(selected[0] && selected[1] && selected[2] && selected[3]) ||
          (selected[4] && selected[5] && selected[6] && selected[7]) ||
          (selected[8] && selected[9] && selected[10] && selected[11]) ||
          (selected[12] && selected[13] && selected[14] && selected[15]) ||
          // Check Columns
          (selected[0] && selected[4] && selected[8] && selected[12]) ||
          (selected[1] && selected[5] && selected[9] && selected[13]) ||
          (selected[2] && selected[6] && selected[10] && selected[14]) ||
          (selected[3] && selected[7] && selected[11] && selected[15]) ||
          // Check diagonal
          (selected[3] && selected[6] && selected[9] && selected[12]) ||
          (selected[0] && selected[5] && selected[10] && selected[15]);
}

/**
 * @brief Gets board from API
 * @return {promise} JSON data returned from the API
 */
function getBuzzwords() {
    // TODO: Use correct url
    return fetch(`${API_URL}newBingo`).then(response => {
        // TODO: Check if API call was successfull
        return response.json();
    });
}

/**
 * @brief sends completed board to API for validation.
 * @return {promise} JSON dat returned from the API.
 */
function sendVictory() {
    // TODO: Send when row finished
    console.log('Done!');

    selected = [];
    for (let i = 0; i < tiles.length; ++i) {
        // The Attribute is a string
        if (isSelected(tiles[i])) {
            selected.push(getBuzzwordId(tiles[i]));
        }
    }

    // TODO: Use correct url
    // Send winning board to API for check, the API returns if we where first
    return fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => {
         // TODO: Check if API call was successfull
         return response.json();
    });
}

(function() {
	API_URL = `${window.location.protocol}//${window.location.hostname}:5000/bimgo/api/`;
    tiles = [];
	main();
})();

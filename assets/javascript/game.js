var goodGuy = '';
var badGuy = '';
var enemies = [];
var deadGuys = [];
var firstSelection = true;
var secondSelection = false;
var ships = {
    "tie": {
        name: "TIE Fighter",
        team: "imperial",
        hP: 120,
        attack: 8,
        counterAttack: 8
    },
    "lambda": {
        name: "Imperial Shuttle",
        team: 'imperial',
        hP: 150,
        attack: 8,
        counterAttack: 12
    },
    "destroyer": {
        name: "Star Destroyer",
        team: 'imperial',
        hP: 180,
        attack: 8,
        counterAttack: 16
    },
    "xwing": {
        name: "X-Wing",
        team: "rebel",
        hP: 120,
        attack: 8,
        counterAttack: 8
    },
    "falcon": {
        name: "Millenium Falcon",
        team: "rebel",
        hP: 150,
        attack: 8,
        counterAttack: 12
    },
    "cruiser": {
        name: "MC80 Cruiser",
        team: "rebel",
        hP: 180,
        attack: 8,
        counterAttack: 16
    }
};

$(document).ready(function () {
    $(".ship-select").on("click", function () {
        if (firstSelection) {
            firstSelection = false;
            var clicked = $(this).attr('id');
            goodGuy = clicked;
            var selectedHTML = $(this).html();
            ships.goodGuy = ships[clicked];
            document.getElementById(clicked).innerHTML = "";
            $("#hero").html(selectedHTML);
            document.getElementById(clicked + "-health").setAttribute('id', "hero-health");
            $("#center-text").html("<h3>Select Your First Oppenent");
            if (ships[clicked].team === 'rebel') {
                Object.keys(ships).forEach(function (key) {
                    if (ships[key].team === "imperial") {
                        enemies.push(ships[key].name);
                    }
                });
            }
            if (ships[clicked].team === 'imperial') {
                Object.keys(ships).forEach(function (key) {
                    if (ships[key].team === "rebel") {
                        enemies.push(ships[key].name);
                    }
                });
            }
        }
    });
    $(".ship-select").on("click", function () {
        if (!firstSelection && !secondSelection) {
            var clicked = $(this).attr('id');
            badGuy = clicked;
            if ((enemies.indexOf(ships[clicked].name)) > -1) {
                secondSelection = true;
                ships.badGuy = ships[clicked];
                var selectedHTML = $(this).html();
                document.getElementById(clicked).innerHTML = "";
                $("#foe").html(selectedHTML);
                document.getElementById(clicked + "-health").setAttribute('id', "foe-health");
                $("#center-text").html("<button id='attack-btn' class='btn btn-danger'>Click to Attack!</button>");
            }
        }
    });
    $(document).on("click", '#attack-btn', function () {
        ships.goodGuy.hP -= ships.badGuy.counterAttack;
        ships.badGuy.hP -= ships.goodGuy.attack;
        ships.goodGuy.attack += 8;
        $("#hero-health").html(ships.goodGuy.hP + "HP");
        $("#foe-health").html(ships.badGuy.hP + "HP");

        if (ships.badGuy.hP <= 0) {
            $("#center-text").html("<h5>Great Shot Kid! Select another Opponent!</h5>");
            document.getElementById(badGuy).innerHTML = "<img class='card-img-top' src='assets/images/rip.png'> <div class = 'card-body'><h4 class='card-title'>DEFEATED</h4>";
            enemies.splice(enemies.indexOf(ships.badGuy.name), 1);
            $("#foe").html('');
            secondSelection = false;
        }
        if (ships.goodGuy.hP <= 0) {
            $("#foe").html("<h1 style='margin-top:1em'>FAIL</h1>");
            $("#hero").html("<h1 style='margin-top:1em'>FAIL</h1>");
            $("#center-text").html("<button id='reset-btn' class='btn btn-danger'>Try Again</button>");
            firstSelection = false;
            secondSelection = true;
        }
        if (enemies.length === 0) {
            $("#foe").html("<h1 style='margin-top:1em'>WIN!</h1>");
            $("#hero").html("<h1 style='margin-top:1em'>WIN!</h1>");
            $("#center-text").html("<button id='reset-btn' class='btn btn-success'>Try Again</button>");
            firstSelection = false;
            secondSelection = true;
        }
    });

    $(document).on("click", '#reset-btn', function () {
        console.log('hi')
        setTimeout(function () {
            location.reload();
        }, 1000);
    });

});

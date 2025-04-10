var trenutnoPismo = null; // glagoljica ili latinica
function pokreniIgru(pismo) {
    trenutnoPismo = pismo;
    document.getElementById('pismo-izbor').style.display = 'none';
    document.getElementById('wrap').style.display = 'flex';
    startPhaser();
}

function startPhaser(){
    $("#loader").show()
console.clear();
var backgroundChanged = false; // stavi ovo globalno na vrh skripte
var previousSlovoIndex = -1;

window.PhaserGlobal = window.PhaserGlobal || {};
window.PhaserGlobal.stopFocus = true;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-wrap', {
    preload: preload,
    create: create,
    update: update
});


var slovo_a = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,1,1,0,1,1,0],
    [0,1,1,0,1,1,0,1,1,0],
    [0,1,1,0,1,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,0,0]
];

var slovo_b = [
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]
];


var slovo_v = [
    [1,1,1,1,0,0,1,1,1,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var slovo_g = [
    [1,1,1,1,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,0,0,0],
    [1,1,1,1,0,0,1,1,1,1],
    [0,0,0,1,0,0,1,0,0,1],
    [0,0,0,1,0,0,1,0,0,1],
    [0,0,0,1,0,1,1,1,1,1],
    [0,0,0,1,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];


var slovo_d = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,0,0,0],
    [0,1,0,1,0,0,1,0,0,0],
    [0,1,0,1,0,0,1,0,0,0],
    [0,1,0,1,0,0,1,0,0,0],
    [0,1,0,1,0,0,1,0,0,0],
    [0,1,0,1,0,0,1,1,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [0,1,1,1,0,0,1,1,1,0]
];
var slovo_e = [
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0]
]

var slovo_ž = [
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,1,1,1,0,0,1,1,1,1]
];

var slovo_3 = [
    [0,0,0,0,1,1,1,1,0,0],
    [0,0,0,0,1,0,0,1,0,0],
    [0,0,0,0,1,1,1,1,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var slovo_t = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,1,1,1,0,0,1,1,1,1]
];

var slovo_m = [
    [0,0,0,0,1,1,0,0,1,0],
    [0,0,0,1,1,1,0,1,1,1],
    [0,0,1,0,1,1,1,0,1,1],
    [0,1,0,0,1,1,0,0,1,1],
    [0,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1]
  ];

  var slovo_n = [
    [0,1,1,1,1,1,1,1,1,1],
    [0,1,1,0,0,0,0,0,1,1],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,1,0,0,0,1,1,0,0],
    [0,1,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,0,0,0]
  ];

  var slovo_b_custom = [
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,1,0,1,1,0,0,1,1],
    [0,1,0,0,1,1,0,0,1,1],
    [0,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var slovo_l=[
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,1,1,1,0,0,1,1,1,1]
]

var slovo_u=[
    [0,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,1,1,0,0,1,0],
    [0,1,0,0,1,1,0,0,1,0],
    [0,0,1,0,1,1,0,0,1,0],
    [0,0,0,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,0,0,1,0],
    [0,0,1,0,1,1,0,0,1,0],
    [0,1,0,0,1,1,0,0,1,0],
    [1,0,0,0,1,1,0,0,1,0],
    [0,1,1,1,1,1,1,1,0,0]
]

var slovo_f = [
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0]
];

var slovo_h = [
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,1,1,1,1],
    [0,1,1,0,0,1,0,0,1,1],
    [0,1,1,0,1,1,0,0,1,1],
    [0,1,1,1,0,1,0,0,1,1],
    [1,1,0,0,0,1,0,0, 1,1],
    [0,0,0,0,0,0,1,1,1,0]
];

var slovo_i = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [0,1,1,0,0,0,0,1,1,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,1,1,0,0,0,0,1,1,0],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];


var slovo_Ï = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,1,0,1,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0]
];

var slovo_j = [
[1,1,1,1,0,0,1,1,1,1],
[1,0,0,1,0,0,1,0,0,1],
[1,0,0,1,0,0,1,0,0,1],
[1,0,0,1,0,0,1,0,0,1],
[1,0,0,1,1,1,1,1,1,1],
[1,0,0,1,0,0,1,0,0,0],
[1,0,0,1,0,0,1,0,0,0],
[1,0,0,1,0,0,1,0,0,0],
[1,0,0,1,0,0,1,0,0,0],
[1,0,0,1,0,0,1,0,0,0]];

var slovo_jat = [
    [0,0,0,1,1,1,1,1,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,0,0,1,1,1,1,1,1,1],
    [0,0,0,1,0,1,0,0,0,1],
    [0,0,1,0,0,1,0,0,0,1],
    [0,1,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var slovo_ju = [
    [0,1,1,1,1,1,1,1,0,0],
    [0,1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,1,0,0,0],
    [0,1,0,0,1,1,0,0,0,0],
    [0,1,0,0,1,0,0,0,0,0],
    [0,1,0,1,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

var slovo_k = [
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,1,1,0]
];

var slovo_s = [
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,0,0,1,1,0],
    [1,1,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,1,0,0,1],
    [0,1,1,1,0,0,1,1,1,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,1,1,1,0,0,0]
];

var slovo_š = [
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var slovo_z = [
    [1,1,1,1,1,0,0,0,0,0],
    [1,0,0,0,1,0,0,0,0,0],
    [1,0,0,0,1,0,0,0,0,0],
    [1,0,0,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,1,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,1],
    [1,0,1,0,0,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0]
];


var slovo_r = [
    [0,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,1,1,1,1,1,1,1,1,0]
];


var slovo_p = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0]
];

var slovo_c = [
    [1,1,1,1,1,1,0,0,0,0],
    [1,0,0,0,1,1,0,0,0,0],
    [1,0,0,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,0,0,0,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,0,1,1,0,1,1,0],
    [0,0,0,0,1,1,1,1,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0]
];

var slovo_č = [
    [1,1,0,0,0,0,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,1,1,1,1,0,0]
];
var slovo_ć = [
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,1,1,1,1,0,0]
];

var slovo_ô = [
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,0,1,0,0,1,0,1,1],
    [1,1,0,1,0,0,1,0,1,1],
    [1,1,0,1,1,1,1,0,1,1],
    [1,1,0,0,0,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0]
];

var slovo_bb = [
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,0,1,1,0,0,1,1],
    [0,0,0,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,0,0,1,1],
    [0,1,1,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var slovaMatrice = [
    slovo_a, slovo_b, slovo_v, slovo_3, slovo_ž, slovo_e, slovo_d, slovo_g,
    slovo_m, slovo_n, slovo_b_custom, slovo_l, slovo_u, slovo_f, slovo_h, slovo_i,
    slovo_Ï, slovo_j, slovo_jat, slovo_ju, slovo_k, slovo_s, slovo_š, slovo_z,
    slovo_r, slovo_p, slovo_c, slovo_č, slovo_ć, slovo_ô, slovo_bb
];

// Globals
var ship, enemies,
    playerBullet = null,
    enemyBullets,
    scoreText,
    livesText,
    score = 0,
    lives = 2,
    pritisnuto = 0,
    moveTimerLoop, cursors,
    lastFireTime, smrt = 0;
justDescended = false;
var strela = document.getElementById("strela");
var vrisak = document.getElementById("vrisak");
var strela2 = document.getElementById("strela2");
var pozadina = document.getElementById("pozadina");




// Consts
var SHIP_SPEED = 200,
    SHIP_YOFS = 30,
    BULLET_SPEED_P = 600,
    WAVE_CLEAR_BONUS = 1000,
    KEYS = {},

    ROWS = 5,
    COLS = 11,
SPACING_X = 40;
SPACING_Y = 35;
    START_X = 100,
    START_Y = 100,
    MOVE_TIME = 600,
    MOVE_STEP = 10,
    DESCENT_STEP = 10,
    SIDE_GUTTER = 20,
    BULLET_SPEED_E = 400,
    FIRE_DELAY = 1000;



// Called when the game is loading
function preload() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('bg', 'grafika/pozadina.jpg?dl=0');
    game.load.image('ship', 'grafika/ship_invaders.png?dl=0');
    game.load.image('bullet', 'grafika/ship_bullet.png?dl=0');
    game.load.image('bullet2', 'grafika/ship_bullet_2.png?dl=0');
    game.load.image('invader-a', 'grafika/'+trenutnoPismo+'/a.png?dl=0');
    game.load.image('invader-b', 'grafika/'+trenutnoPismo+'/b.png?dl=0');
    game.load.image('invader-c', 'grafika/'+trenutnoPismo+'/c.png?dl=0');
    game.load.image('invader-d', 'grafika/'+trenutnoPismo+'/d.png?dl=0');
    game.load.image('invader-e', 'grafika/'+trenutnoPismo+'/e.png?dl=0');
    game.load.image('invader-f', 'grafika/'+trenutnoPismo+'/f.png?dl=0');
    game.load.image('invader-g', 'grafika/'+trenutnoPismo+'/g.png?dl=0');
    game.load.image('invader-h', 'grafika/'+trenutnoPismo+'/h.png?dl=0');
    game.load.image('invader-i', 'grafika/'+trenutnoPismo+'/i.png?dl=0');
    game.load.image('invader-k', 'grafika/'+trenutnoPismo+'/k.png?dl=0');
    game.load.image('invader-l', 'grafika/'+trenutnoPismo+'/l.png?dl=0');
    game.load.image('invader-m', 'grafika/'+trenutnoPismo+'/m.png?dl=0');
    game.load.image('invader-ć, šć', 'grafika/'+trenutnoPismo+'/ć.png?dl=0');
    game.load.image('invader-n', 'grafika/'+trenutnoPismo+'/n.png?dl=0');
    game.load.image('invader-o', 'grafika/'+trenutnoPismo+'/o.png?dl=0');
    game.load.image('invader-p', 'grafika/'+trenutnoPismo+'/p.png?dl=0');
    game.load.image('invader-r', 'grafika/'+trenutnoPismo+'/r.png?dl=0');
    game.load.image('invader-s', 'grafika/'+trenutnoPismo+'/s.png?dl=0');
    game.load.image('invader-š', 'grafika/'+trenutnoPismo+'/š.png?dl=0');
    game.load.image('invader-ž', 'grafika/'+trenutnoPismo+'/ž.png?dl=0');
    game.load.image('invader-t', 'grafika/'+trenutnoPismo+'/t.png?dl=0');
    game.load.image('invader-č', 'grafika/'+trenutnoPismo+'/č.png?dl=0');
    game.load.image('invader-u', 'grafika/'+trenutnoPismo+'/u.png?dl=0');
    game.load.image('invader-v', 'grafika/'+trenutnoPismo+'/v.png?dl=0');
    game.load.image('invader-z', 'grafika/'+trenutnoPismo+'/z.png?dl=0');
    if (trenutnoPismo=='latinica'){
    game.load.image('invader-đ', 'grafika/'+trenutnoPismo+'/đ.png?dl=0');
    game.load.image('invader-j', 'grafika/'+trenutnoPismo+'/j.png?dl=0');
    game.load.image('invader-ć', 'grafika/'+trenutnoPismo+'/ć.png?dl=0');
}
else{
    game.load.image('invader-j (đ)', 'grafika/'+trenutnoPismo+'/j.png?dl=0');
    game.load.image('invader-ć, šć', 'grafika/'+trenutnoPismo+'/ć.png?dl=0');
}

}

// Called when the game inits
function create() {
    cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

    // Add bg
    var img = game.add.image(0, 0, 'bg');
    img.alpha = 0.5;

    // Add ship
    ship = game.add.sprite(game.world.centerX, game.height - SHIP_YOFS, 'ship');
    ship.anchor.setTo(0.5, 1);

    // Add enemy bullet pool.  Enemies draw from this when firing,
    // the bullet instances get re-used throughout the game.
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(5, 'bullet2', 0, false);

    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    // Add enemies
    enemies = game.add.group();
    _initEnemies();

    // Add score UI
    var textStyle = {
        font: '20px monospace',
        fill: 'yellow'
    };
    var scoreLabel = game.add.text(game.world.width - 10, 10, 'REZULTAT', textStyle);
    scoreLabel.anchor.setTo(1, 0);
    scoreText = game.add.text(game.world.width - 10, 30, '0', textStyle);
    scoreText.anchor.setTo(1, 0);

    // Add lives UI
    var livesIndicator = game.add.image(10, game.height - 10, 'ship');
    livesIndicator.anchor.setTo(0, 1);
    livesIndicator.scale.setTo(0.5, 0.5);
    livesText = game.add.text(40, game.world.height, lives, {
        font: '15px monospace',
        fill: 'yellow'
    });
    livesText.anchor.setTo(0, 1);

    // Setup physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([ship, enemies], Phaser.Physics.ARCADE);
    ship.body.immovable = true;
    ship.body.collideWorldBounds = true;

    // Setup controls
    KEYS.SHIP_LEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
    KEYS.SHIP_RIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
    KEYS.FIRE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Start enemy movement & firing
    lastFireTime = game.time.now;
    moveTimerLoop = game.time.events.loop(MOVE_TIME, _moveEnemies);
var loader = document.getElementById('loader');
if (loader) {
    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    
        // Čekaj prvi klik/tap/tipku
        function tryPlayMusic() {
            pozadina.play().then(() => {
                // Uspješno pokrenuto, ukloni listener
                window.removeEventListener('keydown', tryPlayMusic);
                window.removeEventListener('mousedown', tryPlayMusic);
                window.removeEventListener('touchstart', tryPlayMusic);
            }).catch((e) => {
                console.warn("Autoplay blocked, waiting for user interaction...");
            });
        }
    
        // Dodaj event listenere za prvi kontakt korisnika
        window.addEventListener('keydown', tryPlayMusic);
        window.addEventListener('mousedown', tryPlayMusic);
        window.addEventListener('touchstart', tryPlayMusic);
    }, 500);
}
}

function create2() {
    backgroundChanged = false;
    if (smrt == 0) {
        return
    }
    enemies.removeAll();
    SPACING_Y = 40

    // Add ship
    ship = game.add.sprite(game.world.centerX, game.height - SHIP_YOFS, 'ship');
    ship.anchor.setTo(0.5, 1);

    // Add enemy bullet pool.  Enemies draw from this when firing,
    // the bullet instances get re-used throughout the game.
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(5, 'bullet2', 0, false);
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    // Add enemies
    enemies = game.add.group();
    _initEnemies();
    lives = 2
    livesText.setText(lives)
    score = 0
    scoreText.setText(score)


    // Setup physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([ship, enemies], Phaser.Physics.ARCADE);
    ship.body.immovable = true;
    ship.body.collideWorldBounds = true;

    // Setup controls
    KEYS.SHIP_LEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
    KEYS.SHIP_RIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
    KEYS.FIRE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Start enemy movement & firing
    lastFireTime = game.time.now;
    moveTimerLoop = game.time.events.loop(MOVE_TIME, _moveEnemies);
    smrt = 0
}



function _initEnemies() {
    enemies.removeAll();

    var newSlovoIndex;
do {
    newSlovoIndex = Math.floor(Math.random() * slovaMatrice.length);
} while (newSlovoIndex === previousSlovoIndex);
previousSlovoIndex = newSlovoIndex;

var slovo = slovaMatrice[newSlovoIndex];
    var rand = ["a", "b", "c", "č", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "p", "r", "s", "š", "u", "v", "t", "z", "ž"];
    if (trenutnoPismo=='latinica'){
        rand.push("j", "đ", "ć")
    }
    else{rand.push("j (đ)", "ć, šć")}
    // Dinamički izračunaj veličinu slova
    var redaka = slovo.length;
    var stupaca = slovo[0].length;

    // Dinamički izračunaj centriranje (ovisno o veličini matrice)
    var totalWidth = stupaca * SPACING_X;
    var totalHeight = redaka * SPACING_Y;

    var offsetX = (game.width - totalWidth) / 2;
    var offsetY = START_Y;

    enemies.position.set(offsetX, offsetY);

    for (var r = 0; r < redaka; r++) {
        for (var c = 0; c < stupaca; c++) {
            if (slovo[r][c] === 1) {
                var x = SPACING_X * c;
                var y = SPACING_Y * r;
                var br = rand[Math.floor(Math.random() * rand.length)];
                var invader = game.add.sprite(x, y, 'invader-' + br);
                invader.anchor.setTo(0.5, 0.5);
                invader.score = br;
                enemies.add(invader);
            }
        }
    }

    game.physics.enable(enemies, Phaser.Physics.ARCADE);
    if (moveTimerLoop) moveTimerLoop.delay = MOVE_TIME;
}

function _moveEnemies() {
    // Check if the group is going to go out of bounds
    // TODO: is there a cleaner/more Phaser-like way of doing this?
    var px_left = enemies.position.x,
        px_right = enemies.position.x + ((COLS - 1) * SPACING_X);

    if (!justDescended &&
        (px_right + MOVE_STEP > game.width - SIDE_GUTTER ||
            px_left + MOVE_STEP < SIDE_GUTTER)) {

        // If about to go out of bounds, shift down a bit and reverse
        // TODO: check if they've hit the bottom & do gameover if so
        MOVE_STEP = -MOVE_STEP;
        enemies.position.y += DESCENT_STEP;
        justDescended = true;
    } else {
        // Otherwise just move in current direction
        enemies.position.x += MOVE_STEP;
        justDescended = false;
    }
}

function _bulletHitEnemy(bullet, enemy) {
    // Add score to total
    score += 10;
    scoreText.setText(score);

    // Destroy both sprites
    enemy.kill();
    bullet.kill();

    var fontFamily = trenutnoPismo === 'latinica' ? '20px FSGLA' : '20px monospace';

var scoreNotify = game.add.text(enemy.world.x, enemy.world.y, enemy.score, {
    font: fontFamily,
    fill: '#ffff00'
});
    scoreNotify.anchor.setTo(0.5, 0.5);
    game.time.events.add(600, function () {
        scoreNotify.destroy();
    });

    // If all enemies dead, give a bonus and reset with a new wave,
    // slightly further down the screen
    if (enemies.countLiving() === 0) {
        score += WAVE_CLEAR_BONUS;
        START_Y += SPACING_Y;
        _initEnemies();
    }

    // Reduce motion delay (i.e. speed up movement) as enemy count reduces
    var newDelay = 0.05 + (enemies.countLiving() / (ROWS * COLS) * 0.95);
    moveTimerLoop.delay = MOVE_TIME * newDelay;
}

// Called every frame
function update() {

    // Kill an enemy if the player's bullet hits them
    if (playerBullet && playerBullet.alive) {
        game.physics.arcade.collide(playerBullet, enemies, _bulletHitEnemy);
    }

    if (ship.alive) {

        // Kill the player if they collide with an invader
        game.physics.arcade.collide(enemies, ship, function () {
            console.log('Ship-to-enemy collision');
        });

        // Kill the player if they get shot
        game.physics.arcade.collide(ship, enemyBullets, function (s, b) {
            // Destroy both sprites
            s.kill();
            b.kill();

            // Reduce lives
            lives--;
            if (lives >= 0) {
                // Respawn after a delay if we still have lives left
                livesText.setText(lives);
                game.time.events.add(2000, function () {
                    ship.reset(game.world.centerX, game.height - SHIP_YOFS);
                    ship.revive();
                });
            } else {
                // If out of lives, game over - show text, stop enemy movement,
                // kill any active player bullet
                // TODO: restart on keypress
                smrt = 1
                vrisak.play()
                var gameOverText = game.add.text(game.world.centerX, game.world.centerY, 'KRAJ IGRE', {
                    font: '40px monospace',
                    fill: 'yellow'
                });

        backgroundChanged = true;
        var fadeDiv = document.getElementById('background-fade');

                // Postavi fade-in efekt s bilo kojom pozadinom (dinamički)
        fadeDiv.style.backgroundImage = window.getComputedStyle(document.body).backgroundImage;
        fadeDiv.style.opacity = 1;
    
        setTimeout(function () {
            document.body.style.backgroundImage = "url('../grafika/kraj.jpg')";
            fadeDiv.style.opacity = 0;
        }, 1000); // Čeka da fade završi prije zamjene glavne pozadine

                var gameOverText2 = game.add.text(game.world.centerX, game.world.centerY + 50, 'PRITISNITE ENTER ZA NOVU IGRU', {
                    font: '30px monospace',
                    fill: 'yellow'
                });

                if (playerBullet) playerBullet.destroy();
                gameOverText.anchor.setTo(0.5, 0.5);
                gameOverText2.anchor.setTo(0.5, 0.5);
                game.time.events.remove(moveTimerLoop);

                if (!smrt == 0) {
                    $(document).on("keyup", function (e) {
                        if (e.keyCode == 13) {
                            location.reload();
                            gameOverText.setText("")
                            gameOverText2.setText("")
        var fadeDiv = document.getElementById('background-fade');

                // Postavi fade-in efekt s bilo kojom pozadinom (dinamički)
        fadeDiv.style.backgroundImage = window.getComputedStyle(document.body).backgroundImage;
        fadeDiv.style.opacity = 1;
    
        setTimeout(function () {
            document.body.style.backgroundImage = "url('../grafika/pozadina1.jpg')";
            fadeDiv.style.opacity = 0;
        }, 1000); // Čeka da fade završi prije zamjene glavne pozadine
                            create2()
                        }
                    });
                }
            }
        });



        // Move the ship according to keypresses
        if (KEYS.SHIP_LEFT.isDown || cursors.left.isDown) {
            ship.body.velocity.x = -SHIP_SPEED;
        } else if (KEYS.SHIP_RIGHT.isDown || cursors.right.isDown) {
            ship.body.velocity.x = SHIP_SPEED;
        } else {
            ship.body.velocity.x = 0;
        }

        // Spawn a bullet if the player presses FIRE
        // and we don't already have a bullet in play
        if (KEYS.FIRE.isDown) {
            if (playerBullet && playerBullet.alive) return false;

            playerBullet = game.add.sprite(ship.x, ship.y - ship.height, 'bullet');
            playerBullet.anchor.setTo(0.5, 0.5);
            strela.play()

            game.physics.arcade.enable(playerBullet, Phaser.Physics.ARCADE);
            playerBullet.checkWorldBounds = true;
            playerBullet.outOfBoundsKill = true;
            playerBullet.body.velocity.y = -BULLET_SPEED_P;
        }

        // If we're not in a cooldown period, pull a bullet from the pool,
        // choose a random alive enemy, and fire the bullet from their position.
        if (game.time.now > lastFireTime) {
            var bullet = enemyBullets.getFirstExists(false);
            if (bullet) {
                var alive = [];
                enemies.forEachAlive(function (nme) {
                    alive.push(nme);
                });
                strela2.play()

                var enemy = Phaser.ArrayUtils.getRandomItem(alive);
                bullet.reset(enemy.world.x, enemy.world.y);
                bullet.body.velocity.y = BULLET_SPEED_E;
            }
            lastFireTime = game.time.now + FIRE_DELAY;
        }
    }
    if (score >= 450 && !backgroundChanged) {
        var fadeDiv = document.getElementById('background-fade');

                // Postavi fade-in efekt s bilo kojom pozadinom (dinamički)
        fadeDiv.style.backgroundImage = window.getComputedStyle(document.body).backgroundImage;
        fadeDiv.style.opacity = 1;
    
        setTimeout(function () {
            document.body.style.backgroundImage = "url('../grafika/pozadina2.jpg')";
            fadeDiv.style.opacity = 0;
        }, 1000); // Čeka da fade završi prije zamjene glavne pozadine
    }
}



$(document).on("keyup", function (e) {
    if (e.keyCode == 80) {
        if (game.paused == false) {
            game.paused = true;
            $("#pauza").show()
        } else {
            game.paused = false;
            $("#pauza").hide()
            $('#pozadina').play()
        }
    } else if (e.keyCode == 81) {
        if (!jQuery('audio').prop("muted")) {
            jQuery('audio').prop("muted", true);
        } else {
            jQuery('audio').prop("muted", false);

        }
    }
});}
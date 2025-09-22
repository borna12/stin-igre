var broj_pitanja = 0;
var bodovi = 0;
var vrijeme = 0;
var pauza = 0;
var tocno = 0;
let igraPokrenuta = false;
var vremensko_ukljuceno = true;
var vremensko;
let countdownTimer; //

function shuffle(array) { //izmješaj pitanja
    var i = 0,
        j = 0,
        temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            if (pauza == 0) {
                timeleft--;
            }
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            } else if (timeleft <= 1) {
                $("#sekunde").html("sekunda")
                $("#ostalo").html("ostala")
            } else if (timeleft <= 4) {
                $("#sekunde").html("sekunde")
            }
        }, 1000);
    });
}

function pocetak() {
 vremensko = $("#vrijemeIgra").val();

    let broj = $("#brojPitanja").val();

if (broj !== "sve") {
    quiz = quiz.slice(0, parseInt(broj));
}
    $(".init-page").hide()
    vremensko_ukljuceno = (vremensko !== "ne");

    broj_pitanja = 0;
    $(".centriraj").fadeIn(300)
    $(".slovo").html(quiz[broj_pitanja].question + " - <span class='gla'> "+quiz[broj_pitanja].question+"</span>")
    $(".broj").html(broj_pitanja + 1 + "/" + quiz.length)
    $(".vrijeme").html('<progress value="15" max="15" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">15 </span> <span id="sekunde">sekunda</span> za odgovor</p>')
    $(".tooltiptext").html('treba pritisnuti idući broj polja: '+quiz[broj_pitanja].broj_poteza)
    




if (vremensko_ukljuceno) {
    trajanje = parseInt(vremensko);  // 15 ili 30 sekundi
    $(".vrijeme").html('<progress value="' + trajanje + '" max="' + trajanje + '" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">' + trajanje + '</span> <span id="sekunde">sekundi</span> za odgovor</p>');
    timer(trajanje);
} else {
    $(".vrijeme").hide();  // sakrij timer
}
    return
}

function timer(trajanje) {
    ProgressCountdown(trajanje, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => isteklo())
}

function isteklo() {
    $("#krivo")[0].play()
    if(quiz[broj_pitanja].question[1]==","){"<span class='mini3'>"+quiz[broj_pitanja].question+"</span>"}
    else if(quiz[broj_pitanja].question!="predznak za veliko slovo"){quiz[broj_pitanja].question=quiz[broj_pitanja].question.slice(0, 2)} 
        else{quiz[broj_pitanja].question="<span class='mini2'>"+quiz[broj_pitanja].question+"</span>"}
    pauza = 1;
    clearInterval(countdownTimer);
    bodovi -= 15
    swal({
        title: '<strong>Vrijeme je isteklo!</strong>',
        html: '<p class="bodovi"><span class="netocno">-</span> 15</p><div class="section group"><div class="col span_1_of_3">' +quiz[broj_pitanja].question + '</div><div class="col span_1_of_3"> <i class="fas fa-long-arrow-alt-right"></i> </div><div class="col span_1_of_3"><img src="slike/' + quiz[broj_pitanja].slika + '.jpg" class="slikica"/></div></div>',
        showCloseButton: false,
        confirmButtonText: 'nastavi',
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    $(".swal2-confirm").off("click").on("click", function () {
        iduce_pitanje()
    })
}

function provjeri() {
    vrijeme = parseInt($("#pageBeginCountdownText").text())
    if ($('.aktivno').length == quiz[broj_pitanja].broj_poteza) {
        if(quiz[broj_pitanja].question[1]==","){quiz[broj_pitanja].question="<span class='mini3'>"+quiz[broj_pitanja].question+"</span>"}
        else if(quiz[broj_pitanja].question!="predznak za veliko slovo"){quiz[broj_pitanja].question=quiz[broj_pitanja].question.slice(0, 2)} 
        else{quiz[broj_pitanja].question="<span class='mini2'>"+quiz[broj_pitanja].question+"</span>"}
        t = 0;
        pauza = 1
        clearInterval(countdownTimer);
        for (x = 0; x < quiz[broj_pitanja].polja.length; x++) {
            if (!$("#" + quiz[broj_pitanja].polja[x]).hasClass("aktivno")) {
                $("#krivo")[0].play()
                bodovi -= 10;
                swal({
                    title: '<strong class="netocno">Netočno!</strong>',
                    html: '<p class="bodovi"><span class="netocno">-</span> 10</p><br><br><div class="section group"><div class="col span_1_of_3">' +quiz[broj_pitanja].question + '</div><div class="col span_1_of_3"> <i class="fas fa-long-arrow-alt-right"></i> </div><div class="col span_1_of_3"><img src="slike/' + quiz[broj_pitanja].slika + '.jpg" class="slikica"/></div></div>',
                    showCloseButton: false,
                    confirmButtonText: 'nastavi',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                $(".swal2-confirm").off("click").on("click", function () {
                    iduce_pitanje()
                })
                break
            } else {
                t++;
            }
        }
        if (t == quiz[broj_pitanja].polja.length) {
            tocno++;
            bodovi += 10
            bodovi += vrijeme;
            $("#tocno")[0].play()
            b = vrijeme + 10
            swal({
                title: '<strong class="tocno">Točno!</strong>',
                html: '<p class="bodovi"><span class="tocno">+</span> ' + b + '</p><br><br><div class="section group"><div class="col span_1_of_3">' +quiz[broj_pitanja].question + '</div><div class="col span_1_of_3"> <i class="fas fa-long-arrow-alt-right"></i> </div><div class="col span_1_of_3"><img src="slike/' + quiz[broj_pitanja].slika + '.jpg" class="slikica"/></div></div>',
                showCloseButton: false,
                confirmButtonText: 'nastavi',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            $(".swal2-confirm").off("click").on("click", function () {
                iduce_pitanje()
            })
        }

    }
    $(".mini2").parent(".span_1_of_3").css({"font-size":"50px"})
    $(".mini3").parent(".span_1_of_3").css({"font-size":"100px"})
}

function iduce_pitanje() {
    pauza = 0;
    broj_pitanja = broj_pitanja + 1
    postotak = Math.round((tocno / quiz.length) * 100, 2)
    if (broj_pitanja == quiz.length) {
        clearInterval(countdownTimer);
        pauza = 1;
        swal({
            title: '<strong>Kraj igre!</strong>',
            html: 'broj bodova: ' + bodovi + '<br>postotak točnih odgovora: ' + postotak + '',
            showCloseButton: false,
            allowOutsideClick: false,
            showCancelButton: false, // There won't be any cancel button
            confirmButtonText: 'nova igra',
            allowEscapeKey: false
        })
        $(".swal2-confirm").off("click").on("click", function () {
            nova_igra()
        })
        return
    }
    $(".tooltiptext").html('treba pritisnuti idući broj polja: '+quiz[broj_pitanja].broj_poteza)

    $(".krug").removeClass("aktivno")
    $(".slovo").html(quiz[broj_pitanja].question + " - <span class='gla'> "+quiz[broj_pitanja].question+"</span>")
    $(".broj").html(broj_pitanja + 1 + "/" + quiz.length)
clearInterval(countdownTimer);

let odabranoVrijeme = vremensko;
vremensko_ukljuceno = (odabranoVrijeme !== "ne");
if (vremensko_ukljuceno) {
    trajanje = parseInt(odabranoVrijeme);

    if (!isNaN(trajanje)) {
        $(".vrijeme").html('<progress value="' + trajanje + '" max="' + trajanje + '" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">' + trajanje + '</span> <span id="sekunde">sekundi</span> za odgovor</p>');
        timer(trajanje);
    }
} else {
    $(".vrijeme").hide();
}
}

function hint(){
    $(".hint").html("Za ovaj znak potrebno je popuniti idući broj polja: "+ quiz[broj_pitanja].broj_poteza)
    bodovi=bodovi-2
}



$(".krug").off("click").on("click", function () {
    $(this).toggleClass("aktivno")
    provjeri()
})

quiz = [
     {question: "otь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "radi", polja: [1], broj_poteza: 1, slika: ""},
  {question: "do", polja: [1], broj_poteza: 1, slika: ""},
  {question: "u", polja: [1], broj_poteza: 1, slika: ""},
  {question: "iz", polja: [1], broj_poteza: 1, slika: ""},
  {question: "bez", polja: [1], broj_poteza: 1, slika: ""},
  {question: "sь", polja: [1, 5], broj_poteza: 2, slika: ""},
  {question: "posrêdê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "pače", polja: [1], broj_poteza: 1, slika: ""},
  {question: "prêžde", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vslêdь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "razvê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "ohrьstь/okrьstь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vrьhu", polja: [1], broj_poteza: 1, slika: ""},
  {question: "blizu", polja: [1, 2], broj_poteza: 2, slika: ""},
  {question: "svrьhu", polja: [1], broj_poteza: 1, slika: ""},
  {question: "kromê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vanê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "izvanь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vmêsto", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vmêstê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "okolu", polja: [1], broj_poteza: 1, slika: ""},
  {question: "sazadь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vkrai", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vrьhь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vskrai", polja: [1], broj_poteza: 1, slika: ""},
  {question: "okolo", polja: [1], broj_poteza: 1, slika: ""},
  {question: "otposrêdê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "prêko", polja: [1], broj_poteza: 1, slika: ""},
  {question: "prêkь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "poli", polja: [1, 3], broj_poteza: 2, slika: ""},
  {question: "protivu", polja: [1, 2], broj_poteza: 2, slika: ""},
  {question: "protivь", polja: [1, 2], broj_poteza: 2, slika: ""},
  {question: "proti", polja: [1, 2], broj_poteza: 2, slika: ""},
  {question: "suprotivu", polja: [1, 2], broj_poteza: 2, slika: ""},
  {question: "suprotivь", polja: [1, 2], broj_poteza: 2, slika: ""},
  {question: "ciĉь/ciĉa", polja: [1], broj_poteza: 1, slika: ""},
  {question: "daleko", polja: [1], broj_poteza: 1, slika: ""},
  {question: "nedaleko", polja: [1], broj_poteza: 1, slika: ""},
  {question: "drêvle", polja: [1], broj_poteza: 1, slika: ""},
  {question: "izmeždu", polja: [1], broj_poteza: 1, slika: ""},
  {question: "niže", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vnutrь", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vnutrê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vsrêdê", polja: [1], broj_poteza: 1, slika: ""},
  {question: "otsrêdi", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vstranu", polja: [1], broj_poteza: 1, slika: ""},
  {question: "vinoû", polja: [1], broj_poteza: 1, slika: ""},
  {question: "kь", polja: [2], broj_poteza: 1, slika: ""},
  {question: "po", polja: [2], broj_poteza: 1, slika: ""},
  {question: "prêmo", polja: [2], broj_poteza: 1, slika: ""},
  {question: "vь", polja: [3, 4], broj_poteza: 2, slika: ""},
  {question: "na", polja: [3, 4], broj_poteza: 2, slika: ""},
  {question: "za", polja: [3, 5], broj_poteza: 2, slika: ""},
  {question: "nadь", polja: [3, 5], broj_poteza: 2, slika: ""},
  {question: "o", polja: [3, 4], broj_poteza: 2, slika: ""},
  {question: "prêdь", polja: [3, 5], broj_poteza: 2, slika: ""},
  {question: "po", polja: [2, 3, 4], broj_poteza: 3, slika: ""},
  {question: "skvozê/skozê", polja: [3], broj_poteza: 1, slika: ""},
  {question: "podь", polja: [3, 5], broj_poteza: 2, slika: ""},
  {question: "črêzь", polja: [3], broj_poteza: 1, slika: ""},
  {question: "meždu", polja: [3, 5], broj_poteza: 2, slika: ""},
  {question: "pro", polja: [3], broj_poteza: 1, slika: ""},
  {question: "vz", polja: [1, 3], broj_poteza: 2, slika: ""},
  {question: "nizь/nizu", polja: [3], broj_poteza: 1, slika: ""},
  {question: "mimo", polja: [3], broj_poteza: 1, slika: ""},
  {question: "pri", polja: [4], broj_poteza: 1, slika: ""}]

shuffle(quiz)

function nova_igra() {
    window.location.reload(true);
}
function uvod(){
    swal({
        title: '<strong>Prepoznaj brajicu</strong>',
        html: 'Opis igre...<br><br><label for="brojPitanja">Broj pitanja:</label><select id="brojPitanja" style="margin-bottom:10px; width: 100%; height: 30px;"><option value="20" selected>20</option><option value="40">40</option><option value="sve" >67 (sva)</option></select><label for="vrijemeIgra">Vremensko ograničenje:</label><select id="vrijemeIgra" style="margin-bottom:10px; width: 100%; height: 30px;"><option value="ne" selected>NE</option><option value="30">30</option><option value="15">15</option></select>',
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'započni kviz',
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    $(".swal2-confirm").off("click").on("click", function () {
          if (!igraPokrenuta) {
        igraPokrenuta = true;
        pocetak();
    }
    })
 
}

uvod()

 	

$( "body" ).append( '<style>.mini{font-size:18px!important}.mini img{max-height:100px}@media only screen and (max-width:480px){.col:first-child {font-size:40px!important} .mini{font-size:14px!important .mini3{font-size:40px!important; }.col{margin:1% 0 1% 0%}}.span_3_of_3,.span_2_of_3,.span_1_of_3,.span_1_of_2{width:100%}.mini{width:33%}.slikica{max-height:120px} p + br{display:none}}</style>');
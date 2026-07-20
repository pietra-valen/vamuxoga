//==============================
// URL DO GOOGLE APPS SCRIPT
//==============================

const URL = "https://script.google.com/macros/s/AKfycbz8OSZ_WUCm-UaUB1veoNiTU4PYOkwGaBCAqGHaAjvJURx68rSton7g1Pa9UaYobaUH/exec";


//==============================
// ELEMENTOS
//==============================

const form = document.getElementById("gameForm");
const cards = document.querySelectorAll(".game-card");
const gameInput = document.getElementById("game");

const mensagem = document.getElementById("mensagem");
const gif = document.getElementById("gifContainer");

const botao = document.getElementById("botao");
const textoBotao = document.getElementById("textoBotao");


//==============================
// ESCOLHER O JOGO
//==============================

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => {

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        gameInput.value = card.dataset.game;

    });

});


//==============================
// ENVIAR FORMULÁRIO
//==============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const game = gameInput.value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;


    if (game == "") {

        mensagem.style.color = "#ff6666";
        mensagem.innerHTML = "Escolha um jogo.";

        return;

    }

    if (data == "") {

        mensagem.style.color = "#ff6666";
        mensagem.innerHTML = "Escolha uma data.";

        return;

    }

    if (hora == "") {

        mensagem.style.color = "#ff6666";
        mensagem.innerHTML = "Escolha um horário.";

        return;

    }


    botao.disabled = true;

    textoBotao.innerHTML = "Enviando...";

    try {
        await fetch(URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                game: game,
                data: data,
                hora: hora
            })
        });

        mensagem.style.color = "#6dff9d";
        mensagem.innerHTML = "🎉 Convite enviado com sucesso!";

        gif.style.display = "flex";

        form.reset();

        setTimeout(() => {
            gif.style.display = "none";
        }, 4000);

        gameInput.value = "";

        cards.forEach(c => {
            c.classList.remove("selected");
        });
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
    finally {
        textoBotao.innerHTML = "Enviar Convite";
        botao.disabled = false;
    }
});


//==============================
// BRILHO NO BOTÃO
//==============================

setInterval(() => {

    botao.animate(

        [

            {

                transform: "scale(1)"

            },

            {

                transform: "scale(1.03)"

            },

            {

                transform: "scale(1)"

            }

        ],

        {

            duration: 1000

        }

    );

}, 4000);



//==============================
// CONFETE ALEATÓRIO
//==============================

setInterval(() => {

    if (Math.random() > 0.90) {

        confetti({

            particleCount: 5,

            spread: 40,

            startVelocity: 12,

            origin: {

                x: Math.random(),

                y: Math.random()

            }

        });

    }

}, 2500);
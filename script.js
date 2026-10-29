
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const areaResultado = document.getElementById("areaResultado");
    const resultado = document.getElementById("resultado");
    const imagem = document.getElementById("imagem");
    const descricao = document.getElementById("descricao");
    const aviso = document.getElementById("aviso");
    const dataInput = document.getElementById("data");

    if (!formulario || !areaResultado || !resultado) {
        alert("Erro: confira se o HTML está atualizado.");
        return;
    }

    areaResultado.hidden = true;
    dataInput.max = new Date().toISOString().split("T")[0];

    const perfis = [
        {
            nome: "Engenheiro de Sistemas",
            descricao: "Você é criativo e gosta de construir e desenvolver ideias.",
            imagem: "imagens/perfil-1.jpg"
        },
        {
            nome: "Cientista Explorador",
            descricao: "Você é curioso e gosta de investigar e descobrir coisas novas.",
            imagem: "imagens/perfil-2.jpg"
        },
        {
            nome: "Explorador de Campo",
            descricao: "Você é corajoso e gosta de aventuras e novos lugares.",
            imagem: "imagens/perfil-3.jpg"
        },
        {
            nome: "Estrategista da Missão",
            descricao: "Você é organizado e gosta de planejar missões.",
            imagem: "imagens/   perfil-4.jpg"
        }
    ];

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        aviso.textContent = "";

        const nome = document.getElementById("nome").value.trim();
        const data = dataInput.value;

        if (!nome || !data) {
            aviso.textContent = "Preencha seu nome e sua data de nascimento!";
            return;
        }

        const nascimento = new Date(data + "T00:00:00");
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (isNaN(nascimento.getTime()) || nascimento > hoje) {
            aviso.textContent = "Digite uma data válida!";
            return;
        }

        const pontos = [0, 0, 0, 0];

        for (let i = 1; i <= 4; i++) {
            const resposta = document.querySelector(
                'input[name="p' + i + '"]:checked'
            );

            if (!resposta) {
                aviso.textContent = "Responda às quatro perguntas!";
                return;
            }

            pontos[Number(resposta.value) - 1]++;
        }

        let idade = hoje.getFullYear() - nascimento.getFullYear();

        if (
            hoje.getMonth() < nascimento.getMonth() ||
            (hoje.getMonth() === nascimento.getMonth() &&
             hoje.getDate() < nascimento.getDate())
        ) {
            idade--;
        }

        const maior = Math.max(...pontos);
        const empatados = pontos
            .map((p, i) => p === maior ? i : -1)
            .filter(i => i !== -1);

        const indice = empatados[
            Math.floor(Math.random() * empatados.length)
        ];

        const perfil = perfis[indice];

        resultado.textContent =
            "Parabéns, " + nome + "! Sua idade é " +
            idade + " anos. Seu perfil é: " + perfil.nome + ".";

        descricao.textContent = perfil.descricao;

        imagem.onerror = function () {
            imagem.hidden = true;
            descricao.textContent +=
                " (A imagem não foi encontrada. Confira o nome do arquivo.)";
        };

        imagem.onload = function () {
            imagem.hidden = false;
        };

        imagem.hidden = false;
        imagem.src = perfil.imagem;

        areaResultado.hidden = false;
        areaResultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    document.getElementById("refazer").addEventListener("click", function () {
        formulario.reset();
        aviso.textContent = "";
        resultado.textContent = "";
        descricao.textContent = "";
        imagem.removeAttribute("src");
        imagem.hidden = false;
        areaResultado.hidden = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

/**
 * Script de depuração para identificar problemas com o sistema de cenas
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("=== DEBUG: Iniciando depuração ===");

  // Verifica se o SceneManager está disponível
  if (window.sceneManager) {
    console.log("SceneManager está disponível globalmente");
    console.log("Cenas registradas:", Object.keys(window.sceneManager.scenes));
    console.log("Cena atual:", window.sceneManager.currentScene);
  } else {
    console.error("ERRO: SceneManager não está disponível globalmente!");
  }

  // Verifica se o botão de iniciar jogo existe
  const startButton = document.getElementById("startButton");
  if (startButton) {
    console.log("Botão de iniciar jogo encontrado");

    // Adiciona um listener de depuração
    startButton.addEventListener("click", () => {
      console.log("DEBUG: Botão de iniciar jogo clicado");

      if (window.sceneManager) {
        console.log('Tentando transição para a cena "characterSelection"');
        window.sceneManager.transitionTo("characterSelection");
      } else {
        console.error("ERRO: SceneManager não disponível no momento do clique");
      }
    });
  } else {
    console.error("ERRO: Botão de iniciar jogo não encontrado!");
  }

  // Verifica se as cenas existem
  const scenes = document.querySelectorAll(".scene");
  console.log(`Encontradas ${scenes.length} cenas no DOM:`);
  scenes.forEach((scene) => {
    console.log(
      `- Cena "${scene.dataset.scene}" (${scene.id}): ${
        scene.classList.contains("active") ? "ativa" : "inativa"
      }`
    );
  });

  // Verifica se os scripts estão sendo carregados na ordem correta
  console.log("Scripts carregados:");
  document.querySelectorAll("script").forEach((script) => {
    console.log(`- ${script.src || "Script inline"}`);
  });
});

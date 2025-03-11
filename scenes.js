/**
 * Sistema de Gerenciamento de Cenas
 * Responsável por controlar as transições entre as diferentes telas do jogo
 */

class SceneManager {
  constructor() {
    this.scenes = {};
    this.currentScene = null;
    this.transitionDuration = 600; // duração da transição em ms
    this.init();
  }

  init() {
    // Registra todas as cenas disponíveis
    document.querySelectorAll(".scene").forEach((sceneElement) => {
      const sceneName = sceneElement.dataset.scene;
      this.scenes[sceneName] = sceneElement;

      // Configura a cena inicial como ativa
      if (sceneElement.classList.contains("active")) {
        this.currentScene = sceneName;
      }
    });

    console.log(
      "SceneManager inicializado com as cenas:",
      Object.keys(this.scenes)
    );
    console.log("Cena atual:", this.currentScene);
  }

  /**
   * Transição para uma nova cena com efeito de fade
   * @param {string} targetScene - Nome da cena de destino
   * @param {Function} callback - Função a ser executada após a transição
   */
  transitionTo(targetScene, callback = null) {
    console.log(`Iniciando transição para a cena "${targetScene}"`);

    if (!this.scenes[targetScene]) {
      console.error(`Cena "${targetScene}" não encontrada!`);
      return;
    }

    if (targetScene === this.currentScene) {
      console.warn(`Já estamos na cena "${targetScene}"`);
      return;
    }

    const currentSceneElement = this.scenes[this.currentScene];
    const targetSceneElement = this.scenes[targetScene];

    console.log(`Transição: de "${this.currentScene}" para "${targetScene}"`);

    // Inicia a transição
    currentSceneElement.classList.add("fade-out");

    setTimeout(() => {
      // Remove a classe active da cena atual
      currentSceneElement.classList.remove("active");
      currentSceneElement.classList.remove("fade-out");

      // Prepara a nova cena para entrar com fade
      targetSceneElement.classList.add("active");
      targetSceneElement.classList.add("fade-in");

      console.log(`Cena "${targetScene}" ativada`);

      // Após a animação, remove a classe de fade
      setTimeout(() => {
        targetSceneElement.classList.remove("fade-in");

        // Atualiza a cena atual
        this.currentScene = targetScene;

        // Executa o callback se fornecido
        if (callback && typeof callback === "function") {
          console.log(`Executando callback para a cena "${targetScene}"`);
          callback();
        }

        // Dispara evento de mudança de cena
        const event = new CustomEvent("sceneChanged", {
          detail: {
            previousScene: currentSceneElement.dataset.scene,
            currentScene: targetScene,
          },
        });
        document.dispatchEvent(event);

        console.log(`Transição completa para a cena "${targetScene}"`);
      }, this.transitionDuration);
    }, this.transitionDuration);
  }
}

// Inicializa o gerenciador de cenas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando SceneManager...");
  window.sceneManager = new SceneManager();
  console.log("SceneManager disponível globalmente como window.sceneManager");
});

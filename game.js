document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const characterSelection = document.getElementById("characterSelection");
  const selectedTeam = document.getElementById("selectedTeam");
  const confirmTeam = document.getElementById("confirmTeam");
  const maxTeamSize = 7;
  let selectedCharacters = [];

  const characters = {
    melee: [
      {
        name: "Guerreiro",
        emoji: "🛡️⚔️",
        description: "Equilibrado, com alta defesa e bom ataque físico.",
        stats: {
          hp: 8,
          mana: 4,
          attack: 6,
          defense: 7,
        },
        abilities: {
          passive:
            "Veterano de Guerra: A cada 3 turnos, seu próximo ataque básico causa dano adicional igual a 50% de sua defesa",
          active:
            "Golpe Giratório (2 Mana) - CD: 3 turnos | Ataca todos os inimigos causando 80% do dano de ataque e os atordoa por 1 turno",
        },
      },
      {
        name: "Berserker",
        emoji: "🔥🪓",
        description:
          "Ataque brutal, baixa defesa, sacrifica vida por dano extra.",
        stats: {
          hp: 7,
          mana: 3,
          attack: 9,
          defense: 4,
        },
        abilities: {
          passive:
            "Frenesi: Cada ponto de vida perdido aumenta seu ataque em 10%. Em 2 ou menos de vida, ganha +50% de velocidade de ataque",
          active:
            "Fúria Mortal (2 Mana) - CD: 4 turnos | Sacrifica 2 pontos de vida e causa dano igual a 200% do ataque + vida sacrificada",
        },
      },
      {
        name: "Cavaleiro",
        emoji: "🏇⚔️",
        description: "Tanque com armadura pesada, proteção para aliados.",
        stats: {
          hp: 10,
          mana: 5,
          attack: 5,
          defense: 9,
        },
        abilities: {
          passive:
            "Protetor: No início de cada turno, o aliado com menor vida recebe um escudo igual a 30% da defesa do Cavaleiro",
          active:
            "Muralha de Aço (3 Mana) - CD: 4 turnos | Por 2 turnos, aumenta sua defesa em 50% e força inimigos a atacá-lo",
        },
      },
      {
        name: "Paladino",
        emoji: "✨⚔️",
        description: "Guerreiro sagrado, combina dano com cura e buffs.",
        stats: {
          hp: 8,
          mana: 6,
          attack: 6,
          defense: 6,
        },
        abilities: {
          passive:
            "Luz Divina: Ao final de cada turno, cura 1 ponto de vida do aliado mais ferido",
          active:
            "Justiça Divina (3 Mana) - CD: 3 turnos | Causa dano sagrado (120% do ataque) e cura 2 pontos de vida dos aliados",
        },
      },
      {
        name: "Ladrão",
        emoji: "🏹🗡️",
        description:
          "Rápido, furtivo, especialista em golpes críticos e evasão.",
        stats: {
          hp: 6,
          mana: 4,
          attack: 8,
          defense: 4,
        },
        abilities: {
          passive:
            "Oportunista: 40% de chance de realizar um ataque adicional quando um aliado causa dano a um inimigo",
          active:
            "Ataque Surpresa (2 Mana) - CD: 3 turnos | Fica invisível por 1 turno e seu próximo ataque causa dano crítico garantido (200% dano)",
        },
      },
      {
        name: "Monge",
        emoji: "🥋✊",
        description: "Lutador sem armas ou com bastões, resistência elevada.",
        stats: {
          hp: 7,
          mana: 5,
          attack: 7,
          defense: 6,
        },
        abilities: {
          passive:
            "Chi Interior: Recupera 1 ponto de mana no início de cada turno. Ataques básicos tem 30% de chance de atordoar por 1 turno",
          active:
            "Punho do Dragão (3 Mana) - CD: 3 turnos | Causa dano igual a 150% do ataque + 20% da mana atual e atordoa por 1 turno",
        },
      },
    ],
    ranged: [
      {
        name: "Arqueiro",
        emoji: "🏹",
        description: "Especialista em combate à distância com alta precisão.",
        stats: {
          hp: 5,
          mana: 4,
          attack: 8,
          defense: 3,
        },
        abilities: {
          passive:
            "Mira Precisa: 25% de chance de crítico em ataques básicos. Cada ataque consecutivo no mesmo alvo aumenta o dano em 10%",
          active:
            "Chuva de Flechas (3 Mana) - CD: 3 turnos | Atira 5 flechas aleatórias, cada uma causando 60% do dano de ataque",
        },
      },
      {
        name: "Caçador",
        emoji: "🐺🏹",
        description: "Domina bestas e armadilhas, bom em combate na natureza.",
        stats: {
          hp: 6,
          mana: 5,
          attack: 7,
          defense: 4,
        },
        abilities: {
          passive:
            "Companheiro Animal: Começa com um Lobo invocado (50% dos stats do Caçador) que ataca junto com ele",
          active:
            "Armadilha Explosiva (3 Mana) - CD: 4 turnos | Planta uma armadilha que explode após 1 turno, causando 150% de dano e reduzindo a velocidade",
        },
      },
      {
        name: "Mosqueteiro",
        emoji: "🔫",
        description:
          "Mistura de arqueiro e guerreiro com armas de fogo rudimentares.",
        stats: {
          hp: 6,
          mana: 4,
          attack: 9,
          defense: 4,
        },
        abilities: {
          passive:
            "Pólvora Instável: Ataques básicos tem 20% de chance de explodir, causando 50% de dano adicional em área",
          active:
            "Tiro Certeiro (3 Mana) - CD: 4 turnos | Disparo preciso que ignora 75% da defesa do alvo e causa dano igual a 180% do ataque",
        },
      },
    ],
    magic: [
      {
        name: "Mago",
        emoji: "🔥❄️⚡",
        description:
          "Mestre dos elementos, ataques devastadores de longo alcance.",
        stats: {
          hp: 5,
          mana: 10,
          attack: 9,
          defense: 3,
        },
        abilities: {
          passive:
            "Domínio Elemental: A cada turno, ganha um elemento aleatório (Fogo: +30% dano, Gelo: 30% chance de congelar, Raio: Atinge 2 alvos)",
          active:
            "Convergência Arcana (5 Mana) - CD: 5 turnos | Combina todos os elementos, causando 200% de dano mágico e aplicando todos os efeitos elementais",
        },
      },
      {
        name: "Feiticeiro",
        emoji: "🩸🔮",
        description: "Usa magia caótica, sacrificando vida ou alma.",
        stats: {
          hp: 6,
          mana: 8,
          attack: 8,
          defense: 3,
        },
        abilities: {
          passive:
            "Pacto Sombrio: Pode gastar vida ao invés de mana (1 HP = 2 Mana). Dano causado recupera 1 ponto de vida",
          active:
            "Explosão Vital (5 Mana ou 3 HP) - CD: 4 turnos | Sacrifica recursos para causar dano massivo (200% do custo) a todos os inimigos",
        },
      },
      {
        name: "Necromante",
        emoji: "☠️🖤",
        description: "Controla mortos-vivos e magias sombrias.",
        stats: {
          hp: 5,
          mana: 9,
          attack: 7,
          defense: 4,
        },
        abilities: {
          passive:
            "Exército das Sombras: A cada 2 turnos invoca um esqueleto (30% dos stats). Máximo de 3 esqueletos",
          active:
            "Drenar Essência (4 Mana) - CD: 4 turnos | Causa dano igual a 120% do ataque e cura todos os aliados e servos em 2 pontos de vida",
        },
      },
      {
        name: "Druida",
        emoji: "🍃🐻",
        description:
          "Se transforma em animais, invoca a natureza e cura aliados.",
        stats: {
          hp: 7,
          mana: 7,
          attack: 6,
          defense: 5,
        },
        abilities: {
          passive:
            "Adaptação Natural: A cada 2 turnos, pode mudar de forma (Urso: +3 HP/Defesa, Águia: +3 Ataque/Velocidade, Lobo: +2 em tudo)",
          active:
            "Fúria da Natureza (4 Mana) - CD: 4 turnos | Invoca vinhas que prendem inimigos por 2 turnos e causam dano contínuo (40% ataque por turno)",
        },
      },
      {
        name: "Bardo",
        emoji: "🎸🎶",
        description: "Encanta aliados e confunde inimigos com música e magia.",
        stats: {
          hp: 5,
          mana: 8,
          attack: 5,
          defense: 4,
        },
        abilities: {
          passive:
            "Melodia Inspiradora: No início de cada turno, concede um bônus aleatório aos aliados (+2 em Ataque, Defesa ou Velocidade)",
          active:
            "Sinfonia do Caos (4 Mana) - CD: 4 turnos | Inimigos atacam alvos aleatórios por 2 turnos e aliados ganham todos os bônus de Melodia",
        },
      },
    ],
    support: [
      {
        name: "Clérigo",
        emoji: "⛪⚕️",
        description: "Cura e protege aliados com magia sagrada.",
        stats: {
          hp: 6,
          mana: 9,
          attack: 4,
          defense: 5,
        },
        abilities: {
          passive:
            "Benção Divina: Curas tem 30% de chance de serem duplicadas. A cada 3 turnos, remove um efeito negativo aleatório dos aliados",
          active:
            "Milagre (5 Mana) - CD: 5 turnos | Cura 3 pontos de vida de todos os aliados e concede um escudo de 2 pontos por 2 turnos",
        },
      },
      {
        name: "Xamã",
        emoji: "🌪️🌀",
        description: "Usa espíritos e magia ancestral para fortalecer aliados.",
        stats: {
          hp: 6,
          mana: 8,
          attack: 5,
          defense: 5,
        },
        abilities: {
          passive:
            "Comunhão Espiritual: A cada turno, um espírito fortalece um aliado aleatório (+2 em uma estatística por 1 turno)",
          active:
            "Ritual Ancestral (4 Mana) - CD: 4 turnos | Invoca 4 totens que duram 3 turnos (Cura, Dano, Defesa, Velocidade), cada um fornecendo +2 no atributo",
        },
      },
    ],
  };

  const maxStats = {
    hp: 10,
    mana: 10,
    attack: 9,
    defense: 9,
  };

  const statsDescriptions = {
    hp: "Pontos de Vida: Determina quanto dano o personagem pode receber antes de ser derrotado",
    mana: "Pontos de Mana: Recurso necessário para usar habilidades ativas",
    attack:
      "Pontos de Ataque: Define o dano base causado pelos ataques e habilidades",
    defense:
      "Pontos de Defesa: Reduz o dano recebido e melhora a sobrevivência",
  };

  function createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "character-card";

    const statsPercentage = {
      hp: (character.stats.hp / maxStats.hp) * 100,
      mana: (character.stats.mana / maxStats.mana) * 100,
      attack: (character.stats.attack / maxStats.attack) * 100,
      defense: (character.stats.defense / maxStats.defense) * 100,
    };

    card.innerHTML = `
      <div class="character-emoji">${character.emoji}</div>
      <div class="character-name">${character.name}</div>
      <div class="character-description">${character.description}</div>
      <div class="character-stats">
        <div class="stat-row">
          <div class="stat-icon tooltip">
            <span class="tooltip-text">${statsDescriptions.hp}</span>
            ❤️
          </div>
          <div class="stat-bar-container">
            <div class="stat-bar hp-bar" style="width: ${statsPercentage.hp}%"></div>
            <div class="stat-value">${character.stats.hp}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon tooltip">
            <span class="tooltip-text">${statsDescriptions.mana}</span>
            ⭐
          </div>
          <div class="stat-bar-container">
            <div class="stat-bar mana-bar" style="width: ${statsPercentage.mana}%"></div>
            <div class="stat-value">${character.stats.mana}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon tooltip">
            <span class="tooltip-text">${statsDescriptions.attack}</span>
            ⚔️
          </div>
          <div class="stat-bar-container">
            <div class="stat-bar attack-bar" style="width: ${statsPercentage.attack}%"></div>
            <div class="stat-value">${character.stats.attack}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon tooltip">
            <span class="tooltip-text">${statsDescriptions.defense}</span>
            🛡️
          </div>
          <div class="stat-bar-container">
            <div class="stat-bar defense-bar" style="width: ${statsPercentage.defense}%"></div>
            <div class="stat-value">${character.stats.defense}</div>
          </div>
        </div>
      </div>
      <div class="character-abilities">
        <div><strong>Passiva:</strong> ${character.abilities.passive}</div>
        <div><strong>Ativa:</strong> ${character.abilities.active}</div>
      </div>
    `;

    return card;
  }

  // Função para alternar seleção de personagem
  function toggleCharacterSelection(card, character) {
    const isSelected = card.classList.contains("selected");

    if (isSelected) {
      card.classList.remove("selected");
      selectedCharacters = selectedCharacters.filter(
        (c) => c.name !== character.name
      );
    } else if (selectedCharacters.length < maxTeamSize) {
      card.classList.add("selected");
      selectedCharacters.push(character);
    } else {
      alert("Seu time já está completo! (Máximo 7 personagens)");
      return;
    }

    updateTeamDisplay();
  }

  // Função para atualizar exibição do time
  function updateTeamDisplay() {
    const slots = selectedTeam.querySelectorAll(".team-slot");

    slots.forEach((slot, index) => {
      if (selectedCharacters[index]) {
        const char = selectedCharacters[index];
        slot.innerHTML = `
          <div class="character-emoji">${char.emoji}</div>
          <button class="remove-character" onclick="event.stopPropagation()">×</button>
          <span class="slot-number">${index + 1}</span>
        `;
        slot.classList.add("filled");

        // Adicionar evento de clique ao botão de remover
        const removeButton = slot.querySelector(".remove-character");
        removeButton.addEventListener("click", () => {
          selectedCharacters.splice(index, 1);
          const charCard = document.querySelector(
            `.character-card[data-name="${char.name}"]`
          );
          if (charCard) {
            charCard.classList.remove("selected");
          }
          updateTeamDisplay();
        });
      } else {
        slot.innerHTML = `<span class="slot-number">${index + 1}</span>`;
        slot.classList.remove("filled");
      }
    });

    // Atualizar estado do botão de confirmar
    confirmTeam.disabled = selectedCharacters.length === 0;
  }

  // Função para inicializar slots do time
  function initializeTeamSlots() {
    // Criar 7 slots iniciais
    for (let i = 1; i <= 7; i++) {
      const slot = document.createElement("div");
      slot.className = "team-slot";
      slot.innerHTML = `<span class="slot-number">${i}</span>`;
      selectedTeam.appendChild(slot);
    }
  }

  // Função para inicializar cards de personagens
  function initializeCharacterCards() {
    const allCharactersContainer = document.querySelector("#allCharacters");

    // Combinar todos os personagens em uma única array
    const allCharacters = Object.values(characters).flat();

    // Criar os cards para cada personagem
    allCharacters.forEach((char) => {
      const card = createCharacterCard(char);
      card.dataset.name = char.name;
      card.addEventListener("click", () =>
        toggleCharacterSelection(card, char)
      );
      allCharactersContainer.appendChild(card);
    });
  }

  function getCategoryTitle(category) {
    const titles = {
      melee: "Guerreiros Corpo a Corpo",
      ranged: "Atiradores de Longa Distância",
      magic: "Usuários de Magia",
      support: "Suporte e Cura",
    };
    return titles[category] || category;
  }

  // Event Listeners
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    characterSelection.classList.add("active");
  });

  // Função para iniciar o jogo após confirmar o time
  function startGame() {
    const characterSelectionScreen = document.querySelector(
      ".character-selection"
    );
    const gameScreen = document.querySelector(".game-screen");

    if (selectedCharacters.length > 0) {
      characterSelectionScreen.style.display = "none";
      gameScreen.classList.add("active");
      initializeBattle();
    } else {
      alert("Selecione pelo menos um personagem para seu time!");
    }
  }

  // Evento de clique no botão de confirmar time
  confirmTeam.addEventListener("click", startGame);

  // Função para criar elemento de personagem na batalha
  function createBattleCharacter(character) {
    const battleCharacter = document.createElement("div");
    battleCharacter.className = "battle-character";
    battleCharacter.dataset.name = character.name;

    battleCharacter.innerHTML = `
      <div class="character-emoji">${character.emoji}</div>
      <div class="character-name">${character.name}</div>
      <div class="character-stats">
        <div class="stat-row">
          <div class="hp-bar" style="width: 100%">❤️ ${character.stats.hp}</div>
        </div>
        <div class="stat-row">
          <div class="mana-bar" style="width: 100%">⭐ ${character.stats.mana}</div>
        </div>
      </div>
    `;

    return battleCharacter;
  }

  // Definição dos chefes
  const bosses = [
    {
      name: "Dragão Ancião",
      emoji: "🐲",
      description: "Um dragão milenar que domina os elementos.",
      stats: {
        hp: 20,
        mana: 15,
        attack: 12,
        defense: 10,
      },
      abilities: {
        passive: "Escamas de Adamantina: Reduz todo dano recebido em 20%",
        active:
          "Sopro do Dragão (4 Mana) - Causa dano massivo em área e aplica efeito baseado no elemento atual (Fogo: Queimadura, Gelo: Congelamento, Raio: Paralisia)",
      },
      phase: 1,
    },
    {
      name: "Lich",
      emoji: "💀",
      description:
        "Um poderoso feiticeiro que conquistou a imortalidade através de magia negra.",
      stats: {
        hp: 15,
        mana: 20,
        attack: 14,
        defense: 8,
      },
      abilities: {
        passive: "Phylacteria: Ao morrer, revive com 30% de HP uma vez",
        active:
          "Praga da Morte (5 Mana) - Causa dano a todos os heróis e drena sua mana",
      },
      phase: 2,
    },
    {
      name: "Golem Ancestral",
      emoji: "🗿",
      description:
        "Uma construção mágica gigante feita de pedra e cristais místicos.",
      stats: {
        hp: 25,
        mana: 10,
        attack: 8,
        defense: 15,
      },
      abilities: {
        passive: "Regeneração Cristalina: Recupera 2 HP por turno",
        active:
          "Terremoto (6 Mana) - Causa dano a todos os heróis e tem chance de atordoá-los",
      },
      phase: 3,
    },
    {
      name: "Hidra",
      emoji: "🐉",
      description: "Uma besta lendária com múltiplas cabeças que se regeneram.",
      stats: {
        hp: 18,
        mana: 12,
        attack: 15,
        defense: 9,
      },
      abilities: {
        passive:
          "Regeneração: Ao receber dano fatal, divide-se em duas cabeças menores",
        active:
          "Ataque Múltiplo (3 Mana) - Ataca três alvos diferentes com cada cabeça",
      },
      phase: 4,
    },
    {
      name: "Rei Demônio",
      emoji: "👿",
      description: "O senhor supremo dos demônios, com poder incomparável.",
      stats: {
        hp: 30,
        mana: 25,
        attack: 18,
        defense: 12,
      },
      abilities: {
        passive: "Aura Demoníaca: Reduz a cura recebida pelos heróis em 50%",
        active:
          "Apocalipse (8 Mana) - Causa dano massivo a todos os heróis e aplica diversos efeitos negativos",
      },
      phase: 5,
    },
  ];

  let currentBossIndex = 0;
  let currentBoss = null;

  // Modificar a função initializeBattle para trabalhar com chefes
  function initializeBattle() {
    const playerTeamArea = document.querySelector(".player-team");
    const enemyTeamArea = document.querySelector(".enemy-team");
    const turnInfo = document.querySelector(".turn-info");

    // Limpa as áreas de time
    playerTeamArea.innerHTML = "";
    enemyTeamArea.innerHTML = "";

    try {
      // Inicializa o time do jogador
      selectedCharacters.forEach((character) => {
        const battleCharacter = createBattleCharacter(character);
        playerTeamArea.appendChild(battleCharacter);
      });

      // Inicializa o chefe atual
      currentBoss = bosses[currentBossIndex];
      const bossCharacter = createBossCharacter(currentBoss);
      enemyTeamArea.appendChild(bossCharacter);

      // Atualiza informações do turno e fase
      turnInfo.textContent = `Fase ${currentBoss.phase} - ${currentBoss.name} - Turno 1`;

      // Adiciona listeners para os botões de ação
      setupActionButtons();
    } catch (error) {
      console.error("Erro ao inicializar batalha:", error);
    }
  }

  // Função para criar elemento do chefe na batalha
  function createBossCharacter(boss) {
    const bossElement = document.createElement("div");
    bossElement.className = "battle-character boss";
    bossElement.dataset.name = boss.name;

    const statsPercentage = {
      hp: (boss.stats.hp / 30) * 100, // 30 é o HP máximo dos chefes
      mana: (boss.stats.mana / 25) * 100, // 25 é a mana máxima dos chefes
    };

    bossElement.innerHTML = `
      <div class="character-emoji boss-emoji">${boss.emoji}</div>
      <div class="character-name boss-name">${boss.name}</div>
      <div class="boss-description">${boss.description}</div>
      <div class="character-stats">
        <div class="stat-row">
          <div class="hp-bar" style="width: ${statsPercentage.hp}%">❤️ ${boss.stats.hp}</div>
        </div>
        <div class="stat-row">
          <div class="mana-bar" style="width: ${statsPercentage.mana}%">⭐ ${boss.stats.mana}</div>
        </div>
      </div>
      <div class="boss-abilities">
        <div><strong>Passiva:</strong> ${boss.abilities.passive}</div>
        <div><strong>Ativa:</strong> ${boss.abilities.active}</div>
      </div>
    `;

    return bossElement;
  }

  // Função para avançar para o próximo chefe
  function nextBoss() {
    currentBossIndex++;
    if (currentBossIndex < bosses.length) {
      initializeBattle();
    } else {
      // Jogador venceu todos os chefes
      endGame(true);
    }
  }

  // Função para finalizar o jogo
  function endGame(victory) {
    const gameScreen = document.querySelector(".game-screen");
    const resultMessage = victory
      ? "Parabéns! Você derrotou todos os chefes!"
      : "Game Over! Seu time foi derrotado!";

    gameScreen.innerHTML = `
      <div class="game-over">
        <h2>${resultMessage}</h2>
        <button onclick="location.reload()">Jogar Novamente</button>
      </div>
    `;
  }

  // Função para configurar os botões de ação
  function setupActionButtons() {
    const actionButtons = document.querySelectorAll(".action-button");

    actionButtons.forEach((button) => {
      const action = button.id.replace("Button", "").toLowerCase();
      button.dataset.action = action;

      button.addEventListener("click", (e) => {
        const actionType = e.target.dataset.action;
        handleAction(actionType);
      });
    });
  }

  // Função para lidar com as ações do jogador
  function handleAction(action) {
    switch (action) {
      case "attack":
        // Implementar lógica de ataque
        console.log("Ataque selecionado");
        break;
      case "skill":
        // Implementar lógica de habilidade
        console.log("Habilidade selecionada");
        break;
      case "pass":
        // Implementar lógica de passar turno
        console.log("Turno passado");
        break;
    }
  }

  // Inicializar a tela de seleção
  initializeTeamSlots();
  initializeCharacterCards();
});

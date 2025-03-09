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
          attack: 4,
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
          attack: 5,
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
          attack: 3,
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
          attack: 3,
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
          attack: 4,
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
          attack: 4,
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
          attack: 5,
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
          attack: 4,
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
          attack: 5,
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
          attack: 6,
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
          attack: 5,
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
          attack: 4,
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
          attack: 3,
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
          attack: 3,
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
          attack: 2,
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
          attack: 3,
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
    attack: 6,
  };

  const statsDescriptions = {
    hp: "Pontos de Vida: Determina quanto dano o personagem pode receber antes de ser derrotado",
    mana: "Pontos de Mana: Recurso necessário para usar habilidades ativas",
    attack:
      "Pontos de Ataque: Define o dano base causado pelos ataques e habilidades",
  };

  function createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "character-card";

    const statsPercentage = {
      hp: (character.stats.hp / maxStats.hp) * 100,
      mana: (character.stats.mana / maxStats.mana) * 100,
      attack: (character.stats.attack / maxStats.attack) * 100,
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

    const statsPercentage = {
      hp: (character.stats.hp / maxStats.hp) * 100,
      mana: (character.stats.mana / maxStats.mana) * 100,
      attack: (character.stats.attack / maxStats.attack) * 100,
    };

    battleCharacter.innerHTML = `
      <div class="character-emoji">${character.emoji}</div>
      <div class="character-name">${character.name}</div>
      <div class="character-stats">
        <div class="stat-row">
          <div class="stat-icon">❤️</div>
          <div class="stat-bar-container">
            <div class="hp-bar" style="width: ${statsPercentage.hp}%"></div>
            <div class="stat-value">${character.stats.hp}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon">⭐</div>
          <div class="stat-bar-container">
            <div class="mana-bar" style="width: ${statsPercentage.mana}%"></div>
            <div class="stat-value">${character.stats.mana}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon">⚔️</div>
          <div class="stat-bar-container">
            <div class="attack-bar" style="width: ${statsPercentage.attack}%"></div>
            <div class="stat-value">${character.stats.attack}</div>
          </div>
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
        attack: 5,
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
        attack: 6,
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
        attack: 4,
      },
      phase: 3,
    },
    {
      name: "Hidra",
      emoji: "🐉",
      description: "Uma besta lendária com múltiplas cabeças que se regeneram.",
      stats: {
        hp: 18,
        attack: 7,
      },
      phase: 4,
    },
    {
      name: "Rei Demônio",
      emoji: "👿",
      description: "O senhor supremo dos demônios, com poder incomparável.",
      stats: {
        hp: 30,
        attack: 8,
      },
      phase: 5,
    },
  ];

  let currentBossIndex = 0;
  let currentBoss = null;
  let currentTurn = 1;
  let currentCharacterIndex = 0;
  let teamActionsCompleted = false;

  // Função para inicializar a batalha
  function initializeBattle() {
    const playerTeamArea = document.querySelector(".player-team");
    const enemyTeamArea = document.querySelector(".enemy-team");
    const turnInfo = document.querySelector(".turn-info");

    // Limpa as áreas de time
    playerTeamArea.innerHTML = "";
    enemyTeamArea.innerHTML = "";

    try {
      // Reseta variáveis de controle de turno
      currentCharacterIndex = 0;
      teamActionsCompleted = false;
      currentTurn = 1;

      // Inicializa o time do jogador
      selectedCharacters.forEach((character) => {
        const battleCharacter = createBattleCharacter(character);
        battleCharacter.dataset.acted = "false";
        playerTeamArea.appendChild(battleCharacter);

        // Se o personagem estava morto, mantém o estado visual de derrota
        if (character.stats.hp <= 0) {
          battleCharacter.classList.add("defeated");
          battleCharacter.style.filter = "grayscale(100%) brightness(50%)";
          battleCharacter.style.opacity = "0.7";
          battleCharacter.style.position = "relative";

          // Adiciona o ícone de morte
          const deathMark = document.createElement("div");
          deathMark.className = "death-mark";
          deathMark.innerHTML = "☠️";
          deathMark.style.position = "absolute";
          deathMark.style.top = "50%";
          deathMark.style.left = "50%";
          deathMark.style.transform = "translate(-50%, -50%)";
          deathMark.style.fontSize = "2em";
          deathMark.style.zIndex = "10";
          battleCharacter.appendChild(deathMark);
        }
      });

      // Ajusta o HP do chefe baseado no número de membros VIVOS do time
      currentBoss = JSON.parse(JSON.stringify(bosses[currentBossIndex])); // Cria uma cópia profunda do chefe
      const livingTeamSize = selectedCharacters.filter(
        (char) => char.stats.hp > 0
      ).length;
      const baseHP = currentBoss.stats.hp;

      // Fórmula de ajuste: HP base + (HP base * 0.75) por membro vivo adicional do time
      currentBoss.stats.hp = Math.floor(
        baseHP * (1 + (livingTeamSize - 1) * 0.75)
      );

      // Cria o elemento do chefe com o HP ajustado
      const bossCharacter = createBossCharacter(currentBoss);
      enemyTeamArea.appendChild(bossCharacter);

      // Atualiza informações do turno e fase
      updateTurnInfo();

      // Adiciona listeners para os botões de ação
      setupActionButtons();

      // Destaca o personagem atual
      highlightCurrentCharacter();
    } catch (error) {
      console.error("Erro ao inicializar batalha:", error);
    }
  }

  function updateTurnInfo() {
    const turnInfo = document.querySelector(".turn-info");
    if (!teamActionsCompleted) {
      const currentCharacter = selectedCharacters[currentCharacterIndex];
      if (currentCharacter && currentCharacter.stats.hp > 0) {
        turnInfo.textContent = `Fase ${currentBoss.phase} - ${currentBoss.name} - Turno ${currentTurn} - Vez de ${currentCharacter.name}`;
      } else {
        // Se por algum motivo não houver personagem válido, avança para o próximo
        nextCharacterTurn();
      }
    } else {
      turnInfo.textContent = `Fase ${currentBoss.phase} - ${currentBoss.name} - Turno ${currentTurn} - Vez do Chefe`;
    }
  }

  function highlightCurrentCharacter() {
    // Remove highlight de todos os personagens
    document.querySelectorAll(".battle-character").forEach((char) => {
      char.classList.remove("active");
    });

    if (!teamActionsCompleted) {
      // Destaca o personagem atual
      const characters = document.querySelectorAll(
        ".player-team .battle-character"
      );
      characters[currentCharacterIndex]?.classList.add("active");
    } else {
      // Destaca o chefe quando for sua vez
      document
        .querySelector(".enemy-team .battle-character")
        ?.classList.add("active");
    }
  }

  // Função para criar elemento do chefe na batalha
  function createBossCharacter(boss) {
    const bossElement = document.createElement("div");
    bossElement.className = "battle-character boss";
    bossElement.dataset.name = boss.name;

    const statsPercentage = {
      hp: (boss.stats.hp / 30) * 100, // 30 é o HP máximo dos chefes
      attack: (boss.stats.attack / 18) * 100, // 18 é o ataque máximo dos chefes
    };

    bossElement.innerHTML = `
      <div class="character-emoji boss-emoji">${boss.emoji}</div>
      <div class="character-name boss-name">${boss.name}</div>
      <div class="boss-description">${boss.description}</div>
      <div class="character-stats boss-stats">
        <div class="stat-row">
          <div class="stat-icon">❤️</div>
          <div class="stat-bar-container">
            <div class="hp-bar" style="width: ${statsPercentage.hp}%"></div>
            <div class="stat-value">${boss.stats.hp}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon">⚔️</div>
          <div class="stat-bar-container">
            <div class="attack-bar" style="width: ${statsPercentage.attack}%"></div>
            <div class="stat-value">${boss.stats.attack}</div>
          </div>
        </div>
      </div>
    `;

    return bossElement;
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

    // Atualiza o estado inicial dos botões
    updateActionButtonsState();
  }

  // Função para atualizar o estado dos botões de ação
  function updateActionButtonsState() {
    const actionButtons = document.querySelectorAll(".action-button");
    actionButtons.forEach((button) => {
      button.disabled = teamActionsCompleted;
      button.style.opacity = teamActionsCompleted ? "0.5" : "1";
    });
  }

  // Função para lidar com as ações do jogador
  function handleAction(action) {
    if (teamActionsCompleted) return; // Impede ações durante o turno do chefe

    const currentCharacter = selectedCharacters[currentCharacterIndex];

    switch (action) {
      case "attack":
        performAttack(currentCharacter);
        break;
      case "skill":
        performSkill(currentCharacter);
        break;
      case "pass":
        nextCharacterTurn();
        break;
    }
  }

  function performAttack(character) {
    // Calcula o dano baseado no ataque do personagem
    const damage = character.stats.attack;

    // Subtrai o dano do HP do chefe
    currentBoss.stats.hp = Math.max(0, currentBoss.stats.hp - damage);

    // Atualiza a exibição do HP do chefe na barra
    const bossElement = document.querySelector(".enemy-team .battle-character");
    const hpBar = bossElement.querySelector(".stat-bar-container .hp-bar");
    const hpValue = bossElement.querySelector(
      ".stat-bar-container .stat-value"
    );

    const maxBossHp = bosses[currentBossIndex].stats.hp;
    const percentage = (currentBoss.stats.hp / maxBossHp) * 100;
    hpBar.style.width = `${Math.max(0, percentage)}%`;
    hpValue.textContent = Math.max(0, currentBoss.stats.hp);

    // Exibe mensagem de ataque
    showBattleMessage(
      `${character.name} atacou ${currentBoss.name} causando ${damage} de dano!`
    );

    // Verifica se o chefe foi derrotado
    if (currentBoss.stats.hp <= 0) {
      showBattleMessage(`${currentBoss.name} foi derrotado!`);
      setTimeout(() => {
        currentBossIndex++;
        if (currentBossIndex < bosses.length) {
          initializeBattle();
        } else {
          endGame(true);
        }
      }, 1500);
      return;
    }

    // Passa para o próximo personagem
    currentCharacterIndex++;

    // Se todos os personagens agiram, inicia o turno do chefe
    if (currentCharacterIndex >= selectedCharacters.length) {
      teamActionsCompleted = true;
      setTimeout(() => {
        executeBossTurn();
      }, 1000);
    }

    // Atualiza a interface
    updateTurnInfo();
    highlightCurrentCharacter();
  }

  function performSkill(character) {
    if (character.stats.mana < 2) {
      showBattleMessage(`${character.name} não tem mana suficiente!`);
      return;
    }

    // Consome mana e causa dano aumentado
    character.stats.mana -= 2;
    const damage = Math.floor(character.stats.attack * 1.5);
    currentBoss.stats.hp -= damage;

    // Atualiza a exibição
    updateBossHP();
    updateCharacterMana(character);

    showBattleMessage(
      `${character.name} usou uma habilidade e causou ${damage} de dano ao ${currentBoss.name}!`
    );

    if (currentBoss.stats.hp <= 0) {
      handleBossDefeat();
      return;
    }

    nextCharacterTurn();
  }

  function findNextLiveCharacter(startIndex) {
    for (let i = startIndex; i < selectedCharacters.length; i++) {
      if (selectedCharacters[i].stats.hp > 0) {
        return i;
      }
    }
    return -1; // Retorna -1 se não encontrar nenhum personagem vivo
  }

  function nextCharacterTurn() {
    currentCharacterIndex++;

    // Procura o próximo personagem vivo
    const nextLiveIndex = findNextLiveCharacter(currentCharacterIndex);

    if (nextLiveIndex === -1) {
      // Se não houver mais personagens vivos, inicia o turno do chefe
      teamActionsCompleted = true;
      // Atualiza o estado dos botões quando o turno do chefe começa
      updateActionButtonsState();
      setTimeout(executeBossTurn, 1000);
    } else {
      // Se encontrou um personagem vivo, atualiza o índice
      currentCharacterIndex = nextLiveIndex;
    }

    updateTurnInfo();
    highlightCurrentCharacter();
  }

  function startNewTurn() {
    // Procura o primeiro personagem vivo para começar o turno
    const firstLiveIndex = findNextLiveCharacter(0);

    if (firstLiveIndex === -1) {
      // Se não houver personagens vivos, fim de jogo
      endGame(false);
      return;
    }

    currentCharacterIndex = firstLiveIndex;
    teamActionsCompleted = false;
    currentTurn++;

    // Atualiza o estado dos botões no início do novo turno
    updateActionButtonsState();

    // Atualiza visualmente todos os personagens
    selectedCharacters.forEach((char) => {
      if (char.stats.hp <= 0) {
        updateCharacterVisuals(char);
      }
    });

    updateTurnInfo();
    highlightCurrentCharacter();
  }

  function showBattleMessage(message) {
    const messageArea =
      document.querySelector(".battle-messages") || createBattleMessageArea();
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageArea.appendChild(messageElement);

    // Remove mensagens antigas se houver muitas
    while (messageArea.children.length > 3) {
      messageArea.removeChild(messageArea.firstChild);
    }
  }

  function createBattleMessageArea() {
    const messageArea = document.createElement("div");
    messageArea.className = "battle-messages";
    document.querySelector(".game-screen").appendChild(messageArea);
    return messageArea;
  }

  function updateBossHP() {
    const bossElement = document.querySelector(".enemy-team .battle-character");
    const hpBar = bossElement.querySelector(".hp-bar");
    const hpValue = bossElement.querySelector(".stat-value");

    // Usa o HP atual do chefe em vez do HP base da definição
    const maxBossHp = currentBoss.stats.hp;
    const percentage = (currentBoss.stats.hp / maxBossHp) * 100;
    hpBar.style.width = `${Math.max(0, percentage)}%`;
    hpValue.textContent = Math.max(0, currentBoss.stats.hp);
  }

  function updateCharacterHP(character) {
    const charElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    const hpBar = charElement.querySelector(".hp-bar");
    const hpValue = charElement.querySelector(".stat-value");
    const percentage = (character.stats.hp / maxStats.hp) * 100;
    hpBar.style.width = `${Math.max(0, percentage)}%`;
    hpValue.textContent = character.stats.hp;
  }

  function updateCharacterMana(character) {
    const charElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    const manaBar = charElement.querySelector(".mana-bar");
    const manaValue = manaBar.parentElement.querySelector(".stat-value");
    const percentage = (character.stats.mana / maxStats.mana) * 100;
    manaBar.style.width = `${Math.max(0, percentage)}%`;
    manaValue.textContent = character.stats.mana;
  }

  function handleCharacterDefeat(character, showMessage = true) {
    if (showMessage) {
      showBattleMessage(`${character.name} foi derrotado!`);
    }

    // Marca o personagem como derrotado visualmente
    const charElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    charElement.classList.add("defeated");
    charElement.style.filter = "grayscale(100%) brightness(50%)";
    charElement.style.opacity = "0.7";

    // Adiciona um ícone de morte sobre o personagem
    const deathMark = document.createElement("div");
    deathMark.className = "death-mark";
    deathMark.innerHTML = "☠️";
    deathMark.style.position = "absolute";
    deathMark.style.top = "50%";
    deathMark.style.left = "50%";
    deathMark.style.transform = "translate(-50%, -50%)";
    deathMark.style.fontSize = "2em";
    deathMark.style.zIndex = "10";
    charElement.style.position = "relative";
    charElement.appendChild(deathMark);

    // Verifica se ainda há personagens vivos
    const livingCharacters = selectedCharacters.filter(
      (char) => char.stats.hp > 0
    );

    if (livingCharacters.length === 0) {
      setTimeout(() => endGame(false), 1500);
    } else {
      setTimeout(startNewTurn, 1000);
    }
  }

  function updateCharacterVisuals(character) {
    const charElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );

    if (
      character.stats.hp <= 0 &&
      !charElement.classList.contains("defeated")
    ) {
      handleCharacterDefeat(character, false);
    }
  }

  // Atualiza a função que lida com o dano do chefe
  function executeBossTurn() {
    // Atualiza o estado dos botões no início do turno do chefe
    updateActionButtonsState();

    // Filtra apenas personagens vivos
    const liveCharacters = selectedCharacters.filter(
      (char) => char.stats.hp > 0
    );

    if (liveCharacters.length === 0) {
      endGame(false);
      return;
    }

    // Chefe ataca um personagem vivo aleatório
    const targetIndex = Math.floor(Math.random() * liveCharacters.length);
    const target = liveCharacters[targetIndex];
    const damage = currentBoss.stats.attack;

    // Aplica o dano ao personagem
    target.stats.hp = Math.max(0, target.stats.hp - damage);

    // Atualiza o HP do personagem na interface
    updateCharacterHP(target);
    updateCharacterVisuals(target);

    showBattleMessage(
      `${currentBoss.name} atacou ${target.name} causando ${damage} de dano!`
    );

    // Verifica se o personagem foi derrotado
    if (target.stats.hp <= 0) {
      handleCharacterDefeat(target);
      return;
    }

    // Inicia novo turno após 1 segundo
    setTimeout(() => {
      startNewTurn();
    }, 1000);
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

  // Inicializar a tela de seleção
  initializeTeamSlots();
  initializeCharacterCards();
});

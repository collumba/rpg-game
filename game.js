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
        stats: { hp: 8, mana: 4, attack: 4 },
        abilities: {
          passive:
            "Guardião Resoluto: Tem chance de negar o ataque do chefe (20%).",
          active:
            "Escudo Protetor: Cria um escudo que protege um aliado de um ataque (2 Mana).",
        },
      },
      {
        name: "Berserker",
        emoji: "🔥🪓",
        description:
          "Ataque brutal, baixa defesa, sacrifica vida por dano extra.",
        stats: { hp: 7, mana: 3, attack: 5 },
        abilities: {
          passive:
            "Fúria Incontrolável: Ganha pontos de ataque ao ser atacado (10% de chance).",
          active:
            "Sede de Sangue: Troca vida por bônus de dano na próxima rodada (+50% dano, -2 HP, 1 Mana).",
        },
      },
      {
        name: "Cavaleiro",
        emoji: "🏇⚔️",
        description: "Tanque com armadura pesada, proteção para aliados.",
        stats: { hp: 10, mana: 5, attack: 3 },
        abilities: {
          passive:
            "Sacrifício Honrado: Tem chance de tomar o ataque do chefe no lugar de um aliado (25%).",
          active:
            "Defesa Compartilhada: Divide o ataque do chefe entre ele e o próximo aliado atingido (3 Mana).",
        },
      },
      {
        name: "Paladino",
        emoji: "✨⚔️",
        description: "Guerreiro sagrado, combina dano com cura e buffs.",
        stats: { hp: 8, mana: 6, attack: 3 },
        abilities: {
          passive:
            "Bênção Divina: Tem chance de curar um aliado ao receber dano (15% de chance, +2 HP).",
          active:
            "Milagre da Luz: Revive um aliado morto com 50% da vida (5 Mana).",
        },
      },
      {
        name: "Ladrão",
        emoji: "🏹🗡️",
        description:
          "Rápido, furtivo, especialista em golpes críticos e evasão.",
        stats: { hp: 6, mana: 4, attack: 4 },
        abilities: {
          passive:
            "Golpe Sorrateiro: Tem chance de atacar em conjunto com um aliado (20%).",
          active:
            "Veneno Debilitante: Diminui o ataque do chefe por uma rodada (2 Mana).",
        },
      },
      {
        name: "Monge",
        emoji: "🥋✊",
        description: "Lutador sem armas ou com bastões, resistência elevada.",
        stats: { hp: 7, mana: 5, attack: 4 },
        abilities: {
          passive:
            "Mente Tranquila: Tem chance de negar um ataque do chefe (15%).",
          active:
            "Equilíbrio Vital: Troca pontos de vida com um aliado (3 Mana).",
        },
      },
    ],
    ranged: [
      {
        name: "Arqueiro",
        emoji: "🏹",
        description: "Especialista em combate à distância com alta precisão.",
        stats: { hp: 5, mana: 4, attack: 5 },
        abilities: {
          passive:
            "Disparo Sincronizado: Tem chance de atacar em conjunto com um aliado (15%).",
          active:
            "Tiro Preciso: Duplica o dano de um aliado na próxima rodada (3 Mana).",
        },
      },
      {
        name: "Caçador",
        emoji: "🐺🏹",
        description: "Domina bestas e armadilhas, bom em combate na natureza.",
        stats: { hp: 6, mana: 5, attack: 4 },
        abilities: {
          passive:
            "Instinto Selvagem: Tem chance de ganhar pontos de ataque ao ser atacado (10%).",
          active:
            "Armadilha Espiritual: Impede que o chefe ataque na próxima rodada (4 Mana).",
        },
      },
      {
        name: "Mosqueteiro",
        emoji: "🔫",
        description:
          "Mistura de arqueiro e guerreiro com armas de fogo rudimentares.",
        stats: { hp: 6, mana: 4, attack: 5 },
        abilities: {
          passive:
            "Tática Estratégica: Tem chance de aumentar o ataque de um aliado quando atacado (15%).",
          active:
            "Disparo Coordenado: Ataque em conjunto com um aliado (2 Mana).",
        },
      },
    ],
    magic: [
      {
        name: "Mago",
        emoji: "🔥❄️ ",
        description:
          "Mestre dos elementos, ataques devastadores de longo alcance.",
        stats: { hp: 5, mana: 10, attack: 6 },
        abilities: {
          passive:
            "Potencial Arcano: Tem chance de aumentar o ataque de um aliado quando atacado (15%).",
          active:
            "Explosão Mágica: Duplica o dano de um aliado por uma rodada (5 Mana).",
        },
      },
      {
        name: "Necromante",
        emoji: "☠️🖤",
        description: "Controla mortos-vivos e magias sombrias.",
        stats: { hp: 5, mana: 9, attack: 4 },
        abilities: {
          passive:
            "Ritual Sombrio: Tem chance de curar um aliado quando recebe dano (10%).",
          active:
            "Chamado dos Mortos: Revive um aliado morto com 25% da vida (4 Mana).",
        },
      },
    ],
    support: [
      {
        name: "Clérigo",
        emoji: "⛪⚕️",
        description: "Cura e protege aliados com magia sagrada.",
        stats: { hp: 6, mana: 9, attack: 2 },
        abilities: {
          passive:
            "Mãos Abençoadas: Tem chance de curar um aliado ao ser atacado (20%).",
          active:
            "Luz Restauradora: Cura um aliado em troca de mana (+5 HP, 3 Mana).",
        },
      },
      {
        name: "Xamã",
        emoji: "🌪️🌀",
        description: "Usa espíritos e magia ancestral para fortalecer aliados.",
        stats: { hp: 6, mana: 8, attack: 3 },
        abilities: {
          passive:
            "Espírito Guerreiro: Tem chance de aumentar o ataque de um aliado ao ser atacado (15%).",
          active:
            "Proteção Ancestral: Cria um escudo de proteção para um aliado (absorve um ataque, 3 Mana).",
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

    // Adiciona maxStats ao personagem se não existir
    if (!character.stats.maxHp) character.stats.maxHp = character.stats.hp;
    if (!character.stats.maxMana)
      character.stats.maxMana = character.stats.mana;
    if (!character.stats.maxAttack)
      character.stats.maxAttack = character.stats.attack;

    const statsPercentage = {
      hp: (character.stats.hp / character.stats.maxHp) * 100,
      mana: (character.stats.mana / character.stats.maxMana) * 100,
      attack: (character.stats.attack / character.stats.maxAttack) * 100,
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
            <div class="stat-value">${character.stats.hp}/${character.stats.maxHp}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon tooltip">
            <span class="tooltip-text">${statsDescriptions.mana}</span>
            🧪
          </div>
          <div class="stat-bar-container">
            <div class="stat-bar mana-bar" style="width: ${statsPercentage.mana}%"></div>
            <div class="stat-value">${character.stats.mana}/${character.stats.maxMana}</div>
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

    // Garante que os valores máximos existam
    if (!character.stats.maxHp) character.stats.maxHp = character.stats.hp;
    if (!character.stats.maxMana)
      character.stats.maxMana = character.stats.mana;
    if (!character.stats.maxAttack)
      character.stats.maxAttack = character.stats.attack;

    const statsPercentage = {
      hp: (character.stats.hp / character.stats.maxHp) * 100,
      mana: (character.stats.mana / character.stats.maxMana) * 100,
      attack: (character.stats.attack / character.stats.maxAttack) * 100,
    };

    battleCharacter.innerHTML = `
      <div class="attack-display">
        <div class="stat-icon">⚔️</div>
        <span>${character.stats.attack}</span>
      </div>
      <div class="character-emoji">${character.emoji}</div>
      <div class="character-name">${character.name}</div>
      <div class="character-stats">
        <div class="stat-row">
          <div class="stat-icon">❤️</div>
          <div class="stat-bar-container">
            <div class="hp-bar" style="width: ${statsPercentage.hp}%"></div>
            <div class="stat-value">${character.stats.hp}/${character.stats.maxHp}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-icon">🧪</div>
          <div class="stat-bar-container">
            <div class="mana-bar" style="width: ${statsPercentage.mana}%"></div>
            <div class="stat-value">${character.stats.mana}/${character.stats.maxMana}</div>
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
      // Cria a área de mensagens e mostra a mensagem inicial
      const messageArea =
        document.querySelector(".battle-messages") || createBattleMessageArea();
      showBattleMessage("Início da batalha!", "system");

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

      // Inicializa o novo chefe
      initializeNewBoss();

      // Cria a área de ações se ainda não existir
      let actionArea = document.querySelector(".action-area");
      if (!actionArea) {
        actionArea = document.createElement("div");
        actionArea.className = "action-area";
        actionArea.innerHTML = `
          <div class="abilities-display"></div>
          <div class="action-buttons">
            <button id="attackButton" class="action-button">Atacar</button>
            <button id="skillButton" class="action-button">Usar Habilidade</button>
            <button id="passButton" class="action-button">Passar</button>
          </div>
        `;
        document.querySelector(".game-screen").appendChild(actionArea);
      }

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

  // Nova função para inicializar o chefe
  function initializeNewBoss() {
    const enemyTeamArea = document.querySelector(".enemy-team");

    // Cria uma cópia profunda do chefe atual
    currentBoss = JSON.parse(JSON.stringify(bosses[currentBossIndex]));

    // Calcula o HP base do chefe
    const livingTeamSize = selectedCharacters.filter(
      (char) => char.stats.hp > 0
    ).length;
    const baseHP = currentBoss.stats.hp;

    // Define o HP máximo do chefe
    currentBoss.stats.maxHp = Math.floor(
      baseHP * (1 + (livingTeamSize - 1) * 0.75)
    );
    currentBoss.stats.hp = currentBoss.stats.maxHp; // Define o HP atual igual ao máximo

    // Cria e adiciona o elemento do chefe à área
    const bossCharacter = createBossCharacter(currentBoss);
    enemyTeamArea.appendChild(bossCharacter);
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
      hp: (boss.stats.hp / boss.stats.maxHp) * 100,
      attack: (boss.stats.attack / 18) * 100, // 18 é o ataque máximo dos chefes
    };

    bossElement.innerHTML = `
      <div class="attack-display boss-attack">
        <div class="stat-icon">⚔️</div>
        <span>${boss.stats.attack}</span>
      </div>
      <div class="character-emoji boss-emoji">${boss.emoji}</div>
      <div class="character-name boss-name">${boss.name}</div>
      <div class="boss-description">${boss.description}</div>
      <div class="character-stats boss-stats">
        <div class="stat-row">
          <div class="stat-icon">❤️</div>
          <div class="stat-bar-container">
            <div class="hp-bar" style="width: ${statsPercentage.hp}%"></div>
            <div class="stat-value">${boss.stats.hp}/${boss.stats.maxHp}</div>
          </div>
        </div>
      </div>
    `;

    return bossElement;
  }

  // Função para configurar os botões de ação
  function setupActionButtons() {
    const actionArea = document.querySelector(".action-area");

    // Criar área de habilidades
    const abilitiesDisplay = document.createElement("div");
    abilitiesDisplay.className = "abilities-display";
    actionArea.insertBefore(abilitiesDisplay, actionArea.firstChild);

    const actionButtons = document.querySelectorAll(".action-button");
    actionButtons.forEach((button) => {
      const action = button.id.replace("Button", "").toLowerCase();
      button.dataset.action = action;

      button.addEventListener("click", (e) => {
        const actionType = e.target.dataset.action;
        handleAction(actionType);
      });
    });

    updateActionButtonsState();
    updateAbilitiesDisplay();
  }

  function updateAbilitiesDisplay() {
    const abilitiesDisplay = document.querySelector(".abilities-display");
    const currentCharacter = selectedCharacters[currentCharacterIndex];

    if (!currentCharacter || teamActionsCompleted) {
      abilitiesDisplay.innerHTML = "";
      return;
    }

    abilitiesDisplay.innerHTML = `
      <div class="ability-item passive">
        <strong>Passiva:</strong> ${currentCharacter.abilities.passive}
      </div>
      <div class="ability-item active">
        <strong>Ativa:</strong> ${currentCharacter.abilities.active}
      </div>
    `;
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

  function showDamageNumber(target, damage, type = "normal") {
    const targetElement = document.querySelector(
      `.battle-character[data-name="${target.name}"]`
    );
    const damageNumber = document.createElement("div");
    damageNumber.className = `damage-number ${type}`;

    // Adiciona um + para dano de cura (se implementarmos no futuro)
    const displayNumber = damage < 0 ? damage : damage;
    damageNumber.textContent = Math.abs(displayNumber);

    // Posiciona o número de dano em posições ligeiramente diferentes para cada hit
    const randomX = Math.random() * 60 - 30;
    const randomY = Math.random() * 20 - 10;
    damageNumber.style.left = `calc(50% + ${randomX}px)`;
    damageNumber.style.top = `calc(50% + ${randomY}px)`;

    targetElement.appendChild(damageNumber);

    // Remove o elemento após a animação
    setTimeout(() => {
      damageNumber.remove();
    }, 1200);
  }

  function performAttack(character) {
    if (character.stats.hp <= 0 || teamActionsCompleted) return;

    const damage = character.stats.attack;
    const characterElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    const bossElement = document.querySelector(".enemy-team .battle-character");

    // Marca o personagem como tendo agido
    characterElement.dataset.acted = "true";

    // Inicia a animação de ataque
    characterElement.classList.add("attacking");

    setTimeout(() => {
      // Aplica o dano uma única vez
      const newHP = Math.max(0, currentBoss.stats.hp - damage);
      currentBoss.stats.hp = newHP;

      bossElement.classList.add("taking-damage");
      showDamageNumber(currentBoss, damage, "normal");

      // Atualiza a barra de HP
      updateBossHP();

      // Remove as classes de animação
      setTimeout(() => {
        characterElement.classList.remove("attacking");
        bossElement.classList.remove("taking-damage");
      }, 500);

      // Exibe mensagem de ataque
      showBattleMessage(
        `${character.name} atacou ${currentBoss.name} causando ${damage} de dano!`,
        "team"
      );

      // Verifica se o chefe foi derrotado
      if (currentBoss.stats.hp <= 0) {
        showBattleMessage(`${currentBoss.name} foi derrotado!`, "system");
        setTimeout(() => {
          transitionToNextPhase();
        }, 1500);
        return;
      }

      nextCharacterTurn();
    }, 250);
  }

  function performSkill(character) {
    if (character.stats.hp <= 0 || teamActionsCompleted) return;
    if (character.stats.mana < 2) {
      showBattleMessage(`${character.name} não tem mana suficiente!`);
      return;
    }

    const characterElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    const bossElement = document.querySelector(".enemy-team .battle-character");

    // Marca o personagem como tendo agido
    characterElement.dataset.acted = "true";

    // Inicia a animação de habilidade
    characterElement.classList.add("using-skill");

    setTimeout(() => {
      // Consome mana e causa dano aumentado
      character.stats.mana -= 2;
      const damage = Math.floor(character.stats.attack * 1.5);

      // Aplica o dano uma única vez
      const newHP = Math.max(0, currentBoss.stats.hp - damage);
      currentBoss.stats.hp = newHP;

      // Aplica efeito visual de dano
      bossElement.classList.add("taking-damage");
      showDamageNumber(currentBoss, damage, "skill");

      // Atualiza a exibição
      updateBossHP();
      updateCharacterMana(character);

      // Remove as classes de animação
      setTimeout(() => {
        characterElement.classList.remove("using-skill");
        bossElement.classList.remove("taking-damage");
      }, 500);

      showBattleMessage(
        `${character.name} usou uma habilidade e causou ${damage} de dano ao ${currentBoss.name}!`,
        "team"
      );

      if (currentBoss.stats.hp <= 0) {
        showBattleMessage(`${currentBoss.name} foi derrotado!`, "system");
        setTimeout(() => {
          transitionToNextPhase();
        }, 1500);
        return;
      }

      nextCharacterTurn();
    }, 400);
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
    // Marca o personagem atual como tendo agido
    const currentCharElement = document.querySelector(
      `.battle-character[data-name="${selectedCharacters[currentCharacterIndex].name}"]`
    );
    if (currentCharElement) {
      currentCharElement.dataset.acted = "true";
    }

    let nextIndex = currentCharacterIndex + 1;
    let foundNextCharacter = false;

    // Procura o próximo personagem vivo que ainda não agiu
    while (nextIndex < selectedCharacters.length) {
      if (selectedCharacters[nextIndex].stats.hp > 0) {
        const nextCharElement = document.querySelector(
          `.battle-character[data-name="${selectedCharacters[nextIndex].name}"]`
        );
        if (nextCharElement && nextCharElement.dataset.acted !== "true") {
          foundNextCharacter = true;
          break;
        }
      }
      nextIndex++;
    }

    if (!foundNextCharacter) {
      // Se não encontrou próximo personagem vivo que não agiu, inicia turno do chefe
      teamActionsCompleted = true;
      updateActionButtonsState();
      updateAbilitiesDisplay();
      setTimeout(executeBossTurn, 1000);
    } else {
      currentCharacterIndex = nextIndex;
      updateTurnInfo();
      highlightCurrentCharacter();
      updateAbilitiesDisplay();
    }
  }

  function startNewTurn() {
    // Procura o primeiro personagem vivo para começar o turno
    const firstLiveIndex = findNextLiveCharacter(0);

    if (firstLiveIndex === -1) {
      // Se não houver personagens vivos, fim de jogo
      endGame(false);
      return;
    }

    // Reset do estado do turno
    currentCharacterIndex = firstLiveIndex;
    teamActionsCompleted = false;
    currentTurn++;

    // Reseta o estado de ação para todos os personagens
    document
      .querySelectorAll(".player-team .battle-character")
      .forEach((char) => {
        char.dataset.acted = "false";
      });

    // Atualiza o estado dos botões no início do novo turno
    updateActionButtonsState();
    updateAbilitiesDisplay();

    // Atualiza visualmente todos os personagens
    selectedCharacters.forEach((char) => {
      if (char.stats.hp <= 0) {
        updateCharacterVisuals(char);
      }
    });

    showBattleMessage(`Turno ${currentTurn} começou!`, "system");
    updateTurnInfo();
    highlightCurrentCharacter();
  }

  function showBattleMessage(message, type = "system") {
    const messageArea =
      document.querySelector(".battle-messages") || createBattleMessageArea();
    const messageElement = document.createElement("div");
    messageElement.className = `battle-message ${type}`;

    // Adiciona ícone baseado no tipo de mensagem
    let icon = "";
    switch (type) {
      case "team":
        icon = "👥";
        break;
      case "boss":
        icon = "👿";
        break;
      case "system":
        icon = "🔔";
        break;
    }

    messageElement.innerHTML = `<span class="message-icon">${icon}</span> ${message}`;
    messageArea.appendChild(messageElement);

    // Mantém apenas as últimas 50 mensagens para evitar sobrecarga de memória
    while (messageArea.children.length > 50) {
      messageArea.removeChild(messageArea.firstChild);
    }

    // Rola para a última mensagem com animação suave
    messageArea.scrollTo({
      top: messageArea.scrollHeight,
      behavior: "smooth",
    });
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

    // Usa maxHp para calcular a porcentagem correta
    const percentage = (currentBoss.stats.hp / currentBoss.stats.maxHp) * 100;
    hpBar.style.width = `${Math.max(0, percentage)}%`;
    hpValue.textContent = `${Math.max(0, currentBoss.stats.hp)}/${
      currentBoss.stats.maxHp
    }`;
  }

  function updateCharacterHP(character) {
    const charElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    const hpBar = charElement.querySelector(".hp-bar");
    const hpValue = charElement.querySelector(".stat-value");
    const percentage = (character.stats.hp / character.stats.maxHp) * 100;
    hpBar.style.width = `${Math.max(0, percentage)}%`;
    hpValue.textContent = `${character.stats.hp}/${character.stats.maxHp}`;
  }

  function updateCharacterMana(character) {
    const charElement = document.querySelector(
      `.battle-character[data-name="${character.name}"]`
    );
    const manaBar = charElement.querySelector(".mana-bar");
    const manaValue = manaBar.parentElement.querySelector(".stat-value");
    const percentage = (character.stats.mana / character.stats.maxMana) * 100;
    manaBar.style.width = `${Math.max(0, percentage)}%`;
    manaValue.textContent = `${character.stats.mana}/${character.stats.maxMana}`;
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
    updateActionButtonsState();

    const liveCharacters = selectedCharacters.filter(
      (char) => char.stats.hp > 0
    );

    if (liveCharacters.length === 0) {
      endGame(false);
      return;
    }

    const bossElement = document.querySelector(".enemy-team .battle-character");
    const targetIndex = Math.floor(Math.random() * liveCharacters.length);
    const target = liveCharacters[targetIndex];
    const damage = currentBoss.stats.attack;

    // Inicia a animação de ataque do chefe
    bossElement.classList.add("boss-attacking");

    setTimeout(() => {
      // Aplica o dano
      target.stats.hp = Math.max(0, target.stats.hp - damage);

      // Mostra o efeito visual no alvo
      const targetElement = document.querySelector(
        `.battle-character[data-name="${target.name}"]`
      );
      targetElement.classList.add("taking-damage");
      showDamageNumber(target, damage, "boss");

      // Atualiza o HP do personagem na interface
      updateCharacterHP(target);
      updateCharacterVisuals(target);

      // Remove as classes de animação
      setTimeout(() => {
        bossElement.classList.remove("boss-attacking");
        targetElement.classList.remove("taking-damage");
      }, 500);

      showBattleMessage(
        `${currentBoss.name} atacou ${target.name} causando ${damage} de dano!`,
        "boss"
      );

      // Verifica se o personagem foi derrotado
      if (target.stats.hp <= 0) {
        handleCharacterDefeat(target);
      }

      // Inicia novo turno após as animações
      setTimeout(() => {
        startNewTurn();
      }, 1000);
    }, 250);
  }

  // Função para transição entre fases
  function transitionToNextPhase() {
    currentBossIndex++;
    if (currentBossIndex < bosses.length) {
      // Limpa a área do chefe anterior
      const enemyTeamArea = document.querySelector(".enemy-team");
      enemyTeamArea.innerHTML = "";

      // Inicializa o novo chefe
      initializeNewBoss();

      // Reseta o estado do turno
      currentCharacterIndex = 0;
      teamActionsCompleted = false;
      currentTurn = 1;

      // Reseta o estado de ação dos personagens
      document
        .querySelectorAll(".player-team .battle-character")
        .forEach((char) => {
          char.dataset.acted = "false";
        });

      // Atualiza a interface
      updateTurnInfo();
      highlightCurrentCharacter();
      updateActionButtonsState();

      showBattleMessage(
        `Fase ${currentBoss.phase} começou! ${currentBoss.name} apareceu!`,
        "system"
      );
    } else {
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

  // Inicializar a tela de seleção
  initializeTeamSlots();
  initializeCharacterCards();
});

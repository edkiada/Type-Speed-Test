<script setup>
  import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
  import { useRouter } from 'vue-router';
  const PB = ref(Number(localStorage.getItem('personalBest') || 0));
  const WPM = ref(0);
  const Time = ref('1:00');

  const router = useRouter();
  const isStart = ref(false);
  const mobleDifficultySelectorOpen = ref(false);
  const mobleModeSelectorOpen = ref(false);
  const currentDifficulty = ref('easy');
  const currentMode = ref('time');
  const secandsLeft = ref(60);
  const userInput = ref('');
  const inputRef = ref(null);
  const incorrectCount = ref(0);
  const windowWidth = ref(window.innerWidth);
  let timer = null;

  const allData = ref(null);
  const currentPassage = ref('');

  const wpm = computed(() => {
    if (userInput.value.length === 0) {
      return 0;
    }
    else if (userInput.value.length % 5 === 0) {
      WPM.value = userInput.value.length / 5;
      return WPM.value;
    }
    else {
      return WPM.value;
    }
  })

  const accuracy = computed(() => {
    const passageLength = charArray.value.length;
    const wrongCount = incorrectCount.value;
    return `${Math.max(0, Math.floor(((passageLength - wrongCount) / (passageLength)) * 100))}%`;
  });

  const charArray = computed(() => {
    return currentPassage.value.split('');
  });

  function focusInput() {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  }

  function getCharClass(index) {
    if (index > userInput.value.length) {
      return 'pending';
    }

    if (index === userInput.value.length) {
      return 'current';
    }
    const iscorrent = userInput.value[index] == charArray.value[index];
    if (iscorrent) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  function gameover() {
    clearInterval(timer);
    userInput.value = '';
    secandsLeft.value = 60;
    Time.value = '0:60';
    incorrectCount.value = 0;
  }

  function handleInput(e) {
    const currentIndex = userInput.value.length - 1;
    if (currentIndex < 0) {
      return;
    }
    if (userInput.value[currentIndex] !== charArray.value[currentIndex]) {
      incorrectCount.value++;
    }
    if (userInput.value.length === currentPassage.value.length) {
      toggleStart();
    }
  }

async  function toggleStart() {
    isStart.value = !isStart.value;
      if (isStart.value) {
        await nextTick();
        focusInput();
        gameover();
        if (currentMode.value === 'time') {
          timer = setInterval(() => {
            if (secandsLeft.value > 0) {
              secandsLeft.value--;
              if (secandsLeft.value < 10) {
                Time.value = `0:0${secandsLeft.value}`;
              } else {
                Time.value = `0:${secandsLeft.value}`;
              }
            } else {
              gameover();
              isStart.value = false;
            }
          }, 1000);
        }
      } else {
        pushResult();
        gameover();
      }
  }

  const fetchPassage = async () => { 
    try {
      const response = await fetch('data.json');
      allData.value = await response.json();
      getRandomPassage();  
    }
    catch (error) {
      console.error('Error fetching passage:', error);
    }
  };

  const getRandomPassage = () => {
    if (!allData.value) return '';
    const list = allData.value[currentDifficulty.value];
    const randomIndex = Math.floor(Math.random() * list.length);
    currentPassage.value = list[randomIndex].text;
  }

  const handleDifficultyChange = (event) => {
    if(isStart.value) {
      toggleStart();
    } 
    currentDifficulty.value = event.target.value.toLowerCase();
    mobleDifficultySelectorOpen.value = false;
    getRandomPassage();
  };

  const handleModeChange = (event) => {
    if(isStart.value) {
      toggleStart();
    } 
    currentMode.value = event.target.value.toLowerCase();
    mobleModeSelectorOpen.value = false;
  }

  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  const isMoble = computed(() => {
    return windowWidth.value <= 768;
  })

  const mobleDifficultyText = computed(() => {
    return `${currentDifficulty.value.charAt(0).toUpperCase() + currentDifficulty.value.slice(1)}`;
  });

  const mobeModeText = computed(() => {
    return currentMode.value === 'time' ? 'Timed(60s)' : 'Passage';
  });

  function mobleOpenDifficultySelector() {
    mobleDifficultySelectorOpen.value = !mobleDifficultySelectorOpen.value;
  }

  function mobleOpenModeSelector() {
    mobleModeSelectorOpen.value = !mobleModeSelectorOpen.value;
  }

  function pushResult() {
    const currentWPM = wpm.value;
    if (currentWPM > PB.value) {
      PB.value = currentWPM;
      localStorage.setItem('personalBest', currentWPM.toString());
    }

    router.push({
      path: '/result',
      query: {
        wpm: wpm.value,
        acc: accuracy.value,
        incorrect: incorrectCount.value,
        passageLength: charArray.value.length,
        personalbest: PB.value
      }
    })
  }

  onMounted(() => {
    fetchPassage();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearInterval(timer);
  });
</script>

<template>
  <div class="container">
    <header>
      <section class="title">
        <picture>
          <source srcset="../assets/images/logo-small.svg" media="(max-width: 768px)">
          <img src="../assets/images/logo-large.svg" alt="logo" class="logo" />
        </picture>
        <div class="grade">
          <img src="../assets/images/icon-personal-best.svg" alt="grude" class="grude" />
          <p><span class="label desktop-text">Personal best:</span><span class="label moble-text">Best:</span> {{ PB }} WPM</p>
        </div>
      </section>
      <section class="contorl">
        <div class="currentGrade">
          <div>
            <span class="label">WPM:</span> 
            <span>{{ wpm }}</span>
          </div> 
          <span class="g">|</span>
          <div>
            <span class="label">Accuracy:</span> 
            <span class="r">{{ accuracy }}</span>
          </div> 
          <span class="g">|</span>
          <div>
            <span class="label">Time:</span> 
            <span class="y">{{ Time }}</span> 
          </div>
        </div>
        <div v-if="isMoble" class="settings">
          <div>
            <button class="mobleDifficulty" @click="mobleOpenDifficultySelector">
              <span>{{ mobleDifficultyText }}</span>
              <img src="../assets/images/icon-down-arrow.svg" alt="arrow" class="arrow" />
            </button>
            <div class="mobleDifficultySelector" :class="{ isHidden: !mobleDifficultySelectorOpen }">
              <button value="Easy" @click="handleDifficultyChange" :class="{ difficultySelector: currentDifficulty === 'easy' }" >
                <div class="out" :class="{ difficultySelector: currentDifficulty === 'easy' }"><div class="in"></div></div>
                <p>Easy</p>
              </button>
              <button value="Medium" @click="handleDifficultyChange" :class="{ difficultySelector: currentDifficulty === 'medium' }" >
                <div class="out" :class="{ difficultySelector: currentDifficulty === 'medium' }"><div class="in"></div></div>
                <p>Medium</p>
              </button>
              <button class="unBorder" value="Hard" @click="handleDifficultyChange" :class="{ difficultySelector: currentDifficulty === 'hard' }" >
                <div class="out" :class="{ difficultySelector: currentDifficulty === 'hard' }"><div class="in"></div></div>
                <p>Hard</p>
              </button>
            </div>
          </div>
          <div>
            <button class="mobleDifficulty" @click="mobleOpenModeSelector">
              <span>{{ mobeModeText }}</span>
              <img src="../assets/images/icon-down-arrow.svg" alt="arrow" class="arrow" />
            </button>
            <div class="mobleDifficultySelector" :class="{ isHidden: !mobleModeSelectorOpen }">
              <button value="Time" @click="handleModeChange" :class="{ difficultySelector: currentMode === 'time' }" >
                <div class="out" :class="{ difficultySelector: currentMode === 'time' }"><div class="in"></div></div>
                <p>Timed(60s)</p>
              </button>
              <button value="Passage" @click="handleModeChange" :class="{ difficultySelector: currentMode === 'passage' }" >
                <div class="out" :class="{ difficultySelector: currentMode === 'passage' }"><div class="in"></div></div>
                <p>Passage</p>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="settings">          
          <div class="difficulty">
            <span class="label">Difficulty: </span>
            <div class="buttons">
              <button value="Easy" @click="handleDifficultyChange" :class="{ difficultySelector: currentDifficulty === 'easy' }" >Easy</button>
              <button value="Medium" @click="handleDifficultyChange" :class="{ difficultySelector: currentDifficulty === 'medium' }" >Medium</button>
              <button value="Hard" @click="handleDifficultyChange" :class="{ difficultySelector: currentDifficulty === 'hard' }" >Hard</button>
            </div>
          </div>
          <span class="g">|</span>
          <div class="mode">
            <span class="label">Mode:</span>
            <div class="buttons">
              <button value="Time" @click="handleModeChange" :class="{ modeSelector: currentMode === 'time' }" >Timed(60s)</button>
              <button value="Passage" @click="handleModeChange" :class="{ modeSelector: currentMode === 'passage' }" >Passage</button>
            </div>
          </div>
        </div>
      </section>
    </header>
    <hr />
    <main>
        <div class="type" :class="{ isBlurred: !isStart }" autocorrect="off" autocapitalize="none" spellcheck="false" autocomplete="off">
          <span v-for="(char, index) in charArray" :key="index" :class=getCharClass(index)>{{ char }}</span>
        </div>
      <hr />
      <button value="restart" class="restart" :class="{ isHidden: !isStart }" @click="toggleStart">
        <span>Restart Test </span>
        <img src="../assets/images/icon-restart.svg" alt="restart" />
      </button>
      <div class="overlay" :class="{ isHidden: isStart }" @click="toggleStart">
        <button class="start" >Start Typing Test</button>
        <p>Or click the text and start typing</p>
      </div>
      <input type="text" class="hiddenInput" v-model="userInput" ref="inputRef" @input="handleInput" :disabled="!isStart" />
    </main>
    <footer>

    </footer>
  </div>
</template>

<style scoped>
/* 在這裡寫你的 CSS */

/* 接下來你可以根據設計稿調整顏色和間距 */
</style>
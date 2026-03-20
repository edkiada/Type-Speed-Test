<script setup>
  import { useRoute } from 'vue-router';
  import { computed, ref } from 'vue';

  import iconCompleted from '../assets/images/icon-completed.svg';
  import iconBest from '../assets/images/icon-new-pb.svg';
  
  const route = useRoute();


  const result = {
    wpm: route.query.wpm || 0,
    acc: route.query.acc || '0%',
    incorrect: route.query.incorrect || 0,
    passageLength: route.query.passageLength || 0,  
    personalBest: route.query.personalbest || 0 
    };

    const rankData = computed(() => {
    const wpm = result.wpm;
    if (result.personalBest === 0) {
        return {
            text_h1: "Baseline Established!",
            text_p: "You've set the bar. Now the real challenge begins-time to beat it.",
            text_completed: "Beat This Score",
            style: "complete",
            img: iconCompleted
        }
    } else if (wpm < result.personalBest) {
        return {
            text_h1: "Test Complete!",
            text_p: "Solid run. Keep pushing to beat your high score.",
            text_completed: "Go Again",
            style: "complete",
            img: iconCompleted
        }
    } else {
        return {
            text_h1: "High Score Smashed!",
            text_p: "You're getting faster. That was incredible typing.",
            text_completed: "Beat This Score",
            style: "HighScore",
            img: iconBest
        }
    }
  })

</script>

<template>
    <header>
        <section class="title">
        <picture>
          <source srcset="../assets/images/logo-small.svg" media="(max-width: 768px)">
          <img src="../assets/images/logo-large.svg" alt="logo" class="logo" />
        </picture>
        <div class="grade">
          <img src="../assets/images/icon-personal-best.svg" alt="grude" class="grude" />
          <p><span class="label desktop-text">Personal best:</span><span class="label moble-text">Best:</span> {{ result.personalBest }} WPM</p>
        </div>
      </section>
    </header>
    <main>
        <img :src=rankData.img alt="result icon" class="result-icon">
        <section class="result-container">
            <img src="../assets/images/pattern-star-2.svg" alt="pattern" class="star_2" :class="{isOpacity: rankData.style == 'HighScore'}">
            <div class="result-content">
                <h2 class="resultH">{{ rankData.text_h1 }}</h2>
                <p class="resultP">{{ rankData.text_p }}</p>
                <div class="resultGrude">
                    <div class="resultWPM">
                        <p>WPM:</p>
                        <span class="white">{{ result.wpm }}</span>
                    </div>
                    <div class="resultAccuracy">
                        <p>Accuracy:</p>
                        <span class="r">{{ result.acc }}</span>
                    </div>
                    <div class="resultCharacters">
                        <p>Characters:</p>
                        <p><span class="green">{{ result.passageLength }}</span>/<span class="r">{{ result.incorrect }}</span></p>
                    </div>
                </div>
            </div>
            <img src="../assets/images/pattern-star-1.svg" alt="pattern" class="star_1" :class="{isOpacity: rankData.style == 'HighScore'}">
        </section>
        <button value="backIndex" class="backIndex" @click="$router.push('/')">
            <span>{{ rankData.text_completed }}</span>
            <img src="../assets/images/icon-restart.svg" alt="restart" />
        </button>
    </main>
</template>
  
<style scoped>

</style>
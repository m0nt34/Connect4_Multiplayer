import startAudio from "../assets/audio/con4GameStart.mp3";
export const startGameAudio = ()=>{
  const startAudioVariable = new Audio(startAudio);
  startAudioVariable.play();
}
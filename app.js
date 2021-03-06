var app = new Vue({
  el: '#player',
  data: {
    playList: [
      { 'name': 'MyHits', 'url': 'http://striiming.trio.ee:8008/myhits.mp3' },
      { 'name': 'Power Hit Radio', 'url': 'http://phr.babahhcdn.com:9000/phr' },
      { 'name': 'Power PartyZone', 'url': 'http://mtg-radio.babahhcdn.com/ppztest' },
      { 'name': 'Power Street', 'url': 'http://wr22-icecast.mtg-r.net/wr22_mp3' },
      { 'name': 'Power Club', 'url': 'http://wr21-icecast.mtg-r.net/wr21_mp3' },
      { 'name': 'Energy Fm', 'url': 'http://skyplus.babahhcdn.com:7004/NRJ' },
      { 'name': 'Star Fm', 'url': 'http://starfm.babahhcdn.com:8000/starfm' },
      { 'name': 'Hit Fm', 'url': 'http://stream.hitfm.ee/HitFM_192' },
      { 'name': 'sky plus', 'url': 'http://skyplus.babahhcdn.com:7004/SKYPLUS' },
      { 'name': 'rock Fm', 'url': 'http://skyplus.babahhcdn.com:7004/rck' },
      { 'name': 'Finest Fm', 'url': 'http://212.47.220.188:8000/listen.mp3' },
      { 'name': 'Ring Fm', 'url': 'http://shout.babahh.com/ringfm' },
      { 'name': 'VikerRaadio', 'url': 'http://icecast.err.ee:80/vikerraadio.mp3' },
      { 'name': 'Raadio2', 'url': 'http://icecast.err.ee/raadio2.mp3' },
      { 'name': 'Äripäev', 'url': 'https://www.aripaev.ee/raadio/stream.mp3 ' },
      { 'name': 'Elmar', 'url': 'http://striiming.trio.ee:8008/elmar_high.mp3 ' },
      { 'name': 'Raadio Kuku', 'url': 'http://striiming.trio.ee:8008/kuku.mp3' },
      { 'name': 'Retro Fm', 'url': 'http://retro.babahhcdn.com/RETRO?/retrofm_hi.mp3' },
      { 'name': 'Raadio Marta', 'url': 'http://icecast.mmm.elion.ee:8080/MartaFM' },
      { 'name': 'Tre Raadio', 'url': 'http://sc1.treraadio.ee:8002/tre' },
      { 'name': 'Klassikaraadio', 'url': 'http://icecast.err.ee/klassikaraadio.mp3' },
      { 'name': 'Tartu Pereraadio', 'url': 'http://bee.pereraadio.ee:8000/listen.pls' }
    ],
    currentChannelName: '',
    currentChannelUrl: '',
    currentVolume: 50,
    currentTime: 0,
    activeStation: false,
    playState: false,
    playerErrorState: false
  },
  methods: {
    onLoad: function () {
      console.log('onLoad');
      this.$refs.audio.volume = 0.5;
    },
    reLoad: function () {
      console.log('reLoad');
      this.$refs.audio.load();
    },
    playOrPause: function () {
      this.playState = !this.playState;
      if (this.playState) {
        this.play();
      } else {
        this.pause();
      }
    },
    play: function () {
      console.log('play');
      var sources = this.$refs.audio.getElementsByTagName('source');
      if (sources.length === 0) {
        var source = document.createElement('source');
        source.setAttribute('type', 'audio/mpeg');
        this.$refs.audio.appendChild(source);
      }
      var source = this.$refs.audio.getElementsByTagName('source')[0];
      source.setAttribute('src', this.currentChannelUrl);
      // console.log(source);
      this.$refs.audio.play();
    },
    pause: function () {
      console.log('pause');
      this.$refs.audio.pause();
    },
    volume: function () {
      console.log('volume');
      this.$refs.audio.volume = this.currentVolume / 100;
    },
    timeStamp: function () {
      console.log('timeStamp');
      var rawSeconds = Math.floor(this.$refs.audio.currentTime);
      var rawMinutes = Math.floor(rawSeconds / 60);
      var rawHours = Math.floor(rawMinutes / 60);
      var seconds = ('0' + rawSeconds % 60).slice(-2);
      var minutes = ('0' + rawMinutes % 60).slice(-2);
      var hours = ('0' + rawHours % 60).slice(-2);
      this.currentTime = hours + ':' + minutes + ':' + seconds;
    },
    selectStation: function (station) {
      console.log('selectStation');
      this.currentChannelName = station.name;
      this.currentChannelUrl = station.url;
      this.reLoad();
      this.play();
    },
    playerError: function () {
      console.log('playerError');
      if (confirm('Stream got interrupted. Reload?')) {
        this.reLoad();
        this.play();
      }
    },
  },
  mounted: function () {
    this.onLoad();
  }
})

import music from './music1.mp3';
import * as THREE from 'three';


class MainMusicAPI{
    constructor(camera){
        this.listener = new THREE.AudioListener();
        this.audio = new THREE.Audio(this.listener);
        this.musicFile = music;

        // must pass in camera from scene classes to add audio listener
        camera.add(this.listener);

        this.audioLoader = new THREE.AudioLoader();

        this.fftSize = 32 ** 1;

        //console.log(this.fftSize)

        this.analyser = new THREE.AudioAnalyser(this.audio, this.fftSize);

        this.audioLoader.load(this.musicFile, (music) => {

            let buf = new Uint8Array(32 * 2);

            // this is entire song data
            console.log(music.getChannelData(buf))
            
            let data = new Uint8Array(this.analyser.analyser.frequencyBinCount);

                this.analyser.analyser.minDecibels = -90;
                this.analyser.analyser.maxDecibels = -10;
                this.analyser.analyser.smoothingTimeConstant = .85;

                this.audio.setBuffer( music );
                this.audio.setLoop( true );
                this.audio.setVolume( 0.5 );
                let bassFilter = this.audio.context.createBiquadFilter();
                bassFilter.type = 'lowpass';
                bassFilter.frequency.value = 85;
                bassFilter.Q.value = .1;
                //bassFilter.gain.value = 11;
                this.audio.setFilter(bassFilter);
                //this.audio.connect();
                //bassFilter.connect(this.audio.destination)

                //console.log(this.audio.connect)

                //this.audio.play();            
                // needs user interaction to start playing or browser will throw an error
                /*
                document.addEventListener('keydown', (e) => {

                // press s key to start audio
                if(e.key == 'p'){
                    this.audio.play();            
                }

                if(e.key == 's'){
                    this.audio.stop();            
                }

                //console.log(this.analyser.data)

                // all data from audio frequency
                //let data = this.analyser.getAverageFrequency();                

        });
        */

    })       
    

    }

    getFrequencyData(){
        this.analyser.getFrequencyData();
        //this.analyser.getAverageFrequency()
    }

    // working on beat detection from http://joesul.li/van/beat-detection-using-web-audio/
    getPeakAtThreshold(data, threshold){
        let peaksArray = [];
        let length = data.length;

        for(let i = 0; i < length;){
            if(data[i] > threshold){
                peaksArray.push(i);
                // skip forward - 1/4s to get past peak
                i += 10000;
            }
            i++
        }

        return peaksArray;

    }

}

export default MainMusicAPI;
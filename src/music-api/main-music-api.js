
import music from './music1.mp3';
import * as THREE from 'three';

import { analyze } from 'web-audio-beat-detector';


class MainMusicAPI{
    constructor(camera){
        this.listener = new THREE.AudioListener();
        this.audio = new THREE.Audio(this.listener);
        this.musicFile = music;

        // must pass in camera from scene classes to add audio listener
        camera.add(this.listener);


        this.audioLoader = new THREE.AudioLoader();

        this.audioLoader.load(this.musicFile, (music) => {

            this.analyser = new THREE.AudioAnalyser(this.audio, 32);


                this.audio.setBuffer( music );
                this.audio.setLoop( true );
                this.audio.setVolume( 0.5 );


                // needs user interaction to start playing or browser will throw an error
                document.addEventListener('keydown', (e) => {

                // press s key to start audio
                if(e.key == 's'){
                    this.audio.play();            
                }

                // all data from audio frequency
                let data = this.analyser.getFrequencyData();
                //let data = this.analyser.getAverageFrequency();                
                console.log(this.getPeakAtThreshold(data, 0.8))
        });
    })        

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
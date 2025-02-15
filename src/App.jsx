import React, { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Waiting for user action...");
  const [loadedFile, setLoadedFile] = useState("");
  const [abcText, setAbcText] = useState("");

  useEffect(() => {
    // Ensure SightReader is initialized after component mounts
    if (window.initializeSightReader) {
      window.initializeSightReader();
    }
  }, []);

  const loadABCFile = async (filename) => {
    if (!filename) return;

    setStatus("Loading file...");

    try {
      const response = await fetch(`/music/${filename}`);
      if (!response.ok) throw new Error("Failed to fetch file");

      const data = await response.text();
      setLoadedFile(filename);
      setAbcText(data);

      // Call SightReader function if it exists
      if (window.loadABC) {
        window.loadABC(data);
      }

      setStatus("File loaded. Press start to play.");
    } catch (error) {
      setStatus("Unable to load file.");
    }
  };
  
  return (
    <div className="container">
      <h3>ABC Sightreader</h3>

      <div className="row-fluid">
        <div className="span12" id="status">
          1. Select your mic 2. Select your ABC file 3. Press start
        </div>
      </div>

      <div className="row-fluid controls">
        <div className="span12">
          <label htmlFor="devices">Microphone:</label>
          <select id="devices" value={selectedMic} onChange={(e) => setSelectedMic(e.target.value)}>
            <option value="">Select a Microphone</option>
          </select>

          <label htmlFor="file">File:</label>
          <select id="file" value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
          <option value="">---Custom ABC---</option>
                    <option value="beginner.pls">Beginner</option>
                    <option value="cecilio-lesson1-open-strings.abc">cecilio-lesson1-open-strings.abc</option>
                    <option value="cecilio-lesson2-first-position.abc">cecilio-lesson2-first-position</option>
                    <option value="cecilio-lesson2-twinkle-twinkle-little-star.abc">cecilio-lesson2-twinkle-twinkle-little-star</option>
                    <option value="cecilio-lesson3-exercise-1.abc">cecilio-lesson3-exercise-1</option>
                    <option value="cecilio-lesson3-exercise-2.abc">cecilio-lesson3-exercise-2</option>
                    <option value="cecilio-lesson3-exercise-3.abc">cecilio-lesson3-exercise-3</option>
                    <option value="cecilio-lesson3-exercise-4.abc">cecilio-lesson3-exercise-4</option>
                    <option value="cecilio-lesson3-jingle-bells.abc">cecilio-lesson3-jingle-bells</option>
                    <option value="cecilio-lesson3-mary-had-a-little-lamb.abc">ceciliBeginneo-lesson3-mary-had-a-little-lamb</option>
                    <option value="cecilio-lesson4-camptown-races.abc">cecilio-lesson4-camptown-races</option>
                    <option value="cecilio-lesson4-lightly-row.abc">cecilio-lesson4-lightly-row.abc</option>
                    <option value="cecilio-lesson4-russian-dance-tune.abc">cecilio-lesson4-russian-dance-tune</option>
                    <option value="cecilio-lesson5-eighth-notes.abc">cecilio-lesson5-eighth-notes.abc</option>
                    <option value="cecilio-lesson5-hungarian-folk-song-1.abc">cecilio-lesson5-hungarian-folk-song-1</option>
                    <option value="cecilio-lesson5-the-old-gray-goose.abc">cecilio-lesson5-hungarian-folk-song-1</option>
                    <option value="cecilio-lesson6-first-position-d-string.abc">cecilio-lesson6-first-position-d-string</option>
                    <option value="cecilio-lesson6-ode-to-joy.abc">cecilio-lesson6-ode-to-joy</option>
                    <option value="cecilio-lesson6-scherzando.abc">cecilio-lesson6-scherzando</option>
                    <option value="cecilio-lesson7-can-can.abc">cecilio-lesson7-can-can</option>
                    <option value="cecilio-lesson7-country-gardens.abc">cecilio-lesson7-country-gardens</option>
                    <option value="cecilio-lesson7-gavotte.abc">cecilio-lesson7-gavotte</option>
                    <option value="cecilio-lesson8-dixie.abc">cecilio-lesson8-dixie.abc</option>
                    <option value="cecilio-lesson8-largo.abc">cecilio-lesson8-largo</option>
                    <option value="hot-cross-buns.abc">hot-cross-buns</option>
                    <option value="lesson1-open-string-exercise-1.abc">lesson1-open-string-exercise-1</option>
                    <option value="lesson1-open-string-exercise-2.abc">lesson1-open-string-exercise-2</option>
                    <option value="lesson1-open-string-exercise-3.abc">lesson1-open-string-exercise-3</option>
                    <option value="lesson1-open-string-exercise-4.abc">lesson1-open-string-exercise-4</option>
                    <option value="lesson1-open-string-exercise-5.abc">lesson1-open-string-exercise-5</option>
                    <option value="lesson1-open-string-exercise-6.abc">lesson1-open-string-exercise-6</option>
                    <option value="lesson2-1st-finger-exercise-1.abc">lesson2-1st-finger-exercise-1</option>
                    <option value="lesson2-1st-finger-exercise-2.abc">lesson2-1st-finger-exercise-2</option>
                    <option value="lesson2-1st-finger-exercise-3.abc">lesson2-1st-finger-exercise-3</option>
                    <option value="lesson2-1st-finger-exercise-4.abc">lesson2-1st-finger-exercise-4</option>
                    <option value="lesson2-1st-finger-exercise-5.abc">lesson2-1st-finger-exercise-5</option>
                    <option value="lesson2-1st-finger-exercise-6.abc">lesson2-1st-finger-exercise-6</option>
          </select>

          <label htmlFor="tempo">Tempo:</label>
          <select id="tempo">
            <option value="">inherit</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
            <option value="180">180</option>
            <option value="240">240</option>
          </select>

          <button id="start" disabled>
            Start
          </button>
          <button id="reset">Reset</button>
          <button id="tune">Tune</button>
        </div>
      </div>

      <div className="row-fluid">
        <div className="span12">
          <textarea id="abc-textarea"></textarea>
        </div>
      </div>

      <div className="row-fluid main-display">
        <div className="row-fluid top-info">
          <div id="current-playlist-position" className="span4 left">-</div>
          <div id="qpm-display" className="span4 center">-</div>
          <div className="span4 right">
            <span id="current-score">-</span>
            <span id="score-stats"></span>
          </div>
        </div>

        <div className="span12" id="notation"></div>
        <span id="current-note">-</span>
        <span id="current-volume">-</span>
        <div id="midi" style={{ display: "none" }}></div>
        <span id="count-down"></span>
        <span id="loaded-filename">-</span>
      </div>

      <div className="row-fluid controls">
        <div className="span12 keyboard-legend">
          <span className="cb-field">
            <input id="auto-continue" type="checkbox" />
            <label htmlFor="auto-continue">Auto-Continue</label>
          </span>
          <span className="cb-field">
            <input id="ignore-duration" type="checkbox" />
            <label htmlFor="ignore-duration">Ignore Duration</label>
          </span>
        </div>
      </div>

      <div className="row-fluid">
        <div className="span12">
          <ol id="playlist" className="list-group"></ol>
        </div>
      </div>
    </div>
  );
}

export default App;

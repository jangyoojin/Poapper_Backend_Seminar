import axios from "axios";
import React, { useState } from "react";

export default function CreateCardView() {
    const [word, setWord] = useState('');
    const [mean, setMean] = useState('');

    const onChange = (e) => {
        setWord(e.target.value);
    };

    const onChangeMean = (e) => {
        setMean(e.target.value);
    };

    const onFinish = async () => {
        console.log(word);
        await axios.post("http://localhost:4000/stages/1/words", { word: word, mean: mean })
    };

    return (
        <fieldset>
            <legend>English word card</legend>
            <div name='word' onChange={onChange}>단어: <input></input></div>
            <div name='mean' onChange={onChangeMean}>뜻: <input></input></div>
            <button onClick={onFinish}>등록</button>
        </fieldset>
    )
}
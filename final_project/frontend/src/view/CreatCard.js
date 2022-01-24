import axios from "axios";
import React, { useState } from "react";

export default function CreateCardView() {
    const [word, setWord] = useState('');
    const [mean, setMean] = useState('');
    const [mode, setMode] = useState('글자');

    const onChange = (e) => {
        if (mode === '이미지') {
            setWord(e.target.files[0]);
        } else {
            setWord(e.target.value);
        }
    };

    const onChangeMean = (e) => {
        setMean(e.target.value);
    };

    const onFinish = async () => {
        if (mode === '이미지') {
            const formData = new FormData();
            formData.append('image', word);
            formData.append('mean', mean);
            await axios.post("http://localhost:4000/stages/1/words/images", formData);
        } else {
            await axios.post("http://localhost:4000/stages/1/words", { word, mean });
        }

    };

    return (
        <fieldset>
            <legend>English word card</legend>
            <button onClick={() => { setMode((prevMode) => prevMode === '이미지' ? '글자' : '이미지') }}>{mode}</button>
            <div name='word' onChange={onChange}>단어:
                {
                    mode === '이미지' ? <input type='file'></input> : <input></input>
                }
            </div>
            <div name='mean' onChange={onChangeMean}>뜻: <input></input></div>
            <button onClick={onFinish}>등록</button>
        </fieldset>
    )
}
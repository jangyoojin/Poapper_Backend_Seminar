import axios from "axios";
import React, { Fragment } from "react";

let count = 0;
let wordList = [];

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            isQuizMode: true,
            word: '',
            mean: '',
        };
    };


    getWords = async () => {
        wordList = await axios.get(`${process.env.REACT_APP_API_SERVER}/stages/${this.state.stage}/words`);
        if (wordList.data.length === 0) alert("이 단계에는 더 이상 학습할 단어가 없습니다.");
        else {
            count = 0;
            this.setState({ word: wordList.data[count].word, mean: wordList.data[count].mean })
        }
    }

    success = async () => {
        //다음 stage에 저장
        if (this.state.stage !== 5) await axios.post(`${process.env.REACT_APP_API_SERVER}/stages/${this.state.stage + 1}/words`, { word: this.state.word, mean: this.state.mean });

        //성공한 단어는 해당 stage에서 삭제
        await axios.delete(`${process.env.REACT_APP_API_SERVER}/stages/${this.state.stage}/words`, { params: { word: this.state.word, mean: this.state.mean } });
        wordList.data.splice(count, 1);
        //delete wordList[count];
        //count++;

        //해당 stage에 더이상 단어가 없다면 경고창 띄우기
        if (wordList.data.length === 0) { alert("이 단계에는 더 이상 학습할 단어가 없습니다."); this.setState({ word: '' }) }
        else {
            if (count >= wordList.data.length) count = 0;
            this.setState({ isQuizMode: true, word: wordList.data[count].word, mean: wordList.data[count].mean });
        }
    }

    fail = async () => {
        count++;
        if (count >= wordList.data.length) count = 0;
        await this.setState({ isQuizMode: true, word: wordList.data[count].word, mean: wordList.data[count].mean });
    }

    render() {
        return (
            <center>
                <span><button className={this.state.stage === 1 ? "selected" : ""} onClick={() => { this.setState({ stage: 1, isQuizMode: true }); }}>1</button>
                    <button className={this.state.stage === 2 ? "selected" : ""} onClick={() => { this.setState({ stage: 2, isQuizMode: true }); }}>2</button>
                    <button className={this.state.stage === 3 ? "selected" : ""} onClick={() => { this.setState({ stage: 3, isQuizMode: true }); }}>3</button>
                    <button className={this.state.stage === 4 ? "selected" : ""} onClick={() => { this.setState({ stage: 4, isQuizMode: true }); }}>4</button>
                    <button className={this.state.stage === 5 ? "selected" : ""} onClick={() => { this.setState({ stage: 5, isQuizMode: true }); }}>5</button></span>
                <div><button onClick={() => { this.getWords(); }}>단어 불러오기</button></div>
                {
                    this.state.isQuizMode ? <>
                        <div className="word_card">
                            {
                                this.state.word.includes('/images') ?
                                    <img src={`${process.env.REACT_APP_API_SERVER}${this.state.word}`} style={{ width: '20vw' }} alt="단어를 표현하는 이미지입니다."></img> : this.state.word
                            }
                        </div>
                        <div><button onClick={() => { this.setState({ isQuizMode: false }) }}>정답 확인하기</button></div>
                    </> : <>
                        <div className="word_card">{this.state.mean}</div>
                        <div>
                            <button onClick={() => { this.success() }}>성공</button>
                            <button onClick={() => { this.fail() }}>실패</button>
                        </div>
                    </>
                }

            </center>
        );
    }
}
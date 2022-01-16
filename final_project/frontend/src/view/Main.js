import React from "react";

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            mean: '',
        };
    };



    render() {
        return (
            <center>

                <span><button>1</button><button>2</button><button>3</button><button>4</button><button>5</button></span>
                <div className="word_card">study</div>
                <div><button>정답 확인하기</button></div>
                <div><button>성공</button><button>실패</button></div>
            </center>
        );
    }
}
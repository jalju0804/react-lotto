import React,{Component} from 'react';
import Ball from './Ball'

function getWinNumbers(){
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1 ];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return[...winNumbers,bonusNumber];
}

class lotto extends Component
{
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스
        redo: false,
    };
    
    timeouts = [];

    runTimeouts = () =>{
        const {winNumbers} = this.state;
        for(let i = 0;i<this.state.winNumbers.length-1;i++){
                this.timeouts[i] = setTimeout(() => {
                    this.setState((prevState) => {
                      return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                      };
                    });
                  }, (i + 1) * 1000);
                }

        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus:winNumbers[6],
                redo: true,
            });
        },7000);
    } 

    componentDidMount(){ // render 되고 나서 바로 실행
        console.log("didmount");
      this.runTimeouts();
    };

    componentWillUnmount(){ // timeout를 clear함 부모가 제거되더라도 자식인 settimeout이 돌아감 //부모가 자식으 지울 때 실행
        this.timeouts.forEach((v) =>{
            clearTimeout(v);
        });
    }

    componentDidUpdate(prevProps,prevState){
        console.log('didupdate');
        if(this.state.winBalls.length === 0){
            this.runTimeouts();
        }
    } // setState를 해서 render가 될 때마다 이 함수가 실행

    onClickRedo = () =>{
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null, // 보너스
            redo: false,
        });
        this.timeouts = []; 
    };

    render(){
        const { winBalls, bonus, redo } = this.state;
        return(
            <>
            <div>당첨 숫자</div>
            <div id="결과창">
              {winBalls.map((v) => <Ball key={v} number={v} />)} 
              {/* ball은 따로 파일 선언함 */}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
           {redo &&<button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )
    };
}
export default lotto;
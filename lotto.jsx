import React,{useState,useEffect,useRef,useMemo,useCallback} from 'react';
import Ball from './Ball'

function getWinNumbers(){
    console.log('getWinNumbers'); // 내가 필요할 때 함수가 실해되는지 확인을 위해
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1 ];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return[...winNumbers,bonusNumber];
}

const lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(),[]); // memo는 함수의 return 값을 저장
    const[winNumbers,setWinNumbers] = useState(lottoNumbers);
    const[winBalls,setWinBalls] = useState([]);
    const[bonus,setBouns] = useState(null);
    const[redo,setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(()=>{
        console.log('useEffect');
        for(let i = 0;i<winNumbers.length-1;i++){
           timeouts.current[i] = setTimeout(() => { // current 배열의 요소를 바꿔주는거라 current가 바뀌는 것이 아님
                setWinBalls((prevBalls)=>[...prevBalls, winNumbers[i]])
              }, (i + 1) * 1000);
            }
        timeouts.current[6] = setTimeout(()=>{
        setBouns(winNumbers[6]);
        setRedo(true);
    },7000);
    return() =>{
        timeouts.current.forEach((v) => {
            clearTimeout(v);
        });
    };
    },[timeouts.current]);// 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있음 componentDidMount와 componentDidUpdate 둘다 함

    const onClickRedo = useCallback(() =>{
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBouns(null);
        setRedo(false);
        timeouts.current = []; // 여기선 current 자체에 값을 넣고 있으므로 current 자체가 바뀌는게 맞음
    },[winNumbers]); // useCallback은 함수를 기억함 함수를 기억해서 onclickredo가 새로 생겨나지 않게 
    //winNumbers가 바뀌면 다시 실행
    return (
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)} 
          {/* ball은 따로 파일 선언함 */}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
       {redo &&<button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default lotto;
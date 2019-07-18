let a=new Vue({
    el: '#app',
    data: {
        ranks: ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
        suits: ['clubs','diamonds','hearts','spades'],
        cards: [],
        image:[],
        resultString:"",
        score:"",
        highScore:"",
        currentScore:""

    },
    created:function(){
        this.fetchData() //method1 will execute at pageload
    },
    methods: {
        displayInitialDeck() {
            this.cards = [];
            for( let s of this.suits) {
                for( let r of this.ranks ) {
                    let card = {
                        rank: r,
                        suit: s,
                        image:'/images/'+r+'_of_'+s+'.png'

                    }
                    this.cards.push(card);
                }
            }
            function shuffle(arra1) {
                let ctr = arra1.length, temp, index;

// While there are elements in the array
                while (ctr > 0) {
// Pick a random index
                    index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
                    ctr--;
// And swap the last element with it
                    temp = arra1[ctr];
                    arra1[ctr] = arra1[index];
                    arra1[index] = temp;
                }
                // this.shuffle();
                return arra1;
            }
            this.cards=shuffle(this.cards);
            this.cards=(this.cards).slice(0,5)
            this.mainLogic();
        },
        mainLogic(){
            let valuesArray = [];
            let suitsArray = [];
            let resultString = "";
            let currentScore ="";
            for(let l = 0; l < 5; l++){
                valuesArray[l] = this.ranks.indexOf(this.cards[l].rank);
                suitsArray[l] = this.suits.indexOf(this.cards[l].suit);
            }


            switch(duplicateCards()){
                case "2":
                    resultString = "1 Pair";
                    currentScore = 0.5;
                    break;
                case "22":
                    resultString = "2 Pairs";
                    currentScore = 1;
                    break;
                case "3":
                    resultString = "3 of a Kind";
                    currentScore = 2;
                    break;
                case "23":
                case "32":
                    resultString = "Full House";
                    currentScore = 12;
                    break;
                case "4":
                    resultString = "4 of a Kind";
                    currentScore = 16;
                    break;
                case "5":
                    resultString = "5 of a Kind";
                    break;
                default:
                    if(isStraight()){
                        resultString = "Straight";
                        currentScore = 4;
                    }
                    if(isAceStraight()){
                        resultString = "Ace Straight";
                        currentScore = 64;
                    }
                    break;
            }
            if(isFlush()){
                if(resultString){
                    resultString += " and Flush";
                    currentScore = 32;
                }
                else{
                    resultString = "Flush";
                    currentScore = 8;
                }
            }
            if(!resultString){
                resultString = "nothing...";
                currentScore = 0;
            }
            this.resultString =resultString;
            this.currentScore="Current score : "+ currentScore;
            if(currentScore > this.highScore){
                this.upsertdata(currentScore,resultString);
                this.score=currentScore;

            }
            function isFlush(){
                for(let i = 0; i < 4; i ++){
                    if(suitsArray[i] != suitsArray[i+1]){
                        return false;
                    }
                }
                return true;
            }

            function isStraight(){
                let lowest = getLowest();
                for(let i = 1; i < 5; i++){
                    if(occurrencesOf(lowest + i) != 1){
                        return false
                    }
                }
                return true;
            }

            function isAceStraight(){
                let lowest = 9;
                for(let i = 1; i < 4; i++){
                    if(occurrencesOf(lowest + i) != 1){
                        return false
                    }
                }
                return occurrencesOf(1) == 0;
            }

            function getLowest(){
                let min = 12;
                for(let i of valuesArray){
                    min = Math.min(min, i);
                }
                return min;
            }

            function duplicateCards(){
                let occurrencesFound = [];
                let result = "";
                for(let i of valuesArray){
                    let occurrences = occurrencesOf(i);
                    if(occurrences > 1 && occurrencesFound.indexOf(i) == -1){
                        result += occurrences;
                        occurrencesFound.push(i);
                    }
                }
                return result;
            }

            function occurrencesOf(n){
                let count = 0;
                let index = 0;
                do{
                    index = valuesArray.indexOf(n, index) + 1;
                    if(index == 0){
                        break;
                    }
                    else{
                        count ++;
                    }
                } while(index < valuesArray.length);
                return count;
            }
        },
        fetchData:()=>{
            axios.get("/getinfo").then(function (response) {
                let score=response.data[0].score
                for (let i of response.data){
                    if(score< i.score){
                        score=i.score;
                    }
                }
                a.highScore=score;
                a.score = "Best score : "+ score;
            }).catch(function (error) {
                console.log(error);
            })
        },
        upsertdata:(score,result)=>{
            axios.post('/upsert', {
                result,
                score
            }).then(function (response) {
                    return response
            });
        }
    },
});

AOS.init();
new Vue({
    el:"#app",
    data:{
        completenumbers:[],
        randomnumber:0,
        howManyTimes:50,
        i:0,
        myrand:null,

        btnlabel:'TAP TO RANDOM FIRST JOCKPOT NUMBER',
        btnIsDisabled:false,
        randoming:false,
        windowWidth: window.innerWidth,
        


        pickedjockpotnums:[]
    },
    methods:{
        generateNumber(){
            if(this.completenumbers.length == 6) {
                let newPicked = JSON.parse(JSON.stringify(this.completenumbers))
                let removing = setInterval(() => {
                    if(this.completenumbers.length == 0) {
                        this.pickedjockpotnums.push(newPicked)
                        return clearInterval(removing)
                    }
                    this.completenumbers.splice(-1,1)
                        
                }, 500)   

                return
            }
            this.btnIsDisabled = true
            this.randoming = true
            this.randomNum()
            
        },
        randomNum(){
            if(this.i < this.howManyTimes || this.completenumbers.includes(this.randomnumber)){
                return setTimeout(() => {
                    this.i++
                    this.randomnumber = Math.floor(Math.random() * 41) + 1
                    
                    this.randomNum()
                },100)    
            }
            this.completenumbers.push(this.randomnumber)
            this.i = 0
            this.randomnumber = 0
            this.btnIsDisabled = false
            this.randoming = false
        },

        lottoButtonLabel(){
            if(this.randoming) return this.btnlabel = 'ROLLING..'
            switch(this.completenumbers.length){
                case 0:
                    this.btnlabel = 'TAP TO RANDOM FIRST JOCKPOT NUMBER'
                break

                case 1:
                    this.btnlabel = 'TAP FOR SECOND JOCKPOT NUMBER'
                break

                case 2:
                    this.btnlabel = 'TAP FOR THIRD JOCKPOT NUMBER'
                break

                case 3:
                    this.btnlabel = 'TAP FOR FOURTH JOCKPOT NUMBER'
                break

                case 4:
                    this.btnlabel = 'TAP FOR FIFTH JOCKPOT NUMBER'
                break

                case 5:
                    this.btnlabel = 'TAP FOR THE LAST JOCKPOT NUMBER'
                break

                case 6:
                    this.btnlabel = 'THIS IS YOUR LOTTO JOCKPOT NUMBERS'
                break
            }
            return this.btnlabel
        },

        onResize() {
            this.windowWidth= window.innerWidth
        }
        
    },

    
    mounted() {
        this.lottoButtonLabel()
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },

    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    
})
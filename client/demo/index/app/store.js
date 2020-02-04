import * as service from './service'

var store =  {
    state: {
        message: 'hello',
        heros: [],
    },
    setHerosAction() {
        return service.getHeros()
            .then( resp => {
                // resp需要对上data
                // console.log('=====返回的heros', resp.config);
                let obj = JSON.parse(resp.data.replace('Notice: Undefined variable: babyProfile in /data/www/my/library/common_baby.class.php on line 116', ''))
                this.state.heros = obj.data.column_list;
            })
    },
    addHerosAction(newValue){
        this.state.heros = newValue;
    },
    clearHerosAction(){
        this.state.heros = [];
    }
}


export function createStore() {
    return store;
}
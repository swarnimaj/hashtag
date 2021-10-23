const rootComponent = {
  data: ()=> {
    return{
      text: '',
      results: []
    }
  },
  methods: {
    updateResults: function(query){
      query=encodeURIComponent(query);
      let url = `https://www.google.com/complete/search?client=firefox&q=${query}`;
      fetch(url).then(response=>{
        return response.json();
      }).then(response=>{
        let results = response[1];
        let fixedResults = [];
        for(var i=0; i<results.length; i++){
          let hashtag = results[i].split(' ')[0];
          if(hashtag.startsWith('#') && !fixedResults.includes(hashtag)){
            fixedResults.push(hashtag);
          }
        }
        this.results = fixedResults;
      })
    },
    autoComplete: function(){
      if(this.text.startsWith('#')){
        this.updateResults(this.text);
      }else{
        this.updateResults(' ');
      }
    },
    setQuery: function(query){
      this.text = query;
    },
  },
  template: `
  <div class="center">
    <input type="text" @input="autoComplete" v-model="text" >
    <p v-for="result in results">
    <span @click="setQuery(result)">{{result}}</span>
    </p>
  </div>

  `,
}

const vm = Vue.createApp(rootComponent).mount('#app');

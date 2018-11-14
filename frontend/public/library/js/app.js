var vm = new Vue({
  data: {
    // declare message with an empty value
    reservations: {},
    reservation: {
        Instances: []
    }
  },
  el: '#app'
})

// set `message` later
Vue.http.get('https://6o3l4nfc7a.execute-api.eu-west-1.amazonaws.com/dev/ec2').then(function(response){
  vm.reservations = response.body.Reservations;
  console.log(vm.reservations)
});


function Func() {
    var city = document.getElementById('city');
    var state = document.getElementById('state');
    var val = state.options[state.selectedIndex].getAttribute('data_city');
    var arr = val.split(',');
    city.options.length = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            city.options[city.options.length] = new Option(arr[i], arr[i]);
        }
    }
}

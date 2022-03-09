var sum = 0;

var sum_to_n_a = function(n) {
    if(n <= 0) {
        return;
    }
    sum += n;
    sum_to_n_a(n - 1);
    return sum;
};

var sum_to_n_b = function(n) {
    sum = 0;
    for(var i = 1;i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function(n) {
    sum = 0;
    if(n > 0) {
        sum = (n + 1) * n / 2;
    }
    return sum;
};
var stdin = process.openStdin();
stdin.resume(); 
stdin.on('data', function (keydata) {
  console.log("input number n!");
  var n = parseInt(keydata);
  sum = 0;
  var prints = "sum_to_n(" + n +") === ";
  for(var i = 1;i <= n;i++) {
        prints += i + " ";
        if(i != n) prints += "+ ";
        else prints += "=== ";
  }
  
  console.log("way1 " + prints + "" + sum_to_n_a(n));
  console.log("way2 " + prints + "" + sum_to_n_b(n));
  console.log("way3 " + prints + "" + sum_to_n_c(n));
});
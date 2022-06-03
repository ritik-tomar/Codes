// Write a JavaScript program to display the current day and time:

function dateTime() {
    document.getElementById('date').innerHTML = Date();
}

// Write a JavaScript conditional statement to sort three numbers. Display an alert box to show the result

function abc(a, b, c) {

    var arry = [a, b, c];
    var sor = arry.sort(function (a, b) {
        return a - b;

    });
    alert(sor);

}
abc(623,2242,2);

// Write a JavaScript program to calculate multiplication and division of two numbers (input from user)

function multiplyBy() {
    n1 = document.getElementById("fn").value;
    n2 = document.getElementById("sn").value;
    document.getElementById("result").innerHTML = n1 * n2;
}

function divideBy() {
    n1 = document.getElementById("fn").value;
    n2 = document.getElementById("sn").value;
    document.getElementById("result").innerHTML = n1 / n2;
}

// Write a JavaScript program to remove a character at the specified position of a given string and return the new string

function rmvString(string, posi) {
    part1 = string.substring(0, posi);
    part2 = string.substring(posi + 1, string.length);
    return (part1 + part2);
}

console.log(rmvString("No Issues Detected!", 10));
console.log(rmvString("No Issues Detected!", 13));
console.log(rmvString("No Issues Detected!", 5));

// Write a JavaScript program which iterates the integers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz"

for (let n = 1; n <= 100; n++) {
    if (n % 3 === 0 && n % 5 === 0) {
        console.log("FizzBuzz");
    }
    else if (n % 3 === 0) {
        console.log("Fizz");
    }
    else if (n % 5 === 0) {
        console.log("Buzz");
    }
    else {
        console.log(n);
    }
}



// Greeter - класс объектов, которые могут приветствовать людей.
// Он может выучить различные способы приветствия через стратегии
var Greeter = function(strategy) {
	this.strategy = strategy;
};

// Greeter содержит функцию greet,
// которая будет использоваться для приветствия людей
// через стратегии, переданные в конструктор
Greeter.prototype.greet = function() {
	return this.strategy();
};

// Так как функция инкапсулирует алгоритм,
// она отличный кандидат на роль стратегии

// Немного стратегий:
var politeGreetingStrategy = function() {
	console.log("Hello.");
};

var friendlyGreetingStrategy = function() {
	console.log("Hey!");
};

var boredGreetingStrategy = function() {
	console.log("sup.");
};

// Давайте используем их!
var politeGreeter = new Greeter(politeGreetingStrategy);
var friendlyGreeter = new Greeter(friendlyGreetingStrategy);
var boredGreeter = new Greeter(boredGreetingStrategy);

politeGreeter.greet(); //=> Hello.
friendlyGreeter.greet(); //=> Hey!
boredGreeter.greet(); //=> sup.
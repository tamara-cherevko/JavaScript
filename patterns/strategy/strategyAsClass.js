var Greeter = function(strategy) {
	this.strategy = strategy;
};
// Мы можем использовать силу Прототипов в Javascript
// для создания классов, которые ведут себя как стратегии

// Здесь мы создаём абстрактный класс,
// который будет служить в качестве интерфейса для всех наших стратегий.
// Впринципе он не необходим, но полезен в целях документирования
var Strategy = function() {};

Strategy.prototype.execute = function() {
	throw new Error('Strategy#execute needs to be overridden.')
};

// Как и в примере выше мы хотим создать стратегии приветствия
// Давайте создадим для них подкласс из класса `Strategy`.
// Обратите внимание, что родительский класс требует,
// что бы дочерние переопределяли метод `execute`
var GreetingStrategy = function() {};
GreetingStrategy.prototype = Object.create(Strategy.prototype);

// Определим метод `execute`, который входит в состав публичного интерфейса
// для объектов класса `Strategy` и дочерних ему.
// Обратите внимание, что он определён через два других метода.
// Этот паттерн называется Шаблонный метод (Template Method).
// Вы увидете его преимущества немного позже.
GreetingStrategy.prototype.execute = function() {
	return this.sayHi() + this.sayBye();
};

GreetingStrategy.prototype.sayHi = function() {
	return "Hello, ";
};

GreetingStrategy.prototype.sayBye = function() {
	return "Goodbye.";
};

// Теперь мы можем попробовать нашу стратегию.
// Только сперва потребуется чуть-чуть модернизировать класс `Greeter`.
Greeter.prototype.greet = function() {
	return this.strategy.execute();
};

var greeter = new Greeter(new GreetingStrategy());
greeter.greet() //=> 'Hello, Goodbye.'

// Так как GreetingStrategy#execute определён через другие методы.
// Мы можем создать подклассы, в которых они будут переопределены,
// при этом не затрагивая основной алгоритм (метод `execute`)

var PoliteGreetingStrategy = function() {};
PoliteGreetingStrategy.prototype = Object.create(GreetingStrategy.prototype);
PoliteGreetingStrategy.prototype.sayHi = function() {
	return "Welcome sir, ";
};

var FriendlyGreetingStrategy = function() {};
FriendlyGreetingStrategy.prototype = Object.create(GreetingStrategy.prototype);
FriendlyGreetingStrategy.prototype.sayHi = function() {
	return "Hey, ";
};

var BoredGreetingStrategy = function() {};
BoredGreetingStrategy.prototype = Object.create(GreetingStrategy.prototype);
BoredGreetingStrategy.prototype.sayHi = function() {
	return "sup, ";
};

var politeGreeter = new Greeter(new PoliteGreetingStrategy());
var friendlyGreeter = new Greeter(new FriendlyGreetingStrategy());
var boredGreeter = new Greeter(new BoredGreetingStrategy());

politeGreeter.greet(); //=> 'Welcome sir, Goodbye.'
friendlyGreeter.greet(); //=> 'Hey, Goodbye.'
boredGreeter.greet(); //=> 'sup, Goodbye.'

var greeters = [
	new Greeter(new BoredGreetingStrategy()),
	new Greeter(new PoliteGreetingStrategy()),
	new Greeter(new FriendlyGreetingStrategy()),
];

greeters.forEach(function(greeter) {
	// Так как каждый `greeter` может использовать свою стратегию
	// нету никакой необходимости проверять его тип.
	// Мы просто запускаем его метод `greet`,
	// а он уже сам разберётся как его обработать.
	greeter.greet();
});
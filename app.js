var In = {
	"af": [
		[1, 2, 3], ["a", "b", "c", "d"], // Estados e valores pra transição
		[[1, "a", 1], [1, "#", 2], [2, "b", 2], [2, "#", 3], [3, "c", 3], [3, "a", 2], [3, "d", 2]], // transições
		[1,3], [2]
	],
	"r" : [1,3,2]
}
var r = $R(In);
r.inFim();
r.regexOut();



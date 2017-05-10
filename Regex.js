;(function(global){

	var Regex = function(JsonIn){
		return new Regex.init(JsonIn);
	};

	Regex.prototype = {
		outVar: function() {
			console.log(
				"E     = " + this.E +
				"\nSig   = " + this.Sig +
				"\nTrans = " + this.tr +
				"\nI     = " + this.I +
				"\nF     = " + this.F +
				"\nR     = " + this.r +
                "\nrEx   = " + this.rEx
			);
			return this;
		},
        inFim: function(){

        },
        AgruparIguais: function(){
            console.log(this.tr[0][1]);
            for(var j = 0; j < this.tr.length; j++){
                for(var k = 0; k < this.tr.length; k++){
                    if(this.tr[j][0] == this.tr[k][0] &&  this.tr[j][2] == this.tr[k][2] && j != k){
                        this.tr[j][1] += "+"+ this.tr[k][1];
                        this.tr.splice(k,1);
                    }
                }
            }
        },
        CocatenaInEnd(){
            var t, i = 0;
            while(i < this.I.length){
                t = [['i', '#', this.I[i]]];
                t = t.concat(this.tr);
                this.tr = t;
                i++;
            }
            //Cocatena as transicoes Finais no tr
            i = 0;
            while(i < this.F.length){
                t = [[this.F[i], '#', 'f']];
                t = this.tr.concat(t);
                this.tr = t;
                i++;
            }
        },
		regexOut: function(){

            //Cocatena as transicoes Iniciais no tr;
            this.CocatenaInEnd();

            //Agrupar iguais
            this.AgruparIguais();

            //Mostra as variaveis
            this.outVar();

            var regexOut;
            var auxVect;
            var aux;

            //Pega o o vetor de retirada e percorre ele inteiro
            console.log("vetor");
            for(var i = 0; i < this.r.length; i++){
                regexOut = '';
                auxVect = [];
                console.log("ITERACAO  I : "+ i + " = " + this.r[i]);
                //Agora, pega todos os vetores que terminam com o this.r[i]
                for(var j = 0; j < this.tr.length; j++){


                    if(this.tr[j][2] == this.r[i] && this.tr[j][0] != this.r[i]){

                         console.log("  ITERACAO  J :" + j + " ->" + this.tr[j]);
                        // console.log(this.tr[j]);
                        //Agora, pegar todos os elementos que saem de this.r[i] e sair

                        for(var k = 0; k < this.tr.length; k++){
                            // console.log(this.tr[k]);

                            if(this.tr[k][0] == this.r[i] && k != j){
                                console.log("    ITERACAO  K :"+ k +" = " + this.tr[k]);

                                if(this.tr[k][0] == this.tr[k][2] && this.tr[k][2] == this.r[i]){
                                    regexOut+= this.tr[k][1] + '*';
                                } else {
                                    if(this.tr[k][1].length > 2){
                                        this.tr[k][1] = '(' + this.tr[k][1] + ')';
                                    }
                                    regexOut+= this.tr[k][1] == '#' ? '': this.tr[k][1];
                                }

                                aux = k;
                                // console.log("AQUI OH ====>>" + regexOut);
                                this.tr.push([this.tr[j][0], regexOut, this.tr[aux][2]]);
                                this.tr.splice(k,1);
                                k--;
                            }
                        }
                        this.tr.splice(j,1);
                        j--;
                    }
                }
                console.log("VARIAVEIS : ");
                console.log(this.tr[this.tr.length-1]);

                // break;
            }
            console.log(this.tr);



            return this;
		}
	};

	Regex.init = function(JsonIn){

		let self = this; 

		self.E = JsonIn["af"][0];
		self.Sig = JsonIn["af"][1];
		self.Delta =  0;
		self.I =  JsonIn["af"][(JsonIn["af"].length) -2];
		self.F =  JsonIn["af"][(JsonIn["af"].length)- 1];
		self.tr = JsonIn["af"][2] || {};
		self.r = JsonIn["r"] || [];
		self.rEx = [];

	};

	Regex.init.prototype = Regex.prototype;

	global.Regex = global.$R = Regex;

}(window));



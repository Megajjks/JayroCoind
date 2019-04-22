const SHA256 = require('crypto-js/sha256');
class Block{
    //index: Orden del bloque de la cadena
    //data: Información de la cadena, como transacciones
    //previousHash: el hash anterior de la cadena
  constructor(index, data, previousHash=""){ //en este caso el hash esta vacio por ser el primero de la cadena
    this.index = index;
    this.date = new Date(); //la fecha de la transacción;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.createHash();
  } 
  
  createHash(){
      return SHA256(this.index + this.data + this.date).toString();
  }
}

class Blockchain{
    constructor(genesis){
        this.chain = [this.createFirstBlock(genesis)];
    }
    createFirstBlock(genesis){
        return new Block(0,genesis);
    }
    getLastBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(data){
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index+1, data, prevBlock.hash);
        this.chain.push(block);
    }
}

//block = new Block(0, 'test');
//console.log(JSON.stringify(block,null,2));

let Jayrocoind = new Blockchain('Datos de bloque genesis');
let nblock = Math.floor(Math.random()*(20-1)) + 1;
for(let i=0; i<nblock; i++){
    Jayrocoind.addBlock('datos de bloque # '+ i);
}
console.log(JSON.stringify(Jayrocoind,null,2));//Muestra el dato en formato Json
console.log(nblock + ' bloques generado(s)');

const express = require("express");
const convert = require("xml-js");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase(); // prova simple
  res.json({ result });
});

//=================funció a completar===========================================
app.post("/convertTOXMl", (req, res) => {
  const { data } = req.body;
   let textRebut='{"key1":value1,"key2":value2,""key3":value3}'; 
   //a data esperem un text similar al de dalt
   textRebut = data; //guardem el text real que envia el usuari 
   // com el json que rebrem es de tipus simple, sense objectes ni llistes netejerem l'string per treballar millor.
   textRebut= textRebut.replace("{",""); //eliminem del string la clau d'obertura
   textRebut= textRebut.replace("}",""); //eliminem del string la clau de tancament
   textRebut = textRebut.replace(/"/g, ""); //eliminem del string tots els ""
   //key1:value1,key2:value2,key3:value3  us podeu imaginar un resultat com aquest

   //Sabem que per cada key del json haurem de crear una etiqueta i aquesta tindra com a contingut el value


   let keyvalues =[];//declarem una llista buida
   keyvalues = textRebut.split(",");// si ha un string  li apliquem split, guardem una llista de elements separats per el carcter
   let keys=[]; //aqui guardarem les keys després
   let values =[]; // i aquí els values
   for(let i=0; i < keyvalues.length;i++) //aquest for permet un bucle que recorre tots els keyvalues
    {
       let temp= keyvalues[i].split(":") // separem el string en dos parts per el :
       keys.push(temp[0]);// la primera part(la 0) sera la key i la afegim  a la llista de keys.
       values.push(temp[1]);// la segona part sera el value i la afegim a la llista de values.
    }

   let xml="";//declarem un string
   xml +="<arrel>";//afegim al string un tros de text
   //
   for(let i =0;i<keys.length;i++)
    {
        //ara en aquest bucle hauras de afegir els trossos que fan falta a l'xml per passar l'informació.

        //pista keys[i] accedeix a la llista de keys i posa el text que hem guardat abans, el mateix amb values[i]
        xml+="\n<"+keys[i].trim()+">"+values[i]+"</"+ keys[i].trim() +">\n";
        //continua per aquí!
            }
    xml +="</arrel>";
    console.log(xml);
    result = xml;

  res.json({ result });
});

app.post("/convertJsontoXML",(req,res)=>{
  const {data} = req.body
  let result1 = convert.js2xml(data, {compact: true, spaces: 4});
  const result = result1;

  res.json({ result });
});
function simplificarJSON(node){ // funció per eliminar el camp text
  if(node.elements.length === 1 && node.elements[0].type === "text"){ // comprova que hi ha text i que conte el tipus text
      return node.elements[0].text; // retorna el valor del text.
  }
  const obj = {} // crear un array
  for (const i of node.elements){ //fa un loop per cada element que hi ha en el json
    obj[i.name] = simplificarJSON(i); //aplica la funció SimplificarJSON per cada element 
  }
  return obj; //retorna el nou objecte que es el JSON amb el _text eliminat
}

app.post("/convertXMLtoJSON",(req,res)=>{
  const {data} = req.body
  let result1 = convert.xml2js(data, {compact: false, spaces: 4});
  const result = simplificarJSON(result1.elements[0]);

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});


app.post("/convertPokemon", async (req, res) => {
  const name = req.body.data;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const pokemonJson = await response.json();

  const result = convert.js2xml(pokemonJson, {compact: true, spaces: 4});
  res.json({ result });
});

app.post("/convertPokemonHabilities", async (req, res) => {
  const name = req.body.data;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
  const pokemonJson = await response.json();
  let abilities = []
  for(let i=0;i < pokemonJson.abilities.length; i++){
    abilities.push(pokemonJson.abilities[i].ability.name);
  }
  const extract = { 
    name: pokemonJson.name,
    abilities_pokemon: abilities
  };
  const result = extract;
  res.json({ result });
});

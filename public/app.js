
const btn = document.getElementById("btn");
const btnToXML = document.getElementById("btnToXML");
const btnToXMLfunction = document.getElementById("btnToXMLfunction");
const btnToJSONfunction = document.getElementById("btnToJSONfunction");

btn.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
  const res = await fetch("/convert", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },

    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});

btnToXML.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)t
  // fetch() envia una request al backend
  const res = await fetch("/convertTOXMl", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },

    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});



btnToXMLfunction.addEventListener("click", async() => {
   const text = document.getElementById("input").value;

   const res = await fetch ("/convertJsontoXML",{
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: JSON.parse(text)}) // Aqui s'aplica Parse per tal de obtenir un objecte

   });

   const json = await res.json();

   document.getElementById("output").value = json.result;
});



btnToJSONfunction.addEventListener("click", async() => {
   const text = document.getElementById("input").value;

   const res = await fetch ("/convertXMLtoJSON",{
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text})
  

   });

   const json = await res.json();
   

   document.getElementById("output").value = JSON.stringify(json.result);
});
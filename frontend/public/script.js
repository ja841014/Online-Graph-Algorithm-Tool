// function initialize() {
//     loader.style.display = "inline-block";
// }

// initialize();

async function submit() {
    console.log("In submit!")

    try {
     
        let calculate_type = document.getElementById("calculate_type").value;
    
        let request = `http://127.0.0.1:5000/?calculate_type=${calculate_type}&root=${root} `;
        console.log("request: ", request);
    
        // Send an HTTP GET request to the backend
        const data = await axios.get(request);
    
         console.log("data.data: ", JSON.stringify(data.data, null, 2));
        
    
        // // Display the random value
        // random_value_element.innerHTML = "Here is your random number: " + data.data.randomValue;
      } catch (error) {
        console.log("error: ", error);
      }
    
}
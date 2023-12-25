/*
    Network talk : HTTP/HTTPS
    Async call, promise
    promise -> 1. then and 2. catch
*/

makeNetworkCall("https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json");
async function makeNetworkCall(URL)
{
    // await is used to wait till the promise is returned inside the async function
    try{
        const response= await fetch(URL);
        const data= await response.json();
        console.log("Data is : ",data);
        return data;
    }
    catch(err){
        console.log("Error is :: ",err);
    };
    /*
    // fetch was introduced in ECMASscript 6
    // it is a wrapper for previously used XML HTTP request
    // wrapper does work which we had to do manually in XML HTTP request
    // GET request - to recieve data 
    // POST request - to send data securely
    const promise = fetch(URL);
    promise.then((response)=>{
        // response =| header | body |
        // header has low level information and is visible to all
        // 200-300 -> successful
        // 300- 400 -> response get
        // 400- 500 -> error in server
        const promise2=response.json();
        promise2.then(data=>{
            // if data is returned
        }).catch(err=>{

        })
    })
    .catch(()=>{
        // network problem
    });
    */
}
export default makeNetworkCall;
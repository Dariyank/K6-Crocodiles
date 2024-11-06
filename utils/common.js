/** 
 * @param {boolean} result the result of the response validation 
 * @param {JSON} response the response from the endpoint
 */
export function returnError(result, response){
	if(!result)
		console.log(`Failed with error code ${response.status}: ${response.status_text}`);
}
exports.handler = async function (){
  return{
    statusCode : 200,
    body: JSON.stringify({
      name: 'padd',
      age: 20,
      email: 'hello@test.com'
    })
  }
}

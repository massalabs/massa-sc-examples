// go http://localhost:8080/api/accounts/elli and delete the account 


const url = 'http://localhost:8080/api/accounts/elli';
console.log(url);
const response = fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({}),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
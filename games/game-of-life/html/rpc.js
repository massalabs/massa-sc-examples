function JsonRPCRequest(resource, data, completion_callback, error_callback) {
    var body = JSON.stringify({
      "jsonrpc": "2.0",
      "method": resource,
      "params": data,
      "id": 0
    });
  
    var xhr = new XMLHttpRequest();
    //   xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          try {
            var response = JSON.parse(this.responseText);
          } catch (e) {
            error_callback('JSON.parse error: ' + String(e), this);
          }
          if ("error" in response) {
            error_callback(response.error, this);
          }
          else {
            completion_callback(response.result, this);
          }
        }
        else {
          error_callback('XMLHttpRequest error: ' + String(this.statusText), this);
        }
      }
    });
  
    // Use labnet IP
    xhr.open("POST", "http://145.239.66.206:33035");
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.send(body);
    return xhr
  }

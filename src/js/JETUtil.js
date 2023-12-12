async function callGetService(serviceName) {
  return new Promise(function (resolve, reject) {
    var headers = {};
    headers["Content-Type"] = "application/json";

    fetch("http://google.com", { method: "GET", headers: headers, mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function callPostService(serviceName, input) {
  return new Promise(function (resolve, reject) {
    var headers = {};
    headers["Content-Type"] = "application/json";
    var bodyPart=JSON.stringify(input);

    fetch("http://127.0.0.1:7101/Schedule/jersey/ScheduleServices/" + serviceName, { method: "POST", headers: headers, mode: "cors", body:bodyPart })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const btn = document.getElementById("submit");
var from, to, URL;
btn.addEventListener("click", printinput);
function printinput() {
    event.preventDefault();
    from = document.getElementById('sourcestation').value;
    to = document.getElementById('tostation').value;
    from = from.split("•")[1]
    to = to.split("•")[1]
    console.log(from)
    console.log(to)
    // URL = `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`;
    URL = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    getInfo();
}

const getInfo = async () => {
    try {
        let response = await fetch(URL);
        if (response.ok) {
            const data = await response.text();
            const json = CheckTrain(data);
            console.log(json.data)
            // let data = await response.json(); 
                    for (let i = 0; i < json.data.length; i++) {
                        // console.log(data.data[i]);
                        let div = document.createElement("div");
                        let trainname = json.data[i].train_base.train_name;
                        let fromtime = json.data[i].train_base.from_time;
                        let totime = json.data[i].train_base.to_time;

                        let runningdays = json.data[i].train_base.running_days;
                        let s = "";
                        for (let i = 0; i < runningdays.length; i++) {
                            if (i == 0 && runningdays[i] == 1)
                                s += 'Mon ';
                            else if (i == 1 && runningdays[i] == 1)
                                s += 'Tue ';
                            else if (i == 2 && runningdays[i] == 1)
                                s += 'Wed ';
                            else if (i == 3 && runningdays[i] == 1)
                                s += 'Thu  ';
                            else if (i == 4 && runningdays[i] == 1)
                                s += 'Fri ';
                            else if (i == 5 && runningdays[i] == 1)
                                s += 'Sat ';
                            else if (i == 6 && runningdays[i] == 1)
                                s += 'Sun ';
                        }
                        html = `<div id="container1">
                                    <p class="train">${trainname}</p>
                                    <span>${s}</span>
                                    <span class="time">${fromtime} - ${totime}</span>
                                </div>`
                        let con = document.getElementById("container");
                        con.insertAdjacentHTML('beforeend', html);
                        let final = trainname + " " + fromtime +" - "+totime + " " +s;
                        let finaltemplate = document.createElement("p");
                        finaltemplate.innerHTML = final;
                        div.appendChild(finaltemplate);
                        document.body.appendChild(div);
                    }
            // data.forEach(function);
            // console.log(data.data[0].train_base.train_name)
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = async () => {
    // console.log('ready')
    const data = await fetch('./stations.json')
    const dataJSON = await data.json()
    console.log(dataJSON.features.length)
    for(let i=0;i<dataJSON.features.length;i++)
    {
        // console.log(dataJSON.features[i].properties.name)
    optiontag1 = document.createElement('option')
    optiontag1.value = `${dataJSON.features[i].properties.name} • ${dataJSON.features[i].properties.code}`
    optiontag2 = document.createElement('option')
    optiontag2.value = `${dataJSON.features[i].properties.name} • ${dataJSON.features[i].properties.code}`
    const datalist1 = document.getElementById('source')
    const datalist2 = document.getElementById('to')
    datalist1.appendChild(optiontag1)
    datalist2.appendChild(optiontag2)
    }
    // <option value="Chocolate • CH"></option>
}


function CheckTrain(string) {
    try {
        let obj = {};
        let retval = {};
        let arr = [];
        let obj2 = {};
        let data = string.split("~~~~~~~~");
        let nore = data[0].split("~");
        nore = nore[5].split("<");
        if (nore[0] == "No direct trains found") {
            retval["success"] = false;
            retval["time_stamp"] = Date.now();
            retval["data"] = nore[0];
            return retval;
        }
        if (
            data[0] === "~~~~~Please try again after some time." ||
            data[0] === "~~~~~From station not found" ||
            data[0] === "~~~~~To station not found"
        ) {
            retval["success"] = false;
            retval["time_stamp"] = Date.now();
            retval["data"] = data[0].replaceAll("~", "");
            return retval;
        }
        data = data.filter((el) => {
            return el != "";
        });
        for (let i = 0; i < data.length; i++) {
            let data1 = data[i].split("~^");
            if (data1.length === 2) {
                data1 = data1[1].split("~");
                data1 = data1.filter((el) => {
                    return el != "";
                });
                obj["train_no"] = data1[0];
                obj["train_name"] = data1[1];
                obj["source_stn_name"] = data1[2];
                obj["source_stn_code"] = data1[3];
                obj["dstn_stn_name"] = data1[4];
                obj["dstn_stn_code"] = data1[5];
                obj["from_stn_name"] = data1[6];
                obj["from_stn_code"] = data1[7];
                obj["to_stn_name"] = data1[8];
                obj["to_stn_code"] = data1[9];
                obj["from_time"] = data1[10];
                obj["to_time"] = data1[11];
                obj["travel_time"] = data1[12];
                obj["running_days"] = data1[13];
                obj2["train_base"] = obj;
                arr.push(obj2);
                obj = {};
                obj2 = {};
            }
        }
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = arr;
        return retval;
    } catch (err) {
        console.warn(err.message);
    }
}


//   trains[0].train_base.train_name


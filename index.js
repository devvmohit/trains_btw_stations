
const btn = document.getElementById("submit");
var from,to,URL;
btn.addEventListener("click",printinput);
function printinput()
{
    event.preventDefault();
    from = document.getElementsByTagName("input")[0].value;
    to = document.getElementsByTagName("input")[1].value;
    URL = `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`;
    getInfo();
}
const getInfo = async () => {
    try {
        let response = await fetch(URL); 
        if (response.ok) {
            let data = await response.json(); 
            for(let i=0;i<42;i++)
            {
              console.log(data.data[i]);
              let div = document.createElement("div");
              let trainname = data.data[i].train_base.train_name;
              let fromtime = data.data[i].train_base.from_time;
              let totime = data.data[i].train_base.to_time;

              let runningdays = data.data[i].train_base.running_days;
              let s="";
              for(let i=0;i<runningdays.length;i++)
              {
                if(i==0 && runningdays[i]==1)
                s+='Mon ';
                else if(i==1 && runningdays[i]==1)
                s+='Tue ';
                else if(i==2 && runningdays[i]==1)
                s+='Wed ';
                else if(i==3 && runningdays[i]==1)
                s+='Thu  ';
                else if(i==4 && runningdays[i]==1)
                s+='Fri ';
                else if(i==5 && runningdays[i]==1)
                s+='Sat ';
                else if(i==6 && runningdays[i]==1)
                s+='Sun ';
              }
              html = `<div id="container1">
              <p class="train">${trainname}</p>
              <span>${s}</span>
        <span class="time">${fromtime} - ${totime}</span>
    </div>`
              let con = document.getElementById("container");
              con.insertAdjacentHTML('beforeend',html);
              // let final = trainname + " " + fromtime +" - "+totime + " " +s;
              // let finaltemplate = document.createElement("p");
              // finaltemplate.innerHTML = final;
              // div.appendChild(finaltemplate);
              // document.body.appendChild(div);
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



//   trains[0].train_base.train_name


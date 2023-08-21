var search = document.getElementById('location')
let date
let firstDay , seconedDay, thirdDay 
let month 

search.addEventListener('keyup', function(){
    (async function(){
        if(search.value != ""){
            var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${search.value}&days=3`)
            if(data.status != 400 && data.ok){
                var response = await data.json()
                getTheDay(response.location)
                displayFirstDay(response)
                displayNextDays(response)
            }
        }
    })()
})

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getTheDay(e) {
    //get the day 
    let dayOne = new Date(e.localtime).getDay()
    firstDay = days[dayOne]
    seconedDay = days[dayOne + 1]
    thirdDay = days[dayOne + 2]

    //get the month
    let monthNumber = new Date(e.localtime).getMonth()
    month = months[monthNumber]

    //get the date
    date = new Date(e.localtime).getDate()

}

function displayFirstDay(e){
    var first = 
    `
    <div>
        <div class="date">
            <div class="day">${firstDay}</div>
            <div class="month">${date}${month}</div>
        </div>
        <div class="weather-content">
            <p class="location">${e.location.name}</p>
            <div class="degree">
                <div class="num">
                    ${e.current.temp_c}<sup>o</sup> C
                </div>
                    <div class="icon">
                        <img src="${e.current.condition.icon}" alt="">
                    </div>
                </div>
                <div class="statue">
                    ${e.current.condition.text}
                </div>
                <div class="info">
                    <span>
                        <img src="images/icon-umberella.png" alt="">
                        20%
                    </span>                            
                    <span>
                        <img src="images/icon-wind.png" alt="">
                        18km/h
                    </span>                            
                    <span>
                        <img src="images/icon-compass.png" alt="">
                        East
                    </span>
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById('first-day').innerHTML = first
}

function displayNextDays(e){
    var seconed = 
`
    <div>
        <div class="date">
            <div class="day">${seconedDay}</div>
        </div>
        <div class="weather-content">
            <div class="degree">
                <div class="icon">
                    <img src="${e.forecast.forecastday[1].day.condition.icon}" alt="">
                </div>
                <div class="num">
                    ${e.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup> C
                </div>
                <small>
                    26.3 <sup>o</sup>
                </small>
            </div>
            <div class="statue">
                ${e.forecast.forecastday[1].day.condition.text}
            </div>
        </div>
    </div>
`
    var third =
`
    <div>
        <div class="date">
            <div class="day">${thirdDay}</div>
        </div>
        <div class="weather-content">
            <div class="degree">
                <div class="icon">
                    <img src="${e.forecast.forecastday[2].day.condition.icon}" alt="">
                </div>
                <div class="num">
                    ${e.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup> C
                </div>
                <small>
                    26.3 <sup>o</sup>
                </small>
            </div>
            <div class="statue">
                ${e.forecast.forecastday[2].day.condition.text}
            </div>
        </div>
    </div>
`

document.getElementById('seconed-day').innerHTML = seconed
document.getElementById('third-day').innerHTML = third
}




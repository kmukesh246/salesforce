let searchCityDiv = `<div class="login-container">
<h1 class="heading-page">Search</h1>
    <table align="center">
        <tr>
            <td>Enter the City to search</td>
            <td>
                <select id="cityList">
                        
                </div>
                </select>
            </td>
        </tr>
        <tr>
            <td>
                <input style="margin-left: 50%" class="input-btn" id="searchCity" value="Search" />
            </td>
        </tr>
    </table>
</div>`;

let displayHotelsDiv = ` <div style="text-align: right;padding-right: 20px;">
<a href="search">Modify Search</a>
</div>
<div id="dis-hotel" class="display-hotel-table">


</div>
<br>
<br>			
`;
let app = document.getElementById('app');

app.innerHTML = searchCityDiv;
let dropDown = document.getElementById('cityList');
let searchCity = document.getElementById('searchCity');
let url = 'http://localhost:8081/getHotels';
let specificHotel = 'http://localhost:8081/viewHotel';
let cityList;

searchCity.addEventListener('click', () => {
    let cityId = dropDown.value;
    fetch(`http://localhost:8081/searchHotels/${cityList[cityId]}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            app.innerHTML = displayHotelsDiv;
            let disHotel = document.getElementById("dis-hotel");
            let temp = document.createElement('table');
            temp.class =  "display-hotel-table";
            temp.innerHTML = getTableRow(data);
            disHotel.appendChild(temp)
        })
})
fetch(url)
    .then(response => response.json())
    .then(data => {
        cityList = data
        dropDown.innerHTML = data.map((item, i) => `<option value="${i}" >${item}</option>`)
    })

function getTableRow(data) {
    let {
        hotelList
    } = data;

    let hotelListBody = hotelList.map(item => `<tr>
    <td>${item.hname}</td>
    <td>${item.address}</td>
    <td>${item.city}</td>
    <td>${item.state}</td>
    <td><button class="input-btn"
    onclick="test(${item.hid})">View
    Hotel</button></td>
</tr>`)
    return [`<tr class="dis-hotel-table-heading">
    <th>Hotel name</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th></th>
</tr>`, ...hotelListBody]
}

function test(id){
    console.log(id);
    fetch(`${specificHotel}/${id}`)
    .then(response => response.json())
    .then(data => {
        app.innerHTML = constructDisplayHotel(data);
        console.log(data)
    })
}

function constructDisplayHotel(data){
    let selectedHotel = data.selectedHotel
    return `<div class="hotelblock">
        <input class="hotel-details"
            style="background: transparent; border: 0px;" name="hname"
            value="${selectedHotel.hname}"></input>
        <div style="display: flex; justify-content: space-between;">
            <div class="hotel-details-con">
                <input style="background: transparent; border: 0px;"
                    class="hotel-address" name="address" value="${selectedHotel.address}"}"></input>
                <input style="background: transparent; border: 0px;" name="city"
                    value="${selectedHotel.city}"></input> <input
                    style="background: transparent; border: 0px;" name="state"
                    value="${selectedHotel.state}"></input>
            </div>
            <div>
                <button class="button" onclick="bookHotel(${data})"id="myBtn">Book</button>
            </div>
        </div>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div>
                    <div>Email id</div>
                    <div>
                        <input class="inputtext" type="text" name="userMailId"
                            value="${"validuserEmailId"}" readonly />
                    </div>
                </div>
                <div>
                    <div>Select Table</div>
                    <div>
                        <input class="inputtext" type="text" list="tablesList"
                            name="tableSelected" required="required" />
                    </div>
                </div>
                <div>
                    <div>No. of persons</div>
                    <div>
                        <input class="inputtext" type="text" name="personCount"
                            required="required" />
                    </div>
                </div>
                <div>
                    <div>Select from menu</div>
                    <div>
                        <input type="text" class="inputtext" list="menulist"
                            name="menuSelected" id="menuSelected" />
                    </div>
                </div>
                <button class="button" style="width: 100%; margin-top: 20px;"
                    type="button" name="addbtn" onclick="myFunction()">ADD</button>
                <datalist id="tablesList">
                </datalist>
                <table id="menuTable" border="1">
                    <tr>
                        <td>Item Selected</td>
                        <td>Price of the item</td>
                        <td>Quantity</td>
                    </tr>
                </table>
                <input type="text" hidden name="menuS" id="menuS" />
                <button type="submit" class="button"
                    style="width: 100%; margin-top: 20px;" name="addbtn"
                    onclick="readTable()">Place Reservation</button>
    <datalist id="menulist">
    </datalist>
    </div>`

}
function bookHotel(data){

}
"use strict";
    $(document).ready(function(){
        /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
        var gColum = ["stt", "icon", "main", "description", "morn", "night", "min","max","pressure","humidity","speed","deg"];
        var gStt = 0;
        const gNEXT_DAY = 0;
        const gICON = 1;
        const gWEATHER = 2;
        const gDEPS = 3;
        const gMORNING_TEMP = 4;
        const gNIGHT_TEMP= 5;
        const gMIN_TEMP = 6;
        const gMAX_TEMP = 7;
        const gPRESSURE= 8;
        const gHUMIDITI = 9;
        const gWIND_SPEED = 10;
        const gWIND_DIRECTTION = 11;
        var gDataTable = $("#table").DataTable({
            columns: [
                {data: gColum[0]},
                {data: gColum[1]},
                {data: gColum[2]},
                {data: gColum[3]},
                {data: gColum[4]},
                {data: gColum[5]},
                {data: gColum[6]},
                {data: gColum[7]},
                {data: gColum[8]},
                {data: gColum[9]},
                {data: gColum[10]},
                {data: gColum[11]}
            ],
            columnDefs: [
                {
                    targets: 0,
                    render: function ( data, type, row, meta ) {
                    gStt ++;
                    return gStt;
                }
                },
                {
                    targets: 1,
                    defaultContent: "<img src='' id='img-1'>",
                    render: function (data, type, row, meta) {
                        for (var i = 0; i < row.weather.length; i++){
                            var weather = row.weather[i].icon;
                        }
                        return "<img src='https://openweathermap.org/img/w/" + weather + ".png' id='img-1'>" 
                    }
                },
                {
                    targets: 2,
                    render: function (data, type, row, meta) {
                        for (var i = 0; i < row.weather.length; i++){
                            var weather = row.weather[i].main;
                        }
                        return weather
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row, meta) {
                        for (var i = 0; i < row.weather.length; i++){
                            var weather = row.weather[i].description;
                        }
                        return weather
                    }
                },
                {
                    targets: 4,
                    render: function (data, type, row, meta) {
                        return row.temp.morn + "°C"
                    }
                },
                {
                    targets: 5,
                    render: function (data, type, row, meta) {
                        return row.temp.night + "°C"
                    }
                },
                {
                    targets: 6,
                    render: function (data, type, row, meta) {
                        return row.temp.min + "°C"
                    }
                },
                {
                    targets: 7,
                    render: function (data, type, row, meta) {
                        return row.temp.max + "°C"
                    }
                },
                {
                    targets: 8,
                    render: function (data, type, row, meta) {
                        return row.pressure + " hpa"
                    }
                },
                {
                    targets: 9,
                    render: function (data, type, row, meta) {
                        return row.humidity + "%"
                    }
                },
                {
                    targets: 10,
                    render: function (data, type, row, meta) {
                        return row.speed + " m/s"
                    }
                },
                {
                    targets: 11,
                    render: function (data, type, row, meta) {
                        return row.deg + "°"
                    }
                },
            ]
        });
        /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
        // Hàm xử lý khi ấn nút Secrch City 
        $("#btn-search").on("click", function(){
            onBtnSearchClick();
        })

        /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */  
        // Khi ấn nút Search City Validate lấy dữ liệu từ input
        // Nếu dữ liệu hợp lệ thì gọi Api lấy thông tin
        // Hiển thị thông tin ra
        function onBtnSearchClick(){
            // Khai báo đối tượng chứa dữ liệu
            var vInputForecast = {
                city: "",
                day: ""
            }
            // Thu thập dữ liệu
            getForecastData(vInputForecast);
            // Kiểm tra dữ liệu đầu vào
            var isValidate = validateInputData(vInputForecast);
            // Nếu dữ liệu đầu vào hợp lệ
            if (isValidate){
                // Gọi Api lấy dữ liệu thời tiết Hà Nội
                $.ajax({
                    url: 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + vInputForecast.city + "&units=metric" +
                    "&cnt=" + vInputForecast.day + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
                    type: "GET",
                    dataType: 'json',
                    success: function(responseObject){
                        console.log(responseObject)
                        // Hiển thị thông tin thời tiết của Hà Nội
                        loadDataToTable(responseObject)
                    },
                    error: function(error){
                        console.assert(error.responseText);
                        alert("City not foud")
                        location.reload()
                    }
                });
            }
        }
        /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
        // Hàm thu thập dữ liệu tên thành phố
        function getForecastData(paramInputForecast){
            paramInputForecast.city = $("#ipn-city-name").val();
            paramInputForecast.day = $("#ipn-day").val();
        }
        // Hàm kiểm tra dữ liệu đầu vào
        function validateInputData(paramInputForecast){
            if (paramInputForecast.city == ""){
                alert("City not found");
                return false
            }
            if (paramInputForecast.day == ""){
                alert("Next day: Min - 1 & Max - 16");
                return false
            }
            if (isNaN(paramInputForecast.day)){
                alert("Next day is number")
                return false
            }
            if (paramInputForecast.day <= 0 || paramInputForecast.day > 16){
                alert("Next day: Min - 1 & Max - 16");
                return false
            }
            return true;
        }
        // Hàm hiển thị thông tin thời tiết
        function loadDataToTable(paramRes){
            gDataTable.clear();
            gDataTable.rows.add(paramRes.list);
            gDataTable.draw();
        }
        



















    });


   